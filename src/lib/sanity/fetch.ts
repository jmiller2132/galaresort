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
  seasonalSites as staticSeasonalSites,
  campingConfig as staticCampingConfig,
} from "@/lib/data";
import type { Cabin, GalaEvent, GalleryImage, SeasonalSite, CampingConfig } from "@/lib/data";
import * as content from "@/lib/content";
import { cache } from "react";
import { urlFor } from "@/sanity/lib/image";
import {
  cabinsQuery,
  cabinBySlugQuery,
  eventsQuery,
  featuredEventsQuery,
  galleryQuery,
  announcementQuery,
  barInfoQuery,
  menusQuery,
  seasonalSitesQuery,
  campsiteQuery,
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
  available?: boolean;
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
    rateNightly: doc.rateNightly ?? 250,
    rateWeekly: doc.rateWeekly ?? 1200,
    minNights: doc.minNights ?? 3,
    dogFriendly: doc.dogFriendly ?? false,
    shortDescription: doc.shortDescription ?? "",
    description: doc.description ?? "",
    amenities: doc.amenities ?? [],
    available: doc.available,
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
  categories?: GalleryImage["categories"];
};

export type BarInfo = {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
};

export type SanityMenu = {
  _id: string;
  title: string;
  image?: { asset?: { url: string } };
};

export async function fetchMenus(): Promise<SanityMenu[]> {
  try {
    const results: SanityMenu[] = await client.fetch(
      menusQuery,
      {},
      { next: { revalidate: 300 } }
    );
    return results ?? [];
  } catch {
    return [];
  }
}

export async function fetchBarInfo(): Promise<BarInfo> {
  try {
    const result: BarInfo | null = await client.fetch(
      barInfoQuery,
      {},
      { next: { revalidate: 300 } }
    );
    return result ?? {};
  } catch {
    return {};
  }
}

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
            categories: doc.categories ?? ["waterfront"],
          }));
  } catch {
    return staticGalleryImages;
  }
}

// ─── Seasonal Sites ───────────────────────────────────────────────────────────

type SanitySeasonalSite = {
  _id: string;
  type: string;
  name?: string;
  pricePerSeason?: number;
  description?: string;
  features?: string[];
  images?: SanityImage[];
};

export async function fetchSeasonalSites(): Promise<SeasonalSite[]> {
  try {
    const results: SanitySeasonalSite[] = await client.fetch(
      seasonalSitesQuery,
      {},
      { next: { revalidate: 300 } }
    );
    if (!results?.length) return staticSeasonalSites;
    return results.map((doc) => {
      const fallback = staticSeasonalSites.find((s) => s.slug === doc.type);
      const sanityImages = (doc.images ?? [])
        .filter((img) => img.asset?.url)
        .map((img) => ({ src: img.asset!.url, alt: img.alt ?? doc.name ?? '', width: 1200, height: 800 }));
      return {
        slug: doc.type,
        name: doc.name ?? fallback?.name ?? doc.type,
        pricePerSeason: doc.pricePerSeason ?? fallback?.pricePerSeason ?? 0,
        description: doc.description ?? fallback?.description ?? '',
        features: doc.features ?? fallback?.features ?? [],
        image: sanityImages[0] ?? fallback?.image ?? { src: '', alt: '', width: 1200, height: 800 },
      };
    });
  } catch {
    return staticSeasonalSites;
  }
}

// ─── Camping ──────────────────────────────────────────────────────────────────

type SanityCampsite = {
  _id: string;
  description?: string;
  hookups?: string;
  maxLength?: string;
  rateNightly?: number;
  rateWeekly?: number;
  features?: string[];
  images?: SanityImage[];
};

