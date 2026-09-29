import { defineField, defineType, type FieldDefinition } from 'sanity'
import {
  PARAGRAPHS_HINT,
  PHONE_HINT,
  SOCIAL_HINT,
  heroField,
  imageField,
  list,
  section,
  seoField,
  str,
  txt,
} from './fields'

export const AMENITY_ICONS = [
  { title: 'Cabin', value: 'Home' },
  { title: 'Beer', value: 'Beer' },
  { title: 'Sun / Patio', value: 'Sun' },
  { title: 'Boat', value: 'Ship' },
  { title: 'Anchor', value: 'Anchor' },
  { title: 'Music', value: 'Music' },
  { title: 'People', value: 'Users2' },
  { title: 'Beach Umbrella', value: 'Umbrella' },
  { title: 'Kids', value: 'Baby' },
  { title: 'Horseshoe', value: 'Magnet' },
  { title: 'Fish', value: 'Fish' },
  { title: 'Water', value: 'Waves' },
  { title: 'Campfire', value: 'Flame' },
  { title: 'Trees', value: 'Trees' },
  { title: 'Food', value: 'UtensilsCrossed' },
  { title: 'Wi-Fi', value: 'Wifi' },
  { title: 'Dog', value: 'Dog' },
  { title: 'Parking', value: 'Car' },
]

function page(name: string, title: string, fields: FieldDefinition[]) {
  return defineType({
    name,
    title,
    type: 'document',
    fields: [...fields, seoField()],
    preview: { prepare: () => ({ title }) },
  })
}

function stayCard(name: string, title: string) {
  return section(name, title, [
    str('title', 'Title'),
    str('price', 'Price Line', 'Shown under the title, e.g. "From $250/night"'),
    txt('description', 'Description'),
    imageField('image', 'Photo'),
  ])
}

export const homePage = page('homePage', 'Home Page', [
  section('hero', 'Top Banner (video)', [
    str('eyebrow', 'Small Text Above Headline'),
    str('headline', 'Headline'),
    txt('subheadline', 'Text Under Headline', 2),
    imageField('image', 'Photo Shown While the Video Loads'),
  ]),
  section('intro', 'Welcome Section', [
    str('eyebrow', 'Small Label'),
    str('heading', 'Heading'),
    txt('body', 'Text', 8, PARAGRAPHS_HINT),
    imageField('image', 'Photo'),
  ]),
  section('featuredCabins', 'Featured Cabins Section', [
    str('label', 'Small Label'),
    str('title', 'Heading'),
    txt('description', 'Text'),
    str('buttonLabel', 'Button Text'),
  ]),
  section('amenities', 'Amenities Strip', [
    str('heading', 'Heading'),
    defineField({
      name: 'items',
      title: 'Amenities',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'amenity',
          fields: [
            str('label', 'Label'),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: { list: AMENITY_ICONS },
            }),
          ],
          preview: { select: { title: 'label', subtitle: 'icon' } },
        },
      ],
    }),
    txt('footnote', 'Text Under Amenities', 2),
  ]),
  section('events', 'Events Section', [
    str('label', 'Small Label (when events are listed)'),
    str('title', 'Heading (when events are listed)'),
    txt('description', 'Text (when events are listed)'),
    str('emptyLabel', 'Small Label (when no events are listed)'),
    str('emptyTitle', 'Heading (when no events are listed)'),
    txt('emptyDescription', 'Text (when no events are listed)'),
    str('liveMusicTitle', 'Live Music Box Title (when no events are listed)'),
    txt('liveMusicText', 'Live Music Box Text (when no events are listed)', 4, SOCIAL_HINT),
  ]),
  section('cta', 'Bottom Banner', [
    str('eyebrow', 'Small Label'),
    str('heading', 'Heading'),
    txt('body', 'Text'),
    imageField('image', 'Background Photo'),
  ]),
])

