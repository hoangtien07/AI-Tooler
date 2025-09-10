// components/HtmlLangSetter.tsx
"use client";

import { useEffect } from "react";

type Locale = "vi" | "en";
export default function HtmlLangSetter({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
