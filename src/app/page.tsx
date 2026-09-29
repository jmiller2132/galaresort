import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import IntroSection from "@/components/sections/IntroSection";
import FeaturedCabins from "@/components/sections/FeaturedCabins";
import AmenitiesStrip from "@/components/sections/AmenitiesStrip";
import UpcomingEvents from "@/components/sections/UpcomingEvents";
import CTABanner from "@/components/sections/CTABanner";
import { fetchHomePage, fetchSiteSettings } from "@/lib/sanity/fetch";

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchHomePage();
  return { description: page.seoDescription };
}

export default async function Home() {
  const [page, settings] = await Promise.all([fetchHomePage(), fetchSiteSettings()]);

  return (
    <>
      <HeroSection content={page.hero} />
      <IntroSection content={page.intro} />
      <FeaturedCabins content={page.featuredCabins} />
      <AmenitiesStrip content={page.amenities} />
      <UpcomingEvents content={page.events} settings={settings} />
      <CTABanner content={page.cta} />
    </>
  );
}
