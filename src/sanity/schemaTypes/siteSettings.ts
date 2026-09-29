import { defineType } from 'sanity'
import { str, txt } from './fields'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    str('rvPhone', 'RV Park Phone', 'Used for cabins, camping, and seasonal sites across the site, e.g. "(920) 446-3222"'),
    str('barPhone', 'Bar Phone', 'Used on the Bar & Events and Menu pages, e.g. "(920) 446-2423"'),
    str('email', 'Email'),
    str('streetAddress', 'Street Address'),
    str('city', 'City'),
    str('state', 'State'),
    str('zip', 'ZIP Code'),
    str('facebookUrl', 'Facebook Link'),
    str('instagramUrl', 'Instagram Link'),
    str('seasonNote', 'Season Note', 'Shown under "Season" on the Contact page'),
    txt('footerTagline', 'Footer Blurb', 3, 'Short description under the logo in the footer'),
  ],
  preview: {
    prepare: () => ({ title: 'Site Settings' }),
  },
})
