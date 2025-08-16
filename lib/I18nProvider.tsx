"use client";
import { I18nextProvider } from "react-i18next";
import { useEffect } from "react";
import i18n from "./i18n";

export function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const setLang = (lng: string) => {
      if (typeof document !== "undefined") document.documentElement.lang = lng;
    };
    setLang(i18n.language);
    i18n.on("languageChanged", setLang);
    return () => i18n.off("languageChanged", setLang);
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
