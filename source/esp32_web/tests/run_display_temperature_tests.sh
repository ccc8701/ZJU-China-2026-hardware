#!/bin/sh
set -eu
task_project_dir=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
task_test_exe=$(mktemp /tmp/tankweb-display-temperature.XXXXXX)
trap 'rm -f "$task_test_exe"' EXIT HUP INT TERM
${CXX:-c++} -std=c++11 -Wall -Wextra -Werror -pedantic -fsanitize=undefined \
  -fno-sanitize-recover=all -g -I "$task_project_dir/include" \
  "$task_project_dir/tests/display_temperature_tests.cpp" \
  -o "$task_test_exe"
"$task_test_exe"
