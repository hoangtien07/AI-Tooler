import { NextResponse } from "next/server";

const BACKEND = (
  process.env.BACKEND_BASE_URL || "http://localhost:5000"
).replace(/\/$/, "");

// gộp query từ req vào path backend
function withQuery(path: string, req: Request) {
  const url = new URL(req.url);
  const qs = url.searchParams.toString();
  return qs ? `${path}?${qs}` : path;
}

function copySetCookies(up: Response, out: NextResponse) {
  const sc = up.headers.get("set-cookie");
  if (sc) out.headers.set("set-cookie", sc);
}

async function forward(req: Request, path: string, init?: RequestInit) {
  const target = `${BACKEND}${path}`;
  const upstream = await fetch(target, {
    method: req.method,
    headers: {
      "content-type": req.headers.get("content-type") || "application/json",
      authorization: req.headers.get("authorization") || "",
      cookie: req.headers.get("cookie") || "",
      ...init?.headers,
    },
    body: ["GET", "HEAD"].includes(req.method) ? undefined : await req.text(),
    cache: "no-store", // tránh cache khi proxy; tùy chỉnh theo nhu cầu
  });

  const contentType = upstream.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    const data = await upstream.json();
    const res = NextResponse.json(data, { status: upstream.status });
    copySetCookies(upstream, res);
    return res;
  } else {
    const text = await upstream.text();
    const res = new NextResponse(text, {
      status: upstream.status,
      headers: { "content-type": contentType },
    });
    copySetCookies(upstream, res);
    return res;
  }
}

export const proxyGET = (req: Request, basePath: string) =>
  forward(req, withQuery(basePath, req));
export const proxyPOST = (req: Request, basePath: string) =>
  forward(req, basePath);
export const proxyPATCH = (req: Request, basePath: string) =>
  forward(req, basePath);
export const proxyDELETE = (req: Request, basePath: string) =>
  forward(req, basePath);
