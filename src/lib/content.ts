/**
 * Editable page copy and site-wide settings.
 *
 * Each object below is the fallback for a Sanity singleton document of the
 * same name. Any field left blank in the Studio falls back to the value here,
 * and scripts/seed-pages.ts uses these values as the starting content.
 */

import { resortAmenities } from "./data";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface ImageContent {
  src: string;
  alt: string;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  image: ImageContent;
}

export interface SiteSettings {
  rvPhone: string;
  barPhone: string;
  email: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
  facebookUrl: string;
  instagramUrl: string;
  seasonNote: string;
  footerTagline: string;
}

export interface HomePageContent {
  seoDescription: string;
  hero: { eyebrow: string; headline: string; subheadline: string; image: ImageContent };
  intro: { eyebrow: string; heading: string; body: string; image: ImageContent };
  featuredCabins: { label: string; title: string; description: string; buttonLabel: string };
  amenities: { heading: string; items: { label: string; icon: string }[]; footnote: string };
  events: {
    label: string;
    title: string;
    description: string;
    emptyLabel: string;
    emptyTitle: string;
    emptyDescription: string;
    liveMusicTitle: string;
    liveMusicText: string;
  };
  cta: { eyebrow: string; heading: string; body: string; image: ImageContent };
}

export interface AboutPageContent {
  seoDescription: string;
  hero: HeroContent;
  story: { eyebrow: string; heading: string; body: string; image: ImageContent };
  improvements: { eyebrow: string; heading: string; intro: string; items: string[]; footnote: string };
  values: { heading: string; items: { title: string; description: string }[] };
}

export interface BarEventsPageContent {
  seoDescription: string;
  hero: HeroContent;
  bar: { eyebrow: string; heading: string; body: string; highlights: string[]; image: ImageContent };
  liveMusic: {
    label: string;
    title: string;
    cardTitle: string;
    cardSubtitle: string;
    body: string;
    socialNote: string;
    image: ImageContent;
  };
}

export interface ContactPageContent {
  seoDescription: string;
  hero: HeroContent;
  formHeading: string;
  formIntro: string;
}

export interface StayCardContent {
  title: string;
  price: string;
  description: string;
  image: ImageContent;
}

export interface StayPageContent {
  seoDescription: string;
  hero: HeroContent;
  intro: string;
  callNote: string;
  cabinsCard: StayCardContent;
  seasonalCard: StayCardContent;
  campingCard: StayCardContent;
}

export interface CabinsPageContent {
  seoDescription: string;
  hero: HeroContent;
  intro: string;
  callNote: string;
  unavailable: { label: string; short: string; detail: string };
  detail: { petPolicy: string; holidayMinimum: string; ratesNote: string; holidayNote: string };
}

export interface SeasonalPageContent {
  seoDescription: string;
  hero: HeroContent;
  intro: string;
  callNote: string;
  goodToKnow: string[];
}

export interface CampingPageContent {
  seoDescription: string;
  hero: HeroContent;
  eyebrow: string;
  heading: string;
  policyNote: string;
}

export interface MenuPageContent {
  seoDescription: string;
  hero: HeroContent;
  footnote: string;
}

export interface GalleryPageContent {
  seoDescription: string;
  hero: HeroContent;
  footnote: string;
}

// ─── Defaults ───────────────────────────────────────────────────────────────

function img(src: string, alt: string): ImageContent {
  return { src, alt };
}

export const siteSettings: SiteSettings = {
  rvPhone: "(920) 446-3222",
  barPhone: "(920) 446-2423",
  email: "galaresortllc@gmail.com",
  streetAddress: "9692 County Rd H",
  city: "Fremont",
  state: "WI",
  zip: "54940",
  facebookUrl: "https://www.facebook.com/galaresort/",
  instagramUrl: "https://www.instagram.com/galaresort_fremont",
  seasonNote: "Open seasonally — check for dates",
  footerTagline:
    "A riverfront resort and campground on the Wolf River in Fremont, Wisconsin. Cabins, camping, live music, and good times on the water.",
};

