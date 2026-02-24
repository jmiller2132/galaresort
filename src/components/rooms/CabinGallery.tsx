"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import type { CabinImage } from "@/lib/data";

interface CabinGalleryProps {
  images: CabinImage[];
  name: string;
}

export default function CabinGallery({ images, name }: CabinGalleryProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div
          className="md:col-span-2 relative aspect-[16/10] overflow-hidden rounded-lg cursor-pointer"
          onClick={() => { setIndex(0); setOpen(true); }}
        >
          <Image
            src={images[0].src}
            alt={images[0].alt}
            fill
            className="object-cover hover:scale-105 transition-transform duration-700"
            priority
            sizes="(max-width: 768px) 100vw, 66vw"
          />
        </div>
        <div className="grid grid-rows-2 gap-2">
          {images.slice(1, 3).map((img, i) => (
            <div
              key={i}
              className="relative aspect-[16/10] overflow-hidden rounded-lg cursor-pointer"
              onClick={() => { setIndex(i + 1); setOpen(true); }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={images.map((img) => ({ src: img.src, title: `${name} — ${img.alt}` }))}
      />
    </>
  );
}
