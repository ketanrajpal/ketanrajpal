import { client } from "../services/sanity";

const project_fetch = async () => {
    return await client.fetch(`
    *[_type == "project" && featured == true]|order(orderRank){
        title,
        "slug":slug.current,
        "client":client->name,
        description,
        url,
        "tags":tags[]->name,
        "technologies":technologies[]->name,
    }`);
}

export const project_markdown = async () => {
    const project = await project_fetch();

    let markdown = '';

    for (const { title, client, tags } of project) {
        markdown += `* **${title}** for ${client} :point_right: ${tags[0]}\n`;
    }

    return markdown;
}