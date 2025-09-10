// middleware.ts
import { NextRequest, NextResponse } from "next/server";

const SUPPORTED = ["vi", "en"] as const;
type Locale = (typeof SUPPORTED)[number];
const DEFAULT_LOCALE: Locale = "vi";

function pickFromAcceptLanguage(accept: string): Locale {
  const parts = accept.split(",").map((s) => s.trim());
  const ranked = parts
    .map((p) => {
      const [tag, q] = p.split(";q=");
      return { tag: tag.toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    const base = tag.split("-")[0];
    if (SUPPORTED.includes(base as Locale)) return base as Locale;
  }
  return DEFAULT_LOCALE;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Bỏ qua tài nguyên tĩnh & API
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/robots.txt") ||
    pathname.startsWith("/sitemap.xml") ||
    pathname.startsWith("/images") ||
    pathname === "/"
  ) {
    // với "/" ta vẫn muốn redirect → xử lý riêng phía dưới
  } else {
    const seg = pathname.split("/")[1];
    if (seg === "vi" || seg === "en") {
      return NextResponse.next(); // đã có locale → cho qua
    }
  }

  // Ưu tiên locale trong cookie
  const cookieLocale = req.cookies.get("locale")?.value as Locale | undefined;
  let locale: Locale | undefined =
    cookieLocale && (SUPPORTED as readonly string[]).includes(cookieLocale)
      ? cookieLocale
      : undefined;

  // Nếu không có cookie → xét Accept-Language
  if (!locale) {
    const accept = req.headers.get("accept-language") || "";
    locale = pickFromAcceptLanguage(accept);
  }

  // Tạo URL mới có prefix locale
  const url = req.nextUrl.clone();
  const segs = pathname.split("/").filter(Boolean);
  const hasLocale = segs[0] === "vi" || segs[0] === "en";
  url.pathname = hasLocale
    ? pathname
    : `/${locale}${pathname === "/" ? "" : pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  // Loại trừ _next, api, file tĩnh… để tránh can thiệp
  matcher: [
    "/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|images|public).*)",
  ],
};
