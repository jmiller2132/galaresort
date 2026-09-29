import AnimateIn from "@/components/ui/AnimateIn";
import Button from "@/components/ui/Button";
import Image from "next/image";
import type { HomePageContent } from "@/lib/content";
import { paragraphs } from "@/lib/text";

export default function IntroSection({ content }: { content: HomePageContent["intro"] }) {
  return (
    <section className="py-20 lg:py-28 bg-cream">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <AnimateIn>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-river-blue mb-3">
              {content.eyebrow}
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-charcoal">
              {content.heading}
            </h2>
            {paragraphs(content.body).map((paragraph, i) => (
              <p
                key={i}
                className={i === 0 ? "mt-6 text-river-gray text-lg leading-relaxed" : "mt-4 text-river-gray leading-relaxed"}
              >
                {paragraph}
              </p>
            ))}
            <div className="mt-8">
              <Button href="/about" variant="outline">
                Our Story
              </Button>
            </div>
          </AnimateIn>

          <AnimateIn delay={0.2}>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src={content.image.src}
                alt={content.image.alt || content.heading}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={85}
              />
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
