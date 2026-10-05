import { build } from 'esbuild'
import { cp, mkdir, rm } from 'node:fs/promises'
import { join } from 'node:path'

await rm('dist', { recursive: true, force: true })
await mkdir('dist', { recursive: true })
await build({ entryPoints: ['src/main.tsx'], bundle: true, format: 'esm', platform: 'browser', outdir: 'dist/assets', minify: true, sourcemap: true, loader: { '.tsx': 'tsx', '.css': 'css' } })
await cp('index.html', join('dist', 'index.html'))
await cp('public', join('dist', 'public'), { recursive: true })
await cp('public/buzzentlogo.jpeg', join('dist', 'buzzentlogo.jpeg'))
const html = await (await import('node:fs/promises')).readFile('dist/index.html', 'utf8')
await (await import('node:fs/promises')).writeFile('dist/index.html', html.replace('/src/main.tsx', '/assets/main.js'))
console.log('Production bundle generated in dist/')
