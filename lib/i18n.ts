"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

if (!i18n.isInitialized) {
  i18n
    .use(HttpBackend) // tải JSON qua HTTP
    .use(LanguageDetector) // phát hiện từ cookie, query, html lang, v.v.
    .use(initReactI18next)
    .init({
      backend: {
        // JSON nằm trong /public/locales
        loadPath: "/locales/{{lng}}/{{ns}}.json",
      },

      // map en-US -> en, vi-VN -> vi (tránh lỗi hiện key)
      load: "languageOnly",
      supportedLngs: ["en", "vi"],
      fallbackLng: "en",

      ns: ["common"],
      defaultNS: "common",

      detection: {
        order: [
          "cookie",
          "querystring",
          "htmlTag",
          "localStorage",
          "navigator",
        ],
        caches: ["cookie"],
        lookupQuerystring: "lang",
        cookieMinutes: 60 * 24 * 365,
      },

      interpolation: { escapeValue: false },
      react: { useSuspense: false },
      // debug: true,
      returnEmptyString: true, // nếu có bản dịch rỗng, cứ trả rỗng
      saveMissing: false,
      parseMissingKeyHandler: () => "",
    });
}

export default i18n;
