import { client } from "../services/sanity";

const experience_fetch = async () => {
    return await client.fetch(`
    *[_type == "experience"]|order(present desc, endDate desc) {
        company,
        companyUrl,
        title,
        location,
        startDate,
        endDate,
        present,
        description
    }`);
}

export const experience_markdown = async () => {
    const experience = await experience_fetch();

    let markdown = '';

    for (const { company, title } of experience) {
        markdown += `* **${company}** :point_right: ${title}\n`;
    }

    return markdown;
}