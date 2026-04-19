#!/usr/bin/env node
// Emit .br and .gz siblings for every compressible file under .output/public/.
// nginx's `brotli_static on; gzip_static on;` will then serve the precompressed
// variant, avoiding runtime compression CPU.

import { createBrotliCompress, createGzip, constants as zlibConstants } from 'node:zlib'
import { createReadStream, createWriteStream, promises as fs } from 'node:fs'
import { pipeline } from 'node:stream/promises'
import { resolve, extname, join } from 'node:path'

const ROOT = resolve(process.cwd(), '.output/public')
const MIN_BYTES = 1024
const COMPRESSIBLE = new Set([
  '.html', '.css', '.js', '.mjs', '.cjs', '.json', '.xml',
  '.svg', '.txt', '.map', '.webmanifest', '.woff2', '.woff',
])

async function walk(dir, out = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      await walk(full, out)
    } else if (entry.isFile()) {
      out.push(full)
    }
  }
  return out
}

async function compressOne(file) {
  const ext = extname(file).toLowerCase()
  if (!COMPRESSIBLE.has(ext)) return null
  if (file.endsWith('.br') || file.endsWith('.gz')) return null

  const { size } = await fs.stat(file)
  if (size < MIN_BYTES) return null

  const brPath = `${file}.br`
  const gzPath = `${file}.gz`

  await Promise.all([
    pipeline(
      createReadStream(file),
      createBrotliCompress({
        params: {
          [zlibConstants.BROTLI_PARAM_QUALITY]: 11,
          [zlibConstants.BROTLI_PARAM_SIZE_HINT]: size,
        },
      }),
      createWriteStream(brPath),
    ),
    pipeline(
      createReadStream(file),
      createGzip({ level: 9 }),
      createWriteStream(gzPath),
    ),
  ])

  const [{ size: br }, { size: gz }] = await Promise.all([fs.stat(brPath), fs.stat(gzPath)])
  return { file, size, br, gz }
}

async function main() {
  try {
    await fs.access(ROOT)
  } catch {
    console.error(`[compress-output] ${ROOT} does not exist. Run \`vite build\` first.`)
    process.exit(1)
  }

  const files = await walk(ROOT)
  const results = await Promise.all(files.map(compressOne))
  const compressed = results.filter(Boolean)

  const totals = compressed.reduce(
    (acc, r) => ({ raw: acc.raw + r.size, br: acc.br + r.br, gz: acc.gz + r.gz }),
    { raw: 0, br: 0, gz: 0 },
  )

  const fmt = (n) => `${(n / 1024).toFixed(1)}kb`
  console.log(
    `[compress-output] Compressed ${compressed.length} files: ` +
      `raw=${fmt(totals.raw)} br=${fmt(totals.br)} gz=${fmt(totals.gz)}`,
  )
}

main().catch((err) => {
  console.error('[compress-output] failed:', err)
  process.exit(1)
})
