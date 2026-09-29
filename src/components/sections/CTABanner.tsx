import Image from "next/image";
import Button from "@/components/ui/Button";
import AnimateIn from "@/components/ui/AnimateIn";
import type { HomePageContent } from "@/lib/content";

export default function CTABanner({ content }: { content: HomePageContent["cta"] }) {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <Image
        src={content.image.src}
        alt={content.image.alt || content.heading}
        fill
        className="object-cover"
        sizes="100vw"
        quality={90}
      />
      <div className="absolute inset-0 bg-river-blue/80" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <AnimateIn>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-wood-light mb-4">
            {content.eyebrow}
          </p>
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-5xl text-white font-bold">
            {content.heading}
          </h2>
        </AnimateIn>
        <AnimateIn delay={0.2}>
          <p className="mt-6 text-lg text-white/80 leading-relaxed">
            {content.body}
          </p>
        </AnimateIn>
        <AnimateIn delay={0.3}>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" variant="secondary" size="lg">
              Check Availability
            </Button>
            <Button
              href="/stay"
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-river-blue-dark"
            >
              Explore Stays
            </Button>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
