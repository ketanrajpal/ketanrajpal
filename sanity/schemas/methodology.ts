import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list"

export const methodology = {
    title: 'Methodology',
    name: 'methodology',
    type: 'document',
    orderings: [orderRankOrdering],
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'string',
        },
        {
            title: 'Description',
            name: 'description',
            type: 'text',
        },
        orderRankField({ type: "methodology" })
    ]
}