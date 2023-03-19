import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list"

export const principle = {
    title: 'Principle',
    name: 'principle',
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
        orderRankField({ type: "principle" })
    ]
}