import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import AnimateIn from "@/components/ui/AnimateIn";
import Button from "@/components/ui/Button";
import { Hammer, Trees, Heart, Eye } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "New ownership, same river, better than ever. We're investing in every part of this property to build the best riverfront community on the Wolf River.",
};

const improvements = [
  "Brand new docks replacing all cabin-assigned docks",
  "350 feet of new seawall/wharf this spring, another 350 feet in the fall",
  "Full remodel of the bar & main house — inside and out",
  "Road improvements throughout the property",
  "Every cabin cleaned, repaired, and updated before going into rotation",
];

const values = [
  {
    icon: Hammer,
    title: "Invested & Improving",
    description: "We're putting real money and effort into every corner of this property — docks, seawalls, cabins, roads, and the bar. You'll see the difference.",
  },
  {
    icon: Trees,
    title: "Riverfront Lifestyle",
    description: "The Wolf River is the heart of The Gala. Everything we do is designed around life on the water — fishing, boating, relaxing, and connecting.",
  },
  {
    icon: Heart,
    title: "Family-Owned & Hands-On",
    description: "This isn't a corporate operation. We're here, on-site, making sure every guest feels welcome and every detail is taken care of.",
  },
  {
    icon: Eye,
    title: "Long-Term Vision",
    description: "We're building a high-quality riverfront community that guests, cabin renters, and seasonal campers are proud to be part of.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Our Story"
        subtitle="New ownership. Same river. Better than ever."
        image="/images/wolf-river-new-london.png"
      />

      <section className="py-20 lg:py-28 bg-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimateIn>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-river-blue mb-3">
                A New Chapter
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-charcoal">
                We Believe in This Place
              </h2>
              <p className="mt-6 text-river-gray text-lg leading-relaxed">
                Gala Resort &amp; RV Park has been a fixture on the Wolf River
                for years. Under new ownership, we&apos;re committed to
                investing the time, effort, and resources necessary to elevate
                The Gala into a high-quality riverfront destination that
                everyone — guests, cabin renters, seasonal campers, and the
                Wolf River community — is proud to be a part of.
              </p>
              <p className="mt-4 text-river-gray leading-relaxed">
                We&apos;re not just maintaining what was here. We&apos;re
                actively improving every part of the property. From brand-new
                docks and hundreds of feet of new seawall, to a full remodel
                of the bar and main house, to updated cabins and better roads
                — this is phase one of a long-term commitment to making The
                Gala the best it can be.
              </p>
              <div className="mt-8">
                <Button href="/contact" variant="primary">
                  Get in Touch
                </Button>
              </div>
            </AnimateIn>

            <AnimateIn delay={0.2}>
              <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
                <Image
                  src="/images/wolf-river-canoe.png"
                  alt="Canoeing down the Wolf River near Gala Resort"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  unoptimized
                />
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimateIn>
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-river-blue mb-3">
                Active Improvements
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-charcoal">
                What We&apos;re Working On
              </h2>
              <p className="mt-4 text-river-gray text-lg leading-relaxed">
                We&apos;ve already begun making significant improvements
                across the property — and there&apos;s much more to come.
              </p>
            </div>
          </AnimateIn>
          <div className="mt-10 space-y-4">
            {improvements.map((item, i) => (
              <AnimateIn key={i} delay={i * 0.08}>
                <div className="flex items-start gap-4 bg-cream rounded-lg p-5 border border-sand/60">
                  <div className="w-8 h-8 rounded-full bg-forest/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Hammer size={16} className="text-forest" />
                  </div>
                  <p className="text-charcoal font-medium">{item}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
          <AnimateIn delay={improvements.length * 0.08 + 0.1}>
            <p className="mt-8 text-river-gray text-sm italic">
              We&apos;re investing in every corner of the property, one upgrade
              at a time.
            </p>
          </AnimateIn>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimateIn>
            <h2 className="text-center font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-charcoal mb-12">
              What Drives Us
            </h2>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <AnimateIn key={v.title} delay={i * 0.1}>
                <div className="text-center">
                  <div className="mx-auto w-14 h-14 rounded-full bg-river-blue/10 flex items-center justify-center mb-4">
                    <v.icon size={24} className="text-river-blue" />
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-charcoal">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm text-river-gray leading-relaxed">
                    {v.description}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
