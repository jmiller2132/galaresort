export default {
  name: "seasonalSite",
  title: "Seasonal Site",
  type: "document",
  fields: [
    {
      name: "type",
      title: "Site Type",
      type: "string",
      options: { list: ["river", "channel"] },
      validation: (Rule: any) => Rule.required(),
    },
    { name: "title", title: "Title", type: "string" },
    { name: "price", title: "Seasonal Price", type: "string" },
    { name: "description", title: "Description", type: "text", rows: 4 },
    { name: "images", title: "Images", type: "array", of: [{ type: "image", options: { hotspot: true } }] },
    { name: "features", title: "Features", type: "array", of: [{ type: "string" }] },
  ],
};
