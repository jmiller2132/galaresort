/**
 * Seeds existing gallery images into Sanity by reading local files from disk
 * and uploading them as Sanity image assets.
 *
 * Usage: npm run seed-gallery
 */

import { loadEnvConfig } from '@next/env'
import { resolve, join } from 'path'
import * as fs from 'fs'

const root = resolve(__dirname, '..')
loadEnvConfig(root)

import { createClient } from '@sanity/client'
import { galleryImages } from '../src/lib/data'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2026-04-22',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

function mimeType(filename: string): string {
  const ext = filename.toLowerCase().split('.').pop()
  if (ext === 'jpg' || ext === 'jpeg') return 'image/jpeg'
  if (ext === 'png') return 'image/png'
  if (ext === 'webp') return 'image/webp'
  return 'image/jpeg'
}

async function main() {
  console.log(`Seeding ${galleryImages.length} gallery images into Sanity...\n`)

  for (const img of galleryImages) {
    const localPath = join(root, 'public', img.src)
    const filename = img.src.split('/').pop() ?? 'image.jpg'
    const id = `gallery-${img.src.replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').slice(0, 80)}`

    try {
      // Skip if already exists in Sanity
      const existing = await client.getDocument(id)
      if (existing) {
        console.log(`  - skipped (exists): ${img.alt.slice(0, 60)}`)
        continue
      }

      if (!fs.existsSync(localPath)) {
        console.log(`  ✗ file not found: ${localPath}`)
        continue
      }

      const buffer = fs.readFileSync(localPath)
      const mime = mimeType(filename)

      const asset = await client.assets.upload('image', buffer, {
        filename,
        contentType: mime,
      })

      await client.createOrReplace({
        _id: id,
        _type: 'galleryImage',
        image: {
          _type: 'image',
          asset: { _type: 'reference', _ref: asset._id },
        },
        alt: img.alt,
        category: img.category,
      })

      console.log(`  ✓ ${img.alt.slice(0, 60)}`)
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e)
      console.log(`  ✗ failed: ${img.alt.slice(0, 60)} — ${msg}`)
    }
  }

  console.log('\nDone.')
}

main()
