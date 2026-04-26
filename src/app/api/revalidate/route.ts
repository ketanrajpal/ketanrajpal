import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

import { submitToIndexNow } from "@/lib/indexnow";

const SITE_URL = "https://ketanrajpal.dev";

/**
 * Sanity webhook endpoint.
 *
 * Configure in Sanity dashboard:
 *   URL:    https://ketanrajpal.dev/api/revalidate
 *   Method: POST
 *   Trigger: on publish / on update
 *   Header: x-webhook-secret = <SANITY_WEBHOOK_SECRET>
 *   Projection: { _type, slug }
 */
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_WEBHOOK_SECRET;

  // Verify secret if one is configured
  if (secret) {
    const incoming = request.headers.get("x-webhook-secret");
    if (incoming !== secret) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  }

  let body: { _type?: string; slug?: { current?: string } };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  const type = body._type;
  const slug = body.slug?.current;

  if (type === "post" && slug) {
    // Revalidate the affected pages
    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    revalidatePath("/sitemap.xml");

    // Notify search engines immediately
    await submitToIndexNow([`${SITE_URL}/blog/${slug}`, `${SITE_URL}/blog`]);

    return NextResponse.json({
      message: `Revalidated /blog/${slug}`,
      revalidated: true,
    });
  }

  return NextResponse.json({ message: "No action taken", revalidated: false });
}
