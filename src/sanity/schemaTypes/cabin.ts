import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'cabin',
  title: 'Cabin',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seasonType',
      title: 'Season Type',
      type: 'string',
      options: {
        list: [
          { title: '3-Season', value: '3-season' },
          { title: 'Year-Round', value: 'year-round' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'maxGuests',
      title: 'Max Guests',
      type: 'number',
    }),
    defineField({
      name: 'rateNightly',
      title: 'Nightly Rate',
      type: 'number',
    }),
    defineField({
      name: 'rateWeekly',
      title: 'Weekly Rate',
      type: 'number',
    }),
    defineField({
      name: 'minNights',
      title: 'Minimum Nights',
      type: 'number',
    }),
    defineField({
      name: 'dogFriendly',
      title: 'Dog Friendly',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'available',
      title: 'Available for Reservations',
      type: 'boolean',
      description: 'Uncheck to mark this cabin as unavailable (e.g. under restoration). It will appear greyed out on the site with no booking option.',
      initialValue: true,
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 8,
    }),
    defineField({
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'seasonType',
      media: 'images.0',
    },
  },
})