export const homePage: HomePageContent = {
  seoDescription:
    "Waterfront cabins, camping, and seasonal sites on the Wolf River. Live music, a riverfront bar, and a community that's always improving. Come see what we're building.",
  hero: {
    eyebrow: "Wolf River • Fremont, WI",
    headline: "The River, Reimagined",
    subheadline:
      "Reimagined from the docks up — waterfront cabins, a tiki bar, and live music on the patio, right on the Wolf River.",
    image: img(
      "/images/exterior/wolf-river-aerial-wide.jpeg",
      "Aerial view of the Wolf River and Gala Resort waterfront in Fremont, Wisconsin"
    ),
  },
  intro: {
    eyebrow: "Welcome to The Gala",
    heading: "Built Around the Water",
    body:
      "Nestled on the banks of the Wolf River in Fremont, Wisconsin, Gala Resort is more than a place to stay — it's a place to experience. Spend the morning on your private dock, grab lunch at the tiki bar, catch live music from the two-tier patio, or just sit back and watch the river roll by.\n\nUnder new ownership and actively being improved, The Gala is becoming the go-to waterfront destination on the Wolf River. Hundreds of feet of new wharfs and docks, a fully remodeled bar and main house, and upgraded cabins throughout — this is just the beginning. Come see what we're building.",
    image: img("/images/exterior/docks-aerial-bar-river.jpeg", "Gala Resort docks and bar on the Wolf River"),
  },
  featuredCabins: {
    label: "Stay With Us",
    title: "Waterfront Cabins",
    description:
      "Every cabin sits right on the water. Step out your door, walk down to the river, and leave everything else behind.",
    buttonLabel: "See All Six Cabins",
  },
  amenities: {
    heading: "Resort Amenities",
    items: resortAmenities,
    footnote: "Everything here is built around life on the river, from dockside cabins to live music by the patio.",
  },
  events: {
    label: "What's Happening",
    title: "Upcoming Events",
    description:
      "Live music, seasonal celebrations, and good times on the river. There's always something going on at The Gala.",
    emptyLabel: "Every Weekend",
    emptyTitle: "Live Music on the River",
    emptyDescription:
      "Cold drinks, great bands, and summer nights on the Wolf River. There's always a reason to come out to The Gala.",
    liveMusicTitle: "Live Music Every Sunday",
    liveMusicText:
      "Live music every Sunday, plus select Thursdays and Saturdays throughout the season. Bands are announced as they're confirmed — follow us on Facebook and Instagram to see who's playing each week.",
  },
  cta: {
    eyebrow: "Reserve Your Spot",
    heading: "Ready for the River?",
    body:
      "Whether it's a weekend cabin getaway, a seasonal site for the summer, or just a night by the campfire — your spot on the Wolf River is waiting.",
    image: img("/images/exterior/wolf-river-aerial-property.jpeg", "Aerial view of Gala Resort on the Wolf River"),
  },
};

export const aboutPage: AboutPageContent = {
  seoDescription:
    "New ownership, same river, better than ever. We're investing in every part of this property to build the best riverfront community on the Wolf River.",
  hero: {
    title: "Our Story",
    subtitle: "New ownership. Same river. Better than ever.",
    image: img("/images/exterior/bar-aerial-riverside.jpeg", "Gala Resort bar from the riverside"),
  },
  story: {
    eyebrow: "A New Chapter",
    heading: "We Believe in This Place",
    body:
      "Gala Resort has been part of the Wolf River for years. Under new ownership, we're putting serious investment into every corner of this property — new docks and wharfs, fully remodeled cabins, a brand-new tiki bar and two-tier patio, and infrastructure improvements you can see and feel. This isn't a facelift. It's a ground-up rebuild of what The Gala can be.\n\nWhat you see today is phase one, and there's a lot more coming. We're building a waterfront destination that guests, cabin renters, seasonal residents, and the broader Wolf River community will be proud to be part of for years to come.",
    image: img("/images/exterior/docks-aerial-boat.jpeg", "Gala Resort docks with boat on the Wolf River"),
  },
  improvements: {
    eyebrow: "Active Improvements",
    heading: "What We're Working On",
    intro: "We've already begun making significant improvements across the property — and there's much more to come.",
    items: [
      "Brand new docks and wharfs replacing all cabin-assigned docks",
      "350 feet of new seawall this spring, another 350 feet in the fall",
      "Full remodel of the bar & main house — inside and out",
      "New tiki bar and two-tier outdoor patio on the water",
      "Road improvements throughout the property",
      "Every cabin cleaned, repaired, and updated before going into rotation",
    ],
    footnote: "We're investing in every corner of the property, one upgrade at a time.",
  },
  values: {
    heading: "What Drives Us",
    items: [
      {
        title: "Invested & Improving",
        description:
          "We're putting real money and effort into every corner of this property — docks, seawalls, cabins, roads, and the bar. You'll see the difference.",
      },
      {
        title: "Riverfront Lifestyle",
        description:
          "The Wolf River is the heart of The Gala. Everything we do is designed around life on the water — fishing, boating, relaxing, and connecting.",
      },
      {
        title: "Family-Owned & Hands-On",
        description:
          "This isn't a corporate operation. We're here, on-site, making sure every guest feels welcome and every detail is taken care of.",
      },
      {
        title: "Long-Term Vision",
        description:
          "We're building a high-quality riverfront community that guests, cabin renters, and seasonal residents are proud to be part of.",
      },
    ],
  },
};

