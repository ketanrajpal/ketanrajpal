export const award = {
    name: "award",
    type: "document",
    title: "Award",
    fields: [
        {
            name: "name",
            type: "string",
            title: "Name",
        },
        {
            name: "institution",
            type: "reference",
            title: "Institution",
            to: [{ type: "institution" }],
        },
        {
            name: "event",
            type: "reference",
            title: "Event",
            to: [{ type: "event" }],
        },
        {
            name: "rank",
            type: "number",
            title: "Rank",
        },
        {
            name: "date",
            type: "date",
            title: "Date",
        }
    ]
}