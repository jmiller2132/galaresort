import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'barInfo',
  title: 'Bar Info',
  type: 'document',
  fields: [
    defineField({
      name: 'hours',
      title: 'Hours',
      type: 'string',
      description: 'e.g. "11 AM to close"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'closedDays',
      title: 'Closed Days',
      type: 'string',
      description: 'e.g. "Closed Mondays"',
    }),
    defineField({
      name: 'foodNote',
      title: 'Food Note',
      type: 'string',
      description: 'e.g. "Fresh pizza and bar favorites"',
    }),
  ],
  preview: {
    select: {
      title: 'hours',
      subtitle: 'closedDays',
    },
  },
})
