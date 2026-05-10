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
  const docs = await client.fetch('*[_type == "cabin"] { _id, name, "slug": slug.current }')
  console.log(JSON.stringify(docs, null, 2))
}

main().catch(console.error)
