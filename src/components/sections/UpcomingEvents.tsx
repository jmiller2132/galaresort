import SectionHeading from "@/components/ui/SectionHeading";
import AnimateIn from "@/components/ui/AnimateIn";
import Button from "@/components/ui/Button";
import { Music } from "lucide-react";

export default function UpcomingEvents() {
  return (
    <section className="py-20 lg:py-28 bg-river-blue-dark">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          label="Every Weekend"
          title="Live Music on the River"
          description="Cold drinks, great bands, and summer nights on the Wolf River. There's always a reason to come out to The Gala."
          light
        />

        <AnimateIn className="mt-12">
          <div className="mx-auto max-w-2xl rounded-lg bg-white/5 border border-white/10 p-8 lg:p-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-wood/20 mb-5">
              <Music size={28} className="text-wood-light" />
            </div>
            <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-white mb-3">
              Friday · Saturday · Sunday
            </p>
            <p className="text-white/70 text-lg leading-relaxed">
              Live music every weekend starting now. Bands are announced as
              they&apos;re confirmed — follow us on{" "}
              <a href="https://www.facebook.com/galaresort/" target="_blank" rel="noopener noreferrer" className="text-wood-light font-semibold hover:underline">
                Facebook
              </a>{" "}
              and{" "}
              <a href="https://www.instagram.com/galaresort_fremont" target="_blank" rel="noopener noreferrer" className="text-wood-light font-semibold hover:underline">
                Instagram
              </a>{" "}
              to see who&apos;s playing each week.
            </p>
          </div>
        </AnimateIn>

        <AnimateIn className="mt-12 text-center">
          <Button href="/bar-and-events" variant="secondary" size="lg">
            Bar &amp; Events
          </Button>
        </AnimateIn>
      </div>
    </section>
  );
}
