export const education = {
    name: "education",
    type: "document",
    title: "Education",
    fields: [
        {
            name: "programme",
            type: "string",
            title: "Programme",
        },
        {
            name: "school",
            type: "string",
            title: "School",
        },
        {
            name: "schoolURL",
            type: "url",
            title: "School URL",
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
        },
        {
            name: "subjects",
            type: "array",
            title: "Subjects",
            of: [
                {
                    type: "reference",
                    to: [
                        {
                            type: "subject"
                        }
                    ]
                }
            ]
        }
    ]
}