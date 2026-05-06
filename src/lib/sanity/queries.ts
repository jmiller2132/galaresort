export const cabinsQuery = `*[_type == "cabin"] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  seasonType,
  maxGuests,
  rateNightly,
  rateWeekly,
  minNights,
  dogFriendly,
  shortDescription,
  description,
  amenities,
  images[] {
    asset->{ url },
    alt
  }
}`;

export const cabinBySlugQuery = `*[_type == "cabin" && slug.current == $slug][0] {
  _id,
  name,
  "slug": slug.current,
  seasonType,
  maxGuests,
  rateNightly,
  rateWeekly,
  minNights,
  dogFriendly,
  shortDescription,
  description,
  amenities,
  images[] {
    asset->{ url },
    alt
  }
}`;

export const eventsQuery = `*[_type == "event" && coalesce(endDate, date) >= $today] | order(date asc) {
  _id,
  title,
  "slug": slug.current,
  date,
  endDate,
  category,
  description,
  featured,
  link,
  image {
    asset->{ url },
    alt
  }
}`;

export const featuredEventsQuery = `*[_type == "event" && featured == true && coalesce(endDate, date) >= $today] | order(date asc) {
  _id,
  title,
  "slug": slug.current,
  date,
  endDate,
  category,
  description,
  featured,
  link,
  image {
    asset->{ url },
    alt
  }
}`;

export const announcementQuery = `*[_type == "announcement" && active == true][0] {
  _id,
  text,
  link
}`;

export const galleryQuery = `*[_type == "galleryImage"] | order(_createdAt asc) {
  _id,
  image {
    asset->{ url },
    alt
  },
  category,
  caption
}`;
