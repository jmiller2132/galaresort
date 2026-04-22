import Image from "next/image";
import AnimateIn from "@/components/ui/AnimateIn";
import SectionHeading from "@/components/ui/SectionHeading";
import type { GalaEvent } from "@/lib/data";
import { Calendar } from "lucide-react";

const categoryLabels: Record<string, string> = {
  "live-music": "Live Music",
  seasonal: "Seasonal Event",
  community: "Community",
  special: "Special Event",
};

function groupByMonth(events: GalaEvent[]) {
  const groups: Record<string, GalaEvent[]> = {};
  for (const event of events) {
    const d = new Date(event.date + "T12:00:00");
    const key = d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    (groups[key] ??= []).push(event);
  }
  return Object.entries(groups);
}

export default function EventCalendar({ events }: { events: GalaEvent[] }) {
  if (events.length === 0) return null;

  const grouped = groupByMonth(events);

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          label="Calendar"
          title="Upcoming Events"
          description="Specific dates and details are posted as they're confirmed. Check back regularly or follow us on social media."
        />

        <div className="space-y-12">
          {grouped.map(([month, monthEvents]) => (
            <div key={month}>
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-charcoal mb-6 border-b border-sand/50 pb-3">
                {month}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {monthEvents.map((event, i) => {
                  const d = new Date(event.date + "T12:00:00");
                  const dayNum = d.getDate();
                  const monthShort = d.toLocaleDateString("en-US", { month: "short" });
                  const weekday = d.toLocaleDateString("en-US", { weekday: "long" });

                  return (
                    <AnimateIn key={event.slug} delay={i * 0.08} className="h-full">
                      <div
                        className={`flex gap-5 rounded-lg p-5 border transition-shadow hover:shadow-md h-full ${
                          event.featured
                            ? "bg-river-blue-dark/[0.03] border-river-blue/20"
                            : "bg-cream border-sand/50"
                        }`}
                      >
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
                          {event.image && (
                            <div className="relative aspect-[3/1] rounded overflow-hidden mb-3">
                              <Image
                                src={event.image.src}
                                alt={event.image.alt}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                              />
                            </div>
                          )}
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h4 className="font-[family-name:var(--font-display)] text-lg font-bold text-charcoal">
                              {event.title}
                            </h4>
                            <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-river-blue bg-river-blue/10 px-2 py-0.5 rounded-full">
                              {categoryLabels[event.category] || event.category}
                            </span>
                            {event.featured && (
                              <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-wood bg-wood/10 px-2 py-0.5 rounded-full">
                                Featured
                              </span>
                            )}
                          </div>
                          {event.dateLabel && (
                            <p className="text-sm text-river-blue font-medium mb-1">
                              <Calendar size={12} className="inline mr-1 -mt-0.5" />
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
      </div>
    </section>
  );
}
