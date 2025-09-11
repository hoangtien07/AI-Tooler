"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import type { InitOptions, Resource, ResourceLanguage } from "i18next";

import viCommon from "@/public/locales/vi/common.json";
import enCommon from "@/public/locales/en/common.json";
import viService from "@/public/locales/vi/service.json";
import enService from "@/public/locales/en/service.json";

export const LOCALES = ["vi", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "vi";

/* ---------- detect + persist ---------- */
function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : null;
}
function writeCookie(name: string, value: string, days = 365) {
  if (typeof document === "undefined") return;
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; path=/; max-age=${maxAge}`;
}
function detectLocale(): Locale {
  // 1) cookie (đã set khi user từng chọn)
  const fromCookie = readCookie("locale");
  if (fromCookie && (LOCALES as readonly string[]).includes(fromCookie))
    return fromCookie as Locale;

  // 2) localStorage (client)
  try {
    const ls = localStorage.getItem("locale");
    if (ls && (LOCALES as readonly string[]).includes(ls)) return ls as Locale;
  } catch {}

  // 3) Accept-Language của trình duyệt
  const nav = typeof navigator !== "undefined" ? navigator.language || "" : "";
  const base = nav.split("-")[0].toLowerCase();
  if ((LOCALES as readonly string[]).includes(base)) return base as Locale;

  return DEFAULT_LOCALE;
}
function persistLocale(lng: string) {
  const locale = (LOCALES as readonly string[]).includes(lng)
    ? (lng as Locale)
    : DEFAULT_LOCALE;
  try {
    localStorage.setItem("locale", locale);
  } catch {}
  writeCookie("locale", locale);
  try {
    document.documentElement.lang = locale;
  } catch {}
}

/* ---------- init i18next ---------- */

if (!i18n.isInitialized) {
  const startLocale = detectLocale();

  // ⬇️ Khai báo resources có type rõ ràng, KHÔNG dùng any
  const resources: Resource = {
    vi: {
      common: viCommon as unknown as ResourceLanguage,
      service: viService as unknown as ResourceLanguage,
    },
    en: {
      common: enCommon as unknown as ResourceLanguage,
      service: enService as unknown as ResourceLanguage,
    },
  };

  const options: InitOptions = {
    lng: startLocale,
    fallbackLng: "vi",
    interpolation: { escapeValue: false },
    resources, // ✅ truyền resources đã gõ type
    ns: ["common"],
    defaultNS: "common",
  };

  i18n.use(initReactI18next).init(options);

  // Lưu lại mỗi khi đổi ngôn ngữ
  i18n.on("languageChanged", persistLocale);
}

export default i18n;
