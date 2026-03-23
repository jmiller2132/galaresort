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
  dateLabel?: string;
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

// Resort amenities for Home page strip (icon = lucide-react icon name)
export const resortAmenities: Amenity[] = [
  { icon: "Home", label: "Waterfront Cabins" },
  { icon: "Beer", label: "Tiki Bar" },
  { icon: "Sun", label: "Two-Tier Patio" },
  { icon: "Ship", label: "Docks & Wharfs" },
  { icon: "Anchor", label: "Boat Launch" },
  { icon: "Music", label: "Live Music" },
  { icon: "Users2", label: "Seasonal Community" },
  { icon: "Umbrella", label: "Small Beach" },
  { icon: "Baby", label: "Kids Park" },
  { icon: "Magnet", label: "Horseshoes" },
];

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
    dogFriendly: true,
    description:
      "The Catfish cabin sits right on the banks of the Wolf River, with patio doors that open to the water and a private log porch built for slow mornings and long evenings. It's a comfortable, rustic setup with a loft sleeping area, and it comes with its own pier — so you're steps from the river whether you're fishing, launching a kayak, or just watching it roll by.\n\nInside, everything you need is already here: bed linens, cooking utensils, a microwave, TV, and central air and heat to keep things comfortable all season. Just bring your towels and settle in.",
    shortDescription:
      "A cozy loft cabin right on the Wolf River with a private log porch, patio doors on the water, and its own pier.",
    amenities: ["Waterfront", "Private Pier", "Log Porch", "Patio Doors", "Loft Sleeping Area", "Furnished", "Bed Linens Provided", "Cooking Utensils", "Microwave", "TV", "Central Air", "Central Heat", "River Views"],
    images: [
      { src: "/images/cabins/catfish/DJI_20260304111831_0063_D.JPG", alt: "Catfish cabin aerial view on the Wolf River", width: 1200, height: 800 },
      { src: "/images/cabins/catfish/IMG_2767.jpg", alt: "Catfish cabin exterior from the riverbank", width: 1200, height: 800 },
      { src: "/images/cabins/catfish/IMG_2768.jpg", alt: "Catfish cabin porch and dock", width: 1200, height: 800 },
      { src: "/images/cabins/catfish/IMG_2769.jpg", alt: "Catfish cabin waterfront view", width: 1200, height: 800 },
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
    dogFriendly: true,
    description:
      "The Muskie is one of the bigger cabins at The Gala, with a private master bedroom, a bunk bedroom, a loft, and an open living and dining area that gives your whole group room to spread out. It's a park model setup that feels like a real home base on the river — not cramped, not fussy, just comfortable.\n\nEverything's furnished and ready to go: bed linens, cooking utensils, microwave, TV, and central air and heat. Bring your towels, grab a spot on the water, and enjoy slow mornings and long evenings with the Wolf River right outside your door.",
    shortDescription:
      "A spacious park model cabin with two bedrooms, a loft, and room for up to eight — right on the Wolf River with everything you need to settle in.",
    amenities: ["Waterfront", "Private Master Bedroom", "Bunk Bedroom", "Loft Sleeping Area", "Living Room", "Dining Area", "Furnished", "Bed Linens Provided", "Cooking Utensils", "Microwave", "TV", "Central Air", "Central Heat"],
    images: [
      { src: "/images/cabins/muskie/DSC00391.jpg", alt: "Muskie cabin exterior on the Wolf River", width: 1200, height: 800 },
      { src: "/images/cabins/muskie/DSC00397.jpg", alt: "Muskie cabin from the dock", width: 1200, height: 800 },
      { src: "/images/cabins/muskie/IMG_2762.jpg", alt: "Muskie cabin waterfront side", width: 1200, height: 800 },
      { src: "/images/cabins/muskie/IMG_2764.jpg", alt: "Muskie cabin and river view", width: 1200, height: 800 },
      { src: "/images/cabins/muskie/IMG_2765.jpg", alt: "Muskie cabin from the shoreline", width: 1200, height: 800 },
      { src: "/images/cabins/muskie/IMG_2766.jpg", alt: "Muskie cabin and pier", width: 1200, height: 800 },
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
    dogFriendly: true,
    description:
      "The Walleye is a two-bedroom park model with a full kitchen and full bath, so it feels less like a cabin rental and more like your own place on the river. Patio doors open things up and let the outside in, and there's a living room and dining area with plenty of space to cook, eat, and hang out without being on top of each other.\n\nIt comes fully furnished with bed linens, cooking utensils, microwave, TV, and central air and heat. Just bring your towels and you're set. Whether you're here for a long weekend or a full week on the Wolf River, the Walleye makes it easy to settle in and stay a while.",
    shortDescription:
      "A two-bedroom park model with a full kitchen, full bath, and patio doors — comfortably set up for up to six on the Wolf River.",
    amenities: ["Waterfront", "Two Bedrooms", "Full Kitchen", "Full Bath", "Living Room", "Dining Area", "Patio Doors", "Furnished", "Bed Linens Provided", "Cooking Utensils", "Microwave", "TV", "Central Air", "Central Heat"],
    images: [
      { src: "/images/cabins/walleye/DSC00430.jpg", alt: "Walleye cabin exterior on the Wolf River", width: 1200, height: 800 },
      { src: "/images/cabins/walleye/DSC00431.jpg", alt: "Walleye cabin from the dock", width: 1200, height: 800 },
      { src: "/images/cabins/walleye/DSC00428.jpg", alt: "Walleye cabin waterfront", width: 1200, height: 800 },
      { src: "/images/cabins/walleye/IMG_2754.jpg", alt: "Walleye cabin and river view", width: 1200, height: 800 },
      { src: "/images/cabins/walleye/IMG_2755.jpg", alt: "Walleye cabin riverside", width: 1200, height: 800 },
      { src: "/images/cabins/walleye/IMG_2756.jpg", alt: "Walleye cabin from the shoreline", width: 1200, height: 800 },
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
    dogFriendly: true,
    description:
      "The Perch cabin is tucked right on the banks of the Wolf River, with patio doors overlooking the water and a private log porch that's made for doing not much at all. There's a cozy loft upstairs, and the cabin comes with its own pier — so the river is basically your front yard.\n\nIt's fully furnished with bed linens, cooking utensils, a microwave, TV, and central air and heat. Bring your towels and you're good. The Perch is one of those spots where you can keep it simple — morning coffee on the porch, an afternoon on the pier, and nothing on the schedule but the river.",
    shortDescription:
      "A rustic loft cabin on the banks of the Wolf River with a private log porch, patio doors on the water, and its own pier.",
    amenities: ["Waterfront", "Private Pier", "Log Porch", "Patio Doors", "Loft Sleeping Area", "Furnished", "Bed Linens Provided", "Cooking Utensils", "Microwave", "TV", "Central Air", "Central Heat", "River Views"],
    images: [
      { src: "/images/cabins/perch/DSC00434.jpg", alt: "Perch cabin exterior on the Wolf River", width: 1200, height: 800 },
      { src: "/images/cabins/perch/DSC00433.jpg", alt: "Perch cabin from the dock", width: 1200, height: 800 },
      { src: "/images/cabins/perch/DJI_20260304112142_0068_D.JPG", alt: "Perch cabin aerial view", width: 1200, height: 800 },
      { src: "/images/cabins/perch/IMG_2758.jpg", alt: "Perch cabin waterfront", width: 1200, height: 800 },
      { src: "/images/cabins/perch/IMG_2759.jpg", alt: "Perch cabin and pier", width: 1200, height: 800 },
      { src: "/images/cabins/perch/IMG_2760.jpg", alt: "Perch cabin from the shoreline", width: 1200, height: 800 },
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
    dogFriendly: true,
    description:
      "The White Bass is a cottage-style cabin set near the shore of the Wolf River, with a warm knotty pine interior that gives it a character all its own. With three rooms and space for up to six, there's enough room to spread out without losing that cozy, lived-in feel — and your own pier puts you right at the water's edge.\n\nEverything's furnished and ready: bed linens, cooking utensils, a microwave, TV, and central air and heat. Just bring your towels. The White Bass has a little more of that classic cottage charm — the kind of place where you kick off your shoes, open the door, and let the river set the pace.",
    shortDescription:
      "A knotty pine cottage near the Wolf River shore with three rooms, its own pier, and space for up to six.",
    amenities: ["Waterfront", "Private Pier", "Knotty Pine Interior", "Three Rooms", "Furnished", "Bed Linens Provided", "Cooking Utensils", "Microwave", "TV", "Central Air", "Central Heat"],
    images: [
      { src: "/images/cabins/whitebass/DJI_20260304111958_0065_D.JPG", alt: "White Bass cabin aerial view on the Wolf River", width: 1200, height: 800 },
      { src: "/images/cabins/whitebass/DSC00419.jpg", alt: "White Bass cabin exterior", width: 1200, height: 800 },
      { src: "/images/cabins/whitebass/DSC00420.jpg", alt: "White Bass cabin from the water", width: 1200, height: 800 },
      { src: "/images/cabins/whitebass/DSC00423.jpg", alt: "White Bass cabin and dock", width: 1200, height: 800 },
      { src: "/images/cabins/whitebass/IMG_2746.jpg", alt: "White Bass cabin shoreline view", width: 1200, height: 800 },
      { src: "/images/cabins/whitebass/IMG_2747.jpg", alt: "White Bass cabin riverfront", width: 1200, height: 800 },
      { src: "/images/cabins/whitebass/IMG_2748.jpg", alt: "White Bass cabin porch area", width: 1200, height: 800 },
      { src: "/images/cabins/whitebass/IMG_2750.jpg", alt: "White Bass cabin and pier", width: 1200, height: 800 },
      { src: "/images/cabins/whitebass/IMG_2752.jpg", alt: "White Bass cabin from the bank", width: 1200, height: 800 },
    ],
  },
  {
    slug: "northern-pike",
    name: "Northern Pike – Four Season Cabin",
    seasonType: "year-round",
    maxGuests: 6,
    rateNightly: 150,
    rateWeekly: 900,
    minNights: 2,
    dogFriendly: true,
    description:
      "Our only four-season cabin, the Northern Pike is built for year-round comfort on the Wolf River. Insulated and heated, it's perfect for those who want to experience the river in every season — from summer days on the dock to quiet winter mornings with snow on the water. Sleeps six, with all the comforts of home.",
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
      { src: "/images/cabins/4season/DSC00360.jpg", alt: "Northern Pike four-season cabin exterior", width: 1200, height: 800 },
      { src: "/images/cabins/4season/DSC00352.jpg", alt: "Northern Pike cabin from the river", width: 1200, height: 800 },
      { src: "/images/cabins/4season/IMG_2773.jpg", alt: "Northern Pike cabin waterfront", width: 1200, height: 800 },
      { src: "/images/cabins/4season/IMG_2774.jpg", alt: "Northern Pike cabin and dock", width: 1200, height: 800 },
      { src: "/images/cabins/4season/IMG_2775.jpg", alt: "Northern Pike cabin river view", width: 1200, height: 800 },
      { src: "/images/cabins/4season/IMG_2776.jpg", alt: "Northern Pike cabin from the shoreline", width: 1200, height: 800 },
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
      src: "/images/exterior/DJI_20260304112606_0075_D.jpg",
      alt: "Riverfront seasonal sites along the Wolf River",
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
      src: "/images/exterior/DJI_20260304112633_0078_D.jpg",
      alt: "Channel seasonal sites at Gala Resort",
      width: 1200,
      height: 800,
    },
  },
];

// ─── Camping ────────────────────────────────────────────────────────────────

export const campingConfig: CampingConfig = {
  rateNightly: 55,
  rateWeekly: 330,
  maxLength: "One camping unit per site",
  hookups: "Water & electric",
  description:
    "Spacious, semi-shaded campsites on the Wolf River with water and electric hookups, fire rings, and picnic tables at every site. Whether you're set up in an RV or pitching a tent, you've got everything you need — plus access to the bar, live music, boat launch, and more. Pull up, plug in, and enjoy the river.",
  features: [
    "Water & electric hookups",
    "Semi-shaded sites",
    "Fire rings & picnic tables",
    "Boat launch access",
    "Bar & restaurant access",
    "2 dogs allowed per site",
  ],
  image: {
    src: "/images/exterior/DJI_20260304112805_0083_D.jpg",
    alt: "Aerial view of campsites along the Wolf River",
    width: 1200,
    height: 800,
  },
};

// ─── Events ─────────────────────────────────────────────────────────────────

export const events: GalaEvent[] = [];

// ─── Gallery ────────────────────────────────────────────────────────────────

export const galleryImages: GalleryImage[] = [
  { src: "/images/exterior/DJI_20260304111831_0063_D-2.jpg", alt: "Aerial view of Gala Resort on the Wolf River", width: 1200, height: 800, category: "waterfront" },
  { src: "/images/exterior/DJI_20260304112426_0073_D.jpg", alt: "Drone view of the Wolf River waterfront", width: 1200, height: 800, category: "waterfront" },
  { src: "/images/exterior/DJI_20260304113558_0090_D.jpg", alt: "Gala Resort property from above", width: 1200, height: 800, category: "waterfront" },
  { src: "/images/exterior/DJI_20260304113737_0093_D.jpg", alt: "Wolf River and resort docks aerial view", width: 1200, height: 800, category: "waterfront" },
  { src: "/images/cabins/catfish/IMG_2767.jpg", alt: "Catfish cabin on the Wolf River", width: 1200, height: 800, category: "cabins" },
  { src: "/images/cabins/muskie/DSC00391.jpg", alt: "Muskie cabin exterior", width: 1200, height: 800, category: "cabins" },
  { src: "/images/cabins/walleye/DSC00430.jpg", alt: "Walleye cabin on the waterfront", width: 1200, height: 800, category: "cabins" },
  { src: "/images/cabins/4season/DSC00360.jpg", alt: "Northern Pike four-season cabin", width: 1200, height: 800, category: "cabins" },
  { src: "/images/bar/Virtual Staging Bar Area-20.png", alt: "Gala Resort bar area", width: 1200, height: 800, category: "bar" },
  { src: "/images/bar/Virtual Staging Dining Room.PNG", alt: "Bar dining room at The Gala", width: 1200, height: 800, category: "bar" },
  { src: "/images/bar/Untitled design-13.png", alt: "Riverfront bar at Gala Resort", width: 1200, height: 800, category: "bar" },
  { src: "/images/exterior/DJI_20260304112824_0085_D.jpg", alt: "Gala Resort from the Wolf River", width: 1200, height: 800, category: "waterfront" },
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
  { icon: "magnet", label: "Horseshoes" },
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
