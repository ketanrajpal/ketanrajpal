import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list"

export const review = {
    name: "review",
    type: "document",
    title: "Review",
    orderings: [orderRankOrdering],
    fields: [
        {
            name: "name",
            type: "string",
            title: "Name",
        },
        {
            name: "designation",
            type: "string",
            title: "Designation",
        },
        {
            name: "organisation",
            type: "string",
            title: "Organisation",
        },
        {
            name: "description",
            type: "text",
            title: "Description"
        },
        {
            name: "show_on_github",
            type: "boolean",
            title: "Show on Github"
        },
        {
            name: "image",
            type: "image",
            title: "Image"
        },
        orderRankField({ type: "review" })
    ]
}