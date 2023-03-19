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
    let markdown_sub_heading = '';

    for (const { description, slug } of setting) {
        if (slug.current === "github-description") markdown_description = description;
        if (slug.current === "sub-heading") markdown_sub_heading = description;
    }

    return { "description": markdown_description, "sub_heading": markdown_sub_heading };
}