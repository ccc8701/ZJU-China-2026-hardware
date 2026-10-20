# Tank control web interface — v1.15

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

Source for the interface served by the ESP32-S3. `dist/` contains the matching built assets.
Keep this folder beside `../esp32_web/`.

With Node.js and npm installed, run from this directory:

```sh
npm ci
npm test
npm run build
node scripts/export-esp-assets.mjs
```

The final command updates `../esp32_web/include/web_assets.h`; then compile the ESP32 firmware.
For a local preview, run `npm run dev`. A local preview does not establish a hardware connection.

The UI temperature is modeled; AUTO uses that same value. See the repository root README for the measurement limitation.
Dependency notices are in `../../third-party-licenses/` and `dist/app.js.LEGAL.txt`.

`http://127.0.0.1:8421/` is only the computer-local development preview when `npm run dev` is running; it is not the tank's device address.
