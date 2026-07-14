import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import AnimateIn from "@/components/ui/AnimateIn";
import Button from "@/components/ui/Button";
import { formatPrice } from "@/lib/data";
import { fetchSeasonalSites } from "@/lib/sanity/fetch";
import { Check, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Seasonal Sites",
  description:
    "Every seasonal site is on the water. River and channel frontage from $4,000/season. April 15 – October 15 on the Wolf River.",
};

export default async function SeasonalPage() {
  const sites = await fetchSeasonalSites();

  return (
    <>
      <PageHero
        title="Seasonal Sites"
        subtitle="Every site on the water — your riverfront home for the season"
        image="/images/exterior/DJI_20260304112620_0077_D.jpg"
      />

      <section className="py-20 bg-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimateIn>
            <div className="max-w-3xl mb-16">
              <p className="text-river-gray text-lg leading-relaxed">
                This is your spot on the river all summer. Dock your boat,
                set up your site, and make it home from April 15 through
                October 15. Every seasonal site at The Gala is on the
                water — river or channel frontage, your own dock space,
                and the kind of boating lifestyle you don&apos;t get
                anywhere else on the Wolf. Walk to the bar, catch live
                music on the weekends, and be part of a community that
                comes back year after year.
              </p>
              <p className="mt-4 text-river-gray">
                Interested in claiming a spot? Call the RV Park office at{" "}
                <a href="tel:+19204463222" className="text-river-blue font-semibold hover:underline">
                  (920) 446-3222
                </a>.
              </p>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {sites.map((site, i) => (
              <AnimateIn key={site.slug} delay={i * 0.15}>
                <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-sand/50">
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={site.image.src}
                      alt={site.image.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-8">
                    <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-charcoal">
                      {site.name}
                    </h2>
                    <p className="mt-1 font-[family-name:var(--font-display)] text-xl font-bold text-river-blue">
                      {formatPrice(site.pricePerSeason)} + tax / season
                    </p>
                    <p className="mt-4 text-river-gray leading-relaxed">
                      {site.description}
                    </p>
                    <ul className="mt-6 space-y-2">
                      {site.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-river-gray">
                          <Check size={16} className="text-forest flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8">
                      <Button href="/contact?type=seasonal" variant="primary" className="w-full">
                        Claim Your Seasonal Spot
                      </Button>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn delay={0.3}>
            <div className="mt-16 max-w-2xl mx-auto bg-white rounded-lg p-6 border border-sand/50">
              <div className="flex gap-3">
                <Info size={20} className="text-river-blue flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-charcoal mb-2">
                    Good to Know
                  </h3>
                  <ul className="space-y-1.5 text-sm text-river-gray leading-relaxed">
                    <li>Season runs April 15 – October 15.</li>
                    <li>Seasonal lessees get year-round electric access and can visit off-season.</li>
                    <li>Seasonal sites cannot be used as a primary residence.</li>
                  </ul>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
