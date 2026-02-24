import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import AnimateIn from "@/components/ui/AnimateIn";
import { getCabins, formatPrice } from "@/lib/data";
import { Users, Dog } from "lucide-react";

export const metadata: Metadata = {
  title: "Waterfront Cabins",
  description:
    "Six cabins directly on the Wolf River — each with its own dock. Three-season and year-round options. Starting at $150/night.",
};

export default function CabinsPage() {
  const cabins = getCabins();

  return (
    <>
      <PageHero
        title="Waterfront Cabins"
        subtitle="Step out your door to the water — every cabin is on the river"
        image="https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1920&q=80"
      />

      <section className="py-20 bg-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <AnimateIn>
              <p className="text-river-gray text-lg leading-relaxed">
                Our six cabins sit directly on the Wolf River, each with private
                dock access and river views. Five are three-season cabins named
                after the fish you&apos;ll find in these waters. The sixth —
                Northern Pike – Four Season Cabin — is our only four-season cabin, perfect for
                year-round stays.
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-river-gray">
                <span className="bg-white rounded-md px-3 py-1.5 border border-sand/50">
                  <strong className="text-charcoal">{formatPrice(cabins[0].rateNightly)}</strong>/night
                </span>
                <span className="bg-white rounded-md px-3 py-1.5 border border-sand/50">
                  <strong className="text-charcoal">{formatPrice(cabins[0].rateWeekly)}</strong>/week
                </span>
                <span className="bg-white rounded-md px-3 py-1.5 border border-sand/50">
                  {cabins[0].minNights}-night minimum (3 on holidays)
                </span>
              </div>
            </AnimateIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cabins.map((cabin, i) => (
              <AnimateIn key={cabin.slug} delay={i * 0.1}>
                <Link href={`/stay/cabins/${cabin.slug}`} className="group block card-lift">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg transition-shadow duration-300 group-hover:shadow-lg">
                    <Image
                      src={cabin.images[0].src}
                      alt={cabin.images[0].alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 left-3 bg-river-blue/90 text-white text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-md">
                      {cabin.seasonType === "year-round" ? "Year-Round" : "3-Season"}
                    </div>
                  </div>
                  <div className="mt-4">
                    <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-charcoal group-hover:text-river-blue transition-colors">
                      {cabin.name}
                    </h2>
                    <p className="mt-1 text-sm text-river-gray line-clamp-2">
                      {cabin.shortDescription}
                    </p>
                    <div className="mt-3 flex items-center gap-4 text-xs text-river-gray">
                      <span className="flex items-center gap-1">
                        <Users size={13} /> Up to {cabin.maxGuests}
                      </span>
                      {cabin.dogFriendly && (
                        <span className="flex items-center gap-1">
                          <Dog size={13} /> Ask about pets
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
