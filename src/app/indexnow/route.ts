/**
 * Serves the IndexNow key verification file.
 *
 * IndexNow requires a plain-text file at:
 *   https://ketanrajpal.dev/{INDEXNOW_KEY}.txt
 *
 * Rewrite in next.config.ts maps /{key}.txt → /indexnow
 * so this single route handles it without polluting the app directory.
 */
export function GET() {
  const key = process.env.INDEXNOW_KEY;

  if (!key) {
    return new Response("INDEXNOW_KEY env variable not set", { status: 500 });
  }

  return new Response(key, {
    headers: {
      "Cache-Control": "public, max-age=86400",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
