// src/lib/api.ts
// Axios client + API wrappers (ESM/TypeScript)

import axios, { AxiosError, AxiosRequestConfig } from "axios";
import type {
  Blog,
  BlogListResponse,
  Locale,
  LocalizedRich,
  LocalizedString,
} from "./types/blog";
import { mapBlogDetail, mapListBlogItem } from "./utils/blog";
import type { Bot, BotListResponse } from "@/libs/types/bot";
import { mapBotDetail, mapBotListItem } from "@/libs/utils/bot";
import type { SearchAllResponse, SearchBlogResponse } from "./types/search";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ||
  "https://ai-tool-server-production.up.railway.app/api";

const WITH_CREDENTIALS = true;

// Lấy access token (nếu bạn có cơ chế Bearer token cho admin)
// Không có thì có thể trả undefined.
function getAccessToken(): string | undefined {
  if (typeof window === "undefined") return undefined;
  return localStorage.getItem("access_token") || undefined;
}

// Tạo axios instance dùng chung
export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: WITH_CREDENTIALS,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

/** ========================
 *  Interceptors
 *  ======================== */
// Gắn Authorization (nếu có token)
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Định nghĩa kiểu cho dữ liệu lỗi từ API
interface ApiErrorData {
  message: string;
  [key: string]: unknown;
}

// Chuẩn hóa lỗi cho dễ xử lý ở UI
api.interceptors.response.use(
  (res) => res,
  (error: AxiosError<ApiErrorData>) => {
    const status = error.response?.status;
    const message =
      error.response?.data?.message || error.message || "Request failed";
    // Ví dụ: nếu 401 và có trang đăng nhập admin riêng
    if (typeof window !== "undefined" && status === 401) {
      // window.location.href = "/admin/login"; // bật nếu cần
    }
    return Promise.reject({ status, message, raw: error });
  }
);

// // tạo instance có gắn lang vào header + query
// function makeClient(lang: Locale): AxiosInstance {
//   const instance = axios.create({
//     baseURL: API_BASE_URL,
//     withCredentials: WITH_CREDENTIALS,
//   });

//   instance.interceptors.request.use((config) => {
//     // header
//     config.headers.set("Accept-Language", lang);

//     // query ?lang=...
//     const hasBase = Boolean(config.baseURL);
//     const base = hasBase ? (config.baseURL as string) : "";
//     const rawUrl = config.url ?? "";
//     const url = new URL(
//       base.replace(/\/$/, "") + "/" + rawUrl.replace(/^\//, ""),
//       "http://x"
//     );
//     if (!url.searchParams.get("lang")) url.searchParams.set("lang", lang);

//     return { ...config, url: url.pathname + "?" + url.searchParams.toString() };
//   });

//   return instance;
// }

// tạo query string an toàn
export function withQuery(
  path: string,
  query?: Record<string, string | number | boolean | undefined | null>
) {
  if (!query) return path;
  const sp = new URLSearchParams();
  Object.entries(query).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    sp.set(k, String(v));
  });
  const qs = sp.toString();
  return qs ? `${path}?${qs}` : path;
}

export type QueryParams = Record<string, string | number | boolean | undefined>;
export function withLang(locale: Locale, params?: QueryParams): QueryParams {
  return { lang: locale, ...(params || {}) };
}

/** ========================
 *  Helpers trả về .data
 *  ======================== */
async function get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  try {
    const res = await api.get(url, config);
    return res.data as T;
  } catch (e) {
    const err = e as AxiosError;
    throw new Error(
      err.response?.data ? JSON.stringify(err.response.data) : err.message
    );
  }
}

export async function post<T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
) {
  const res = await api.post<T>(url, data, config);
  return res.data;
}
export async function patch<T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
) {
  const res = await api.patch<T>(url, data, config);
  return res.data;
}
export async function del<T>(url: string, config?: AxiosRequestConfig) {
  const res = await api.delete<T>(url, config);
  return res.data;
}

/** ========================
 *  API Wrappers sẵn dùng
 *  ======================== */
