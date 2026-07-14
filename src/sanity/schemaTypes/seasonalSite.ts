import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'seasonalSite',
  title: 'Seasonal Sites',
  type: 'document',
  fields: [
    defineField({
      name: 'type',
      title: 'Site Type',
      type: 'string',
      options: { list: ['river', 'channel'] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'pricePerSeason',
      title: 'Price Per Season ($)',
      type: 'number',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'features',
      title: 'Features / Amenities',
      description: 'Add one feature per item (e.g. "Private dock space")',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
  ],
})
