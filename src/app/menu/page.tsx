import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import AnimateIn from "@/components/ui/AnimateIn";
import { fetchMenus } from "@/lib/sanity/fetch";
import MenuContent from "./MenuContent";

export const metadata: Metadata = {
  title: "Grill Menu",
  description:
    "Fresh pizza, smash burgers, wings, and bar favorites at Gala Resort on the Wolf River. Open Tuesday through Sunday.",
};

export default async function MenuPage() {
  const menus = await fetchMenus();

  const menuItems = menus.length > 0
    ? menus.map((m) => ({
        title: m.title,
        pdfUrl: m.pdfFile?.asset?.url ?? null,
        imageUrl: m.image?.asset?.url ?? null,
      })).filter((m) => m.pdfUrl || m.imageUrl)
    : [{ title: "Gala Resort Grill Menu", pdfUrl: null, imageUrl: "/images/menu/menu-2.png" }];

  return (
    <>
      <PageHero
        title="Grill Menu"
        subtitle="Made fresh to order — right on the Wolf River"
        image="/images/exterior/bar-aerial-patio-river.jpeg"
      />

      <section className="py-16 bg-cream">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <MenuContent items={menuItems} />

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
