# ZJU-China 2026 Hardware

Hardware design files and control software for the ZJU-China 2026 project.
Project overview: https://2026.igem.wiki/zju-china/hardware

| Folder | Contents |
| --- | --- |
| `source/esp32_web/` | ESP32-S3 control firmware, version 1.15 |
| `source/web/` | Web interface source and embedded web assets, version 1.15 |
| `source/stm32/` | Original STM32F103 firmware, Makefile and C tests |
| `pcb/` | Project-author-selected editable PCB project (.epro2) |
| `microfluidics-chip/` | Project-author-selected microfluidic chip files (.dxf and .sldprt) |
| `third-party-licenses/` | Existing dependency license notices |

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


## Software notes

Keep `esp32_web` and `web` next to each other. Build instructions are in their READMEs.
The ESP32 target is **`esp32_s3_n8r2_tank_web`**; specify it explicitly because the inherited default is an older board.

The v1.15 UI displays a modeled temperature. Automatic temperature control compares this same modeled value with the configured range. Raw AHT readings are retained for sensor validity, age and fault checks. The displayed value is not a direct measurement of the liquid temperature. Physical closed-loop liquid-temperature performance has not been validated by this source package.

The scope of this release is control software, PCB design and the microfluidic chip files selected by the project author. The outsourced exterior enclosure is not included.

## Licensing

A project-level license has not yet been selected. Public availability alone does not grant permission to reuse the team's original code or designs. Third-party components retain their existing licenses; see `third-party-licenses/` and `source/web/dist/app.js.LEGAL.txt`.

