/**
 * Fetches Stitch HTML + screenshot URLs via @google/stitch-sdk, then downloads bytes to disk.
 * Requires: STITCH_API_KEY in the environment (never commit it).
 *
 * Usage: pnpm exec tsx scripts/fetch-stitch-assets.mts
 */
import 'dotenv/config'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { stitch } from '@google/stitch-sdk'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_ROOT = path.resolve(__dirname, '../design/stitch')

const PROJECT_ID = '5156473816810014207'
const SCREENS: { id: string; slug: string }[] = [
  { id: 'd517cfacea004c3ea473b23fba299131', slug: 'home-artisan-desktop' },
  { id: '3f0d87fe497943b783b512762898e308', slug: 'home-artisan-mobile' },
  /** Rólunk – Kiss Díszfaiskola (Personal Story) */
  { id: '9a9f33c1503744f5b892dff15bf98cbe', slug: 'rolunk-personal-story' },
  /** Növénykatalógus – Kiss Díszfaiskola */
  { id: 'f3dfc3ebc1a545b4b76927f2b6b6797c', slug: 'novenykatalogus' },
  { id: 'cc36f9e0c7e9420eb2a2d684bd0af0e5', slug: 'novenykatalogus-mobile' },
]

async function download(url: string, destPath: string): Promise<void> {
  const res = await fetch(url, { redirect: 'follow' })
  if (!res.ok) {
    throw new Error(`GET ${url} failed: ${res.status} ${res.statusText}`)
  }
  const buf = Buffer.from(await res.arrayBuffer())
  await writeFile(destPath, buf)
}

async function main(): Promise<void> {
  if (!process.env.STITCH_API_KEY?.trim()) {
    throw new Error('Set STITCH_API_KEY in the environment')
  }

  await mkdir(OUT_ROOT, { recursive: true })
  const project = stitch.project(PROJECT_ID)

  for (const { id, slug } of SCREENS) {
    const screen = await project.getScreen(id)
    const [htmlUrl, imageUrl] = await Promise.all([screen.getHtml(), screen.getImage()])

    const htmlPath = path.join(OUT_ROOT, `${slug}.html`)
    const ext = new URL(imageUrl).pathname.match(/\.(png|jpe?g|webp)$/i)?.[1] ?? 'png'
    const imagePath = path.join(OUT_ROOT, `${slug}.${ext}`)

    await download(htmlUrl, htmlPath)
    await download(imageUrl, imagePath)
    console.log('Wrote', htmlPath, imagePath)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
