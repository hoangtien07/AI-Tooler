import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;
const DEFAULT_LOCALE: "vi" | "en" = "vi";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (PUBLIC_FILE.test(pathname) || pathname.startsWith("/api")) {
    return NextResponse.next();
  }
  // đã có /vi hoặc /en
  if (
    pathname.startsWith("/vi/") ||
    pathname === "/vi" ||
    pathname.startsWith("/en/") ||
    pathname === "/en"
  ) {
    return NextResponse.next();
  }
  // redirect / -> /vi
  const url = req.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next).*)"],
};