export async function fetchCampingConfig(): Promise<CampingConfig> {
  try {
    const result: SanityCampsite | null = await client.fetch(
      campsiteQuery,
      {},
      { next: { revalidate: 300 } }
    );
    if (!result) return staticCampingConfig;
    const sanityImages = (result.images ?? [])
      .filter((img) => img.asset?.url)
      .map((img) => ({ src: img.asset!.url, alt: img.alt ?? 'Camping', width: 1200, height: 800 }));
    return {
      rateNightly: result.rateNightly ?? staticCampingConfig.rateNightly,
      rateWeekly: result.rateWeekly ?? staticCampingConfig.rateWeekly,
      maxLength: result.maxLength ?? staticCampingConfig.maxLength,
      hookups: result.hookups ?? staticCampingConfig.hookups,
      description: result.description ?? staticCampingConfig.description,
      features: result.features ?? staticCampingConfig.features,
      image: sanityImages[0] ?? staticCampingConfig.image,
    };
  } catch {
    return staticCampingConfig;
  }
}

// ─── Site Settings & Page Copy ───────────────────────────────────────────────

type SanityImageRef = { asset?: { _ref?: string }; alt?: string };

function isImageContent(value: unknown): value is content.ImageContent {
  return typeof value === "object" && value !== null && "src" in value && "alt" in value;
}

/**
 * Overlays a Sanity document onto its fallback, field by field. Blank strings,
 * empty lists, and missing images keep the fallback value. Items inside a list
 * the editor has filled in are taken as-is (blank fields stay blank) so one
 * item never inherits another item's text.
 */
function mergeContent<T>(fallback: T, value: unknown, useFallback = true): T {
  if (typeof fallback === "string") {
    if (typeof value === "string" && value.trim()) return value as T;
    return (useFallback ? fallback : "") as T;
  }

  if (isImageContent(fallback)) {
    const image = value as SanityImageRef | undefined;
    if (image?.asset?._ref) return { src: urlFor(image).url(), alt: image.alt ?? "" } as T;
    return (useFallback ? fallback : { src: "", alt: "" }) as T;
  }

  if (Array.isArray(fallback)) {
    if (!Array.isArray(value) || value.length === 0) return (useFallback ? fallback : []) as T;
    const template = fallback[0];
    if (typeof template === "string") {
      return value.filter((item) => typeof item === "string" && item.trim()) as T;
    }
    return value.map((item) => mergeContent(template, item, false)) as T;
  }

  if (typeof fallback === "object" && fallback !== null) {
    const source = (typeof value === "object" && value !== null ? value : {}) as Record<string, unknown>;
    return Object.fromEntries(
      Object.entries(fallback).map(([key, fb]) => [key, mergeContent(fb, source[key], useFallback)])
    ) as T;
  }

  return (value ?? fallback) as T;
}

function singletonFetcher<T>(id: string, fallback: T) {
  return cache(async (): Promise<T> => {
    try {
      const doc = await client.fetch(`*[_id == $id][0]`, { id }, { next: { revalidate: 60 } });
      return doc ? mergeContent(fallback, doc) : fallback;
    } catch {
      return fallback;
    }
  });
}

export const fetchSiteSettings = singletonFetcher("siteSettings", content.siteSettings);
export const fetchHomePage = singletonFetcher("homePage", content.homePage);
export const fetchAboutPage = singletonFetcher("aboutPage", content.aboutPage);
export const fetchBarEventsPage = singletonFetcher("barEventsPage", content.barEventsPage);
export const fetchContactPage = singletonFetcher("contactPage", content.contactPage);
export const fetchStayPage = singletonFetcher("stayPage", content.stayPage);
export const fetchCabinsPage = singletonFetcher("cabinsPage", content.cabinsPage);
export const fetchSeasonalPage = singletonFetcher("seasonalPage", content.seasonalPage);
export const fetchCampingPage = singletonFetcher("campingPage", content.campingPage);
export const fetchMenuPage = singletonFetcher("menuPage", content.menuPage);
export const fetchGalleryPage = singletonFetcher("galleryPage", content.galleryPage);

