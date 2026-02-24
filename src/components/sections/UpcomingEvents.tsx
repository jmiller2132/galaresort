import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimateIn from "@/components/ui/AnimateIn";
import Button from "@/components/ui/Button";
import { getFeaturedEvents } from "@/lib/data";
import { Calendar } from "lucide-react";

export default function UpcomingEvents() {
  const featured = getFeaturedEvents().slice(0, 2);

  return (
    <section className="py-20 lg:py-28 bg-river-blue-dark">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          label="What's Happening"
          title="Upcoming Events"
          description="Live music, seasonal celebrations, and good times on the river. There's always something going on at The Gala."
          light
        />

        {featured.length > 0 ? (
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
                      {new Date(event.date).toLocaleDateString("en-US", {
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
            <div className="mx-auto max-w-xl rounded-lg bg-white/5 border border-white/10 p-8 text-center">
              <p className="text-white/80 text-lg leading-relaxed">
                Live music and events are lining up for the season — check back
                soon or follow us on{" "}
                <a href="#" className="text-wood-light font-semibold hover:underline">
                  Facebook
                </a>{" "}
                for updates.
              </p>
            </div>
          </AnimateIn>
        )}

        <AnimateIn className="mt-12 text-center">
          <Button href="/bar-and-events" variant="secondary" size="lg">
            View All Events
          </Button>
        </AnimateIn>
      </div>
    </section>
  );
}
