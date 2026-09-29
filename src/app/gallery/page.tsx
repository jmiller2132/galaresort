import type { Metadata } from "next";
import GalleryContent from "./GalleryContent";
import { fetchGalleryImages, fetchGalleryPage, fetchSiteSettings } from "@/lib/sanity/fetch";

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchGalleryPage();
  return { title: page.hero.title, description: page.seoDescription };
}

export default async function GalleryPage() {
  const [images, page, settings] = await Promise.all([fetchGalleryImages(), fetchGalleryPage(), fetchSiteSettings()]);
  const shuffled = [...images].sort(() => Math.random() - 0.5);
  return (
    <GalleryContent
      images={shuffled}
      hero={page.hero}
      footnote={page.footnote}
      facebookUrl={settings.facebookUrl}
      instagramUrl={settings.instagramUrl}
    />
  );
}
