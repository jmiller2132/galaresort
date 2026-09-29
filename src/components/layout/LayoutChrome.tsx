"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import type { SanityAnnouncement } from "@/lib/sanity/queries";
import type { SiteSettings } from "@/lib/content";

export default function LayoutChrome({
  children,
  announcement,
  settings,
}: {
  children: React.ReactNode;
  announcement?: SanityAnnouncement | null;
  settings: SiteSettings;
}) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio") ?? false;

  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar announcement={announcement} settings={settings} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
    </>
  );
}
