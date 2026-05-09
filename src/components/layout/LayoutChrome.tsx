"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import type { SanityAnnouncement } from "@/lib/sanity/queries";

export default function LayoutChrome({
  children,
  announcement,
}: {
  children: React.ReactNode;
  announcement?: SanityAnnouncement | null;
}) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio") ?? false;

  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar announcement={announcement} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
