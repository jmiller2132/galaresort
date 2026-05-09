import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import AnimateIn from "@/components/ui/AnimateIn";
import { fetchMenus } from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "Grill Menu",
  description:
    "Fresh pizza, smash burgers, wings, and bar favorites at Gala Resort on the Wolf River. Open Tuesday through Sunday.",
};

export default async function MenuPage() {
  const menus = await fetchMenus();

  const images = menus.length > 0
    ? menus.filter((m) => m.image?.asset?.url).map((m) => ({
        src: m.image!.asset!.url,
        alt: m.title,
      }))
    : [{ src: "/images/menu/menu-2.png", alt: "Gala Resort Grill Menu" }];

  return (
    <>
      <PageHero
        title="Grill Menu"
        subtitle="Made fresh to order — right on the Wolf River"
        image="/images/exterior/bar-aerial-patio-river.jpeg"
      />

      <section className="py-16 bg-cream">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <AnimateIn>
            {images.length === 1 ? (
              <div className="relative w-full rounded-lg overflow-hidden shadow-md max-w-2xl mx-auto">
                <Image
                  src={images[0].src}
                  alt={images[0].alt}
                  width={1080}
                  height={1350}
                  className="w-full h-auto"
                  priority
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {images.map((img, i) => (
                  <div key={i} className="relative w-full rounded-lg overflow-hidden shadow-md">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={1080}
                      height={1350}
                      className="w-full h-auto"
                      priority={i === 0}
                    />
                  </div>
                ))}
              </div>
            )}
          </AnimateIn>

          <AnimateIn delay={0.2}>
            <p className="mt-8 text-center text-river-gray text-sm">
              Menu items and prices subject to change. Call{" "}
              <a href="tel:+19204462423" className="text-river-blue font-medium hover:underline">
                (920) 446-2423
              </a>{" "}
              for details.
            </p>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
