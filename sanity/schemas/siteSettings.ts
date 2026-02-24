export default {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    { name: "logo", title: "Logo", type: "image" },
    {
      name: "contactInfo",
      title: "Contact Information",
      type: "object",
      fields: [
        { name: "phone", title: "Phone", type: "string" },
        { name: "email", title: "Email", type: "string" },
        { name: "address", title: "Address", type: "text", rows: 3 },
      ],
    },
    {
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        { name: "facebook", title: "Facebook", type: "url" },
        { name: "instagram", title: "Instagram", type: "url" },
      ],
    },
    { name: "bookingNote", title: "Booking Note", type: "text", rows: 2 },
    { name: "petPolicy", title: "Pet Policy", type: "text", rows: 2 },
  ],
};
