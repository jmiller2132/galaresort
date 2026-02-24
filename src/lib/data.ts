// ─── Type Definitions ───────────────────────────────────────────────────────

export interface CabinImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ImageData {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Cabin {
  slug: string;
  name: string;
  seasonType: "3-season" | "year-round";
  maxGuests: number;
  rateNightly: number;
  rateWeekly: number;
  minNights: number;
  dogFriendly: boolean;
  description: string;
  shortDescription: string;
  amenities: string[];
  images: CabinImage[];
}

export interface SeasonalSite {
  slug: string;
  name: string;
  pricePerSeason: number;
  features: string[];
  description: string;
  image: ImageData;
}

export interface GalaEvent {
  slug: string;
  title: string;
  date: string;
  category: "live-music" | "seasonal" | "community" | "special";
  description: string;
  featured: boolean;
  image?: ImageData;
}

export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  category: "waterfront" | "cabins" | "bar" | "grounds";
}

export interface Amenity {
  icon: string;
  label: string;
}

export interface CampingConfig {
  rateNightly: number;
  rateWeekly: number;
  maxLength: string;
  hookups: string;
  description: string;
  features: string[];
  image: ImageData;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

export function formatPrice(amount: number): string {
  return `$${amount.toLocaleString()}`;
}

// ─── Cabin Data ─────────────────────────────────────────────────────────────

export const cabins: Cabin[] = [
  {
    slug: "catfish",
    name: "Catfish",
    seasonType: "3-season",
    maxGuests: 4,
    rateNightly: 150,
    rateWeekly: 900,
    minNights: 2,
    dogFriendly: false,
    description:
      "The Catfish cabin sits right on the banks of the Wolf River, with patio doors that open to the water and a private log porch built for slow mornings and long evenings. It's a comfortable, rustic setup with a loft sleeping area, and it comes with its own pier — so you're steps from the river whether you're fishing, launching a kayak, or just watching it roll by.\n\nInside, everything you need is already here: bed linens, cooking utensils, a microwave, TV, and central air and heat to keep things comfortable all season. Just bring your towels and settle in.",
    shortDescription:
      "A cozy loft cabin right on the Wolf River with a private log porch, patio doors on the water, and its own pier.",
    amenities: ["Waterfront", "Private Pier", "Log Porch", "Patio Doors", "Loft Sleeping Area", "Furnished", "Bed Linens Provided", "Cooking Utensils", "Microwave", "TV", "Central Air", "Central Heat", "River Views"],
    images: [
      { src: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1200&q=80", alt: "Catfish cabin exterior on the Wolf River", width: 1200, height: 800 },
      { src: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1200&q=80", alt: "Catfish cabin interior", width: 1200, height: 800 },
      { src: "https://images.unsplash.com/photo-1595521624992-48a59aef95e3?w=1200&q=80", alt: "View from Catfish cabin dock", width: 1200, height: 800 },
    ],
  },
  {
    slug: "muskie",
    name: "Muskie",
    seasonType: "3-season",
    maxGuests: 8,
    rateNightly: 150,
    rateWeekly: 995,
    minNights: 2,
    dogFriendly: false,
    description:
      "The Muskie is one of the bigger cabins at The Gala, with a private master bedroom, a bunk bedroom, a loft, and an open living and dining area that gives your whole group room to spread out. It's a park model setup that feels like a real home base on the river — not cramped, not fussy, just comfortable.\n\nEverything's furnished and ready to go: bed linens, cooking utensils, microwave, TV, and central air and heat. Bring your towels, grab a spot on the water, and enjoy slow mornings and long evenings with the Wolf River right outside your door.",
    shortDescription:
      "A spacious park model cabin with two bedrooms, a loft, and room for up to eight — right on the Wolf River with everything you need to settle in.",
    amenities: ["Waterfront", "Private Master Bedroom", "Bunk Bedroom", "Loft Sleeping Area", "Living Room", "Dining Area", "Furnished", "Bed Linens Provided", "Cooking Utensils", "Microwave", "TV", "Central Air", "Central Heat"],
    images: [
      { src: "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?w=1200&q=80", alt: "Muskie cabin overlooking the Wolf River", width: 1200, height: 800 },
      { src: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1200&q=80", alt: "Muskie cabin interior", width: 1200, height: 800 },
      { src: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1200&q=80", alt: "Muskie cabin dock area", width: 1200, height: 800 },
    ],
  },
  {
    slug: "walleye",
    name: "Walleye",
    seasonType: "3-season",
    maxGuests: 6,
    rateNightly: 150,
    rateWeekly: 995,
    minNights: 2,
    dogFriendly: false,
    description:
      "The Walleye is a two-bedroom park model with a full kitchen and full bath, so it feels less like a cabin rental and more like your own place on the river. Patio doors open things up and let the outside in, and there's a living room and dining area with plenty of space to cook, eat, and hang out without being on top of each other.\n\nIt comes fully furnished with bed linens, cooking utensils, microwave, TV, and central air and heat. Just bring your towels and you're set. Whether you're here for a long weekend or a full week on the Wolf River, the Walleye makes it easy to settle in and stay a while.",
    shortDescription:
      "A two-bedroom park model with a full kitchen, full bath, and patio doors — comfortably set up for up to six on the Wolf River.",
    amenities: ["Waterfront", "Two Bedrooms", "Full Kitchen", "Full Bath", "Living Room", "Dining Area", "Patio Doors", "Furnished", "Bed Linens Provided", "Cooking Utensils", "Microwave", "TV", "Central Air", "Central Heat"],
    images: [
      { src: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1200&q=80", alt: "Walleye cabin on the riverfront", width: 1200, height: 800 },
      { src: "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?w=1200&q=80", alt: "Walleye cabin interior", width: 1200, height: 800 },
      { src: "https://images.unsplash.com/photo-1595521624992-48a59aef95e3?w=1200&q=80", alt: "Walleye cabin deck view", width: 1200, height: 800 },
    ],
  },
  {
    slug: "perch",
    name: "Perch",
    seasonType: "3-season",
    maxGuests: 4,
    rateNightly: 150,
    rateWeekly: 900,
    minNights: 2,
    dogFriendly: false,
    description:
      "The Perch cabin is tucked right on the banks of the Wolf River, with patio doors overlooking the water and a private log porch that's made for doing not much at all. There's a cozy loft upstairs, and the cabin comes with its own pier — so the river is basically your front yard.\n\nIt's fully furnished with bed linens, cooking utensils, a microwave, TV, and central air and heat. Bring your towels and you're good. The Perch is one of those spots where you can keep it simple — morning coffee on the porch, an afternoon on the pier, and nothing on the schedule but the river.",
    shortDescription:
      "A rustic loft cabin on the banks of the Wolf River with a private log porch, patio doors on the water, and its own pier.",
    amenities: ["Waterfront", "Private Pier", "Log Porch", "Patio Doors", "Loft Sleeping Area", "Furnished", "Bed Linens Provided", "Cooking Utensils", "Microwave", "TV", "Central Air", "Central Heat", "River Views"],
    images: [
      { src: "https://images.unsplash.com/photo-1595521624992-48a59aef95e3?w=1200&q=80", alt: "Perch cabin by the water", width: 1200, height: 800 },
      { src: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1200&q=80", alt: "Perch cabin interior", width: 1200, height: 800 },
      { src: "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?w=1200&q=80", alt: "Perch cabin river view", width: 1200, height: 800 },
    ],
  },
  {
    slug: "white-bass",
    name: "White Bass",
    seasonType: "3-season",
    maxGuests: 6,
    rateNightly: 150,
    rateWeekly: 995,
    minNights: 2,
    dogFriendly: false,
    description:
      "The White Bass is a cottage-style cabin set near the shore of the Wolf River, with a warm knotty pine interior that gives it a character all its own. With three rooms and space for up to six, there's enough room to spread out without losing that cozy, lived-in feel — and your own pier puts you right at the water's edge.\n\nEverything's furnished and ready: bed linens, cooking utensils, a microwave, TV, and central air and heat. Just bring your towels. The White Bass has a little more of that classic cottage charm — the kind of place where you kick off your shoes, open the door, and let the river set the pace.",
    shortDescription:
      "A knotty pine cottage near the Wolf River shore with three rooms, its own pier, and space for up to six.",
    amenities: ["Waterfront", "Private Pier", "Knotty Pine Interior", "Three Rooms", "Furnished", "Bed Linens Provided", "Cooking Utensils", "Microwave", "TV", "Central Air", "Central Heat"],
    images: [
      { src: "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?w=1200&q=80", alt: "White Bass cabin exterior", width: 1200, height: 800 },
      { src: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1200&q=80", alt: "White Bass cabin interior", width: 1200, height: 800 },
      { src: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1200&q=80", alt: "White Bass cabin dock area", width: 1200, height: 800 },
    ],
  },
  {
    slug: "northern-pike",
    name: "The Northern Pike",
    seasonType: "year-round",
    maxGuests: 6,
    rateNightly: 150,
    rateWeekly: 900,
    minNights: 2,
    dogFriendly: true,
    description:
      "Our only four-season cabin, The Northern Pike is built for year-round comfort on the Wolf River. Insulated and heated, it's perfect for those who want to experience the river in every season — from summer days on the dock to quiet winter mornings with snow on the water. Sleeps six, with all the comforts of home.",
    shortDescription:
      "Our only four-season cabin — insulated, heated, and built for year-round life on the Wolf River.",
    amenities: [
      "Waterfront",
      "Private Dock",
      "Year-Round Heat",
      "Furnished",
      "River Views",
      "Grill Area",
    ],
    images: [
      { src: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1200&q=80", alt: "The Northern Pike four-season cabin exterior", width: 1200, height: 800 },
      { src: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1200&q=80", alt: "The Northern Pike cabin interior", width: 1200, height: 800 },
      { src: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1200&q=80", alt: "The Northern Pike cabin river view", width: 1200, height: 800 },
    ],
  },
];

// ─── Seasonal Sites ─────────────────────────────────────────────────────────

export const seasonalSites: SeasonalSite[] = [
  {
    slug: "river",
    name: "River Site",
    pricePerSeason: 4500,
    description:
      "Premium riverfront seasonal sites with direct Wolf River access. Every site is on the water with your own dock space — your home on the river for the entire season.",
    features: [
      "Direct river frontage",
      "Private dock space",
      "Water & electric hookups",
      "Seasonal community",
      "Access to bar & events",
    ],
    image: {
      src: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200&q=80",
      alt: "Riverfront seasonal site on the Wolf River",
      width: 1200,
      height: 800,
    },
  },
  {
    slug: "channel",
    name: "Channel Site",
    pricePerSeason: 4000,
    description:
      "Channel-side seasonal sites with water access and a quieter setting. Still on the water, still part of the Gala community — with all the same resort amenities.",
    features: [
      "Channel water frontage",
      "Dock access",
      "Water & electric hookups",
      "Seasonal community",
      "Access to bar & events",
    ],
    image: {
      src: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=1200&q=80",
      alt: "Channel seasonal site at Gala Resort",
      width: 1200,
      height: 800,
    },
  },
];

// ─── Camping ────────────────────────────────────────────────────────────────

export const campingConfig: CampingConfig = {
  rateNightly: 45,
  rateWeekly: 275,
  maxLength: "One camping unit per site",
  hookups: "Water & electric (30/50 AMP)",
  description:
    "Spacious, semi-shaded campsites on the Wolf River with water and electric hookups, fire rings, and picnic tables at every site. Whether you're set up in an RV or pitching a tent, you've got 30 or 50 AMP service, clean showers, and access to everything at The Gala — the bar, live music, boat launch, and more. Group sites are available too, so bring the crew.",
  features: [
    "Water & electric hookups",
    "30 & 50 AMP service",
    "Semi-shaded sites",
    "Fire rings & picnic tables",
    "Clean showers",
    "Dump station available",
    "Group site available",
    "Boat launch access",
    "Bar & restaurant access",
    "Pet friendly (dogs only, limit 2)",
  ],
  image: {
    src: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200&q=80",
    alt: "RV campsite at Gala Resort on the Wolf River",
    width: 1200,
    height: 800,
  },
};

// ─── Events ─────────────────────────────────────────────────────────────────

export const events: GalaEvent[] = [
  {
    slug: "river-road-band-march",
    title: "Live Music: River Road Band",
    date: "2026-03-14",
    description:
      "Kick off the season with live country and rock on the outdoor patio. Cold drinks, good vibes, Wolf River views.",
    image: {
      src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200&q=80",
      alt: "Outdoor live music performance at dusk",
      width: 1200,
      height: 800,
    },
    featured: true,
    category: "live-music",
  },
  {
    slug: "memorial-day-weekend",
    title: "Memorial Day Weekend",
    date: "2026-05-23",
    description:
      "The unofficial start of summer on the Wolf River. Live music both nights, food specials, and good times with the Gala community.",
    image: {
      src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80",
      alt: "Golden summer landscape along the river",
      width: 1200,
      height: 800,
    },
    featured: true,
    category: "seasonal",
  },
  {
    slug: "4th-of-july",
    title: "4th of July Celebration",
    date: "2026-07-04",
    description:
      "Celebrate Independence Day riverfront-style. Live entertainment, cookout specials, and fireworks over the Wolf River.",
    image: {
      src: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1200&q=80",
      alt: "Fourth of July fireworks over the Wolf River",
      width: 1200,
      height: 800,
    },
    featured: true,
    category: "seasonal",
  },
  {
    slug: "live-music-saturday-june",
    title: "Live Music Saturday",
    date: "2026-06-20",
    description:
      "Another great Saturday on the patio with live music, drinks, and the river breeze. Check back for artist lineup.",
    image: {
      src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
      alt: "Warm patio evening with ambient lighting",
      width: 1200,
      height: 800,
    },
    featured: false,
    category: "live-music",
  },
];

// ─── Gallery ────────────────────────────────────────────────────────────────

export const galleryImages: GalleryImage[] = [
  { src: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200&q=80", alt: "Campsite along the Wolf River", width: 1200, height: 800, category: "grounds" },
  { src: "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?w=1200&q=80", alt: "Waterfront cabin at Gala Resort", width: 1200, height: 800, category: "cabins" },
  { src: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=1200&q=80", alt: "Camping under the trees", width: 1200, height: 800, category: "grounds" },
  { src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200&q=80", alt: "Outdoor live music on the patio", width: 1200, height: 800, category: "bar" },
  { src: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1200&q=80", alt: "Cabin exterior with river backdrop", width: 1200, height: 800, category: "cabins" },
  { src: "/images/wolf-river-canoe.png", alt: "Canoeing down the Wolf River on a sunny day", width: 1200, height: 800, category: "waterfront" },
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80", alt: "Evening dining on the outdoor patio", width: 1200, height: 800, category: "bar" },
  { src: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1200&q=80", alt: "Cabin at sunset on the waterfront", width: 1200, height: 800, category: "cabins" },
  { src: "/images/wolf-river-new-london.png", alt: "Wolf River near New London, Wisconsin", width: 1200, height: 800, category: "waterfront" },
  { src: "https://images.unsplash.com/photo-1595521624992-48a59aef95e3?w=1200&q=80", alt: "Waterfront deck overlooking the river", width: 1200, height: 800, category: "waterfront" },
  { src: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1200&q=80", alt: "The Northern Pike four-season cabin", width: 1200, height: 800, category: "cabins" },
  { src: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1200&q=80", alt: "Outdoor evening gathering at The Gala", width: 1200, height: 800, category: "bar" },
];

// ─── Amenities ──────────────────────────────────────────────────────────────

export const amenities: Amenity[] = [
  { icon: "anchor", label: "Boat Launch" },
  { icon: "ship", label: "Private Docks" },
  { icon: "beer", label: "Riverfront Bar" },
  { icon: "music", label: "Live Music" },
  { icon: "sun", label: "Outdoor Patio" },
  { icon: "umbrella", label: "Small Beach" },
  { icon: "baby", label: "Kids Park" },
  { icon: "target", label: "Horseshoes" },
];

// ─── Data Access Functions (Phase 2: replace bodies with Sanity queries) ────

export function getCabins(): Cabin[] {
  return cabins;
}

export function getCabinBySlug(slug: string): Cabin | undefined {
  return cabins.find((c) => c.slug === slug);
}

export function getFeaturedCabins(count = 3): Cabin[] {
  return cabins.slice(0, count);
}

export function getSeasonalSites(): SeasonalSite[] {
  return seasonalSites;
}

export function getEvents(): GalaEvent[] {
  return events;
}

export function getFeaturedEvents(): GalaEvent[] {
  return events.filter((e) => e.featured);
}

export function getCampingConfig(): CampingConfig {
  return campingConfig;
}

export function getGalleryImages(): GalleryImage[] {
  return galleryImages;
}

export function getAmenities(): Amenity[] {
  return amenities;
}
