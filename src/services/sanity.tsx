import { createClient } from "@sanity/client";

export default createClient({
  projectId: "lyxsg6t2",
  dataset: "production",
  useCdn: true,
  apiVersion: "2023-04-25",
});
