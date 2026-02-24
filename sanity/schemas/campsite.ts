export default {
  name: "campsite",
  title: "Campsite Info",
  type: "document",
  fields: [
    { name: "description", title: "Description", type: "text", rows: 4 },
    { name: "hookups", title: "Hookups", type: "string" },
    { name: "maxSize", title: "Max Unit Size", type: "string" },
    { name: "nightlyRate", title: "Nightly Rate", type: "string" },
    { name: "weeklyRate", title: "Weekly Rate", type: "string" },
    { name: "features", title: "Features", type: "array", of: [{ type: "string" }] },
    { name: "images", title: "Images", type: "array", of: [{ type: "image", options: { hotspot: true } }] },
  ],
};
