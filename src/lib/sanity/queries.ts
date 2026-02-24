export const cabinsQuery = `*[_type == "cabin"] | order(order asc) {
  _id, name, slug, type, description, images, amenities, nightlyRate, weeklyRate, minStay, guests, petsAllowed
}`;

export const cabinBySlugQuery = `*[_type == "cabin" && slug.current == $slug][0] {
  _id, name, slug, type, description, images, amenities, nightlyRate, weeklyRate, minStay, guests, petsAllowed
}`;

export const seasonalSitesQuery = `*[_type == "seasonalSite"] {
  _id, type, title, price, description, images, features
}`;

export const campsiteQuery = `*[_type == "campsite"][0] {
  _id, description, hookups, maxSize, nightlyRate, weeklyRate, features, images
}`;

export const eventsQuery = `*[_type == "event"] | order(date asc) {
  _id, title, date, description, image, featured, category
}`;

export const featuredEventsQuery = `*[_type == "event" && featured == true] | order(date asc) {
  _id, title, date, description, image, category
}`;

export const galleryQuery = `*[_type == "galleryImage"] | order(order asc) {
  _id, image, category, caption
}`;

export const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  logo, contactInfo, socialLinks, bookingNote, petPolicy
}`;
