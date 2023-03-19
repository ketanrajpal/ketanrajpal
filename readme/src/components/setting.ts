import { client } from "../services/sanity";

const setting_fetch = async () => {
    return await client.fetch(`
    *[_type == "setting"] {
        slug,
        description
    }`);
}

export const setting_markdown = async () => {
    const setting = await setting_fetch();

    let markdown_description = '';

    for (const { description, slug } of setting) {
        if (slug.current === "github-description") markdown_description = description;
    }

    return { "description": markdown_description };
}