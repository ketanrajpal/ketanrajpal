export const setting = {
    name: "setting",
    type: "document",
    title: "Setting",
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
            name: "description",
            type: "text",
            title: "Description",
        }
    ]
}