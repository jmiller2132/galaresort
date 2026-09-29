import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import AnimateIn from "@/components/ui/AnimateIn";
import { fetchSiteSettings, fetchStayPage } from "@/lib/sanity/fetch";
import { paragraphs, telHref } from "@/lib/text";

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchStayPage();
  return { title: page.hero.title, description: page.seoDescription };
}

export default async function StayPage() {
  const [page, settings] = await Promise.all([fetchStayPage(), fetchSiteSettings()]);
  const cards = [
    { ...page.cabinsCard, href: "/stay/cabins" },
    { ...page.seasonalCard, href: "/stay/seasonal" },
    { ...page.campingCard, href: "/stay/camping" },
  ];

  return (
    <>
      <PageHero title={page.hero.title} subtitle={page.hero.subtitle} image={page.hero.image.src} />

      <section className="py-20 lg:py-28 bg-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            {paragraphs(page.intro).map((paragraph, i) => (
              <p key={i} className={`text-river-gray text-lg leading-relaxed${i > 0 ? " mt-4" : ""}`}>
                {paragraph}
              </p>
            ))}
            <p className="mt-4 text-river-gray">
              {page.callNote}{" "}
              <a href={telHref(settings.rvPhone)} className="text-river-blue font-semibold hover:underline">
                {settings.rvPhone}
              </a>.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cards.map((option, i) => (
              <AnimateIn key={option.href} delay={i * 0.15}>
                <Link href={option.href} className="group block h-full card-lift">
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-sand/50 h-full flex flex-col transition-shadow duration-300 group-hover:shadow-lg">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={option.image.src}
                        alt={option.image.alt || option.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-charcoal group-hover:text-river-blue transition-colors">
                        {option.title}
                      </h2>
                      <p className="mt-1 text-sm font-semibold text-river-blue">
                        {option.price}
                      </p>
                      <p className="mt-3 text-river-gray leading-relaxed flex-1">
                        {option.description}
                      </p>
                      <p className="mt-4 text-sm font-semibold text-river-blue group-hover:text-river-blue-light transition-colors">
                        Learn More &rarr;
                      </p>
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
