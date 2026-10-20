HOST_CC ?= cc
HOST_FLAGS = -std=c11 -Wall -Wextra -Werror -fno-builtin -fsanitize=undefined -g -Ifirmware/include

.PHONY: test
test: build/test_util build/test_drivers build/test_bsp_uart build/test_app build/test_app_verified
	build/test_util
	build/test_drivers
	build/test_bsp_uart
	build/test_app
	build/test_app_verified

build:
	mkdir -p build
build/test_util: tests/test_util.c firmware/src/util.c firmware/include/util.h | build
	$(HOST_CC) $(HOST_FLAGS) tests/test_util.c firmware/src/util.c -o $@
build/test_drivers: tests/test_drivers.c firmware/src/drivers.c firmware/include/drivers.h | build
	$(HOST_CC) $(HOST_FLAGS) tests/test_drivers.c -o $@
build/test_bsp_uart: tests/test_bsp_uart.c firmware/src/bsp.c firmware/src/util.c firmware/include/bsp.h firmware/include/util.h | build
	$(HOST_CC) $(HOST_FLAGS) tests/test_bsp_uart.c firmware/src/util.c -o $@
APP_TEST_SOURCES = tests/test_app.c firmware/src/app.c firmware/src/util.c
APP_TEST_HEADERS = firmware/include/bsp.h firmware/include/drivers.h firmware/include/util.h firmware/include/board_config.h
build/test_app: $(APP_TEST_SOURCES) $(APP_TEST_HEADERS) | build
	$(HOST_CC) $(HOST_FLAGS) -DBOARD_RELAYS_VERIFIED=0 $(APP_TEST_SOURCES) -o $@
build/test_app_verified: $(APP_TEST_SOURCES) $(APP_TEST_HEADERS) | build
	$(HOST_CC) $(HOST_FLAGS) -DBOARD_RELAYS_VERIFIED=1 $(APP_TEST_SOURCES) -o $@
