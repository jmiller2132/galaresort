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

function formatEventDate(event: { date: string; dateLabel?: string }) {
  return event.dateLabel ?? new Date(event.date).toLocaleDateString("en-US", {
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
        subtitle="Cold drinks, live music, and summer nights on the river"
        image="/images/exterior/bar-aerial-patio-river.jpeg"
      />

      {/* Bar Section */}
      <section className="py-20 bg-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimateIn>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-river-blue mb-3">
                The Social Hub
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-charcoal">
                Right on the Water
              </h2>
              <p className="mt-6 text-river-gray text-lg leading-relaxed">
                The Gala bar sits right on the Wolf River — a tiki bar, a
                two-tier outdoor patio, and a fully remodeled main house that
                comes alive on summer nights. Boaters pull up to the dock,
                the patio fills up, drinks are cold, and the music carries
                across the water. It&apos;s the kind of place where a quick
                drink turns into dancing, new friends, and one of those
                nights you talk about all winter.
              </p>
              <p className="mt-4 text-river-gray leading-relaxed">
                Fresh pizza and bar favorites are on the menu. Open Tuesday
                through Sunday, 11 AM to close. Closed Mondays. Call{" "}
                <a href="tel:+19204462423" className="text-river-blue font-medium hover:underline">
                  (920) 446-2423
                </a>{" "}
                for details.
              </p>
              <div className="mt-6 space-y-3 text-river-gray">
                <div className="flex items-center gap-2">
                  <Music size={16} className="text-river-blue" />
                  Live music weekends
                </div>
                <div className="flex items-center gap-2">
                  <Sun size={16} className="text-river-blue" />
                  Tiki bar &amp; two-tier patio on the water
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
                  src="/images/exterior/bar-aerial-patio-closeup.jpeg"
                  alt="Closeup aerial view of the Gala Resort bar patio"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={85}
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
                <AnimateIn key={event.slug} delay={i * 0.1} className="h-full">
                  <div className="relative overflow-hidden rounded-lg bg-white/5 border border-white/10 h-full">
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
                        {formatEventDate(event)}
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
                <p className="font-[family-name:var(--font-display)] text-xl font-bold text-white mb-3">
                  Live Music &amp; Events Coming Soon
                </p>
                <p className="text-white/70 leading-relaxed">
                  Full schedule to be announced. Follow us on{" "}
                  <a href="https://www.facebook.com/galaresort/" target="_blank" rel="noopener noreferrer" className="text-wood-light font-semibold hover:underline">
                    Facebook
                  </a>{" "}
                  and{" "}
                  <a href="https://www.instagram.com/galaresort_fremont" target="_blank" rel="noopener noreferrer" className="text-wood-light font-semibold hover:underline">
                    Instagram
                  </a>{" "}
                  to be the first to know.
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
            description="Live music every Friday, Saturday, and Sunday starting April 27 — bands announced as they are confirmed. Follow us on Facebook and Instagram for updates."
          />
          {allEvents.length > 0 ? (
            <div className="mt-12 space-y-12">
              {Object.entries(
                allEvents.reduce<Record<string, typeof allEvents>>((groups, event) => {
                  const d = new Date(event.date + "T12:00:00");
                  const key = d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
                  (groups[key] ??= []).push(event);
                  return groups;
                }, {})
              ).map(([month, events]) => (
                <div key={month}>
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-charcoal mb-6 border-b border-sand/50 pb-3">
                    {month}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {events.map((event, i) => {
                      const d = new Date(event.date + "T12:00:00");
                      const dayNum = d.getDate();
                      const monthShort = d.toLocaleDateString("en-US", { month: "short" });
                      const weekday = d.toLocaleDateString("en-US", { weekday: "long" });
                      return (
                        <AnimateIn key={event.slug} delay={i * 0.08} className="h-full">
                          <div className="flex gap-5 bg-cream rounded-lg p-5 border border-sand/50 hover:shadow-md transition-shadow h-full">
                            <div className="flex-shrink-0 w-16 text-center">
                              <p className="text-xs font-semibold uppercase tracking-wider text-river-blue">
                                {monthShort}
                              </p>
                              <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-charcoal leading-tight">
                                {dayNum}
                              </p>
                              <p className="text-xs text-river-gray mt-0.5">
                                {weekday}
                              </p>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap mb-1">
                                <h4 className="font-[family-name:var(--font-display)] text-lg font-bold text-charcoal">
                                  {event.title}
                                </h4>
                                <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-river-blue bg-river-blue/10 px-2 py-0.5 rounded-full">
                                  {categoryLabels[event.category] || event.category}
                                </span>
                              </div>
                              {event.dateLabel && (
                                <p className="text-sm text-river-blue font-medium mb-1">
                                  {event.dateLabel}
                                </p>
                              )}
                              <p className="text-sm text-river-gray leading-relaxed">
                                {event.description}
                              </p>
                            </div>
                          </div>
                        </AnimateIn>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <AnimateIn className="mt-12">
              <div className="mx-auto max-w-xl rounded-lg bg-cream p-8 text-center border border-sand/50">
                <p className="text-river-gray text-lg leading-relaxed">
                  Event dates and details will be posted here as they&apos;re
                  confirmed. Follow us on{" "}
                  <a href="https://www.facebook.com/galaresort/" target="_blank" rel="noopener noreferrer" className="text-river-blue font-semibold hover:underline">
                    Facebook
                  </a>{" "}
                  and{" "}
                  <a href="https://www.instagram.com/galaresort_fremont" target="_blank" rel="noopener noreferrer" className="text-river-blue font-semibold hover:underline">
                    Instagram
                  </a>{" "}
                  for the latest updates.
                </p>
              </div>
            </AnimateIn>
          )}

          <AnimateIn className="mt-12 text-center">
            <p className="text-river-gray">
              Want to know about upcoming events? Follow us on{" "}
              <a href="https://www.facebook.com/galaresort/" target="_blank" rel="noopener noreferrer" className="text-river-blue font-semibold hover:underline">
                Facebook
              </a>{" "}
              and{" "}
              <a href="https://www.instagram.com/galaresort_fremont" target="_blank" rel="noopener noreferrer" className="text-river-blue font-semibold hover:underline">
                Instagram
              </a>{" "}
              for the latest updates.
            </p>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
