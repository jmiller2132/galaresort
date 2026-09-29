import type {StructureBuilder, StructureResolver} from 'sanity/structure'
import {pageTypes} from './schemaTypes/pages'

const today = new Date().toISOString().split('T')[0]

const singleton = (S: StructureBuilder, type: string, title: string) =>
  S.listItem()
    .title(title)
    .id(type)
    .child(S.document().schemaType(type).documentId(type).title(title))

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      singleton(S, 'siteSettings', 'Site Settings'),
      S.listItem()
        .title('Pages')
        .id('pages')
        .child(
          S.list()
            .title('Pages')
            .items(pageTypes.map((t) => singleton(S, t.name, t.title ?? t.name)))
        ),
      S.divider(),
      S.listItem()
        .title('Events')
        .schemaType('event')
        .child(
          S.list()
            .title('Events')
            .items([
              S.listItem()
                .title('Upcoming Events')
                .schemaType('event')
                .child(
                  S.documentList()
                    .title('Upcoming Events')
                    .schemaType('event')
                    .filter('_type == "event" && coalesce(endDate, date) >= $today')
                    .params({ today })
                    .defaultOrdering([{field: 'date', direction: 'asc'}])
                ),
              S.listItem()
                .title('Past Events')
                .schemaType('event')
                .child(
                  S.documentList()
                    .title('Past Events')
                    .schemaType('event')
                    .filter('_type == "event" && coalesce(endDate, date) < $today')
                    .params({ today })
                    .defaultOrdering([{field: 'date', direction: 'desc'}])
                ),
            ])
        ),
      S.documentTypeListItem('cabin').title('Cabins'),
      S.documentTypeListItem('seasonalSite').title('Seasonal Sites'),
      S.documentTypeListItem('campsite').title('Camping'),
      S.documentTypeListItem('menu').title('Menus'),
      S.documentTypeListItem('announcement').title('Announcements'),
      S.documentTypeListItem('barInfo').title('Bar Info'),
      S.documentTypeListItem('galleryImage').title('Gallery Images'),
    ])
