export default {
  name: "galleryImage",
  title: "Gallery Image",
  type: "document",
  fields: [
    { name: "image", title: "Image", type: "image", options: { hotspot: true }, validation: (Rule: any) => Rule.required() },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: { list: ["waterfront", "cabins", "bar", "grounds"] },
    },
    { name: "caption", title: "Caption", type: "string" },
    { name: "order", title: "Display Order", type: "number" },
  ],
};
