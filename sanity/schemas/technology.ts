export const technology = {
    name: "technology",
    type: "document",
    title: "Technology",
    fields: [
        {
            name: "name",
            type: "string",
            title: "Name",
            unique: true
        },
        {
            name: "type",
            type: "reference",
            title: "Type",
            to: [{ type: "technology-type" }]
        }
    ]
}