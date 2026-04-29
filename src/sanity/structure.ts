import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('event')
        .title('Events')
        .child(
          S.documentTypeList('event')
            .title('Events')
            .defaultOrdering([{field: 'date', direction: 'asc'}])
        ),
      S.documentTypeListItem('cabin').title('Cabins'),
      S.documentTypeListItem('announcement').title('Announcements'),
      S.documentTypeListItem('barInfo').title('Bar Info'),
      S.documentTypeListItem('galleryImage').title('Gallery Images'),
    ])
