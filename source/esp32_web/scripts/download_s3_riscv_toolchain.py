#!/usr/bin/env python3
"""Cache and hash-check the pinned official S3 auxiliary toolchain; do not install."""
from concurrent.futures import ThreadPoolExecutor, as_completed
import argparse
import hashlib
import os
from pathlib import Path
import time

import requests


URL = "https://dl.registry.ns3.platformio.org/tools/fd/a2/a018035b9f5443e70516d3cff5fbcbca72b77f53f6a64559793e44402e20/toolchain-riscv32-esp-darwin_x86_64-8.4.0+2021r2-patch5.tar.gz"
SIZE = 196616149
SHA256 = "d0cea8c9a5a1661e98156d907a3037f9c3f2f46419523be1ad2540c900a7637c"
BLOCK = 1024 * 1024
DIR = Path("/tmp/cyc-s3-riscv-official-toolchain")
ARCHIVE = "toolchain-riscv32-esp-darwin_x86_64-8.4.0+2021r2-patch5.tar.gz"


def fetch(index: int) -> Path:
    start, end = index * BLOCK, min(SIZE, (index + 1) * BLOCK) - 1
    path = DIR / f"range-{index:03d}"
    if path.exists() and path.stat().st_size == end - start + 1:
        return path
    for attempt in range(3):
        try:
            with requests.get(URL, headers={"Range": f"bytes={start}-{end}", "Accept-Encoding": "identity"},
                              stream=True, timeout=(15, 30)) as response:
                response.raise_for_status()
                if response.status_code != 206 or response.headers.get("Content-Range") != f"bytes {start}-{end}/{SIZE}":
                    raise RuntimeError(f"Invalid range response: {response.status_code} {response.headers.get('Content-Range')}")
                temporary = path.with_suffix(f".partial.{os.getpid()}")
                with temporary.open("wb") as output:
                    for chunk in response.iter_content(65536):
                        output.write(chunk)
                if temporary.stat().st_size != end - start + 1:
                    raise RuntimeError("Invalid byte range length")
                temporary.replace(path)
                return path
        except (requests.RequestException, RuntimeError):
            if attempt == 2:
                raise
            time.sleep(attempt + 1)
    raise RuntimeError("Byte range was not downloaded")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--supplement", action="store_true",
                        help="Fetch missing ranges in reverse order; the original process owns archive verification.")
    args = parser.parse_args()
    DIR.mkdir(exist_ok=True)
    blocks = (SIZE + BLOCK - 1) // BLOCK
    pending = list(range(blocks - 1, -1, -1) if args.supplement else range(blocks))
    for batch in range(3):
        failed = []
        with ThreadPoolExecutor(max_workers=16) as pool:
            futures = {pool.submit(fetch, index): index for index in pending}
            for completed, future in enumerate(as_completed(futures), 1):
                try:
                    future.result()
                    print(f"verified_range={completed}/{len(pending)} batch={batch + 1}", flush=True)
                except (requests.RequestException, RuntimeError, OSError) as error:
                    failed.append(futures[future])
                    print(f"retry_range={futures[future]} reason={error}", flush=True)
        pending = failed
        if not pending:
            break
    if pending:
        raise RuntimeError(f"Incomplete byte ranges after bounded retries: {pending}")
    if args.supplement:
        print("supplemental_ranges_complete; original process must verify the final archive SHA256", flush=True)
        return
    target = DIR / ARCHIVE
    with target.open("wb") as output:
        for index in range(blocks):
            output.write((DIR / f"range-{index:03d}").read_bytes())
    result = hashlib.sha256(target.read_bytes()).hexdigest()
    if target.stat().st_size != SIZE or result != SHA256:
        raise RuntimeError(f"Toolchain archive hash mismatch: {result}")
    print(f"verified_archive={target} bytes={SIZE} sha256={result}", flush=True)


if __name__ == "__main__":
    main()
