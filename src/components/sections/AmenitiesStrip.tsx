import AnimateIn from "@/components/ui/AnimateIn";
import type { HomePageContent } from "@/lib/content";
import {
  Anchor,
  Baby,
  Beer,
  Car,
  Dog,
  Fish,
  Flame,
  Home,
  Magnet,
  Music,
  Ship,
  Sun,
  Trees,
  Umbrella,
  Users2,
  UtensilsCrossed,
  Waves,
  Wifi,
} from "lucide-react";

const iconMap = {
  Anchor,
  Baby,
  Beer,
  Car,
  Dog,
  Fish,
  Flame,
  Home,
  Magnet,
  Music,
  Ship,
  Sun,
  Trees,
  Umbrella,
  Users2,
  UtensilsCrossed,
  Waves,
  Wifi,
} as const;

export default function AmenitiesStrip({ content }: { content: HomePageContent["amenities"] }) {
  return (
    <section className="py-16 bg-sand/40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <AnimateIn>
          <h3 className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-river-blue mb-10">
            {content.heading}
          </h3>
        </AnimateIn>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-6">
          {content.items.map((item, i) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <AnimateIn key={`${item.label}-${i}`} delay={i * 0.05}>
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="w-12 h-12 rounded-full bg-river-blue/10 flex items-center justify-center">
                    {Icon && <Icon size={22} className="text-river-blue" />}
                  </div>
                  <span className="text-xs font-medium text-slate">
                    {item.label}
                  </span>
                </div>
              </AnimateIn>
            );
          })}
        </div>
        <AnimateIn delay={0.3}>
          <p className="mt-10 text-center text-sm text-river-gray max-w-2xl mx-auto">
            {content.footnote}
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}
