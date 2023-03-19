import { client } from "../services/sanity";

const technology_fetch = async () => {
    return await client.fetch(`
    *[_type == "technology-type"]|order(orderRank){
        name,
        "technologies": *[_type=='technology' && references(^._id)].name
    }`);
}

export const technology_markdown = async () => {
    const technology = await technology_fetch();

    let markdown = '';

    for (const { name, technologies } of technology) {

        let technology_markdown = '';
        technologies.forEach((tech: string, index: number) => {
            if (index === technologies.length - 1) technology_markdown += ' & ';
            technology_markdown += `${tech}`;
            if (index < technologies.length - 2) technology_markdown += ', ';
        });

        markdown += `* **${name}** :point_right: ${technology_markdown}\n`;

    }

    return markdown;
}