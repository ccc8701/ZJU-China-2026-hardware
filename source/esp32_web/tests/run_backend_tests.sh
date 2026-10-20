#!/bin/sh
set -eu
task_project_dir=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
task_test_dir=$(mktemp -d /tmp/tankweb-backend.XXXXXX)
trap 'rm -rf "$task_test_dir"' EXIT HUP INT TERM
for task_suite in backend_tests automatic_backend_tests; do
  ${CXX:-c++} -std=c++11 -Wall -Wextra -Werror -pedantic -fsanitize=undefined \
    -fno-sanitize-recover=all -g -I "$task_project_dir/tests/mocks" -I "$task_project_dir/include" \
    "$task_project_dir/src/protocol.cpp" "$task_project_dir/tests/$task_suite.cpp" \
    -o "$task_test_dir/$task_suite"
  "$task_test_dir/$task_suite"
done
