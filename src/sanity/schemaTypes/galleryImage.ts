import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Image (1200px wide minimum, JPG, under 1 MB)',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Describe the photo, e.g. "Aerial view of the Wolf River at sunset"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Waterfront', value: 'waterfront' },
          { title: 'Cabins', value: 'cabins' },
          { title: 'Bar & Events', value: 'bar' },
          { title: 'Grounds', value: 'grounds' },
          { title: 'Life at The Gala', value: 'life' },
        ],
      },
      description: 'Select all that apply — a photo can belong to multiple categories.',
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'alt',
      subtitle: 'category',
      media: 'image',
    },
  },
})
