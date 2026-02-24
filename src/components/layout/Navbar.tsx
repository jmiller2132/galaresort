"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/stay", label: "Stay" },
  { href: "/bar-and-events", label: "Bar & Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function usePageHasHero(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] === "stay" && segments[1] === "cabins" && segments.length === 3) return false;
  return true;
}

export default function Navbar() {
  const pathname = usePathname();
  const pageHasHero = usePageHasHero(pathname);
  const [scrolled, setScrolled] = useState(!pageHasHero);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!pageHasHero) {
      setScrolled(true);
      return;
    }
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pageHasHero]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link href="/" className="relative z-50">
            <span
              className={`font-[family-name:var(--font-display)] text-2xl font-bold tracking-wide transition-colors duration-500 ${
                scrolled ? "text-river-blue" : "text-white"
              }`}
            >
              The Gala
            </span>
          </Link>

          <div className="hidden lg:flex lg:items-center lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:text-wood ${
                  scrolled ? "text-charcoal" : "text-white/90"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-2 rounded-md bg-river-blue px-5 py-2.5 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-river-blue-light"
            >
              Check Availability
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`relative z-50 lg:hidden transition-colors duration-300 ${
              mobileOpen ? "text-white" : scrolled ? "text-charcoal" : "text-white"
            }`}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-river-blue-dark/98 lg:hidden"
          >
            <div className="flex h-full flex-col items-center justify-center gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-[family-name:var(--font-display)] text-3xl text-white/90 font-bold transition-colors hover:text-wood-light"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + navLinks.length * 0.05, duration: 0.3 }}
              >
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="mt-4 inline-block rounded-md bg-wood px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-wood-light"
                >
                  Check Availability
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
