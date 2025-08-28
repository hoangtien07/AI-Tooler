// src/lib/api.ts
// Axios client + API wrappers (ESM/TypeScript)

import axios, { AxiosError, AxiosRequestConfig } from "axios";

/** ========================
 *  Cấu hình cơ bản
 *  ======================== */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ||
  "https://ai-tool-server-production.up.railway.app/api"; // fallback khi thiếu env

// Nếu backend dùng session cookie (Google OAuth), để true:
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

/** ========================
 *  Helpers trả về .data
 *  ======================== */
export async function get<T>(url: string, config?: AxiosRequestConfig) {
  const res = await api.get<T>(url, config);
  return res.data;
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
 *  Types (tối thiểu để gợi ý)
 *  ======================== */
export type Bot = {
  _id: string;
  name: string;
  slug: string;
  image?: string;
  summary?: string;
  description?: string;
  category?: string;
  tags?: string[];
  features?: string[];
  views?: number;
  clicks?: number;
  seo?: {
    title?: string;
    description?: string;
    ogImage?: string;
    canonical?: string;
  };
  createdAt?: string;
};
export type Blog = {
  _id: string;
  title: string;
  slug: string;
  content: string;
  image?: string;
  excerpt?: string;
  tags?: string[];
  status?: "draft" | "active" | "archived";
  publishedAt?: string;
  views?: number;
};
export type SearchBlogItem = {
  _id: string;
  type: "blog";
  title: string;
  slug: string;
  image?: string;
  views?: number;
  snippet: string; // có thể chứa <mark>...</mark>
  matchIn: string[];
};
export type SearchBotItem = {
  _id: string;
  type: "bot";
  name: string;
  category: string;
  slug: string;
  image?: string;
  summary?: string;
  description?: string;
};
export type SearchAllResponse = {
  query: string;
  counts: { bots: number; blogs: number };
  tabs: {
    blogs: SearchBlogItem[];
    bots: SearchBotItem[];
  };
};
export type SearchBlogResponse = {
  query: string;
  counts: { blogs: number };
  tabs: {
    blogs: SearchBlogItem[];
  };
};
export type SearchBotResponse = {
  query: string;
  counts: { bots: number };
  tabs: {
    bots: SearchBotItem[];
  };
};

export type Paginated<T> = { total: number; items: T[] };

/** ========================
 *  API Wrappers sẵn dùng
 *  ======================== */
// Bots
export const BotApi = {
  list: (params?: {
    q?: string;
    tag?: string;
    category?: string;
    status?: string;
    skip?: number;
    limit?: number;
    sort?: string;
    createdAt?: string;
  }) => get<Paginated<Bot>>(`/bots`, { params }),

  facets: (params?: {
    q?: string;
    tag?: string;
    status?: string;
    category?: string;
  }) =>
    get<{
      categories: { value: string; count: number }[];
      tags: { value: string; count: number }[];
    }>("/bots/facets", { params }),

  getById: (id: string) => get<Bot>(`/bots/${id}`),
  getBySlug: (slug: string) => get<Bot>(`/bots/slug/${slug}`),

  create: (payload: Partial<Bot> & { name: string }) =>
    post<Bot>(`/bots`, payload),

  update: (id: string, payload: Partial<Bot>) =>
    patch<Bot>(`/bots/${id}`, payload),

  remove: (id: string) => del<{ deleted: boolean; _id: string }>(`/bots/${id}`),

  incViews: (id: string) => patch<{ views: number }>(`/bots/${id}/views`),
  trackClick: (id: string) => post<{ clicks: number }>(`/bots/${id}/click`),

  top: (limit = 10) => get<Bot[]>(`/bots/top`, { params: { limit } }),
};

// Blogs
export const BlogApi = {
  list: (params?: {
    q?: string;
    tag?: string;
    status?: string;
    skip?: number;
    limit?: number;
    sort?: string;
  }) => get<Paginated<Blog>>(`/blogs`, { params }),

  getBySlug: (slug: string) => get<Blog>(`/blogs/${slug}`),

  create: (payload: Pick<Blog, "title" | "content"> & Partial<Blog>) =>
    post<Blog>(`/blogs`, payload),

  update: (slug: string, payload: Partial<Blog>) =>
    patch<Blog>(`/blogs/${slug}`, payload),

  remove: (slug: string) =>
    del<{ deleted: boolean; _id: string }>(`/blogs/${slug}`),
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
    }
  ) =>
    get<SearchAllResponse>("/search", {
      params: { q, tab: "all", ...params },
    }),
  blogs: (params: { q: string; skipBlogs?: number; limitBlogs?: number }) =>
    get<SearchBlogResponse>("/search", {
      params: { tab: "blogs", ...params },
    }),
};
