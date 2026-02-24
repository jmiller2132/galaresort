import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import AnimateIn from "@/components/ui/AnimateIn";
import InquiryDrawer from "@/components/forms/InquiryDrawer";
import { getCampingConfig, formatPrice } from "@/lib/data";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Camping",
  description:
    "RV and tent camping on the Wolf River. Water and electric hookups, 30/50 AMP, fire rings, clean showers, and resort amenities. From $45/night.",
};

export default function CampingPage() {
  const config = getCampingConfig();

  return (
    <>
      <PageHero
        title="Camping"
        subtitle="Pull up, plug in, and enjoy the river"
        image="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=1920&q=80"
      />

      <section className="py-20 bg-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimateIn>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-river-blue mb-3">
                Campground
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-charcoal">
                Camping on the Wolf River
              </h2>
              <p className="mt-6 text-river-gray text-lg leading-relaxed">
                {config.description}
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-5 border border-sand/50 text-center">
                  <p className="text-sm text-river-gray">Per Night</p>
                  <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-charcoal mt-1">
                    {formatPrice(config.rateNightly)} + tax
                  </p>
                </div>
                <div className="bg-white rounded-lg p-5 border border-sand/50 text-center">
                  <p className="text-sm text-river-gray">Per Week</p>
                  <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-charcoal mt-1">
                    {formatPrice(config.rateWeekly)} + tax
                  </p>
                </div>
              </div>

              <ul className="mt-8 space-y-3">
                {config.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-river-gray">
                    <Check size={16} className="text-forest flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <InquiryDrawer type="camping" />
              </div>

              <div className="mt-8 bg-sand/30 rounded-lg p-5 border border-sand/50">
                <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-charcoal mb-2">
                  Good to Know
                </h3>
                <ul className="space-y-1.5 text-sm text-river-gray">
                  <li>2-night minimum on weekends, 3 nights on holidays</li>
                  <li>Rates based on 2 adults and dependent minor children</li>
                  <li>One vehicle and one camping unit per site</li>
                  <li>Boats and trailers kept in parking area</li>
                  <li>Honey wagon service available</li>
                </ul>
              </div>
            </AnimateIn>

            <AnimateIn delay={0.2}>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src={config.image.src}
                  alt={config.image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>
    </>
  );
}
