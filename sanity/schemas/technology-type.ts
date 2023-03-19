import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list"

export const TechnologyType = {
    name: "technology-type",
    type: "document",
    title: "Technology Type",
    orderings: [orderRankOrdering],
    fields: [
        {
            name: "name",
            type: "string",
            title: "Name",
            unique: true,
        },
        orderRankField({ type: "technology-type" })
    ]
}