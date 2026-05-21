import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'menu',
  title: 'Menu',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Menu Title',
      type: 'string',
      description: 'e.g. "Grill Menu", "Drink Specials", "Weekend Brunch"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Menu Image (JPG, under 2 MB)',
      type: 'image',
      options: { hotspot: false },
      description: 'Upload a JPG photo of your menu. Replace this image any time prices or items change.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'active',
      title: 'Show on Site',
      type: 'boolean',
      description: 'Toggle off to hide this menu without deleting it.',
      initialValue: true,
    }),
    defineField({
      name: 'sortOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers display first. Use 1 for your main menu, 2 for specials, etc.',
      initialValue: 1,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'sortOrderAsc',
      by: [{ field: 'sortOrder', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      active: 'active',
      media: 'image',
    },
    prepare({ title, active, media }) {
      return {
        title,
        subtitle: active ? 'Visible on site' : 'Hidden',
        media,
      }
    },
  },
})
