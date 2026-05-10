import { loadEnvConfig } from '@next/env'
import { resolve } from 'path'

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
  const wb = await client.patch('cabin-white-bass').set({ available: false }).commit()
  console.log('✓ White Bass marked unavailable:', wb._id)

  const n = await client.patch('cabin-northern-pike').set({ name: 'Northern' }).commit()
  console.log('✓ Northern renamed:', n._id)
}

main().catch((err) => {
  console.error('Failed:', err?.message || err)
  process.exit(1)
})
