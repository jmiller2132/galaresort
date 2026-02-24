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
      "Six waterfront cabins — five three-season and one year-round — each with private dock access on the Wolf River.",
    image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&q=80",
  },
  {
    title: "Seasonal Sites",
    href: "/stay/seasonal",
    price: "From $4,000/season",
    description:
      "Riverfront and channel seasonal sites — every one on the water. Secure your spot for the whole season.",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80",
  },
  {
    title: "Camping",
    href: "/stay/camping",
    price: "From $55/night",
    description:
      "Pull up with your RV or camper. Electric and water hookups, river views, and access to everything at The Gala.",
    image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=800&q=80",
  },
];

export default function StayPage() {
  return (
    <>
      <PageHero
        title="Stay With Us"
        subtitle="Cabins, seasonal sites, and camping on the Wolf River"
        image="/images/wolf-river-canoe.png"
      />

      <section className="py-20 lg:py-28 bg-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stayOptions.map((option, i) => (
              <AnimateIn key={option.title} delay={i * 0.15}>
                <Link href={option.href} className="group block h-full">
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-sand/50 h-full flex flex-col">
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
