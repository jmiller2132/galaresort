import type { MetadataRoute } from "next";
import { getCabins } from "@/lib/data";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://galaresort.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/about",
    "/stay",
    "/stay/cabins",
    "/stay/seasonal",
    "/stay/camping",
    "/bar-and-events",
    "/gallery",
    "/contact",
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const cabinPages = getCabins().map((cabin) => ({
    url: `${BASE_URL}/stay/cabins/${cabin.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...cabinPages];
}
