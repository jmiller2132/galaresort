import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'campsite',
  title: 'Camping',
  type: 'document',
  fields: [
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'hookups',
      title: 'Hookups',
      type: 'string',
    }),
    defineField({
      name: 'maxLength',
      title: 'Max Unit Size / Length',
      type: 'string',
    }),
    defineField({
      name: 'rateNightly',
      title: 'Nightly Rate ($)',
      type: 'number',
    }),
    defineField({
      name: 'rateWeekly',
      title: 'Weekly Rate ($)',
      type: 'number',
    }),
    defineField({
      name: 'features',
      title: 'Features / Amenities',
      description: 'Add one feature per item (e.g. "Fire rings & picnic tables")',
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
