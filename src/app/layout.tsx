import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import LayoutChrome from "@/components/layout/LayoutChrome";
import { telHref } from "@/lib/text";
import { fetchAnnouncement, fetchSiteSettings } from "@/lib/sanity/fetch";
import "@/styles/globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Gala Resort & RV Park | Life on the River — Fremont, WI",
    template: "%s | Gala Resort & RV Park",
  },
  description:
    "Waterfront cabins, camping, and seasonal sites on the Wolf River. Live music, a riverfront bar, and a community that's always improving. Come see what we're building.",
  keywords: [
    "Gala Resort",
    "Wolf River resort",
    "Fremont WI cabins",
    "Wolf River campground",
    "Fremont camping",
    "Wolf River bar live music",
    "riverfront cabins Wisconsin",
  ],
  openGraph: {
    title: "Gala Resort & RV Park | Life on the River — Fremont, WI",
    description:
      "Waterfront cabins, camping, and seasonal sites on the Wolf River. Live music, a riverfront bar, and a community that's always improving.",
    type: "website",
    locale: "en_US",
    siteName: "Gala Resort & RV Park",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [announcement, settings] = await Promise.all([fetchAnnouncement(), fetchSiteSettings()]);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Campground",
    name: "Gala Resort & RV Park",
    description:
      "Riverfront cabins, seasonal campsites, camping, and a bar & lounge with live music on the Wolf River in Fremont, Wisconsin.",
    url: "https://galaresort.com",
    telephone: telHref(settings.rvPhone).replace("tel:", ""),
    email: settings.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.streetAddress,
      addressLocality: settings.city,
      addressRegion: settings.state,
      postalCode: settings.zip,
      addressCountry: "US",
    },
    sameAs: [settings.facebookUrl, settings.instagramUrl],
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Private Boat Launch" },
      { "@type": "LocationFeatureSpecification", name: "Private Docks" },
      { "@type": "LocationFeatureSpecification", name: "Bar & Restaurant" },
      { "@type": "LocationFeatureSpecification", name: "Live Music" },
      { "@type": "LocationFeatureSpecification", name: "Waterfront Cabins" },
      { "@type": "LocationFeatureSpecification", name: "RV Camping" },
    ],
  };

  return (
    <html lang="en" className={`${outfit.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <LayoutChrome announcement={announcement} settings={settings}>{children}</LayoutChrome>
      </body>
    </html>
  );
}
