import { client } from "../services/sanity";

const experience_fetch = async () => {
    return await client.fetch(`
    *[_type == "experience"]|order(present desc) {
        company,
        companyURL,
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

    for (const { company, title, companyURL } of experience) {
        markdown += `* **${title} @** [${company}](${companyURL})\n`;
    }

    return markdown;
}