// Bots
export const BotApi = {
  async getBySlug<L extends string = Locale>(
    lang: L,
    slug: string
  ): Promise<Bot<L>> {
    const raw = await get<unknown>(`/bots/slug/${encodeURIComponent(slug)}`, {
      params: { lang },
    });
    return mapBotDetail<L>(raw);
  },

  async list<L extends string = Locale>(
    lang: L,
    params?: {
      q?: string;
      tag?: string;
      page?: number;
      limit?: number;
      sort?: string;
      category?: string | string[];
      status?: "active" | "inactive" | string;
    }
  ): Promise<BotListResponse<L>> {
    type Raw = {
      page?: number;
      limit?: number;
      total?: number;
      pages?: number;
      lang?: string;
      items?: unknown[];
    };

    // Chuẩn hoá category: mảng -> "a,b,c"
    const categoryParam = Array.isArray(params?.category)
      ? params!.category.filter(Boolean).join(",")
      : params?.category;

    // Chỉ truyền các param có giá trị
    const query: Record<string, string | number | undefined> = {
      lang,
      q: params?.q,
      tag: params?.tag,
      page: params?.page,
      limit: params?.limit,
      sort: params?.sort,
      status: params?.status,
      category: categoryParam,
    };

    const raw = await get<Raw>("/bots", { params: query });

    return {
      page: Number(raw.page ?? params?.page ?? 1),
      limit: Number(raw.limit ?? params?.limit ?? 12),
      total: Number(raw.total ?? 0),
      pages: Number(raw.pages ?? 1),
      lang: (raw.lang ?? lang) as L,
      items: (raw.items ?? []).map((x) => mapBotListItem<L>(x)),
    };
  },
};

// Blogs
export function toLocalizedString(input: unknown): LocalizedString {
  if (typeof input === "string") return { vi: input, en: input };
  const obj = (input ?? {}) as Record<string, unknown>;
  return {
    vi: typeof obj.vi === "string" ? (obj.vi as string) : "",
    en: typeof obj.en === "string" ? (obj.en as string) : "",
  };
}

export function toLocalizedRich(input: unknown): LocalizedRich {
  const obj = (input ?? {}) as Record<string, unknown>;
  const vi = (obj.vi ?? {}) as Record<string, unknown>;
  const en = (obj.en ?? {}) as Record<string, unknown>;
  const s = (v: unknown) => (typeof v === "string" ? v : "");
  return {
    vi: { raw: vi.raw, html: s(vi.html), text: s(vi.text) },
    en: { raw: en.raw, html: s(en.html), text: s(en.text) },
  };
}

export const BlogApi = {
  async getBySlug(locale: Locale, slug: string): Promise<Blog> {
    const { data } = await api.get(`/blogs/${encodeURIComponent(slug)}`, {
      params: withLang(locale),
    });
    return mapBlogDetail(data);
  },

  async list(
    locale: Locale,
    params?: {
      q?: string;
      tag?: string;
      page?: number;
      limit?: number;
      status?: string;
      sort?: string;
    }
  ): Promise<BlogListResponse> {
    const { data } = await api.get("/blogs", {
      params: withLang(locale, params),
    });
    const root = data as Record<string, unknown>;
    const itemsArr = Array.isArray(root.items) ? (root.items as unknown[]) : [];
    return {
      page: Number(root.page ?? 1),
      limit: Number(root.limit ?? itemsArr.length),
      total: Number(root.total ?? itemsArr.length),
      pages: Number(root.pages ?? 1),
      items: itemsArr.map(mapListBlogItem),
      lang: (root.lang as Locale) || undefined,
      q: typeof root.q === "string" ? (root.q as string) : undefined,
      usedTextSearch: Boolean(root.usedTextSearch),
    };
  },
};

export type SearchBlogsParams = {
  q: string;
  skipBlogs?: number;
  limitBlogs?: number;
  lang?: Locale;
};

// Search
export const SearchApi = {
  all: (
    q: string,
    params?: {
      skipBlogs?: number;
      limitBlogs?: number;
      skipBots?: number;
      limitBots?: number;
      lang?: Locale;
      headers?: Record<string, string>;
    }
  ) =>
    get<SearchAllResponse>("/search", {
      params: { q, tab: "all", ...params },
    }),
  blogs: (params: SearchBlogsParams) =>
    get<SearchBlogResponse>("/search", {
      params: { tab: "blogs", ...params },
    }),
};
