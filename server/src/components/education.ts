import { client } from "../services/sanity";

const education_fetch = async () => {
    return await client.fetch(`
    *[_type == "education"]|order(endDate desc) {
        programme,
        school,
        schoolURL,
        location,
        startDate,
        endDate,
        present,
        description,
        "subjects":subjects[]->name
    }`);
}

export const education_markdown = async () => {
    const education = await education_fetch();

    let markdown = '';

    for (const { programme, school, schoolURL } of education) {
        markdown += `* **${programme}** :point_right: [${school}](${schoolURL})\n`;
    }

    return markdown;
}