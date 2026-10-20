# ESP32-S3 firmware — v1.15

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

Target: ESP32-S3 N8R2. Use an ASCII-only checkout path on Windows for the pinned compiler.
The matching web assets are already included in `include/web_assets.h`.

From this directory, with Python installed:

```sh
python -m pip install -r requirements-build.lock
python -m platformio run -e esp32_s3_n8r2_tank_web
```

If the web interface is edited, rebuild and export its assets first; see `../web/README.md`.
Host tests require a C++ compiler and can be run with `python tests/run_host_tests.py`.
The optional `build.py` also runs tests and exports images; pass `--environment esp32_s3_n8r2_tank_web` explicitly.
The commands above compile locally and do not flash a connected device.

The firmware includes default device access-point credentials in `src/main.cpp`; configure them for your own deployment.
For the modeled-temperature behavior, read the repository root README.
