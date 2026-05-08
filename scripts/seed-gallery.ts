/**
 * Seeds existing gallery images into Sanity by fetching them from the
 * live Vercel deployment and uploading as Sanity image assets.
 *
 * Usage: npm run seed-gallery
 */

import { loadEnvConfig } from '@next/env'
import { resolve } from 'path'

loadEnvConfig(resolve(__dirname, '..'))

import { createClient } from '@sanity/client'
import { galleryImages } from '../src/lib/data'

const VERCEL_URL = 'https://galaresort.vercel.app'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2026-04-22',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

async function main() {
  console.log(`Seeding ${galleryImages.length} gallery images into Sanity...\n`)

  for (const img of galleryImages) {
    const url = `${VERCEL_URL}${img.src}`
    const id = `gallery-${img.src.replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-').slice(0, 80)}`

    try {
      // Check if already exists
      const existing = await client.getDocument(id)
      if (existing) {
        console.log(`  - skipped (exists): ${img.alt.slice(0, 50)}`)
        continue
      }

      // Upload image asset from URL
      const asset = await client.assets.upload('image', url, {
        filename: img.src.split('/').pop(),
      })

      // Create gallery document
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
      console.log(`  ✗ failed: ${img.alt.slice(0, 50)} — ${msg}`)
    }
  }

  console.log('\nDone.')
}

main()
