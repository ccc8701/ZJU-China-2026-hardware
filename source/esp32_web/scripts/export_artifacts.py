#!/usr/bin/env python3
"""Export reproducible, size-checked images without device access."""
from __future__ import annotations

from datetime import datetime, timedelta, timezone
import argparse
import hashlib
import importlib.metadata
import json
import os
from pathlib import Path
import re
import shutil
import struct


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--environment", choices=("lolin32_lite_tank_web", "esp32_s3_n8r2_tank_web"),
                        default="lolin32_lite_tank_web")
    parser.add_argument("--target-mac", help="Previously identified device MAC; no device is accessed.")
    parser.add_argument("--output-dir", type=Path, help="Separate export directory for an unflashed candidate.")
    args = parser.parse_args()
    is_s3 = args.environment == "esp32_s3_n8r2_tank_web"
    target_mac = args.target_mac or (None if is_s3 else "40:22:d8:07:b1:e4")
    if target_mac and not re.fullmatch(r"(?:[0-9a-fA-F]{2}:){5}[0-9a-fA-F]{2}", target_mac):
        raise SystemExit("Invalid target MAC; use six colon-separated hexadecimal bytes.")
    if target_mac:
        target_mac = target_mac.lower()
    project = Path(__file__).absolute().parents[1]
    build = project / ".pio/build" / args.environment
    core = Path(os.environ.get("PLATFORMIO_CORE_DIR", str(project / ".pio-core"))).absolute()
    packages = core / "packages"
    artifacts = project / "artifacts"
    if is_s3:
        artifacts = artifacts / args.environment
    if args.output_dir:
        artifacts = args.output_dir.expanduser().absolute()
    flash_bytes = (8 if is_s3 else 4) * 1024 * 1024
    bootloader_offset = 0 if is_s3 else 0x1000
    raw = (build / "partitions.bin").read_bytes()
    partitions = []
    for start in range(0, len(raw) - 31, 32):
        magic, kind, subtype, offset, size, label, flags = struct.unpack("<HBBII16sI", raw[start:start + 32])
        if magic != 0x50AA:
            break
        partitions.append({"name": label.split(b"\0", 1)[0].decode("ascii"),
                           "type": kind, "subtype": subtype,
                           "offset": offset, "offset_hex": f"0x{offset:x}",
                           "size": size, "flags": flags})
    apps = [p for p in partitions if p["name"] == "app0" and p["type"] == 0]
    ota = [p for p in partitions if p["name"] == "otadata" and p["type"] == 1]
    if len(apps) != 1 or apps[0]["offset"] != 0x10000 or len(ota) != 1 or ota[0]["offset"] != 0xE000:
        raise SystemExit("Unexpected app0/otadata partition; no images exported.")

    source_images = [
        ("bootloader.bin", build / "bootloader.bin", bootloader_offset, 0x8000 - bootloader_offset),
        ("partitions.bin", build / "partitions.bin", 0x8000, 0x1000),
        ("boot_app0.bin", packages / "framework-arduinoespressif32/tools/partitions/boot_app0.bin", 0xE000, ota[0]["size"]),
        ("firmware.bin", build / "firmware.bin", 0x10000, apps[0]["size"]),
    ]
    for name, path, offset, capacity in source_images:
        if not path.is_file() or not 0 < path.stat().st_size <= capacity:
            raise SystemExit(f"Missing/oversized image {name}; app0 capacity {apps[0]['size']} bytes.")
        if offset + path.stat().st_size > flash_bytes:
            raise SystemExit(f"Image exceeds configured flash size: {name}")
        if is_s3 and name in {"bootloader.bin", "firmware.bin"}:
            image = path.read_bytes()
            if len(image) < 24 or image[0] != 0xE9 or struct.unpack_from("<H", image, 12)[0] != 9:
                raise SystemExit(f"Image is not an ESP32-S3 image: {name}")
    if any(part["offset"] + part["size"] > flash_bytes for part in partitions):
        raise SystemExit("Partition exceeds configured flash size; no images exported.")
    artifacts.mkdir(parents=True, exist_ok=True)
    images = []
    for name, source, offset, _capacity in source_images:
        target = artifacts / name
        shutil.copyfile(source, target)
        images.append({"name": name, "path": name, "offset": offset,
                       "offset_hex": f"0x{offset:x}", "bytes": target.stat().st_size,
                       "sha256": sha256(target)})

    versions = {"platformio": importlib.metadata.version("platformio")}
    toolchain = "toolchain-xtensa-esp32s3" if is_s3 else "toolchain-xtensa-esp32"
    for package in ["framework-arduinoespressif32", toolchain, "tool-esptoolpy", "tool-scons"]:
        versions[package] = json.loads((packages / package / "package.json").read_text())["version"]
    versions["espressif32"] = json.loads((core / "platforms/espressif32/platform.json").read_text())["version"]
    source_text = (project / "src/main.cpp").read_text(encoding="utf-8")
    firmware_version = re.search(r'kFirmware\[\] = "([^"]+)"', source_text).group(1)
    source_paths = ["platformio.ini", "src/main.cpp", "src/protocol.cpp", "include/protocol.h", "include/display_temperature.h", "include/web_assets.h", "include/control_runtime.h",
                    "requirements-build.txt", "requirements-build.lock", "build.py", "scripts/export_artifacts.py"]
    source_paths.extend(path.relative_to(project).as_posix() for path in sorted((project / "tests").rglob("*"))
                        if path.is_file() and path.suffix in {".cpp", ".h", ".sh", ".py"})
    sources = [{"path": name, "sha256": sha256(project / name)} for name in source_paths]
    ui_manifest = project.parent / "web/dist/asset-manifest.json"
    manifest = {
        "created_at": datetime.now(timezone(timedelta(hours=8))).isoformat(),
        "firmware_version": firmware_version,
        "board": "ESP32-S3-WROOM-1-N8R2 compatible development board" if is_s3 else "lolin32_lite (Type-C compatible physical board)",
        "environment": args.environment,
        "target_mac": target_mac,
        "chip": "ESP32-S3" if is_s3 else "ESP32-D0WDQ6 revision v1.0 (previous ROM identification)",
        "flash_size_bytes": flash_bytes,
        "flash_mode": "qio" if is_s3 else "dio", "flash_frequency_hz": 80000000 if is_s3 else 40000000,
        "cpu_frequency_hz": 240000000, "xtal_frequency_hz": 40000000,
        "uart0": {"baud": 115200, "format": "8N1", "rx": 44 if is_s3 else 3, "tx": 43 if is_s3 else 1, "role": "read-only JSON logs"},
        "uart2": {"baud": 115200, "format": "8N1", "rx": 16, "tx": 17, "protocol": "W/R correlated proto=1"},
        "wifi": {"mode": "AP", "ssid": "TankLab-ESP32", "ip": "192.168.4.1", "max_clients": 4},
        "versions": versions, "sources": sources, "partitions": partitions, "images": images,
        "web_manifest": {"path": "../web/dist/asset-manifest.json", "sha256": sha256(ui_manifest)} if ui_manifest.is_file() else None,
        "host_validation": {"path": "host-validation.json", "sha256": sha256(artifacts / "host-validation.json"),
                            "suites": json.loads((artifacts / "host-validation.json").read_text(encoding="utf-8"))},
        "hardware_validation": "pending",
        "device_operations_during_build": "none",
    }
    if is_s3:
        manifest["chip_id"] = 9
        manifest["psram"] = {"size_bytes": 2 * 1024 * 1024, "interface": "QSPI", "enabled_at_build": True}
        manifest["usb_cdc_on_boot"] = False
        manifest["target_identity"] = "MAC supplied from separate ROM identification" if target_mac else "not yet bound to a physical device"
    manifest_path = artifacts / "build-manifest.json" if is_s3 or args.output_dir else project / "build-manifest.json"
    manifest_path.write_text(json.dumps(manifest, indent=2) + "\n")
    print(json.dumps({"manifest": str(manifest_path), "images": images,
                      "firmware_partition_free": apps[0]["size"] - (artifacts / "firmware.bin").stat().st_size}, indent=2))


if __name__ == "__main__":
    main()
