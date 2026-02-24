import AnimateIn from "@/components/ui/AnimateIn";
import { Anchor, Ship, Beer, Music, Sun, Umbrella, Baby, Target } from "lucide-react";

const amenityIcons = [
  { icon: Anchor, label: "Boat Launch" },
  { icon: Ship, label: "Private Docks" },
  { icon: Beer, label: "Riverfront Bar" },
  { icon: Music, label: "Live Music" },
  { icon: Sun, label: "Outdoor Patio" },
  { icon: Umbrella, label: "Small Beach" },
  { icon: Baby, label: "Kids Park" },
  { icon: Target, label: "Horseshoes" },
];

export default function AmenitiesStrip() {
  return (
    <section className="py-16 bg-sand/40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <AnimateIn>
          <h3 className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-river-blue mb-10">
            Resort Amenities
          </h3>
        </AnimateIn>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6">
          {amenityIcons.map((item, i) => (
            <AnimateIn key={item.label} delay={i * 0.05}>
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="w-12 h-12 rounded-full bg-river-blue/10 flex items-center justify-center">
                  <item.icon size={22} className="text-river-blue" />
                </div>
                <span className="text-xs font-medium text-slate">
                  {item.label}
                </span>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
