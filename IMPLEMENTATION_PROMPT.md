# Gala Resort — Phase 1 Website Implementation Prompt

You are building the Phase 1 marketing website for **Gala Resort & RV Park**, a riverfront campground/resort on the Wolf River in Fremont, Wisconsin, under new ownership actively improving the property.

An existing Next.js codebase is already in place. Your job is to **refine, complete, and polish** the current framework so every page is content-complete, visually consistent, and aligned with the approved structure and client philosophy described below. Do not start from scratch — work within the existing architecture and improve it.

---

## Tech Stack (already in place — do not change)

- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS v4** using the `@theme` directive in `src/styles/globals.css`
- **Framer Motion** for scroll-triggered and entrance animations
- **Lucide React** for icons
- **Google Fonts**: Outfit (display/headings), DM Sans (body)
- **yet-another-react-lightbox** for gallery lightbox
- **react-hook-form** for the contact/inquiry form
- Sanity schemas exist but are not connected yet — all data is served from `src/lib/data.ts` for Phase 1
- Unsplash placeholder images throughout — professional photography will come later

---

## Design System (already established — maintain consistency)

### Color Palette (defined in `src/styles/globals.css` under `@theme`)
- `river-blue` (#1B3A5C) — primary brand color, nav CTAs, headings accents
- `river-blue-light` (#2A5A8C) — hover states
- `river-blue-dark` (#0F2640) — dark sections, footer, hero overlays
- `wood` (#8B6914) — secondary accent, warm CTAs, featured badges
- `wood-light` (#C49A2A) — accent text on dark backgrounds
- `sand` (#D4C9B0) — borders, subtle dividers
- `cream` (#F5F2EB) — background sections, body default
- `charcoal` (#2A2A2A) — primary text
- `river-gray` (#6B7B8D) — secondary/body text
- `forest` (#3A6B4A) — checkmarks, positive indicators

### Typography
- Headings: Outfit (via `--font-display`), bold, tracked
- Body: DM Sans (via `--font-sans`)
- Section label pattern: small, uppercase, wide letter-spacing, `text-river-blue` (or `text-wood-light` on dark backgrounds)

### UI Patterns (already established via reusable components)
- `PageHero` — 50vh hero with background image, gradient overlay, animated title + subtitle
- `SectionHeading` — label/title/description trio with staggered AnimateIn
- `AnimateIn` — scroll-triggered fade+slide wrapper (up/down/left/right/none)
- `Button` — primary/secondary/outline/ghost variants, sm/md/lg sizes, supports `href` (renders Link) or `onClick`
- `CTABanner` — full-width CTA section with background image overlay

### Image Handling
All images use Next.js `<Image>` component with `placeholder="blur"` where possible. Use these `sizes` patterns consistently:
- **Full-width hero/banner:** `100vw`
- **Split layout (text + image):** `(max-width: 768px) 100vw, 50vw`
- **3-column card grid:** `(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw`
- **2-column card grid:** `(max-width: 768px) 100vw, 50vw`
- **Gallery masonry:** `(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw`
- **Cabin detail gallery:** `(max-width: 768px) 100vw, 50vw`
- **Sidebar/small images:** `(max-width: 768px) 100vw, 320px`

Use consistent aspect ratios: 16:9 for hero/banner images, 4:3 for card thumbnails, 3:2 for gallery items, 1:1 for small icons/avatars.

### Aesthetic
- **Campground/resort hybrid** — not a luxury hotel. Warm, approachable, outdoorsy, but clean and modern.
- Rounded corners (`rounded-lg`, `rounded-md`), subtle shadows (`shadow-sm`), sand-toned borders
- Generous whitespace (`py-20 lg:py-28` for sections, `max-w-7xl` containers)
- Scroll-triggered animations using AnimateIn with staggered delays

---

## Approved Sitemap (match exactly)

### Top Navigation
```
Home
Stay With Us → /stay
  Cabins → /stay/cabins
    [Individual Cabin] → /stay/cabins/[slug]
  Seasonal Sites → /stay/seasonal
  Camping → /stay/camping
Bar & Events → /bar-and-events
Gallery → /gallery
About → /about
Contact → /contact
```

### Navbar
- Desktop: flat links for Stay, Bar & Events, Gallery, About, Contact + a "Check Availability" CTA button linking to /contact
- "Stay With Us" should function as a link to `/stay` (the overview hub). Individual sub-pages (Cabins, Seasonal, Camping) are linked from within the Stay hub and from the footer — they do NOT need dropdown nav treatment in Phase 1.
- Mobile: full-screen overlay with animated link list
- Scroll behavior: transparent on hero, white/blurred after scroll

### Footer
- 4-column grid: Brand blurb + contact, Stay links, Explore links, Social + connect
- Social icons: Facebook and Instagram (placeholder `#` hrefs)
- Copyright with dynamic year

---

## Page-by-Page Specifications

### 1. HOME (`/`) — Purpose: First impression, lifestyle hook, drive inquiries

**SEO:** Title: "Gala Resort & RV Park | Life on the River — Fremont, WI" · Description: "Waterfront cabins, camping, and seasonal sites on the Wolf River. Live music, a riverfront bar, and a community that's always improving. Come see what we're building."

**Sections in order:**
1. **Hero** — Full-viewport cinematic hero. Headline: "Life on the River". Subtext: one-sentence lifestyle pitch. Two CTAs: "Check Availability" (primary, → /contact) and "Explore Stays" (outline, → /stay). Scroll indicator at bottom.
2. **Intro / Welcome** — Split layout: text left, image right. Welcome copy emphasizing the waterfront lifestyle, the vibe (bar, music, fishing, relaxation), and new ownership improving the property. CTA: "Our Story" → /about.
3. **Featured Cabins** — Show 3 cabin cards (image, name, rate, type badge). Link to individual cabin detail pages. "View All Cabins" button → /stay/cabins.
4. **Amenities Strip** — Icon row showing: Boat Launch, Private Docks, Riverfront Bar, Live Music, Outdoor Patio, Small Beach, Kids Park, Horseshoes. Clean, compact, horizontal layout.
5. **Upcoming Events** — Dark background section. Show 2 featured events with image cards, date, title, description. "View All Events" CTA → /bar-and-events.
6. **CTA Banner** — Full-width background image with overlay. Headline: "Ready for the River?" Two CTAs: "Check Availability" and "Explore Stays".

**Tone:** Inviting, experiential, "come see what we're building here." Not salesy. Not corporate.

---

### 2. STAY WITH US (`/stay`) — Purpose: Hub page for all accommodation types

**SEO:** Title: "Stay With Us | Gala Resort & RV Park" · Description: "Waterfront cabins, seasonal sites, and RV camping on the Wolf River. Find your perfect spot at The Gala."

**Layout:** PageHero + 3-card grid below.

**Cards (one per accommodation type):**
- **Cabins** — image, "From $150/night", short lifestyle description mentioning six waterfront cabins with dock access, → /stay/cabins
- **Seasonal Sites** — image, "From $4,000/season", description mentioning every site on the water, → /stay/seasonal
- **Camping** — image, "From $55/night", description about pulling up with your RV and enjoying everything at The Gala, → /stay/camping

Each card is a clickable Link, hover-scales the image, and shows "Learn More →".

**Tone:** Brief, visual, let the sub-pages do the heavy lifting. This is a routing hub.

---

### 3. CABINS (`/stay/cabins`) — Purpose: Showcase all six cabins, drive inquiries

**SEO:** Title: "Waterfront Cabins | Gala Resort & RV Park" · Description: "Six cabins directly on the Wolf River — each with its own dock. Three-season and year-round options. Starting at $150/night."

**PageHero** with headline "Waterfront Cabins" and subtitle emphasizing every cabin is on the river.

**Intro paragraph** explaining: six cabins directly on the Wolf River, five three-season named after fish, one four-season (The Lodge) for year-round stays. Show rate summary badges (nightly, weekly, minimum stay).

**Cabin grid** (3 columns on desktop, 2 on tablet, 1 on mobile): Each cabin card shows:
- Image with season-type badge ("3-Season" or "Year-Round")
- Cabin name
- Short description (line-clamped to 2 lines)
- Guest count icon + "Dogs OK" icon
- Links to `/stay/cabins/[slug]`

**The six cabins** (all data in `src/lib/data.ts`):
1. **Catfish** — 3-season, 4 guests
2. **Muskie** — 3-season, 4 guests
3. **Walleye** — 3-season, 4 guests
4. **Perch** — 3-season, 4 guests
5. **White Bass** — 3-season, 4 guests
6. **The Lodge** — 4-season (year-round), 6 guests

All cabins: $150/night, $900/week, 2-night minimum (3 on holidays). Fish-themed naming is intentional. The Lodge is the only four-season cabin — its description should subtly communicate year-round availability without making it the sole focus.

**Do NOT** list detailed rules, checkout procedures, or policy blocks on this page. Keep it lifestyle-focused. Rules are handled during inquiry follow-up.

---

### 4. CABIN DETAIL (`/stay/cabins/[slug]`) — Purpose: Deep-dive on a specific cabin, drive inquiry

**SEO:** Title: "[Cabin Name] Cabin | Gala Resort & RV Park" (dynamically generated per cabin) · Description: "[Cabin Name] — a [season type] waterfront cabin on the Wolf River. Sleeps [guests]. Starting at $150/night."

**Layout:** Gallery at top (image grid/carousel via CabinGallery component), then two-column below: content left, booking card right.

**Left column:**
- Season type badge, guest count, dog-friendly indicator
- Cabin name as h1
- Full description paragraph
- "What's Included" — amenity checklist (Waterfront, Private Dock, Furnished, River Views, Grill Area; The Lodge adds Year-Round Heat)
- Pet note — brief, friendly: dogs welcome, limit 2, leashed, clean up. Do NOT present as a heavy policy section. Keep it a small, soft info box.

**Right column (sticky sidebar):**
- Rate card: nightly + weekly rates, minimum stay note
- "All rates + tax. Availability confirmed after inquiry."
- Primary CTA: "Inquire About This Cabin" → /contact?cabin=[slug]
- Secondary CTA: "General Inquiry" → /contact

**Do NOT** include check-in/check-out times, cancellation policies, damage deposit details, or any other operational minutiae. Those are handled post-inquiry.

---

### 5. SEASONAL SITES (`/stay/seasonal`) — Purpose: Attract seasonal lessee inquiries

**SEO:** Title: "Seasonal Sites | Gala Resort & RV Park" · Description: "Every seasonal site is on the water. River and channel frontage from $4,000/season. April 15 – October 15 on the Wolf River."

**PageHero** with headline "Seasonal Sites" and subtitle "Every site on the water."

**Intro paragraph:** Season is April 15 to October 15. Waterfront access, dock space, full resort amenities. Welcoming, community-oriented language.

**Two cards side-by-side:**

**River Site** — $4,500 + tax/season
- Features: Direct river frontage, private dock space, water & electric hookups, seasonal community, access to bar & events

**Channel Site** — $4,000 + tax/season
- Features: Channel water frontage, dock access, water & electric hookups, seasonal community, access to bar & events

Each card: image, title, price, description, feature checklist with green checkmarks, and an "Inquire About Seasonal Sites" CTA → /contact?type=seasonal.

**Important operational context to embed naturally (not as a rules block):**
- Season runs April 15 – October 15
- Seasonal lessees get year-round electric access and can visit off-season
- Cannot be used as a primary residence
- Present these as gentle informational notes woven into descriptions or a small "Good to Know" aside, NOT as a policy/rules section

---

### 6. CAMPING (`/stay/camping`) — Purpose: Drive campsite inquiries

**SEO:** Title: "Camping | Gala Resort & RV Park" · Description: "RV camping on the Wolf River. Electric and water hookups, boat launch, riverfront bar, and resort amenities. From $55/night."

**PageHero** with headline "Camping" and subtitle "Pull up, plug in, and enjoy the river."

**Split layout:** Copy + rates left, image right.

**Left side:**
- Subhead: "Camping on the Wolf River"
- Description emphasizing ease, river access, and resort amenities
- Rate cards: $55 + tax/night, $330 + tax/week
- Feature checklist: Electric & water hookups, fits up to 36 ft units, river views, boat launch access, bar & restaurant access, pet friendly (dogs only, limit 2)
- CTA: "Reserve a Campsite" → /contact?type=camping

**Right side:** Full image.

**Do NOT** list detailed site rules, quiet hours, generator policies, or other operational details here. Keep it simple and inviting.

---

### 7. BAR & EVENTS (`/bar-and-events`) — Purpose: Showcase the bar/lounge and event calendar

**SEO:** Title: "Bar & Events | Gala Resort & RV Park" · Description: "Riverfront bar with live music, cold drinks, and fresh food. Check our events calendar for what's happening at The Gala."

**PageHero** — "Bar & Events" with a live-music/patio vibe subtitle.

**Section 1: The Bar & Lounge** — Split layout: text left, image right.
- Headline: "Right on the Water"
- Description: Wolf River patio bar, full remodel underway (inside and out), live music on weekends, cold drinks, catch a game
- Bar hours: Open 7 days a week, 11 AM to close
- Food: Pizza menu at launch, expanding later. Present this positively — "Fresh pizza and bar favorites" or similar. Don't say "pizza-only."
- Icon callouts: Live music weekends, outdoor patio on the water, full bar with food

**Section 2: Featured Events** — Dark background. Show featured events as image cards with date, title, description, "Featured" badge.

**Section 3: All Events Calendar** — Light background. List-style layout showing all events chronologically. Each item: date, category badge, title, description.

**Events calendar note:** The calendar may launch with placeholder events. Include a note: "Check back regularly — we're always adding new events" and a prompt to follow on Facebook for updates.

**Do NOT** embed a full restaurant menu, table reservation system, or food ordering. The bar section is lifestyle marketing, not an operational tool.

---

### 8. GALLERY (`/gallery`) — Purpose: Visual storytelling

**SEO:** Title: "Gallery | Gala Resort & RV Park" · Description: "See what life at The Gala looks like — waterfront views, cozy cabins, live music, and good times on the Wolf River."

**PageHero** — "Gallery" with "See what life at The Gala looks like."

**Filter bar:** All, Waterfront, Cabins, Bar & Events, Grounds — toggle buttons that filter the masonry grid.

**Masonry grid** of placeholder images with click-to-open lightbox (already implemented via yet-another-react-lightbox).

**Bottom note:** "Professional photography coming soon. Follow us on Instagram and Facebook for the latest photos."

Gallery categories in `src/lib/data.ts`: waterfront, cabins, bar, grounds.

---

### 9. ABOUT (`/about`) — Purpose: Tell the new-ownership story, build trust

**SEO:** Title: "Our Story | Gala Resort & RV Park" · Description: "New ownership, same river, better than ever. We're investing in every part of this property to build the best riverfront community on the Wolf River."

**PageHero** — "Our Story" with subtitle "New ownership. Same river. Better than ever."

**Section 1: A New Chapter** — Split layout: text left, image right.
- Headline: "We Believe in This Place"
- Copy: new ownership, long-term commitment, investing in every part of the property, building a riverfront community. Authentic, not corporate. Hands-on, family-owned energy.
- CTA: "Get in Touch" → /contact

**Section 2: Active Improvements** — List of current/planned improvements:
- Brand new docks replacing all cabin-assigned docks
- 350 feet of new seawall this spring, another 350 in the fall
- Full remodel of the bar & main house
- Road improvements throughout the property
- Every cabin cleaned, repaired, and updated before going into rotation
Each item as a card row with a Hammer icon.

**Section 3: What Drives Us** — 4-column value grid:
- Invested & Improving
- Riverfront Lifestyle
- Family-Owned & Hands-On
- Long-Term Vision
Each with an icon, title, and short description.

**Tone:** Genuine, confident, invested. "We bought this place because we love it, and we're making it great."

---

### 10. CONTACT (`/contact`) — Purpose: Single dynamic inquiry form for all inquiries

**SEO:** Title: "Contact Us | Gala Resort & RV Park" · Description: "Inquire about cabin rentals, seasonal sites, camping, or events at The Gala. We'll get back to you to confirm availability."

**Two-column layout:** Form (2/3 width) + contact sidebar (1/3 width).

**The Inquiry Form** (single form, dynamic fields based on selection):
- Full Name * (required)
- Email * (required)
- Phone (optional)
- "What are you interested in?" * — dropdown: Cabin Rental, Seasonal Site, Campsite, Bar & Events Info, General Inquiry
- **If Cabin selected:** "Which cabin?" dropdown listing all 6 by name with season type
- **If Cabin or Camping selected:** Desired check-in date, desired check-out date, number of guests, bringing pets? (No / 1 dog / 2 dogs)
- Message (textarea)
- Disclaimer: "Submitting this form does not confirm a reservation. We'll follow up to confirm availability and finalize your booking."
- Submit button: "Submit Inquiry"

**Form validation and feedback:**
- Use `react-hook-form` with inline validation. Show red border + inline error message beneath each invalid field on submit attempt (e.g., "Full name is required", "Please enter a valid email address").
- On successful submission: replace the form with a green-tinted confirmation panel — heading "Thank You!", message "We've received your inquiry and will be in touch soon. Keep an eye on your inbox." Include a "Send Another Inquiry" link that resets the form.
- On API error: show a red-tinted banner above the form — "Something went wrong. Please try again, or reach out to us directly at info@galaresort.com." Do not clear the form fields on error.
- Disable the submit button and show a spinner while the request is in flight to prevent double submission.

**Form should accept URL query params** to pre-select accommodation type:
- `/contact?cabin=catfish` → pre-selects Cabin + Catfish
- `/contact?type=seasonal` → pre-selects Seasonal Site
- `/contact?type=camping` → pre-selects Campsite

**Contact sidebar:**
- Location: Gala Resort & RV Park, Fremont, WI
- Phone: "Call for details" (actual number not yet confirmed)
- Email: info@galaresort.com
- Season: "Open seasonally — check for dates"
- Embedded Google Maps iframe (Fremont, WI area)

**Do NOT** build any booking engine, payment processing, calendar availability checker, or automated confirmation system. This is an inquiry form only. All booking is confirmed manually by the resort.

---

### 11. LOADING STATE (`loading.tsx`) — Purpose: Graceful loading fallback

A minimal, centered loading indicator consistent with the brand: the text "The Gala" in the display font with a subtle pulse or fade animation beneath it, on a `cream` background. No spinner — keep it calm and branded.

---

### 12. NOT FOUND (`not-found.tsx`) — Purpose: Friendly 404 page

**Layout:** Centered content on `cream` background.
- Headline: "Page Not Found"
- Subtext: "Looks like this spot on the river doesn't exist. Let's get you back on course."
- Two CTAs: "Back to Home" (primary, → /) and "Contact Us" (outline, → /contact)
- Consistent with site typography and spacing. No PageHero needed — keep it simple and helpful.

---

## API Route

`/api/contact/route.ts` — POST endpoint that receives the form data. For Phase 1, this can log to console or return a success response. Email integration (SendGrid, Resend, etc.) is a future enhancement.

Validate required fields server-side (name, email, inquiry type) and return appropriate status codes: `200` for success, `400` for validation errors (with a JSON body listing the invalid fields), `500` for unexpected errors.

---

## Data Layer (`src/lib/data.ts`)

All content for Phase 1 is served from this single file. Structure the data using well-typed TypeScript interfaces so types can be reused across components and will map cleanly to Sanity schemas in Phase 2. Expected types and shapes:

```typescript
interface Cabin {
  slug: string;             // URL-safe identifier, e.g. "catfish"
  name: string;             // Display name, e.g. "Catfish"
  seasonType: '3-season' | 'year-round';
  maxGuests: number;
  rateNightly: number;      // e.g. 150
  rateWeekly: number;       // e.g. 900
  minNights: number;        // 2 (3 on holidays, noted in description)
  dogFriendly: boolean;
  description: string;      // Full lifestyle description
  shortDescription: string; // 1–2 sentences for card display
  amenities: string[];      // e.g. ["Waterfront", "Private Dock", ...]
  images: CabinImage[];     // Array of { src, alt, width, height }
}

interface SeasonalSite {
  slug: string;
  name: string;             // "River Site" or "Channel Site"
  pricePerSeason: number;
  features: string[];
  description: string;
  image: ImageData;
}

interface Event {
  slug: string;
  title: string;
  date: string;             // ISO date string
  category: 'live-music' | 'seasonal' | 'community' | 'special';
  description: string;
  featured: boolean;
  image?: ImageData;
}

interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  category: 'waterfront' | 'cabins' | 'bar' | 'grounds';
}

interface Amenity {
  icon: string;             // Lucide icon name
  label: string;
}
```

Export named arrays/objects: `cabins`, `seasonalSites`, `campingConfig`, `events`, `galleryImages`, `amenities`. Keep all types exported so components can import them.

---

## Global Constraints

### Do NOT implement:
- Online booking or reservation system
- Payment processing
- Toast POS integration
- Automated availability calendar
- User accounts or login
- Blog or CMS-powered content pages
- Restaurant ordering or menu management system
- Complex policy/rules pages

### Do NOT display prominently:
- Checkout times, cancellation policies, damage deposits, late fees
- Detailed campground rules (quiet hours, generator rules, speed limits)
- Pet policy as a standalone page or heavy section (keep it to brief inline notes)
- Pricing breakdowns with taxes calculated

### DO ensure:
- Every CTA that implies booking or reserving routes to `/contact` (the inquiry form)
- The form is the single conversion point for all accommodation types
- The site is fully responsive (mobile-first where practical)
- All images use Next.js `<Image>` with proper `sizes` attributes (see Image Handling section above)
- SEO metadata is set per page using the titles and descriptions specified in each page section
- Structured data (JSON-LD) on the root layout identifies the business as a Campground
- The four-season cabin (The Lodge) subtly notes year-round availability without breaking the fish-naming theme
- Events section can launch with placeholder data and a "check back" message
- Logo placeholder text ("The Gala") is used in nav and footer until the real logo/domain are transferred
- Accessibility basics: semantic HTML, alt text, ARIA labels on interactive elements, focus states
- Animations are subtle and performant — no heavy page-load animations that delay content visibility

---

## Content Tone Guidelines

- **Voice:** Friendly, genuine, slightly casual. Like talking to a neighbor who's proud of where they live.
- **Not:** Corporate, overly polished, luxury-hospitality formal, or sales-pushy.
- **Vocabulary:** "The Gala", "the river", "on the water", "good times", "your spot", "community". Avoid "amenity-rich", "curated experience", "exclusive", "premier" (sparingly OK for About page).
- **Headlines:** Short, punchy, lifestyle-evoking. "Life on the River." "Right on the Water." "Pull Up, Plug In."
- **Descriptions:** Paint a picture. Don't list specs — describe the experience. "Step out your door to the water" is better than "Direct waterfront access included."

---

## Phase 2 Outlook (do not implement — architectural awareness only)

Phase 2 will introduce the following. You do not need to build any of this now, but be aware of it so Phase 1 code doesn't create migration friction:

- **Sanity CMS integration** — `src/lib/data.ts` will be replaced by Sanity queries. Structure your TypeScript types and data-fetching patterns so swapping from static data to Sanity client calls is a find-and-replace operation, not a rewrite. Keep data-fetching in `src/lib/` functions (e.g., `getCabins()`, `getCabinBySlug()`) that components import — don't inline data access in page components.
- **Email delivery** — The contact form API route will integrate SendGrid or Resend. Keep the route handler clean and the form payload well-structured.
- **Real domain and logo** — "The Gala" text placeholders will be swapped for actual brand assets. Use the same component in nav and footer so it's a single replacement.
- **Professional photography** — Unsplash placeholders will be replaced. Using `next/image` with consistent `sizes` attributes now makes this seamless later.
- **Blog / news section** — May be added via Sanity. No pre-work needed.

---

## File Structure Reference

```
src/
  app/
    layout.tsx              ← Root layout (Navbar, Footer, fonts, JSON-LD)
    page.tsx                ← Home
    loading.tsx             ← Global loading state (branded, minimal)
    not-found.tsx           ← 404 page (friendly, on-brand)
    robots.ts               ← Robots.txt generation
    sitemap.ts              ← Sitemap generation
    about/page.tsx          ← About
    bar-and-events/page.tsx ← Bar & Events
    contact/page.tsx        ← Contact / Inquiry
    gallery/page.tsx        ← Gallery
    stay/
      page.tsx              ← Stay With Us hub
      cabins/
        page.tsx            ← All Cabins
        [slug]/page.tsx     ← Cabin Detail
      camping/page.tsx      ← Camping
      seasonal/page.tsx     ← Seasonal Sites
    api/
      contact/route.ts      ← Inquiry form API endpoint
  components/
    forms/ContactForm.tsx   ← Dynamic inquiry form
    layout/Navbar.tsx       ← Top navigation
    layout/Footer.tsx       ← Site footer
    rooms/CabinGallery.tsx  ← Cabin image gallery
    sections/               ← Home page section components
    ui/                     ← Reusable UI primitives (Button, PageHero, AnimateIn, SectionHeading)
  lib/
    data.ts                 ← All static data + TypeScript types (cabins, sites, events, gallery, amenities)
    sanity/                 ← Sanity client + queries (not active in Phase 1)
  styles/
    globals.css             ← Tailwind theme + base styles
```

---

## Summary Checklist

Before considering this phase complete, verify:

- [ ] All 10 page routes render with full content and consistent styling
- [ ] `loading.tsx` shows a branded, minimal loading indicator
- [ ] `not-found.tsx` shows a friendly 404 with navigation back to Home and Contact
- [ ] Navigation links match the approved sitemap exactly
- [ ] "Check Availability" and all booking-intent CTAs link to `/contact`
- [ ] Contact form dynamically adjusts fields based on accommodation type selection
- [ ] Contact form shows inline validation errors, success confirmation panel, and error banner
- [ ] URL query params pre-fill the contact form correctly
- [ ] No booking engine, payment, or automated confirmation exists
- [ ] No heavy rules/policies sections appear on public pages
- [ ] Bar section mentions food positively without "pizza-only" framing
- [ ] Seasonal dates (April 15 – October 15) are noted on the seasonal page without a formal rules block
- [ ] The Lodge cabin subtly notes year-round availability
- [ ] All pages have unique SEO metadata matching the titles/descriptions specified per page
- [ ] JSON-LD structured data on root layout identifies the business as a Campground
- [ ] Site is fully responsive across mobile, tablet, and desktop
- [ ] Placeholder images use Next.js `<Image>` with correct `sizes` attributes and consistent aspect ratios
- [ ] Gallery lightbox and filter work correctly
- [ ] Footer links are accurate and complete
- [ ] Animations are subtle, scroll-triggered, and don't block content
- [ ] Data access is abstracted into `src/lib/` functions (not inlined in page components) for Phase 2 Sanity migration
- [ ] All TypeScript types for data entities are exported from `src/lib/data.ts`
- [ ] API route validates required fields server-side and returns proper status codes
- [ ] The overall feel is "clean, welcoming, lifestyle-focused campground/resort" — not luxury hotel
