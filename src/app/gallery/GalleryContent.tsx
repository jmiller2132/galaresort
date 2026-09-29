"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import PageHero from "@/components/ui/PageHero";
import AnimateIn from "@/components/ui/AnimateIn";
import SocialText from "@/components/ui/SocialText";
import type { GalleryImage } from "@/lib/data";
import type { HeroContent } from "@/lib/content";

const categories = [
  { value: "all", label: "All" },
  { value: "waterfront", label: "Waterfront" },
  { value: "cabins", label: "Cabins" },
  { value: "bar", label: "Bar & Events" },
  { value: "grounds", label: "Grounds" },
  { value: "life", label: "Life at The Gala" },
];

interface GalleryContentProps {
  images: GalleryImage[];
  hero: HeroContent;
  footnote: string;
  facebookUrl: string;
  instagramUrl: string;
}

export default function GalleryContent({ images, hero, footnote, facebookUrl, instagramUrl }: GalleryContentProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "all"
      ? images
      : images.filter((img) => img.categories?.includes(filter as never));

  return (
    <>
      <PageHero title={hero.title} subtitle={hero.subtitle} image={hero.image.src} />

      <section className="py-20 bg-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setFilter(cat.value)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 active:scale-95 ${
                  filter === cat.value
                    ? "bg-river-blue text-white"
                    : "bg-white text-river-gray border border-sand/50 hover:border-river-blue hover:text-river-blue"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
            {filtered.map((img, i) => (
              <div
                key={img.src + i}
                className="relative overflow-hidden rounded-lg cursor-pointer break-inside-avoid mb-4 group"
                onClick={() => {
                  setIndex(images.indexOf(img));
                  setOpen(true);
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={800}
                  height={1000}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading={i < 6 ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-river-gray">
              <SocialText
                text={footnote}
                facebookUrl={facebookUrl}
                instagramUrl={instagramUrl}
                linkClassName="text-river-blue font-semibold hover:underline"
              />
            </p>
          </div>
        </div>
      </section>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={images.map((img) => ({ src: img.src }))}
      />
    </>
  );
}