export const barEventsPage: BarEventsPageContent = {
  seoDescription:
    "Riverfront bar with live music every weekend, cold drinks, and fresh food on the Wolf River at The Gala.",
  hero: {
    title: "Bar & Events",
    subtitle: "Cold drinks, live music, and summer nights on the river",
    image: img("/images/exterior/bar-aerial-patio-river.jpeg", "Gala Resort bar and patio on the Wolf River"),
  },
  bar: {
    eyebrow: "The Social Hub",
    heading: "Right on the Water",
    body:
      "The Gala bar sits right on the Wolf River — a tiki bar, a two-tier outdoor patio, and a fully remodeled main house that comes alive on summer nights. Boaters pull up to the dock, the patio fills up, drinks are cold, and the music carries across the water. It's the kind of place where a quick drink turns into dancing, new friends, and one of those nights you talk about all winter.",
    highlights: ["Live music weekends", "Tiki bar & two-tier patio on the water", "Full bar with food"],
    image: img("/images/exterior/bar-aerial-patio-closeup.jpeg", "Closeup aerial view of the Gala Resort bar patio"),
  },
  liveMusic: {
    label: "Every Weekend",
    title: "Live Music on the River",
    cardTitle: "Live Music Every Sunday",
    cardSubtitle: "Plus select Thursdays and Saturdays",
    body:
      "Live music every Sunday at The Gala, with additional performances on select Thursdays and Saturdays throughout the season. Bands are booked as they're confirmed — follow us on social media to see who's playing each week.",
    socialNote:
      "A full events calendar is coming soon. In the meantime, our Facebook and Instagram are the best place to stay in the loop.",
    image: img("/images/exterior/bar-aerial-riverside.jpeg", "Gala Resort bar from the riverside"),
  },
};

export const contactPage: ContactPageContent = {
  seoDescription:
    "Inquire about cabin rentals, seasonal sites, camping, or events at The Gala. We'll get back to you to confirm availability.",
  hero: {
    title: "Get in Touch",
    subtitle: "Inquire about cabins, campsites, seasonal sites, or events",
    image: img("/images/exterior/docks-aerial-bar-river.jpeg", "Gala Resort docks and bar on the Wolf River"),
  },
  formHeading: "Reservation Inquiry",
  formIntro:
    "Select what you're interested in and we'll get back to you to confirm availability. All reservations are handled via inquiry — no online booking at this time.",
};

export const stayPage: StayPageContent = {
  seoDescription:
    "Waterfront cabins, seasonal sites, and RV camping on the Wolf River. Find your perfect spot at The Gala.",
  hero: {
    title: "Stay With Us",
    subtitle: "Cabins, seasonal sites, and camping on the Wolf River",
    image: img("/images/exterior/wolf-river-aerial-property.jpeg", "Aerial view of Gala Resort on the Wolf River"),
  },
  intro:
    "Every way you stay at The Gala puts you on the Wolf River. Wake up to the water, walk out to your dock, launch your boat, and end the day with cold drinks and live music at the bar. Whether it's a cabin for the weekend, a seasonal site for the summer, or a campsite for the night — this is waterfront living, and it all starts right here.",
  callNote: "Questions about availability? Call the RV Park office at",
  cabinsCard: {
    title: "Cabins",
    price: "From $250/night",
    description:
      "Six waterfront cabins with private docks — wake up on the river, step outside, and you're already there.",
    image: img("/images/exterior/DJI_20260304112142_0068_D-2.jpg", "Waterfront cabins on the Wolf River"),
  },
  seasonalCard: {
    title: "Seasonal Sites",
    price: "From $5000/season",
    description:
      "Your own spot on the river all season long — dock your boat, settle in, and make it yours from April to October.",
    image: img("/images/exterior/DJI_20260304112606_0075_D.jpg", "Seasonal sites along the Wolf River"),
  },
  campingCard: {
    title: "Camping",
    price: "From $95/night",
    description:
      "Pull up to the river with your RV or camper. Full hookups, boat launch access, and the bar is a short walk away.",
    image: img("/images/exterior/DJI_20260304112805_0083_D.jpg", "Aerial view of campsites along the Wolf River"),
  },
};

