export default {
  name: "cabin",
  title: "Cabin",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "slug", title: "Slug", type: "slug", options: { source: "name", maxLength: 96 } },
    {
      name: "type",
      title: "Cabin Type",
      type: "string",
      options: { list: ["three-season", "four-season"] },
    },
    { name: "description", title: "Description", type: "text", rows: 4 },
    { name: "images", title: "Images", type: "array", of: [{ type: "image", options: { hotspot: true } }] },
    { name: "amenities", title: "Amenities", type: "array", of: [{ type: "string" }] },
    { name: "nightlyRate", title: "Nightly Rate", type: "string" },
    { name: "weeklyRate", title: "Weekly Rate", type: "string" },
    { name: "minStay", title: "Minimum Stay", type: "string" },
    { name: "guests", title: "Max Guests", type: "number" },
    { name: "petsAllowed", title: "Pets Allowed", type: "boolean" },
    { name: "order", title: "Display Order", type: "number" },
  ],
};
