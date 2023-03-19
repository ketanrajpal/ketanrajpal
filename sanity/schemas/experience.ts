export const experience = {
    name: "experience",
    type: "document",
    title: "Experience",
    fields: [
        {
            name: "company",
            type: "string",
            title: "Company",
        },
        {
            name: "companyURL",
            type: "url",
            title: "Company URL",
        },
        {
            name: "title",
            type: "string",
            title: "Title",
        },
        {
            name: "location",
            type: "string",
            title: "Location",
        },
        {
            name: "startDate",
            type: "date",
            title: "Start Date",
        },
        {
            name: "endDate",
            type: "date",
            title: "End Date",
        },
        {
            name: "present",
            type: "boolean",
            title: "Present",
        },
        {
            name: "description",
            type: "array",
            title: "Description",
            of: [
                {
                    type: "text",
                }
            ]
        }
    ]
} 