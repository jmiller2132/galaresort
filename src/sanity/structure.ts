import type {StructureResolver} from 'sanity/structure'

const today = new Date().toISOString().split('T')[0]

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
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
      S.documentTypeListItem('menu').title('Menus'),
      S.documentTypeListItem('announcement').title('Announcements'),
      S.documentTypeListItem('barInfo').title('Bar Info'),
      S.documentTypeListItem('galleryImage').title('Gallery Images'),
    ])
