import Image from "next/image";
import Button from "@/components/ui/Button";
import AnimateIn from "@/components/ui/AnimateIn";

export default function CTABanner() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <Image
        src="/images/wolf-river-canoe.png"
        alt="Wolf River waterfront"
        fill
        className="object-cover"
        sizes="100vw"
        unoptimized
      />
      <div className="absolute inset-0 bg-river-blue/80" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <AnimateIn>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-wood-light mb-4">
            Reserve Your Spot
          </p>
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-5xl text-white font-bold">
            Ready for the River?
          </h2>
        </AnimateIn>
        <AnimateIn delay={0.2}>
          <p className="mt-6 text-lg text-white/80 leading-relaxed">
            Whether it&apos;s a weekend cabin getaway, a seasonal site for the
            summer, or just a night by the campfire — your spot on the Wolf
            River is waiting.
          </p>
        </AnimateIn>
        <AnimateIn delay={0.3}>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" variant="secondary" size="lg">
              Check Cabin & Camping Availability
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
