import HeroSection from "@/components/sections/HeroSection";
import IntroSection from "@/components/sections/IntroSection";
import FeaturedCabins from "@/components/sections/FeaturedCabins";
import AmenitiesStrip from "@/components/sections/AmenitiesStrip";
import UpcomingEvents from "@/components/sections/UpcomingEvents";
import CTABanner from "@/components/sections/CTABanner";

export default function Home() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <FeaturedCabins />
      <AmenitiesStrip />
      <UpcomingEvents />
      <CTABanner />
    </>
  );
}
