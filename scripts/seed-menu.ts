import { loadEnvConfig } from '@next/env'
import { resolve, join } from 'path'
import * as fs from 'fs'

const root = resolve(__dirname, '..')
loadEnvConfig(root)

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2026-04-22',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

async function main() {
  const id = 'menu-grill'
  const existing = await client.getDocument(id)
  if (existing) {
    console.log('Menu already seeded, skipping.')
    return
  }

  const localPath = join(root, 'public', 'images', 'menu', 'menu-2.png')
  const buffer = fs.readFileSync(localPath)

  const asset = await client.assets.upload('image', buffer, {
    filename: 'menu-2.png',
    contentType: 'image/png',
  })

  await client.createOrReplace({
    _id: id,
    _type: 'menu',
    title: 'Grill Menu',
    image: {
      _type: 'image',
      asset: { _type: 'reference', _ref: asset._id },
    },
    active: true,
    sortOrder: 1,
  })

  console.log('✓ Grill Menu seeded to Sanity')
}

main().catch((err) => {
  console.error('Seed failed:', err?.message || err)
  process.exit(1)
})
