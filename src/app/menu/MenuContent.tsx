"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import AnimateIn from "@/components/ui/AnimateIn";
import { ZoomIn, FileText } from "lucide-react";

type MenuItem = {
  title: string;
  pdfUrl: string | null;
  imageUrl: string | null;
};

function PdfViewer({ url, title }: { url: string; title: string }) {
  return (
    <div className="w-full rounded-lg overflow-hidden shadow-md">
      <iframe
        src={`${url}#toolbar=0&navpanes=0&scrollbar=0`}
        title={title}
        className="w-full hidden md:block"
        style={{ height: "80vh", border: "none" }}
      />
      {/* Mobile fallback — iframes are unusable on small screens */}
      <div className="flex flex-col items-center gap-4 py-12 px-6 bg-white md:hidden">
        <FileText size={48} className="text-river-blue opacity-70" />
        <p className="text-center text-stone-600 text-sm">
          PDF menus are best viewed on a desktop. Tap below to open in your browser.
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-river-blue text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-river-blue/90 transition-colors"
        >
          Open Menu PDF
        </a>
      </div>
      {/* Desktop open-in-new-tab link */}
      <div className="hidden md:flex justify-center mt-3">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-river-blue text-sm hover:underline"
        >
          Open full screen ↗
        </a>
      </div>
    </div>
  );
}

export default function MenuContent({ items }: { items: MenuItem[] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const imageItems = items.filter((m) => !m.pdfUrl && m.imageUrl);
  const lightboxSlides = imageItems.map((m) => ({ src: m.imageUrl! }));

  return (
    <>
      {items.map((item, i) => {
        if (item.pdfUrl) {
          return (
            <AnimateIn key={i}>
              <PdfViewer url={item.pdfUrl} title={item.title} />
            </AnimateIn>
          );
        }

        if (item.imageUrl) {
          const imgIndex = imageItems.findIndex((m) => m.imageUrl === item.imageUrl);
          return (
            <AnimateIn key={i}>
              <p className="text-center text-river-gray text-sm mb-6">
                Tap to enlarge
              </p>
              <div
                className="relative w-full rounded-lg overflow-hidden shadow-md max-w-2xl mx-auto cursor-zoom-in group"
                onClick={() => { setIndex(imgIndex); setOpen(true); }}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={1080}
                  height={1350}
                  className="w-full h-auto group-hover:opacity-95 transition-opacity"
                  priority={i === 0}
                />
                <div className="absolute bottom-3 right-3 bg-black/50 text-white rounded-full p-2 opacity-70 group-hover:opacity-100 transition-opacity">
                  <ZoomIn size={18} />
                </div>
              </div>
            </AnimateIn>
          );
        }

        return null;
      })}

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={lightboxSlides}
      />
    </>
  );
}
