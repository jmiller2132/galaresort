import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimateIn from "@/components/ui/AnimateIn";
import { getEvents, getFeaturedEvents } from "@/lib/data";
import { Calendar, Music, Sun, UtensilsCrossed } from "lucide-react";

export const metadata: Metadata = {
  title: "Bar & Events",
  description:
    "Riverfront bar with live music, cold drinks, and fresh food. Check our events calendar for what's happening at The Gala.",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

const categoryLabels: Record<string, string> = {
  "live-music": "Live Music",
  seasonal: "Seasonal Event",
  community: "Community",
  special: "Special Event",
};

export default function BarAndEventsPage() {
  const featuredEvents = getFeaturedEvents();
  const allEvents = getEvents();

  return (
    <>
      <PageHero
        title="Bar & Events"
        subtitle="Cold drinks, live music, and good times on the river"
        image="https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1920&q=80"
      />

      {/* Bar Section */}
      <section className="py-20 bg-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimateIn>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-river-blue mb-3">
                The Bar & Lounge
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-charcoal">
                Right on the Water
              </h2>
              <p className="mt-6 text-river-gray text-lg leading-relaxed">
                The Gala bar sits right on the Wolf River with a full outdoor
                patio overlooking the water. Grab a cold one, catch a game, or
                settle in for live music on a Saturday night. The bar and main
                house are currently undergoing a full remodel — inside and
                out — so expect it to be better than ever.
              </p>
              <p className="mt-4 text-river-gray leading-relaxed">
                Fresh pizza and bar favorites are on the menu, with more options
                coming as we grow. Open 7 days a week, 11 AM to close.
              </p>
              <div className="mt-6 space-y-3 text-river-gray">
                <div className="flex items-center gap-2">
                  <Music size={16} className="text-river-blue" />
                  Live music weekends
                </div>
                <div className="flex items-center gap-2">
                  <Sun size={16} className="text-river-blue" />
                  Outdoor patio on the water
                </div>
                <div className="flex items-center gap-2">
                  <UtensilsCrossed size={16} className="text-river-blue" />
                  Full bar with food
                </div>
              </div>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1436076863939-06870fe779c2?w=800&q=80"
                  alt="Cold beers on the bar at The Gala"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-20 bg-river-blue-dark">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            label="Don't Miss"
            title="Featured Events"
            light
          />
          {featuredEvents.length > 0 ? (
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredEvents.map((event, i) => (
                <AnimateIn key={event.slug} delay={i * 0.1}>
                  <div className="relative overflow-hidden rounded-lg bg-white/5 border border-white/10">
                    {event.image && (
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <Image
                          src={event.image.src}
                          alt={event.image.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-river-blue-dark/80 to-transparent pointer-events-none" />
                        <div className="absolute top-3 left-3 bg-wood text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md">
                          Featured
                        </div>
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-wood-light text-sm mb-2">
                        <Calendar size={14} />
                        {formatDate(event.date)}
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
                  Live music and events are lining up for the season — check
                  back soon or follow us on{" "}
                  <a href="#" className="text-wood-light font-semibold hover:underline">
                    Facebook
                  </a>{" "}
                  for updates.
                </p>
              </div>
            </AnimateIn>
          )}
        </div>
      </section>

      {/* All Events Calendar */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            label="Calendar"
            title="All Upcoming Events"
            description="Check back regularly — we're always adding new events, live music, and seasonal celebrations."
          />
          {allEvents.length > 0 ? (
            <div className="mt-12 space-y-4">
              {allEvents.map((event, i) => (
                <AnimateIn key={event.slug} delay={i * 0.06}>
                  <div className="flex flex-col md:flex-row gap-6 bg-cream rounded-lg p-6 border border-sand/50">
                    <div className="md:w-48 flex-shrink-0">
                      <p className="text-sm font-semibold text-river-blue">
                        {formatDate(event.date)}
                      </p>
                      <span className="inline-block mt-1 text-xs font-medium uppercase tracking-wider text-river-gray bg-white px-2 py-0.5 rounded">
                        {categoryLabels[event.category] || event.category}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-charcoal">
                        {event.title}
                      </h3>
                      <p className="mt-1 text-river-gray leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                    {event.featured && (
                      <div className="flex-shrink-0 self-start">
                        <span className="bg-wood/10 text-wood text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>
                </AnimateIn>
              ))}
            </div>
          ) : (
            <AnimateIn className="mt-12">
              <div className="mx-auto max-w-xl rounded-lg bg-cream p-8 text-center border border-sand/50">
                <p className="text-river-gray text-lg leading-relaxed">
                  Live music and events are lining up for the season — check
                  back soon or follow us on{" "}
                  <a href="#" className="text-river-blue font-semibold hover:underline">
                    Facebook
                  </a>{" "}
                  for updates.
                </p>
              </div>
            </AnimateIn>
          )}

          <AnimateIn className="mt-12 text-center">
            <p className="text-river-gray">
              Want to know about upcoming events?{" "}
              <a href="#" className="text-river-blue font-semibold hover:underline">
                Follow us on Facebook
              </a>{" "}
              for the latest updates.
            </p>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