export const aboutPage = page('aboutPage', 'About Page', [
  heroField(),
  section('story', 'Our Story Section', [
    str('eyebrow', 'Small Label'),
    str('heading', 'Heading'),
    txt('body', 'Text', 10, PARAGRAPHS_HINT),
    imageField('image', 'Photo'),
  ]),
  section('improvements', 'Improvements Section', [
    str('eyebrow', 'Small Label'),
    str('heading', 'Heading'),
    txt('intro', 'Intro Text'),
    list('items', 'Improvements', 'One improvement per item'),
    txt('footnote', 'Text Under the List', 2),
  ]),
  section('values', 'What Drives Us Section', [
    str('heading', 'Heading'),
    defineField({
      name: 'items',
      title: 'Values',
      description: 'Best with four. Icons are assigned in order.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'value',
          fields: [str('title', 'Title'), txt('description', 'Description')],
          preview: { select: { title: 'title' } },
        },
      ],
    }),
  ]),
])

export const barEventsPage = page('barEventsPage', 'Bar & Events Page', [
  heroField(),
  section('bar', 'Bar Section', [
    str('eyebrow', 'Small Label'),
    str('heading', 'Heading'),
    txt('body', 'Text', 6, PARAGRAPHS_HINT),
    list('highlights', 'Highlights', 'Short lines shown with icons under the text. Best with three.'),
    imageField('image', 'Photo'),
  ]),
  section('liveMusic', 'Live Music Section', [
    str('label', 'Small Label'),
    str('title', 'Heading'),
    str('cardTitle', 'Box Title'),
    str('cardSubtitle', 'Box Subtitle'),
    txt('body', 'Box Text', 4),
    txt('socialNote', 'Box Follow-Up Text', 3, SOCIAL_HINT),
    imageField('image', 'Photo'),
  ]),
])

export const contactPage = page('contactPage', 'Contact Page', [
  heroField(),
  str('formHeading', 'Form Heading'),
  txt('formIntro', 'Form Intro Text'),
])

export const stayPage = page('stayPage', 'Stay Page', [
  heroField(),
  txt('intro', 'Intro Paragraph', 6, PARAGRAPHS_HINT),
  str('callNote', 'Phone Line', PHONE_HINT),
  stayCard('cabinsCard', 'Cabins Card'),
  stayCard('seasonalCard', 'Seasonal Sites Card'),
  stayCard('campingCard', 'Camping Card'),
])

export const cabinsPage = page('cabinsPage', 'Cabins Page', [
  heroField(),
  txt('intro', 'Intro Paragraph', 6, PARAGRAPHS_HINT),
  str('callNote', 'Phone Line', PHONE_HINT),
  section('unavailable', 'Unavailable Cabins', [
    str('label', 'Badge Text'),
    str('short', 'Short Note (cabin list)'),
    txt('detail', 'Full Note (cabin page)'),
  ]),
  section('detail', 'Individual Cabin Pages', [
    txt('petPolicy', 'Pet Policy', 2),
    str('holidayMinimum', 'Holiday Minimum', 'Shown after the minimum stay, e.g. "3 on holidays"'),
    str('ratesNote', 'Rates Note'),
    txt('holidayNote', 'Holiday Pricing Note', 2),
  ]),
])

export const seasonalPage = page('seasonalPage', 'Seasonal Sites Page', [
  heroField(),
  txt('intro', 'Intro Paragraph', 6, PARAGRAPHS_HINT),
  str('callNote', 'Phone Line', PHONE_HINT),
  list('goodToKnow', '"Good to Know" Items', 'One item per line in the "Good to Know" box'),
])

export const campingPage = page('campingPage', 'Camping Page', [
  heroField(),
  str('eyebrow', 'Small Label'),
  str('heading', 'Heading'),
  str('policyNote', 'Minimum Stay Note', 'Shown before the phone number at the bottom of the section'),
])

export const menuPage = page('menuPage', 'Menu Page', [
  heroField(),
  str('footnote', 'Note Under the Menu', 'The bar phone number is added after this text.'),
])

export const galleryPage = page('galleryPage', 'Gallery Page', [
  heroField(),
  txt('footnote', 'Note Under the Photos', 2, SOCIAL_HINT),
])

export const pageTypes = [
  homePage,
  stayPage,
  cabinsPage,
  seasonalPage,
  campingPage,
  barEventsPage,
  menuPage,
  galleryPage,
  aboutPage,
  contactPage,
]
