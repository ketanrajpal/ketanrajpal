const SITE_URL = "https://ketanrajpal.dev";

// IndexNow is supported by Bing, Yandex, and Naver.
// A single submission to any endpoint propagates to all partners.
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

export async function submitToIndexNow(urls: string[]): Promise<void> {
  const key = process.env.INDEXNOW_KEY;
  if (!key) {
    console.warn("[IndexNow] INDEXNOW_KEY not set — skipping submission.");
    return;
  }

  if (urls.length === 0) return;

  const body = {
    host: new URL(SITE_URL).hostname,
    key,
    keyLocation: `${SITE_URL}/${key}.txt`,
    urlList: urls,
  };

  try {
    const response = await fetch(INDEXNOW_ENDPOINT, {
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: "POST",
    });

    if (!response.ok) {
      console.error(
        `[IndexNow] Submission failed: ${response.status} ${response.statusText}`,
      );
    } else {
      console.log(`[IndexNow] Submitted ${urls.length} URL(s).`);
    }
  } catch (error) {
    console.error("[IndexNow] Network error during submission:", error);
  }
}
