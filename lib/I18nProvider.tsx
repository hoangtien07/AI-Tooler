"use client";

import React, { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

type Props = {
  children: React.ReactNode;
  initialLocale?: "en" | "vi";
};

export function I18nProvider({ children, initialLocale }: Props) {
  // Chạy đúng 1 lần sau mount để khớp SSR/CSR
  useEffect(() => {
    if (initialLocale && i18n.language !== initialLocale) {
      i18n.changeLanguage(initialLocale);
    }
  }, [initialLocale]); 

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
