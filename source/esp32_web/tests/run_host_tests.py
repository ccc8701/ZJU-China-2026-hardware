#!/usr/bin/env python3
"""Run all four C++ host suites on Windows or POSIX without device access."""
from __future__ import annotations

import argparse
import json
import os
from pathlib import Path
import shutil
import subprocess
import tempfile


def run(command: list[str]) -> subprocess.CompletedProcess[str]:
    return subprocess.run(command, text=True, encoding="utf-8", errors="replace", capture_output=True)


def require_success(result: subprocess.CompletedProcess[str], description: str) -> None:
    if result.returncode:
        raise SystemExit(f"{description} failed ({result.returncode}):\n{result.stdout}{result.stderr}")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--cxx", default=os.environ.get("CXX"),
                        help="C++ compiler executable path (GCC, Clang, or zig).")
    parser.add_argument("--cxx-arg", action="append", default=[], help="Extra compiler prefix argument.")
    parser.add_argument("--sanitizer", choices=("auto", "required", "off"), default="auto",
                        help="Use UBSan when its compiler/runtime probe succeeds (default: auto).")
    parser.add_argument("--json-report", "--output", dest="json_report", type=Path,
                        help="Write validation results after all suites pass.")
    args = parser.parse_args()
    compiler = args.cxx or next((path for name in ("c++", "g++", "clang++", "zig")
                                if (path := shutil.which(name))), None)
    if not compiler:
        raise SystemExit("No host C++ compiler found. Set CXX or pass --cxx with GCC, Clang, or zig.")
    compiler_command = [compiler]
    if Path(compiler).stem.lower() == "zig" and "c++" not in args.cxx_arg:
        compiler_command.append("c++")
    compiler_command.extend(args.cxx_arg)
    version = run(compiler_command + ["--version"])
    require_success(version, "Compiler version query")
    project = Path(__file__).resolve().parents[1]
    flags = ["-std=c++11", "-Wall", "-Wextra", "-Werror", "-pedantic", "-g"]
    sanitizer_flags = ["-fsanitize=undefined", "-fno-sanitize-recover=all"]
    report: dict[str, dict[str, object]] = {}
    if args.json_report:
        args.json_report.unlink(missing_ok=True)
    with tempfile.TemporaryDirectory(prefix="tankweb-host-") as temporary:
        test_dir = Path(temporary)
        sanitizer = "none"
        sanitizer_note = "Disabled by --sanitizer off."
        if args.sanitizer != "off":
            probe = test_dir / "sanitizer_probe.cpp"
            probe.write_text("int main(int argc, char**) { volatile int divisor = argc; return 100 / divisor - 100; }\n", encoding="utf-8")
            executable = test_dir / ("sanitizer_probe.exe" if os.name == "nt" else "sanitizer_probe")
            probe_build = run(compiler_command + flags + sanitizer_flags + [str(probe), "-o", str(executable)])
            probe_run = run([str(executable)]) if probe_build.returncode == 0 else None
            if probe_run is not None and probe_run.returncode == 0:
                flags.extend(sanitizer_flags)
                sanitizer = "UBSan"
                sanitizer_note = "Compiler and runtime probe passed."
            else:
                failed = probe_build if probe_build.returncode else probe_run
                assert failed is not None
                sanitizer_note = (failed.stdout + failed.stderr).strip() or f"Probe returned {failed.returncode}."
                if args.sanitizer == "required":
                    raise SystemExit("UBSan probe failed:\n" + sanitizer_note)
                print("UBSan unavailable; running strict host tests without sanitizer:\n" + sanitizer_note)
        suites = [
            ("protocol_tests", [project / "src/protocol.cpp", project / "tests/protocol_tests.cpp"], False),
            ("backend_tests", [project / "src/protocol.cpp", project / "tests/backend_tests.cpp"], True),
            ("automatic_backend_tests", [project / "src/protocol.cpp", project / "tests/automatic_backend_tests.cpp"], True),
            ("display_temperature_tests", [project / "tests/display_temperature_tests.cpp"], False),
        ]
        for name, sources, needs_mocks in suites:
            executable = test_dir / (name + (".exe" if os.name == "nt" else ""))
            includes = ["-I", str(project / "tests/mocks")] if needs_mocks else []
            includes.extend(["-I", str(project / "include")])
            command = compiler_command + flags + includes + [str(path) for path in sources] + ["-o", str(executable)]
            compiled = run(command)
            require_success(compiled, name + " compilation")
            result = run([str(executable)])
            require_success(result, name)
            print(f"{name}: PASS ({sanitizer})")
            print(result.stdout, end="")
            if result.stderr:
                print(result.stderr, end="")
            report[name] = {"status": "pass", "sanitizer": sanitizer,
                            "sanitizer_note": sanitizer_note,
                            "compiler": version.stdout.splitlines()[0],
                            "compile_flags": flags, "stdout": result.stdout, "stderr": result.stderr}
    if args.json_report:
        args.json_report.parent.mkdir(parents=True, exist_ok=True)
        args.json_report.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
