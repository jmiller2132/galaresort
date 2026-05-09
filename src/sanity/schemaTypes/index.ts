import { type SchemaTypeDefinition } from 'sanity'

import event from './event'
import announcement from './announcement'
import barInfo from './barInfo'
import galleryImage from './galleryImage'
import cabin from './cabin'
import menu from './menu'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [event, announcement, barInfo, galleryImage, cabin, menu],
}
