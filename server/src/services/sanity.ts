import { createClient } from '@sanity/client';

export const client = createClient({
    projectId: "lyxsg6t2",
    dataset: "production",
    useCdn: false,
    apiVersion: '2021-03-25',
});