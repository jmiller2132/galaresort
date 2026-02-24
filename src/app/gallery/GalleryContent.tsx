"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import PageHero from "@/components/ui/PageHero";
import AnimateIn from "@/components/ui/AnimateIn";
import { galleryImages } from "@/lib/data";

const categories = [
  { value: "all", label: "All" },
  { value: "waterfront", label: "Waterfront" },
  { value: "cabins", label: "Cabins" },
  { value: "bar", label: "Bar & Events" },
  { value: "grounds", label: "Grounds" },
];

export default function GalleryContent() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === filter);

  return (
    <>
      <PageHero
        title="Gallery"
        subtitle="See what life at The Gala looks like"
        image="/images/wolf-river-canoe.png"
      />

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

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((img, i) => (
              <AnimateIn key={img.src + i} delay={(i % 3) * 0.08}>
                <div
                  className="relative overflow-hidden rounded-lg cursor-pointer break-inside-avoid"
                  onClick={() => {
                    setIndex(galleryImages.indexOf(img));
                    setOpen(true);
                  }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={img.width}
                    height={i % 3 === 0 ? 800 : i % 3 === 1 ? 600 : 450}
                    className="w-full object-cover hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </AnimateIn>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-river-gray">
              Professional photography coming soon. Follow us on{" "}
              <a
                href="https://www.facebook.com/galaresort/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-river-blue font-semibold hover:underline"
              >
                Facebook
              </a>{" "}
              for the latest photos.
            </p>
          </div>
        </div>
      </section>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={galleryImages.map((img) => ({ src: img.src }))}
      />
    </>
  );
}
