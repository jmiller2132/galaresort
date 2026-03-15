import AnimateIn from "@/components/ui/AnimateIn";
import Button from "@/components/ui/Button";
import Image from "next/image";

export default function IntroSection() {
  return (
    <section className="py-20 lg:py-28 bg-cream">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <AnimateIn>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-river-blue mb-3">
              Welcome to The Gala
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-charcoal">
              Your Riverfront Escape Awaits
            </h2>
            <p className="mt-6 text-river-gray text-lg leading-relaxed">
              Nestled on the banks of the Wolf River in Fremont, Wisconsin,
              Gala Resort is more than a place to stay — it&apos;s a place to
              experience. Spend the morning on your private dock, grab lunch at
              the tiki bar, catch live music from the two-tier patio, or just
              sit back and watch the river roll by.
            </p>
            <p className="mt-4 text-river-gray leading-relaxed">
              Under new ownership and actively being improved, The Gala is
              becoming the go-to waterfront destination on the Wolf River.
              Hundreds of feet of new wharfs and docks, a fully remodeled bar
              and main house, and upgraded cabins throughout — this is just
              the beginning. Come see what we&apos;re building.
            </p>
            <div className="mt-8">
              <Button href="/about" variant="outline">
                Our Story
              </Button>
            </div>
          </AnimateIn>

          <AnimateIn delay={0.2}>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/images/wolf-river-new-london.png"
                alt="Gala Resort on the Wolf River"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized
              />
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
