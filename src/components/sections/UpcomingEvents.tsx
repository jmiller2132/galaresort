import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimateIn from "@/components/ui/AnimateIn";
import Button from "@/components/ui/Button";
import { fetchFeaturedEvents } from "@/lib/sanity/fetch";
import { Calendar, Music } from "lucide-react";

export default async function UpcomingEvents() {
  const featured = (await fetchFeaturedEvents()).slice(0, 2);
  const hasEvents = featured.length > 0;

  return (
    <section className="py-20 lg:py-28 bg-river-blue-dark">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          label={hasEvents ? "What's Happening" : "Every Weekend"}
          title={hasEvents ? "Upcoming Events" : "Live Music on the River"}
          description={
            hasEvents
              ? "Live music, seasonal celebrations, and good times on the river. There's always something going on at The Gala."
              : "Cold drinks, great bands, and summer nights on the Wolf River. There's always a reason to come out to The Gala."
          }
          light
        />

        {hasEvents ? (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {featured.map((event, i) => (
              <AnimateIn key={event.slug} delay={i * 0.1}>
                <div className="group relative overflow-hidden rounded-lg bg-white/5 border border-white/10">
                  {event.image && (
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={event.image.src}
                        alt={event.image.alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-river-blue-dark/80 to-transparent pointer-events-none" />
                    </div>
                  )}
                  <div className="relative p-6">
                    <div className="flex items-center gap-2 text-wood-light text-sm mb-2">
                      <Calendar size={14} />
                      {event.dateLabel ?? new Date(event.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                    <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-white">
                      {event.title}
                    </h3>
                    <p className="mt-2 text-white/60 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        ) : (
          <AnimateIn className="mt-12">
            <div className="mx-auto max-w-2xl rounded-lg bg-white/5 border border-white/10 p-8 lg:p-10 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-wood/20 mb-5">
                <Music size={28} className="text-wood-light" />
              </div>
              <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-white mb-3">
                Live Music Every Sunday
              </p>
              <p className="text-white/70 text-lg leading-relaxed">
                Live music every Sunday, plus select Thursdays and Saturdays
                throughout the season. Bands are announced as
                they&apos;re confirmed — follow us on{" "}</p>
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
        )}

        <AnimateIn className="mt-12 text-center">
          <Button href="/bar-and-events" variant="secondary" size="lg">
            Bar &amp; Events
          </Button>
        </AnimateIn>
      </div>
    </section>
  );
}
