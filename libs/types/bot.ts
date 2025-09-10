export type Locale = "vi" | "en"; // extend when adding locales

export type LocalizedString<L extends string = Locale> = Record<L, string>;
export type LocalizedRich<L extends string = Locale> = Record<L, string>;

export interface PricingTierResolved {
  plan: string;
  priceText: string;
  amount?: number | null;
  currency?: string;
  interval?: "month" | "year" | "one_time" | "other";
}

export interface PricingTierRaw<L extends string = Locale> {
  plan?: string | LocalizedString<L>;
  priceText?: string | LocalizedString<L>;
  amount?: number | null;
  currency?: string;
  interval?: "month" | "year" | "one_time" | "other";
}

/**
 * Backend-resolved block for a specific language. Keep non-generic to avoid TS2717 merges.
 */
export interface BotResolvedBlock {
  lang: Locale;
  name?: string;
  summary?: string;
  title?: string;
  description?: string;
  features?: string[];
  strengths?: string[];
  weaknesses?: string[];
  targetUsers?: string[];
  pricing?: PricingTierResolved[];
}

export interface Bot<L extends string = Locale> {
  _id: string;
  slug: string;

  name: LocalizedString<L>;
  summary?: LocalizedString<L>;
  title?: LocalizedString<L>;
  description?: LocalizedRich<L>;

  image?: string;
  tags?: string[];

  features?: Array<string | LocalizedString<L>>;
  strengths?: Array<string | LocalizedString<L>>;
  weaknesses?: Array<string | LocalizedString<L>>;
  targetUsers?: Array<string | LocalizedString<L>>;

  pricing?: Array<PricingTierResolved | PricingTierRaw<L>>;

  affiliateLink?: string;

  resolved?: BotResolvedBlock;
}

export interface BotListItem<L extends string = Locale> {
  _id: string;
  slug: string;
  name: LocalizedString<L>;
  summary?: LocalizedString<L>;
  image?: string;
  tags?: string[];
}

export interface BotListResponse<L extends string = Locale> {
  page: number;
  limit: number;
  total: number;
  pages: number;
  items: BotListItem<L>[];
  lang: L;
}
