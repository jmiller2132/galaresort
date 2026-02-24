/**
 * Sanity client placeholder.
 * Replace projectId and dataset once the Sanity project is created via `npx sanity@latest init`.
 */

const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const sanityConfig = {
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: true,
};
