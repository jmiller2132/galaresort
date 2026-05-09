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
    "RV and tent camping on the Wolf River. Water and electric hookups, fire rings, and resort amenities. From $55/night.",
};

export default function CampingPage() {
  const config = getCampingConfig();

  return (
    <>
      <PageHero
        title="Camping"
        subtitle="Pull up, plug in, and enjoy the river"
        image="/images/exterior/DJI_20260304112737_0081_D.jpg"
      />

      <section className="py-20 bg-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimateIn>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-river-blue mb-3">
                On the Water
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

              <p className="mt-8 text-sm text-river-gray">
                2-night minimum on weekends, 3 nights on holidays. Call the RV Park office at{" "}
                <a href="tel:+19204463222" className="text-river-blue font-medium hover:underline">
                  (920) 446-3222
                </a>{" "}
                or <a href="/contact?type=camping" className="text-river-blue font-medium hover:underline">send us a message</a> — we&apos;re happy to help.
              </p>
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
