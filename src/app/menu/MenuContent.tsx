"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import AnimateIn from "@/components/ui/AnimateIn";
import { ZoomIn } from "lucide-react";

type MenuImage = { src: string; alt: string };

export default function MenuContent({ images }: { images: MenuImage[] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <>
      <AnimateIn>
        <p className="text-center text-river-gray text-sm mb-6">
          Tap any image to enlarge
        </p>
        {images.length === 1 ? (
          <div
            className="relative w-full rounded-lg overflow-hidden shadow-md max-w-2xl mx-auto cursor-zoom-in group"
            onClick={() => { setIndex(0); setOpen(true); }}
          >
            <Image
              src={images[0].src}
              alt={images[0].alt}
              width={1080}
              height={1350}
              className="w-full h-auto group-hover:opacity-95 transition-opacity"
              priority
            />
            <div className="absolute bottom-3 right-3 bg-black/50 text-white rounded-full p-2 opacity-70 group-hover:opacity-100 transition-opacity">
              <ZoomIn size={18} />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {images.map((img, i) => (
              <div
                key={i}
                className="relative w-full rounded-lg overflow-hidden shadow-md cursor-zoom-in group"
                onClick={() => { setIndex(i); setOpen(true); }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={1080}
                  height={1350}
                  className="w-full h-auto group-hover:opacity-95 transition-opacity"
                  priority={i === 0}
                />
                <div className="absolute bottom-3 right-3 bg-black/50 text-white rounded-full p-2 opacity-70 group-hover:opacity-100 transition-opacity">
                  <ZoomIn size={18} />
                </div>
              </div>
            ))}
          </div>
        )}
      </AnimateIn>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={images.map((img) => ({ src: img.src }))}
      />
    </>
  );
}
