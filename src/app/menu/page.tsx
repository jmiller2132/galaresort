import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import AnimateIn from "@/components/ui/AnimateIn";
import { fetchMenus, fetchMenuPage, fetchSiteSettings } from "@/lib/sanity/fetch";
import { telHref } from "@/lib/text";
import MenuContent from "./MenuContent";

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchMenuPage();
  return { title: page.hero.title, description: page.seoDescription };
}

export default async function MenuPage() {
  const [menus, page, settings] = await Promise.all([fetchMenus(), fetchMenuPage(), fetchSiteSettings()]);

  const images = menus.length > 0
    ? menus.filter((m) => m.image?.asset?.url).map((m) => ({
        src: m.image!.asset!.url,
        alt: m.title,
      }))
    : [{ src: "/images/menu/menu-2.png", alt: "Gala Resort Grill Menu" }];

  return (
    <>
      <PageHero title={page.hero.title} subtitle={page.hero.subtitle} image={page.hero.image.src} />

      <section className="py-16 bg-cream">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <MenuContent images={images} />

          <AnimateIn delay={0.2}>
            <p className="mt-8 text-center text-river-gray text-sm">
              {page.footnote} Call{" "}
              <a href={telHref(settings.barPhone)} className="text-river-blue font-medium hover:underline">
                {settings.barPhone}
              </a>{" "}
              for details.
            </p>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