export const cabinsPage: CabinsPageContent = {
  seoDescription:
    "Six cabins directly on the Wolf River — each with its own dock. Three-season and year-round options. Starting at $250/night.",
  hero: {
    title: "Waterfront Cabins",
    subtitle: "Step out your door to the water — every cabin is on the river",
    image: img("/images/exterior/DJI_20260304112142_0068_D-2.jpg", "Waterfront cabins on the Wolf River"),
  },
  intro:
    "Wake up on the Wolf River. Step outside, and your dock is right there — coffee in hand, water at your feet, nowhere you need to be. Our six cabins sit directly on the river, each with private dock access and full resort amenities a short walk away. Five are three-season cabins named after the fish in these waters. The sixth — the Northern Four Season Cabin — is available year-round.",
  callNote: "To book or check availability, call the RV Park office at",
  unavailable: {
    label: "Under Restoration",
    short: "Not currently available for reservations.",
    detail:
      "This cabin sustained water damage and is currently being renovated. It is not available for reservations at this time.",
  },
  detail: {
    petPolicy: "Pets welcome — up to 2 dogs per cabin at $50 per pet. Dogs must be 25 lbs or less at full maturity.",
    holidayMinimum: "3 on holidays",
    ratesNote: "All rates + taxes & fees. Availability confirmed after inquiry.",
    holidayNote: "Holiday weeks and weekends are subject to a surcharge. Contact us for holiday pricing.",
  },
};

export const seasonalPage: SeasonalPageContent = {
  seoDescription:
    "Every seasonal site is on the water. River and channel frontage from $5,000/season on the Wolf River. April 15 – October 15.",
  hero: {
    title: "Seasonal Sites",
    subtitle: "Every site on the water — your riverfront home for the season",
    image: img("/images/exterior/DJI_20260304112620_0077_D.jpg", "Seasonal sites on the Wolf River"),
  },
  intro:
    "This is your spot on the river all summer. Dock your boat, set up your site, and make it home from April 15 through October 15. Every seasonal site at The Gala is on the water — river or channel frontage, your own dock space, and the kind of boating lifestyle you don't get anywhere else on the Wolf. Walk to the bar, catch live music on the weekends, and be part of a community that comes back year after year.",
  callNote: "Interested in claiming a spot? Call the RV Park office at",
  goodToKnow: [
    "Season runs April 15 – October 15.",
    "Seasonal lessees get year-round electric access and can visit off-season.",
    "Seasonal sites cannot be used as a primary residence.",
  ],
};

export const campingPage: CampingPageContent = {
  seoDescription:
    "RV and tent camping on the Wolf River. Water and electric hookups, fire rings, and resort amenities. From $95/night.",
  hero: {
    title: "Camping",
    subtitle: "Pull up, plug in, and enjoy the river",
    image: img("/images/exterior/DJI_20260304112737_0081_D.jpg", "Campsites on the Wolf River"),
  },
  eyebrow: "On the Water",
  heading: "Camping on the Wolf River",
  policyNote: "2-night minimum on weekends, 3 nights on holidays.",
};

export const menuPage: MenuPageContent = {
  seoDescription:
    "Fresh pizza, smash burgers, wings, and bar favorites at Gala Resort on the Wolf River. Open Tuesday through Sunday.",
  hero: {
    title: "Grill Menu",
    subtitle: "Made fresh to order — right on the Wolf River",
    image: img("/images/exterior/bar-aerial-patio-river.jpeg", "Gala Resort bar and patio on the Wolf River"),
  },
  footnote: "Menu items and prices subject to change.",
};

export const galleryPage: GalleryPageContent = {
  seoDescription:
    "See what life at The Gala looks like — waterfront views, cozy cabins, live music, and good times on the Wolf River.",
  hero: {
    title: "Gallery",
    subtitle: "See what life at The Gala looks like",
    image: img("/images/wolf-river-canoe.png", "Canoe on the Wolf River"),
  },
  footnote: "Professional photography coming soon. Follow us on Facebook and Instagram for the latest photos.",
};
