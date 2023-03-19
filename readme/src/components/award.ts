import { client } from "../services/sanity";

const award_fetch = async () => {
    return await client.fetch(`
    *[_type == "award"]|order(date desc) {
        name,
        "institution": institution->name,
        "event": event->name,
        rank,
        date
    }`);
}

export const award_markdown = async () => {
    const award = await award_fetch();

    let markdown = '';

    for (const { rank, event, institution } of award) {
        markdown += `* **${rank === 1 ? "1st" : "2nd"}** position in **${event}** :point_right: ${institution}\n`;
    }

    return markdown;
}