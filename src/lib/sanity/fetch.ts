/**
 * Sanity data-fetch helpers.
 *
 * Each function fetches live data from Sanity and maps it to the same
 * TypeScript shapes used throughout the app (defined in src/lib/data.ts).
 * If Sanity is unreachable or returns nothing the static fallback data is
 * returned so the site never goes blank.
 *
 * Cabin images are NOT uploaded by the seed script, so we fall back to the
 * local /public images for any cabin that has no Sanity-hosted images yet.
 */

import { client } from "@/sanity/lib/client";
import {
  cabins as staticCabins,
  events as staticEvents,
  galleryImages as staticGalleryImages,
} from "@/lib/data";
import type { Cabin, GalaEvent, GalleryImage } from "@/lib/data";
import {
  cabinsQuery,
  cabinBySlugQuery,
  eventsQuery,
  featuredEventsQuery,
  galleryQuery,
  announcementQuery,
  type SanityAnnouncement,
} from "./queries";

// ─── Internal Sanity response shapes ────────────────────────────────────────

type SanityImage = {
  asset?: { url: string };
  alt?: string;
};

type SanityCabin = {
  _id: string;
  name: string;
  slug: string;
  seasonType: "3-season" | "year-round";
  maxGuests: number;
  rateNightly: number;
  rateWeekly: number;
  minNights: number;
  dogFriendly: boolean;
  shortDescription: string;
  description: string;
  amenities: string[];
  images?: SanityImage[];
};

type SanityEvent = {
  _id: string;
  title: string;
  slug: string;
  date: string;
  endDate?: string;
  category: GalaEvent["category"];
  description: string;
  featured: boolean;
  link?: string;
  image?: SanityImage;
};

// ─── Mapping helpers ─────────────────────────────────────────────────────────

function mapCabin(doc: SanityCabin): Cabin {
  const localCabin = staticCabins.find((c) => c.slug === doc.slug);

  const sanityImages = (doc.images ?? [])
    .filter((img) => img.asset?.url)
    .map((img) => ({
      src: img.asset!.url,
      alt: img.alt ?? doc.name,
      width: 1200,
      height: 800,
    }));

  return {
    slug: doc.slug,
    name: doc.name,
    seasonType: doc.seasonType ?? "3-season",
    maxGuests: doc.maxGuests ?? 4,
    rateNightly: doc.rateNightly ?? 150,
    rateWeekly: doc.rateWeekly ?? 900,
    minNights: doc.minNights ?? 2,
    dogFriendly: doc.dogFriendly ?? false,
    shortDescription: doc.shortDescription ?? "",
    description: doc.description ?? "",
    amenities: doc.amenities ?? [],
    // Prefer Sanity-hosted images; fall back to local public folder images
    images: sanityImages.length > 0 ? sanityImages : (localCabin?.images ?? []),
  };
}

function mapEvent(doc: SanityEvent): GalaEvent {
  return {
    slug: doc.slug,
    title: doc.title,
    date: doc.date,
    endDate: doc.endDate,
    category: doc.category,
    description: doc.description,
    featured: doc.featured ?? false,
    link: doc.link,
    image: doc.image?.asset?.url
      ? {
          src: doc.image.asset.url,
          alt: doc.image.alt ?? doc.title,
          width: 1200,
          height: 800,
        }
      : undefined,
  };
}

function todayParam() {
  return new Date().toISOString().split("T")[0];
}

// ─── Public fetch functions ───────────────────────────────────────────────────

export async function fetchCabins(): Promise<Cabin[]> {
  try {
    const results: SanityCabin[] = await client.fetch(cabinsQuery, {}, { next: { revalidate: 60 } });
    if (!results?.length) return staticCabins;
    return results.map(mapCabin);
  } catch {
    return staticCabins;
  }
}

export async function fetchCabinBySlug(slug: string): Promise<Cabin | undefined> {
  try {
    const result: SanityCabin | null = await client.fetch(
      cabinBySlugQuery,
      { slug },
      { next: { revalidate: 60 } }
    );
    if (!result) return staticCabins.find((c) => c.slug === slug);
    return mapCabin(result);
  } catch {
    return staticCabins.find((c) => c.slug === slug);
  }
}

export async function fetchEvents(): Promise<GalaEvent[]> {
  try {
    const results: SanityEvent[] = await client.fetch(
      eventsQuery,
      { today: todayParam() },
      { next: { revalidate: 60 } }
    );
    if (!results?.length) return staticEvents.filter((e) => coalesce(e.endDate, e.date) >= todayParam());
    return results.map(mapEvent);
  } catch {
    return staticEvents.filter((e) => coalesce(e.endDate, e.date) >= todayParam());
  }
}

export async function fetchFeaturedEvents(): Promise<GalaEvent[]> {
  try {
    const results: SanityEvent[] = await client.fetch(
      featuredEventsQuery,
      { today: todayParam() },
      { next: { revalidate: 60 } }
    );
    if (!results?.length) return staticEvents.filter((e) => e.featured && coalesce(e.endDate, e.date) >= todayParam());
    return results.map(mapEvent);
  } catch {
    return staticEvents.filter((e) => e.featured && coalesce(e.endDate, e.date) >= todayParam());
  }
}

function coalesce(a: string | undefined, b: string): string {
  return a ?? b;
}

type SanityGalleryImage = {
  _id: string;
  image?: { asset?: { url: string } };
  alt: string;
  category: GalleryImage["category"];
};

export async function fetchAnnouncement(): Promise<SanityAnnouncement | null> {
  try {
    const result: SanityAnnouncement | null = await client.fetch(
      announcementQuery,
      {},
      { next: { revalidate: 60 } }
    );
    return result ?? null;
  } catch {
    return null;
  }
}

export async function fetchGalleryImages(): Promise<GalleryImage[]> {
  try {
    const results: SanityGalleryImage[] = await client.fetch(
      galleryQuery,
      {},
      { next: { revalidate: 60 } }
    );
    if (!results?.length) return staticGalleryImages;
    return results
      .filter((doc) => doc.image?.asset?.url)
      .map((doc) => ({
        src: doc.image!.asset!.url,
        alt: doc.alt,
        width: 1200,
        height: 800,
        category: doc.category,
      }));
  } catch {
    return staticGalleryImages;
  }
}
