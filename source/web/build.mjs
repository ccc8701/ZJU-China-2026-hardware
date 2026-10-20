import { build } from 'esbuild';
import { mkdir, readFile, writeFile, copyFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { UI_VERSION } from './version.js';

const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, 'dist');
await mkdir(dist, { recursive: true });
const thirdParty = await Promise.all(['three/LICENSE', 'lucide/LICENSE'].map((file) => readFile(path.join(root, 'node_modules', file), 'utf8')));
const licenseBanner = '/*! Third-party notices: Three.js (MIT), Lucide (ISC)\n' + thirdParty.join('\n\n') + '\n*/';
await build({ entryPoints: [path.join(root, 'app.js')], bundle: true, minify: true, format: 'esm', target: ['es2020'], outfile: path.join(dist, 'app.js'), legalComments: 'none', banner: { js: licenseBanner } });
await copyFile(path.join(root, 'style.css'), path.join(dist, 'style.css'));
// An HTML refresh always fetches matching JS/CSS even across firmware upgrades.
let html = await readFile(path.join(root, 'index.html'), 'utf8');
for (const file of ['app.js', 'style.css']) {
  const hash = createHash('sha256').update(await readFile(path.join(dist, file))).digest('hex').slice(0, 16);
  html = html.replace(`/${file}"`, `/${file}?v=${hash}"`);
}
await writeFile(path.join(dist, 'index.html'), html);
const assets = [];
for (const file of ['index.html', 'style.css', 'app.js']) {
  const content = await readFile(path.join(dist, file));
  const compressed = gzipSync(content, { level: 9, mtime: 0 });
  await writeFile(path.join(dist, `${file}.gz`), compressed);
  assets.push({ path: `/${file}`, file, bytes: content.length, gzip_bytes: compressed.length, sha256: createHash('sha256').update(content).digest('hex'), gzip_sha256: createHash('sha256').update(compressed).digest('hex') });
}
const manifest = { version: UI_VERSION, built: new Date().toISOString(), assets, gzip_total_bytes: assets.reduce((s, a) => s + a.gzip_bytes, 0), dependencies: { three: '0.180.0', lucide: '0.468.0', esbuild: '0.25.10' }, source_urls: ['https://threejs.org/', 'https://lucide.dev/', 'https://esbuild.github.io/'], no_external_runtime_requests: true };
if (manifest.gzip_total_bytes > 450 * 1024) throw new Error(`ESP asset budget exceeded: ${manifest.gzip_total_bytes}`);
await writeFile(path.join(dist, 'asset-manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log(JSON.stringify(manifest, null, 2));
