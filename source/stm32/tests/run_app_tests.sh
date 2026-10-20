#!/bin/sh
set -eu
test_root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
test_binary=$(mktemp "${TMPDIR:-/tmp}/cyc-app-test.XXXXXX")
trap 'rm -f "$test_binary"' EXIT HUP INT TERM
for test_verified in 0 1; do
    cc -std=c11 -Wall -Wextra -Werror -fsanitize=undefined -fno-sanitize-recover=all \
        -DBOARD_RELAYS_VERIFIED="$test_verified" \
        -I"$test_root/firmware/include" \
        "$test_root/firmware/src/app.c" "$test_root/firmware/src/util.c" \
        "$test_root/tests/test_app.c" -o "$test_binary"
    "$test_binary"
done
