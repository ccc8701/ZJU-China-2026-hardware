PREFIX ?= arm-none-eabi-
CC = $(PREFIX)gcc
OBJCOPY = $(PREFIX)objcopy
SIZE = $(PREFIX)size
CFLAGS = -mcpu=cortex-m3 -mthumb -std=gnu11 -Os -g3 -ffreestanding -fno-builtin -ffunction-sections -fdata-sections -Wall -Wextra -Werror -Wno-override-init -Ifirmware/include
LDFLAGS = -mcpu=cortex-m3 -mthumb -nostdlib -Wl,--gc-sections -Wl,-Map=build/pcb21.map -Tfirmware/stm32f103c8.ld
SOURCES = $(wildcard firmware/src/*.c)
OBJECTS = $(patsubst firmware/src/%.c,build/%.o,$(SOURCES))

.PHONY: all clean test
all: build/pcb21.bin build/pcb21.hex
build:
	mkdir -p build
build/%.o: firmware/src/%.c | build
	$(CC) $(CFLAGS) -MMD -MP -c $< -o $@
build/pcb21.elf: $(OBJECTS) firmware/stm32f103c8.ld
	$(CC) $(LDFLAGS) $(OBJECTS) -lgcc -o $@
	$(SIZE) $@
build/pcb21.bin: build/pcb21.elf
	$(OBJCOPY) -O binary $< $@
build/pcb21.hex: build/pcb21.elf
	$(OBJCOPY) -O ihex $< $@
clean:
	rm -rf build
test: | build
	$(MAKE) -f tests/Makefile test
-include $(OBJECTS:.o=.d)
