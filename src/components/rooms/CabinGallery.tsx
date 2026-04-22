"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Grid } from "lucide-react";
import type { CabinImage } from "@/lib/data";

interface CabinGalleryProps {
  images: CabinImage[];
  name: string;
}

export default function CabinGallery({ images, name }: CabinGalleryProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  const gridImages = images.slice(0, 5);
  const rightImages = gridImages.slice(1);

  return (
    <>
      {/* ── Desktop: Airbnb-style grid (md+) ── */}
      <div className="hidden md:grid md:grid-cols-4 md:grid-rows-2 gap-2 rounded-xl overflow-hidden h-[420px] lg:h-[480px]">
        {/* Hero — spans full left column */}
        <div
          className="row-span-2 col-span-2 relative cursor-pointer group"
          onClick={() => openAt(0)}
        >
          <Image
            src={images[0].src}
            alt={images[0].alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            priority
            sizes="50vw"
          />
        </div>

        {/* Right side — up to 4 cells */}
        {rightImages.map((img, i) => {
          const isLastCell = i === rightImages.length - 1;
          return (
            <div
              key={img.src}
              className="relative cursor-pointer group"
              onClick={() => openAt(i + 1)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="25vw"
              />
              {isLastCell && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openAt(0);
                  }}
                  className="absolute bottom-3 right-3 z-10 flex items-center gap-2 bg-white/95 backdrop-blur-sm text-charcoal text-sm font-medium px-4 py-2 rounded-lg shadow-md hover:bg-white transition-colors"
                >
                  <Grid size={14} />
                  Show all photos ({images.length})
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Mobile: hero only + button (<md) ── */}
      <div className="md:hidden">
        <div
          className="relative aspect-[4/3] overflow-hidden rounded-xl cursor-pointer"
          onClick={() => openAt(0)}
        >
          <Image
            src={images[0].src}
            alt={images[0].alt}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        <button
          onClick={() => openAt(0)}
          className="mt-3 w-full flex items-center justify-center gap-2 bg-white text-charcoal text-sm font-medium py-3 rounded-lg border border-sand/50 hover:border-river-blue hover:text-river-blue transition-colors"
        >
          <Grid size={14} />
          View all {images.length} photos
        </button>
      </div>

      {/* ── Lightbox ── */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={images.map((img) => ({
          src: img.src,
          title: `${name} — ${img.alt}`,
        }))}
      />
    </>
  );
}
