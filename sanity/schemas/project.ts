import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list"

export const project = {
    name: "project",
    type: "document",
    title: "Project",
    orderings: [orderRankOrdering],
    fields: [
        {
            name: "title",
            type: "string",
            title: "Title",
        },
        {
            name: "slug",
            type: "slug",
            title: "Slug",
            options: {
                source: "title",
                maxLength: 96
            }
        },
        {
            name: "featured",
            type: "boolean",
            title: "Featured",
        },
        {
            name: "description",
            type: "text",
            title: "Description",
        },
        {
            name: "date",
            type: "date",
            title: "Date",
        },
        {
            name: "URL",
            type: "url",
            title: "URL",
        },

        {
            name: "client",
            type: "reference",
            title: "Client",
            to: [
                {
                    type: "client",
                }
            ]
        },
        {
            name: "tags",
            type: "array",
            title: "Tags",
            of: [
                {
                    type: "reference",
                    to: [
                        {
                            type: "tag",
                        },
                    ],
                },
            ],
        },
        {
            name: "technologies",
            type: "array",
            title: "Technologies",
            of: [
                {
                    type: "reference",
                    to: [
                        {
                            type: "technology",
                        },
                    ],
                },
            ],
        },
        {
            name: "thumbnail",
            type: "image",
            title: "Thumbnail"

        },
        orderRankField({ type: "project" })
    ]
} 