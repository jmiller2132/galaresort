/**
 * Creates the Site Settings and page documents in Sanity with the current
 * site copy and photos from src/lib/content.ts.
 *
 * Safe to re-run: it only fills in fields that are empty, so edits made in
 * the Studio are never overwritten.
 *
 * Usage:  npm run seed-pages
 */

import { loadEnvConfig } from '@next/env'
import { createReadStream } from 'fs'
import { basename, resolve } from 'path'

loadEnvConfig(resolve(__dirname, '..'))

import { createClient } from '@sanity/client'
import * as content from '../src/lib/content'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-04-22',
  token: process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const documents: Record<string, unknown> = {
  siteSettings: content.siteSettings,
  homePage: content.homePage,
  aboutPage: content.aboutPage,
  barEventsPage: content.barEventsPage,
  contactPage: content.contactPage,
  stayPage: content.stayPage,
  cabinsPage: content.cabinsPage,
  seasonalPage: content.seasonalPage,
  campingPage: content.campingPage,
  menuPage: content.menuPage,
  galleryPage: content.galleryPage,
}

const arrayItemTypes: Record<string, string> = {
  'homePage.amenities.items': 'amenity',
  'aboutPage.values.items': 'value',
}

const uploadedAssets = new Map<string, string>()

async function uploadImage(src: string): Promise<string> {
  const cached = uploadedAssets.get(src)
  if (cached) return cached
  const file = resolve(__dirname, '..', 'public', src.replace(/^\//, ''))
  const asset = await client.assets.upload('image', createReadStream(file), { filename: basename(file) })
  console.log(`    ↑ uploaded ${src}`)
  uploadedAssets.set(src, asset._id)
  return asset._id
}

function isImage(value: unknown): value is content.ImageContent {
  return typeof value === 'object' && value !== null && 'src' in value && 'alt' in value
}

async function toSanityValue(value: unknown, path: string): Promise<unknown> {
  if (isImage(value)) {
    return {
      _type: 'image',
      asset: { _type: 'reference', _ref: await uploadImage(value.src) },
      alt: value.alt,
    }
  }
  if (Array.isArray(value)) {
    const itemType = arrayItemTypes[path]
    return value.map((item, i) =>
      typeof item === 'object' ? { _type: itemType, _key: `${itemType}${i}`, ...item } : item
    )
  }
  return value
}

type Op = { depth: number; path: string; value: unknown }

async function collectOps(obj: Record<string, unknown>, docId: string, prefix = '', depth = 0): Promise<Op[]> {
  const ops: Op[] = []
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key
    const isNestedObject = typeof value === 'object' && value !== null && !Array.isArray(value) && !isImage(value)
    if (isNestedObject) {
      ops.push({ depth, path, value: {} })
      ops.push(...(await collectOps(value as Record<string, unknown>, docId, path, depth + 1)))
    } else {
      ops.push({ depth, path, value: await toSanityValue(value, `${docId}.${path}`) })
    }
  }
  return ops
}

async function seed(id: string, defaults: Record<string, unknown>) {
  console.log(`\n${id}`)
  const existing = await client.getDocument(id)
  const tx = client.transaction().createIfNotExists({ _id: id, _type: id })

  if (existing && typeof existing.heroSubtitle === 'string') {
    tx.patch(id, (p) => p.setIfMissing({ hero: {} }).set({ 'hero.subtitle': existing.heroSubtitle }).unset(['heroSubtitle']))
  }

  const ops = await collectOps(defaults, id)
  const maxDepth = Math.max(...ops.map((op) => op.depth))
  for (let depth = 0; depth <= maxDepth; depth++) {
    const fields = Object.fromEntries(ops.filter((op) => op.depth === depth).map((op) => [op.path, op.value]))
    if (Object.keys(fields).length) tx.patch(id, (p) => p.setIfMissing(fields))
  }

  await tx.commit()
  console.log(`  ✓ ${existing ? 'filled in blank fields' : 'created'}`)
}

async function main() {
  for (const [id, defaults] of Object.entries(documents)) {
    await seed(id, defaults as Record<string, unknown>)
  }
  console.log('\nDone.')
}

main().catch((err) => {
  console.error('Seed failed:', err?.message || err)
  process.exit(1)
})
