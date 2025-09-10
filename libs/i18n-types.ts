export type Locale = "vi" | "en";

export interface LocalizedString {
  vi: string;
  en: string;
}

export type LocalizedListItem = LocalizedString;

export interface LocalizedRichText {
  vi?: { html?: string; text?: string };
  en?: { html?: string; text?: string };
}

export interface PricingTier {
  plan: LocalizedString;
  priceText: LocalizedString;
  amount?: number | null;
  currency: string;
  interval: "month" | "year" | "one_time" | "other";
}

// pick helpers (nếu cần fallback nhẹ)
export const pickLoc = (loc: LocalizedString | undefined, lang: Locale) =>
  loc?.[lang] ?? loc?.[lang === "vi" ? "en" : "vi"] ?? "";

export const pickLocList = (
  arr: LocalizedListItem[] | undefined,
  lang: Locale
) => (arr ?? []).map((x) => pickLoc(x, lang)).filter(Boolean);
