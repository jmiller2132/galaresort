import type { Metadata } from "next";
import GalleryContent from "./GalleryContent";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "See what life at The Gala looks like — waterfront views, cozy cabins, live music, and good times on the Wolf River.",
};

export default function GalleryPage() {
  return <GalleryContent />;
}
