import Link from "next/link";

const footerLinks = {
  stay: [
    { href: "/stay/cabins", label: "Cabins" },
    { href: "/stay/seasonal", label: "Seasonal Sites" },
    { href: "/stay/camping", label: "Camping" },
    { href: "/contact", label: "Check Availability" },
  ],
  explore: [
    { href: "/bar-and-events", label: "Bar & Events" },
    { href: "/gallery", label: "Gallery" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-river-blue-dark text-white/80">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="font-[family-name:var(--font-display)] text-2xl text-white font-bold tracking-wide">
              The Gala
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              A riverfront resort and campground on the Wolf River in Fremont, Wisconsin.
              Cabins, camping, live music, and good times on the water.
            </p>
            <div className="mt-6 space-y-2 text-sm text-white/60">
              <p>Fremont, WI</p>
              <p><a href="tel:+19204462423" className="hover:text-wood-light transition-colors">(920) 446-2423</a></p>
              <p><a href="mailto:galaresortllc@gmail.com" className="hover:text-wood-light transition-colors">galaresortllc@gmail.com</a></p>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white">
              Stay With Us
            </h3>
            <ul className="space-y-3">
              {footerLinks.stay.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm transition-all duration-200 hover:text-wood-light hover:translate-x-0.5 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white">
              Explore
            </h3>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm transition-all duration-200 hover:text-wood-light hover:translate-x-0.5 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white">
              Connect
            </h3>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/galaresort/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-white/40 transition-colors hover:text-wood-light"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
            <p className="mt-6 text-xs text-white/40">
              Ask about pets (dogs only, limit 2).
              <br />
              Availability confirmed after inquiry.
            </p>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 text-center">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Gala Resort &amp; RV Park. All rights reserved. Fremont, WI.
          </p>
        </div>
      </div>
    </footer>
  );
}
