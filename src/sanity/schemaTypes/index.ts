import { type SchemaTypeDefinition } from 'sanity'

import event from './event'
import announcement from './announcement'
import barInfo from './barInfo'
import galleryImage from './galleryImage'
import cabin from './cabin'
import menu from './menu'
import seasonalSite from './seasonalSite'
import campsite from './campsite'
import siteSettings from './siteSettings'
import { pageTypes } from './pages'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [event, announcement, barInfo, galleryImage, cabin, menu, seasonalSite, campsite, siteSettings, ...pageTypes],
}

export const singletonTypes = new Set(['siteSettings', ...pageTypes.map((t) => t.name)])
