import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.resolve(process.argv[2] || path.join(root, '../esp32_web/include/web_assets.h'));
const manifest = JSON.parse(await readFile(path.join(root, 'dist/asset-manifest.json'), 'utf8'));
const types = { 'index.html': 'text/html; charset=utf-8', 'style.css': 'text/css; charset=utf-8', 'app.js': 'application/javascript; charset=utf-8' };
const arrays = [];
const rows = [];
for (const asset of manifest.assets) {
  const data = await readFile(path.join(root, 'dist', `${asset.file}.gz`));
  if (createHash('sha256').update(data).digest('hex') !== asset.gzip_sha256) throw new Error(`Asset hash mismatch: ${asset.file}`);
  const name = 'asset_' + asset.file.replace(/[^a-z0-9]/gi, '_');
  const lines = [];
  for (let index = 0; index < data.length; index += 32) lines.push('  ' + [...data.subarray(index, index + 32)].map((v) => '0x' + v.toString(16).padStart(2, '0')).join(','));
  arrays.push(`static const uint8_t ${name}[] PROGMEM = {\n${lines.join(',\n')}\n};`);
  const etag = JSON.stringify('"' + asset.gzip_sha256.slice(0, 24) + '"');
  if (asset.file === 'index.html') rows.push(`  {"/", ${JSON.stringify(types[asset.file])}, ${name}, sizeof(${name}), ${etag}}`);
  rows.push(`  {${JSON.stringify(asset.path)}, ${JSON.stringify(types[asset.file])}, ${name}, sizeof(${name}), ${etag}}`);
}
const header = `// Generated from web/dist. All assets are gzip. Run npm run build first.\n#pragma once\n#include <Arduino.h>\nnamespace tankweb_assets {\nstruct Asset { const char *path; const char *mime; const uint8_t *data; size_t size; const char *etag; };\n${arrays.join('\n')}\nstatic const Asset assets[] = {\n${rows.join(',\n')}\n};\nstatic const size_t asset_count = sizeof(assets) / sizeof(assets[0]);\n} // namespace tankweb_assets\n`;
await mkdir(path.dirname(output), { recursive: true });
await writeFile(output, header);
console.log(JSON.stringify({ output, assets: manifest.assets.length, gzip_total_bytes: manifest.gzip_total_bytes, header_bytes: Buffer.byteLength(header) }));
