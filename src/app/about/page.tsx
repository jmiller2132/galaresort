import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import AnimateIn from "@/components/ui/AnimateIn";
import Button from "@/components/ui/Button";
import { fetchAboutPage } from "@/lib/sanity/fetch";
import { paragraphs } from "@/lib/text";
import { Hammer, Trees, Heart, Eye } from "lucide-react";

const valueIcons = [Hammer, Trees, Heart, Eye];

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchAboutPage();
  return { title: page.hero.title, description: page.seoDescription };
}

export default async function AboutPage() {
  const { hero, story, improvements, values } = await fetchAboutPage();

  return (
    <>
      <PageHero title={hero.title} subtitle={hero.subtitle} image={hero.image.src} />

      <section className="py-20 lg:py-28 bg-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimateIn>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-river-blue mb-3">
                {story.eyebrow}
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-charcoal">
                {story.heading}
              </h2>
              {paragraphs(story.body).map((paragraph, i) => (
                <p
                  key={i}
                  className={i === 0 ? "mt-6 text-river-gray text-lg leading-relaxed" : "mt-4 text-river-gray leading-relaxed"}
                >
                  {paragraph}
                </p>
              ))}
              <div className="mt-8">
                <Button href="/contact" variant="primary">
                  Get in Touch
                </Button>
              </div>
            </AnimateIn>

            <AnimateIn delay={0.2}>
              <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
                <Image
                  src={story.image.src}
                  alt={story.image.alt || story.heading}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={85}
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
                {improvements.eyebrow}
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-charcoal">
                {improvements.heading}
              </h2>
              <p className="mt-4 text-river-gray text-lg leading-relaxed">
                {improvements.intro}
              </p>
            </div>
          </AnimateIn>
          <div className="mt-10 space-y-4">
            {improvements.items.map((item, i) => (
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
          <AnimateIn delay={improvements.items.length * 0.08 + 0.1}>
            <p className="mt-8 text-river-gray text-sm italic">
              {improvements.footnote}
            </p>
          </AnimateIn>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimateIn>
            <h2 className="text-center font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-charcoal mb-12">
              {values.heading}
            </h2>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.items.map((v, i) => {
              const Icon = valueIcons[i % valueIcons.length];
              return (
                <AnimateIn key={`${v.title}-${i}`} delay={i * 0.1}>
                  <div className="text-center">
                    <div className="mx-auto w-14 h-14 rounded-full bg-river-blue/10 flex items-center justify-center mb-4">
                      <Icon size={24} className="text-river-blue" />
                    </div>
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-charcoal">
                      {v.title}
                    </h3>
                    <p className="mt-2 text-sm text-river-gray leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                </AnimateIn>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
