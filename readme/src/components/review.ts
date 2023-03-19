import { client } from "../services/sanity";

const review_fetch = async () => {
    return await client.fetch(`
    *[_type == "review" && show_on_github == true]|order(orderRank){
        name,
        designation,
        organisation,
        description,
        "image": image.asset->url
    }`);
}

export const review_markdown = async () => {
    const review = await review_fetch();

    let markdown = '';

    for (const { name, designation, description } of review) {
        markdown += `* **${name}** (${designation}) :point_right: ${description}\n`;
    }

    return markdown;
}