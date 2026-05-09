import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import AnimateIn from "@/components/ui/AnimateIn";
import { formatPrice } from "@/lib/data";
import { fetchCabins } from "@/lib/sanity/fetch";
import { Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Waterfront Cabins",
  description:
    "Six cabins directly on the Wolf River — each with its own dock. Three-season and year-round options. Starting at $150/night.",
};

export default async function CabinsPage() {
  const cabins = await fetchCabins();

  return (
    <>
      <PageHero
        title="Waterfront Cabins"
        subtitle="Step out your door to the water — every cabin is on the river"
        image="/images/exterior/DJI_20260304112142_0068_D-2.jpg"
      />

      <section className="py-20 bg-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12">
            <AnimateIn>
              <p className="text-river-gray text-lg leading-relaxed max-w-4xl">
                Wake up on the Wolf River. Step outside, and your dock is
                right there — coffee in hand, water at your feet, nowhere
                you need to be. Our six cabins sit directly on the river,
                each with private dock access and full resort amenities a
                short walk away. Five are three-season cabins named after
                the fish in these waters. The sixth — the Northern Four
                Season Cabin — is available year-round.
              </p>
              <p className="mt-4 text-river-gray">
                To book or check availability, call the RV Park office at{" "}
                <a href="tel:+19204463222" className="text-river-blue font-semibold hover:underline">
                  (920) 446-3222
                </a>.
              </p>
            </AnimateIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cabins.map((cabin, i) => {
              const unavailable = cabin.available === false;
              return (
                <AnimateIn key={cabin.slug} delay={i * 0.1}>
                  {unavailable ? (
                    <div className="group block opacity-70 cursor-not-allowed">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                        <Image
                          src={cabin.images[0].src}
                          alt={cabin.images[0].alt}
                          fill
                          className="object-cover grayscale"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-charcoal/40 flex items-center justify-center">
                          <span className="bg-white text-charcoal text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-md">
                            Under Restoration
                          </span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-charcoal">
                          {cabin.name}
                        </h2>
                        <p className="mt-1 text-sm text-river-gray line-clamp-2">
                          Not currently available for reservations.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <Link href={`/stay/cabins/${cabin.slug}`} className="group block card-lift">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-lg transition-shadow duration-300 group-hover:shadow-lg">
                        <Image
                          src={cabin.images[0].src}
                          alt={cabin.images[0].alt}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                      <div className="mt-4">
                        <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-charcoal group-hover:text-river-blue transition-colors">
                          {cabin.name}
                        </h2>
                        <p className="mt-1 text-sm text-river-gray line-clamp-2">
                          {cabin.shortDescription}
                        </p>
                        <div className="mt-3 flex items-center justify-between text-xs text-river-gray">
                          <span className="flex items-center gap-1">
                            <Users size={13} /> Up to {cabin.maxGuests}
                          </span>
                          <span>
                            <strong className="text-charcoal">{formatPrice(cabin.rateNightly)}</strong>/night &nbsp;·&nbsp; <strong className="text-charcoal">{formatPrice(cabin.rateWeekly)}</strong>/week
                          </span>
                        </div>
                      </div>
                    </Link>
                  )}
                </AnimateIn>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
