import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

const CANONICAL_HOST = "www.ketanrajpal.dev";
const CANONICAL_PROTOCOL = "https";

export function middleware(request: NextRequest) {
  const host =
    request.headers.get("host")?.split(":")[0] ?? request.nextUrl.hostname;
  const protocol = request.nextUrl.protocol.replace(":", "");

  if (host === "localhost" || host === "127.0.0.1") {
    return NextResponse.next();
  }

  if (host !== CANONICAL_HOST || protocol !== CANONICAL_PROTOCOL) {
    const url = request.nextUrl.clone();
    url.hostname = CANONICAL_HOST;
    url.protocol = `${CANONICAL_PROTOCOL}:`;
    url.port = "";

    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|apple-icon.png|icon-192.png|icon-512.png|favicon.svg|og-image.png|manifest.webmanifest|robots.txt|sitemap.xml).*)",
  ],
};
