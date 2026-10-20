#!/usr/bin/env python3
"""Run host regressions, build and export images without opening a hardware port."""
from __future__ import annotations

import os
import argparse
import hashlib
import json
from pathlib import Path
import subprocess
import sys


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--environment", choices=("lolin32_lite_tank_web", "esp32_s3_n8r2_tank_web"),
                        default="lolin32_lite_tank_web")
    parser.add_argument("--target-mac", help="Bind the exported manifest to a previously identified device MAC.")
    parser.add_argument("--output-dir", type=Path, help="Export an offline candidate into a separate directory.")
    parser.add_argument("--core-dir", type=Path, help="PlatformIO core/packages directory (or PLATFORMIO_CORE_DIR).")
    args = parser.parse_args()
    # Preserve an ASCII subst drive on Windows: the pinned GCC 8 toolchain
    # cannot open Unicode paths, and resolve() expands the mapping again.
    project = Path(__file__).absolute().parent
    python = Path(sys.executable)
    core = args.core_dir or Path(os.environ.get("PLATFORMIO_CORE_DIR", str(project / ".pio-core")))
    if not (project / "include/web_assets.h").is_file():
        raise SystemExit("Missing include/web_assets.h: build web/ and embed its gzip assets first.")
    tracked = list((project / "src").glob("*")) + list((project / "include").glob("*")) + list((project / "tests").rglob("*")) + [
        project / "platformio.ini", project / "requirements-build.txt", project / "requirements-build.lock",
        project / "build.py", project / "scripts/export_artifacts.py", project.parent / "web/dist/asset-manifest.json",
    ]
    frozen = {path: hashlib.sha256(path.read_bytes()).hexdigest() for path in tracked if path.is_file()}
    artifacts = project / "artifacts"
    if args.environment != "lolin32_lite_tank_web":
        artifacts = artifacts / args.environment
    if args.output_dir:
        artifacts = args.output_dir.expanduser().absolute()
    manifest = project / "build-manifest.json" if args.environment == "lolin32_lite_tank_web" and not args.output_dir else artifacts / "build-manifest.json"
    manifest.unlink(missing_ok=True)

    def verify_sources() -> None:
        for path, expected in frozen.items():
            if not path.is_file() or hashlib.sha256(path.read_bytes()).hexdigest() != expected:
                manifest.unlink(missing_ok=True)
                raise SystemExit(f"Source changed during build: {path}. Rebuild the final frozen assets.")
    env = os.environ.copy()
    env["PLATFORMIO_CORE_DIR"] = str(core.absolute())
    env["PYTHONNOUSERSITE"] = "1"
    artifacts.mkdir(parents=True, exist_ok=True)
    subprocess.run([str(python), str(project / "tests/run_host_tests.py"),
                    "--output", str(artifacts / "host-validation.json")], check=True, env=env)
    verify_sources()
    subprocess.run([str(python), "-m", "platformio", "run", "--project-dir", str(project),
                    "--environment", args.environment], check=True, env=env)
    verify_sources()
    export = [str(python), str(project / "scripts/export_artifacts.py"), "--environment", args.environment]
    if args.target_mac:
        export.extend(["--target-mac", args.target_mac])
    if args.output_dir:
        export.extend(["--output-dir", str(artifacts)])
    subprocess.run(export, check=True, env=env)
    verify_sources()


if __name__ == "__main__":
    main()
