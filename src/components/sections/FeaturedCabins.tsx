import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimateIn from "@/components/ui/AnimateIn";
import Button from "@/components/ui/Button";
import { getFeaturedCabins, formatPrice } from "@/lib/data";

export default function FeaturedCabins() {
  const featured = getFeaturedCabins(3);

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          label="Stay With Us"
          title="Waterfront Cabins"
          description="Every cabin sits right on the water. Step out your door, walk down to the river, and leave everything else behind."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((cabin, i) => (
            <AnimateIn key={cabin.slug} delay={i * 0.15}>
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
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-charcoal group-hover:text-river-blue transition-colors">
                    {cabin.name}
                  </h3>
                  <p className="mt-1 text-sm text-river-gray">
                    {formatPrice(cabin.rateNightly)}/night &bull; {formatPrice(cabin.rateWeekly)}/week
                  </p>
                </div>
              </Link>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn className="mt-12 text-center">
          <Button href="/stay/cabins" variant="outline">
            View All Cabins
          </Button>
        </AnimateIn>
      </div>
    </section>
  );
}
