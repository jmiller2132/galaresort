export default {
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (Rule: any) => Rule.required() },
    { name: "date", title: "Date", type: "date", validation: (Rule: any) => Rule.required() },
    { name: "description", title: "Description", type: "text", rows: 3 },
    { name: "image", title: "Image", type: "image", options: { hotspot: true } },
    { name: "featured", title: "Featured on Homepage", type: "boolean", initialValue: false },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: { list: ["live-music", "seasonal", "special"] },
    },
  ],
  orderings: [
    { title: "Date, Newest", name: "dateDesc", by: [{ field: "date", direction: "desc" }] },
  ],
};
