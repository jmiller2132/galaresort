import type { Metadata } from "next";
import GalleryContent from "./GalleryContent";
import { fetchGalleryImages } from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "See what life at The Gala looks like — waterfront views, cozy cabins, live music, and good times on the Wolf River.",
};

export default async function GalleryPage() {
  const images = await fetchGalleryImages();
  return <GalleryContent images={images} />;
}
