import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import AnimateIn from "@/components/ui/AnimateIn";
import { formatPrice } from "@/lib/data";
import { fetchCabins, fetchCabinsPage, fetchSiteSettings } from "@/lib/sanity/fetch";
import { paragraphs, telHref } from "@/lib/text";
import { Users } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchCabinsPage();
  return { title: page.hero.title, description: page.seoDescription };
}

export default async function CabinsPage() {
  const [cabins, page, settings] = await Promise.all([fetchCabins(), fetchCabinsPage(), fetchSiteSettings()]);

  return (
    <>
      <PageHero title={page.hero.title} subtitle={page.hero.subtitle} image={page.hero.image.src} />

      <section className="py-20 bg-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12">
            <AnimateIn>
              {paragraphs(page.intro).map((paragraph, i) => (
                <p key={i} className={`text-river-gray text-lg leading-relaxed max-w-4xl${i > 0 ? " mt-4" : ""}`}>
                  {paragraph}
                </p>
              ))}
              <p className="mt-4 text-river-gray">
                {page.callNote}{" "}
                <a href={telHref(settings.rvPhone)} className="text-river-blue font-semibold hover:underline">
                  {settings.rvPhone}
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
                            {page.unavailable.label}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-charcoal">
                          {cabin.name}
                        </h2>
                        <p className="mt-1 text-sm text-river-gray line-clamp-2">
                          {page.unavailable.short}
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
