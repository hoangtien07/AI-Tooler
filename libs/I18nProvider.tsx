"use client";

import React, { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

type Props = {
  children: React.ReactNode;
  initialLocale?: "vi" | "en";
};

export function I18nProvider({ children, initialLocale }: Props) {
  // Ưu tiên initialLocale (đến từ URL / middleware). Nếu không có, i18n đã detect sẵn.
  useEffect(() => {
    if (initialLocale && i18n.language !== initialLocale) {
      i18n.changeLanguage(initialLocale);
    }
  }, [initialLocale]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
