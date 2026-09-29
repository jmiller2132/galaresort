import { defineField, type FieldDefinition } from 'sanity'

export const PARAGRAPHS_HINT = 'Leave a blank line between paragraphs.'
export const SOCIAL_HINT = 'The words "Facebook" and "Instagram" link to your pages automatically.'
export const PHONE_HINT = 'The RV Park phone number from Site Settings is added after this text.'

export function str(name: string, title: string, description?: string) {
  return defineField({ name, title, type: 'string', description })
}

export function txt(name: string, title: string, rows = 3, description?: string) {
  return defineField({ name, title, type: 'text', rows, description })
}

export function list(name: string, title: string, description?: string) {
  return defineField({ name, title, type: 'array', of: [{ type: 'string' }], description })
}

export function imageField(name: string, title: string) {
  return defineField({
    name,
    title,
    type: 'image',
    options: { hotspot: true },
    fields: [
      defineField({
        name: 'alt',
        title: 'Alt Text',
        description: 'Short description of the photo for screen readers and Google',
        type: 'string',
      }),
    ],
  })
}

export function section(name: string, title: string, fields: FieldDefinition[]) {
  return defineField({
    name,
    title,
    type: 'object',
    options: { collapsible: true, collapsed: true },
    fields,
  })
}

export function heroField() {
  return section('hero', 'Top Banner', [
    str('title', 'Title'),
    str('subtitle', 'Subtitle'),
    imageField('image', 'Banner Photo'),
  ])
}

export function seoField() {
  return defineField({
    name: 'seoDescription',
    title: 'Google Search Description',
    description: 'The short summary Google shows under the page title. Aim for about 150 characters.',
    type: 'text',
    rows: 3,
    validation: (Rule) => Rule.max(200).warning('Google cuts off descriptions longer than about 160 characters.'),
  })
}
