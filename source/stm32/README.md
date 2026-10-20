# STM32 controller source

## Connecting to the tank control page

The default connection settings for the ESP32-S3 v1.15 firmware are:

| Setting | Value |
| --- | --- |
| Wi-Fi network name (SSID) | `TankLab-ESP32` |
| Default Wi-Fi password | `tanklab2026` |
| Tank control page | [http://192.168.4.1/](http://192.168.4.1/) |

1. Power on the tank system and wait for the ESP32 to start.
2. Connect your phone or computer to the Wi-Fi network above. If the operating system reports "No Internet", choose to stay connected.
3. Enter **http://192.168.4.1/** in the browser address bar. Use `http`, not `https`.
4. If the page does not open, check that the tank is powered on and your device is still connected to `TankLab-ESP32`.

The ESP32-S3 hosts the control page. The STM32 communicates with the ESP32 over UART and does not have a separate web address.
These settings match the firmware in this repository. If you change its access-point configuration, use your updated network name, password and address.

Original STM32F103 source from the supplied tank project. The application source and root Makefile are unchanged.

With GNU Make and the Arm GNU toolchain (`arm-none-eabi-gcc`) installed, run `make` in this directory.
Outputs: `build/pcb21.elf`, `build/pcb21.bin`, and `build/pcb21.hex`.
Use a POSIX-compatible shell such as Linux, WSL or MSYS2 for these Makefiles.

Run `make test` with a host C compiler to execute the C tests. In this publication copy, `tests/Makefile` only omits the Python test-discovery step and its unused interpreter variable. Those Python tests covered historical handoff/flashing tools not included in this repository. All five C test configurations are retained.

Board pin assignments and hardware verification flags are in `firmware/include/board_config.h`. This source package does not establish that it matches the binary currently installed on an STM32 device.
