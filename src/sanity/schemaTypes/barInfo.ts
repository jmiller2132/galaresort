import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'barInfo',
  title: 'Bar Info',
  type: 'document',
  fields: [
    defineField({
      name: 'monday',
      title: 'Monday',
      type: 'string',
      description: 'Hours, e.g. "11 AM to close". Leave blank if closed.',
    }),
    defineField({
      name: 'tuesday',
      title: 'Tuesday',
      type: 'string',
      description: 'Hours, e.g. "11 AM to close". Leave blank if closed.',
    }),
    defineField({
      name: 'wednesday',
      title: 'Wednesday',
      type: 'string',
      description: 'Hours, e.g. "11 AM to close". Leave blank if closed.',
    }),
    defineField({
      name: 'thursday',
      title: 'Thursday',
      type: 'string',
      description: 'Hours, e.g. "11 AM to close". Leave blank if closed.',
    }),
    defineField({
      name: 'friday',
      title: 'Friday',
      type: 'string',
      description: 'Hours, e.g. "11 AM to close". Leave blank if closed.',
    }),
    defineField({
      name: 'saturday',
      title: 'Saturday',
      type: 'string',
      description: 'Hours, e.g. "11 AM to close". Leave blank if closed.',
    }),
    defineField({
      name: 'sunday',
      title: 'Sunday',
      type: 'string',
      description: 'Hours, e.g. "11 AM to close". Leave blank if closed.',
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
      title: 'foodNote',
      subtitle: 'tuesday',
    },
  },
})
