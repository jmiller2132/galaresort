/**
 * One-time (idempotent) seed script for the Sanity dataset.
 *
 * Reads content from src/lib/data.ts and writes it to Sanity using
 * deterministic document IDs so re-runs are safe (createOrReplace).
 *
 * Requires a Sanity token with write access in env:
 *   SANITY_API_WRITE_TOKEN=<token>   (preferred)
 *   or SANITY_API_TOKEN=<token>
 *
 * Usage:  npm run seed-sanity
 */

import { loadEnvConfig } from '@next/env'
import { resolve } from 'path'

loadEnvConfig(resolve(__dirname, '..'))

import { createClient } from '@sanity/client'
import { cabins, events } from '../src/lib/data'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-04-22'
const token =
  process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN

if (!projectId || !dataset) {
  console.error(
    'Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET in .env.local'
  )
  process.exit(1)
}

if (!token) {
  console.error(
    '\nMissing SANITY_API_WRITE_TOKEN.\n\n' +
      'Create a token with Editor/Developer permissions:\n' +
      `  1. Go to https://www.sanity.io/manage/project/${projectId}/api\n` +
      '  2. Tokens → Add API token → name it "Seed script" → Permissions: Editor\n' +
      '  3. Copy the token and add to .env.local:\n' +
      '     SANITY_API_WRITE_TOKEN=<paste-token-here>\n' +
      '  4. Re-run: npm run seed-sanity\n'
  )
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
})

type SanityDoc = Record<string, unknown> & { _id: string; _type: string }

async function upsert(doc: SanityDoc, label: string) {
  await client.createOrReplace(doc)
  console.log(`  ✓ ${label}`)
}

async function seedBarInfo() {
  console.log('\nBar Info')
  await upsert(
    {
      _id: 'barInfo-default',
      _type: 'barInfo',
      tuesday: '11 AM to close',
      wednesday: '11 AM to close',
      thursday: '11 AM to close',
      friday: '11 AM to close',
      saturday: '11 AM to close',
      sunday: '11 AM to close',
      foodNote: 'Fresh pizza and bar favorites',
    },
    'barInfo-default'
  )
}

async function seedCabins() {
  console.log(`\nCabins (${cabins.length})`)
  for (const cabin of cabins) {
    await upsert(
      {
        _id: `cabin-${cabin.slug}`,
        _type: 'cabin',
        name: cabin.name,
        slug: { _type: 'slug', current: cabin.slug },
        seasonType: cabin.seasonType,
        maxGuests: cabin.maxGuests,
        rateNightly: cabin.rateNightly,
        rateWeekly: cabin.rateWeekly,
        minNights: cabin.minNights,
        dogFriendly: cabin.dogFriendly,
        shortDescription: cabin.shortDescription,
        description: cabin.description,
        amenities: cabin.amenities,
      },
      `${cabin.name} (${cabin.slug})`
    )
  }
}

async function seedEvents() {
  console.log(`\nEvents (${events.length})`)
  for (const event of events) {
    await upsert(
      {
        _id: `event-${event.slug}`,
        _type: 'event',
        title: event.title,
        slug: { _type: 'slug', current: event.slug },
        date: event.date,
        ...(event.endDate ? { endDate: event.endDate } : {}),
        category: event.category,
        description: event.description,
        featured: event.featured,
      },
      `${event.title} — ${event.date}`
    )
  }
}

async function seedAnnouncement() {
  console.log('\nAnnouncement')
  await upsert(
    {
      _id: 'announcement-welcome',
      _type: 'announcement',
      text: 'Welcome to the new Gala Resort website — reimagined from the docks up. Come see what we are building on the Wolf River.',
      active: true,
    },
    'announcement-welcome'
  )
}

async function main() {
  console.log(`Seeding Sanity project "${projectId}" / dataset "${dataset}"`)
  await seedBarInfo()
  await seedCabins()
  await seedEvents()
  await seedAnnouncement()
  console.log('\nDone.')
}

main().catch((err) => {
  console.error('\nSeed failed:', err?.message || err)
  process.exit(1)
})
