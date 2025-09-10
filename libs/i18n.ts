"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// import LanguageDetector from "i18next-browser-languagedetector";
// import HttpBackend from "i18next-http-backend";
export type CommonDict = typeof enCommon;

import enCommon from "@/public/locales/en/common.json";
import viCommon from "@/public/locales/vi/common.json";
import enService from "@/public/locales/en/service.json";
import viService from "@/public/locales/vi/service.json";

// Chỉ khởi tạo i18n một lần duy nhất
// if (!i18n.isInitialized) {
//   i18n
//     .use(HttpBackend)
//     .use(LanguageDetector)
//     .use(initReactI18next)
//     .init({
//       backend: {
//         loadPath: "/locales/{{lng}}/{{ns}}.json",
//       },
//       load: "languageOnly",
//       supportedLngs: ["en", "vi"],
//       fallbackLng: "en",
//       ns: ["common"],
//       defaultNS: "common",
//       detection: {
//         order: [
//           "cookie",
//           "querystring",
//           "htmlTag",
//           "localStorage",
//           "navigator",
//         ],
//         caches: ["cookie"],
//         lookupQuerystring: "lang",
//         cookieMinutes: 60 * 24 * 365,
//       },
//       interpolation: { escapeValue: false },
//       react: { useSuspense: false },
//       returnEmptyString: false,
//       saveMissing: false,
//       parseMissingKeyHandler: (key) => key,
//     });
// }

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      en: { common: enCommon, service: enService },
      vi: { common: viCommon, service: viService },
    },
    lng: "en",
    fallbackLng: "en",
    ns: ["common", "service"],
    defaultNS: "common",
    interpolation: { escapeValue: false },
  });
}
export default i18n;

export const LOCALES = ["vi", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export function ensureLocale(input?: string): Locale {
  const l = (input || "").toLowerCase();
  return (LOCALES as readonly string[]).includes(l)
    ? (l as Locale)
    : DEFAULT_LOCALE;
}

// Hàm load dictionary cho server components (nếu cần)
export async function getDictionary(locale: Locale): Promise<CommonDict> {
  try {
    if (locale === "vi") {
      const vi = await import("@/public/locales/vi/common.json");
      return vi.default;
    }
    const en = await import("@/public/locales/en/common.json");
    return en.default;
  } catch (error) {
    console.error("Error loading dictionary:", error);
    throw error;
  }
}
