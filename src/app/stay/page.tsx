import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import AnimateIn from "@/components/ui/AnimateIn";

export const metadata: Metadata = {
  title: "Stay With Us",
  description:
    "Waterfront cabins, seasonal sites, and RV camping on the Wolf River. Find your perfect spot at The Gala.",
};

const stayOptions = [
  {
    title: "Cabins",
    href: "/stay/cabins",
    price: "From $150/night",
    description:
      "Six waterfront cabins with private docks — wake up on the river, step outside, and you're already there.",
    image: "/images/exterior/DJI_20260304112142_0068_D-2.jpg",
  },
  {
    title: "Seasonal Sites",
    href: "/stay/seasonal",
    price: "From $4,000/season",
    description:
      "Your own spot on the river all season long — dock your boat, settle in, and make it yours from April to October.",
    image: "/images/exterior/DJI_20260304112606_0075_D.jpg",
  },
  {
    title: "Camping",
    href: "/stay/camping",
    price: "From $55/night",
    description:
      "Pull up to the river with your RV or camper. Full hookups, boat launch access, and the bar is a short walk away.",
    image: "/images/exterior/DJI_20260304112805_0083_D.jpg",
  },
];

export default function StayPage() {
  return (
    <>
      <PageHero
        title="Stay With Us"
        subtitle="Cabins, seasonal sites, and camping on the Wolf River"
        image="/images/exterior/wolf-river-aerial-property.jpeg"
      />

      <section className="py-20 lg:py-28 bg-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <p className="text-river-gray text-lg leading-relaxed">
              Every way you stay at The Gala puts you on the Wolf River.
              Wake up to the water, walk out to your dock, launch your
              boat, and end the day with cold drinks and live music at the
              bar. Whether it&apos;s a cabin for the weekend, a seasonal
              site for the summer, or a campsite for the night — this is
              waterfront living, and it all starts right here.
            </p>
            <p className="mt-4 text-river-gray">
              Questions about availability? Call the RV Park office at{" "}
              <a href="tel:+19204463222" className="text-river-blue font-semibold hover:underline">
                (920) 446-3222
              </a>.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stayOptions.map((option, i) => (
              <AnimateIn key={option.title} delay={i * 0.15}>
                <Link href={option.href} className="group block h-full card-lift">
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-sand/50 h-full flex flex-col transition-shadow duration-300 group-hover:shadow-lg">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={option.image}
                        alt={option.title}
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
