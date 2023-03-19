import { client } from "../services/sanity";

const project_fetch = async () => {
    return await client.fetch(`
    *[_type == "project" && featured == true]|order(orderRank){
        title,
        "slug":slug.current,
        "client":client->name,
        description,
        URL,
        "tags":tags[]->name,
        "technologies":technologies[]->name,
    }`);
}

export const project_markdown = async () => {
    const project = await project_fetch();

    let markdown = '';

    for (const { title, client, technologies, URL } of project) {
        let technology_markdown = '';
        technologies.forEach((technology: string, index: number) => {
            if (index === technologies.length - 1) technology_markdown += ' & ';
            technology_markdown += `${technology}`;
            if (index < technologies.length - 2) technology_markdown += ', ';
        });

        markdown += `* **[${title}](${URL})** for ${client}..\n**Technologies used** :point_right: ${technology_markdown}\n\n`;
    }

    return markdown;
}