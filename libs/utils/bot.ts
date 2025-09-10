import type {
  Bot,
  BotListItem,
  BotResolvedBlock,
  Locale,
  LocalizedRich,
  LocalizedString,
  PricingTierRaw,
  PricingTierResolved,
} from "@/libs/types/bot";

const DEFAULT_LOCALES = ["vi", "en"] as const;

// ---------- Type guards & helpers ----------
function isRecord(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null && !Array.isArray(x);
}

export function asLocalizedString<L extends string = Locale>(
  value: unknown,
  locales: readonly L[] = DEFAULT_LOCALES as unknown as readonly L[]
): LocalizedString<L> {
  // Nếu BE trả về 1 string duy nhất => nhân bản ra tất cả locales
  if (typeof value === "string") {
    const out: Record<string, string> = {};
    for (const l of locales as readonly string[]) out[l] = value;
    return out as LocalizedString<L>;
  }

  // Ép cả 2 nhánh về cùng kiểu để tránh {} | ...
  const rec: Partial<Record<L, unknown>> = isRecord(value)
    ? (value as Partial<Record<L, unknown>>)
    : ({} as Partial<Record<L, unknown>>);

  const out: Record<string, string> = {};
  for (const l of locales) {
    const key = l as unknown as string; // index bằng string key
    const raw = rec[l]; // ok vì rec đã có kiểu Record<L, unknown>
    out[key] = typeof raw === "string" ? (raw as string) : "";
  }
  return out as LocalizedString<L>;
}

export function asLocalizedRich<L extends string = Locale>(
  value: unknown,
  locales: readonly L[] = DEFAULT_LOCALES as unknown as readonly L[]
): LocalizedRich<L> {
  // Cùng shape với LocalizedString -> tái dùng
  return asLocalizedString<L>(value, locales) as unknown as LocalizedRich<L>;
}

function strFromLocalized<L extends string = Locale>(
  v: string | LocalizedString<L> | undefined,
  lang: L
): string {
  if (typeof v === "string") return v;
  if (v && asLocalizedString<L>(v)) return v[lang] ?? "";
  return "";
}

function arrOfStrings(input: unknown): string[] {
  if (!Array.isArray(input)) return [];
  return input.map((v) => (typeof v === "string" ? v : "")).filter(Boolean);
}

function arrOfLocalizedOrString<L extends string = Locale>(
  input: unknown,
  lang: L
): string[] {
  if (!Array.isArray(input)) return [];
  return input
    .map((v) =>
      typeof v === "string" ? v : asLocalizedString<L>(v) ? v[lang] ?? "" : ""
    )
    .filter(Boolean);
}

// ---------- Public mappers ----------
export function mapResolved(src: unknown): BotResolvedBlock | undefined {
  if (!isRecord(src)) return undefined;
  const o = src as Record<string, unknown>;
  const langVal = typeof o.lang === "string" ? o.lang : undefined;
  const lang: Locale | undefined =
    langVal === "vi" || langVal === "en" ? (langVal as Locale) : undefined;
  if (!lang) return undefined;

  const toInterval = (
    v: unknown
  ): PricingTierResolved["interval"] | undefined => {
    return v === "month" || v === "year" || v === "one_time" || v === "other"
      ? v
      : undefined;
  };

  const pricing = Array.isArray(o.pricing)
    ? (o.pricing as unknown[]).flatMap((p) => {
        if (!isRecord(p)) return [] as PricingTierResolved[];
        const plan = typeof p.plan === "string" ? (p.plan as string) : "";
        const priceText =
          typeof p.priceText === "string" ? (p.priceText as string) : "";
        const amount =
          typeof p.amount === "number" ? (p.amount as number) : null;
        const currency =
          typeof p.currency === "string" ? (p.currency as string) : undefined;
        const interval = toInterval(p.interval);
        if (plan || priceText || amount !== null || currency) {
          return [{ plan, priceText, amount, currency, interval }];
        }
        return [] as PricingTierResolved[];
      })
    : undefined;

  return {
    lang,
    name: typeof o.name === "string" ? (o.name as string) : undefined,
    summary: typeof o.summary === "string" ? (o.summary as string) : undefined,
    title: typeof o.title === "string" ? (o.title as string) : undefined,
    description:
      typeof o.description === "string" ? (o.description as string) : undefined,
    features: arrOfStrings(o.features),
    strengths: arrOfStrings(o.strengths),
    weaknesses: arrOfStrings(o.weaknesses),
    targetUsers: arrOfStrings(o.targetUsers),
    pricing,
  };
}

export function mapBotDetail<L extends string = Locale>(
  src: unknown,
  locales: readonly L[] = DEFAULT_LOCALES as unknown as readonly L[]
): Bot<L> {
  const d = isRecord(src) ? src : {};
  return {
    _id: String(d._id ?? ""),
    slug: String(d.slug ?? ""),

    name: asLocalizedString<L>(d.name, locales),
    summary:
      d.summary !== undefined
        ? asLocalizedString<L>(d.summary, locales)
        : undefined,
    title:
      d.title !== undefined
        ? asLocalizedString<L>(d.title, locales)
        : undefined,
    description:
      d.description !== undefined
        ? asLocalizedRich<L>(d.description, locales)
        : undefined,

    image: typeof d.image === "string" ? (d.image as string) : undefined,
    tags: Array.isArray(d.tags)
      ? (d.tags as unknown[]).map(String).filter(Boolean)
      : undefined,

    // ÉP KIỂU VỀ UNION ĐÚNG:
    features: Array.isArray(d.features)
      ? (d.features as Array<string | LocalizedString<L>>)
      : undefined,
    strengths: Array.isArray(d.strengths)
      ? (d.strengths as Array<string | LocalizedString<L>>)
      : undefined,
    weaknesses: Array.isArray(d.weaknesses)
      ? (d.weaknesses as Array<string | LocalizedString<L>>)
      : undefined,
    targetUsers: Array.isArray(d.targetUsers)
      ? (d.targetUsers as Array<string | LocalizedString<L>>)
      : undefined,

    pricing: Array.isArray(d.pricing)
      ? (d.pricing as Array<PricingTierResolved | PricingTierRaw<L>>)
      : undefined,

    affiliateLink:
      typeof d.affiliateLink === "string"
        ? (d.affiliateLink as string)
        : undefined,

    resolved: mapResolved(d.resolved),
  };
}

export function mapBotListItem<L extends string = Locale>(
  src: unknown,
  locales: readonly L[] = DEFAULT_LOCALES as unknown as readonly L[]
): BotListItem<L> {
  const d = isRecord(src) ? src : {};
  return {
    _id: String(d._id ?? ""),
    slug: String(d.slug ?? ""),
    name: asLocalizedString<L>(d.name, locales),
    summary:
      d.summary !== undefined
        ? asLocalizedString<L>(d.summary, locales)
        : undefined,
    image: typeof d.image === "string" ? (d.image as string) : undefined,
    tags: Array.isArray(d.tags)
      ? (d.tags as unknown[]).map(String).filter(Boolean)
      : undefined,
  };
}

// ---------- UI pickers (strict) ----------
export function pickText<L extends string = Locale>(
  bot: Bot<L>,
  lang: L,
  key: keyof Pick<
    BotResolvedBlock,
    "name" | "summary" | "title" | "description"
  >
): string {
  const r = bot.resolved;
  if (r && (r.lang as string) === (lang as unknown as string) && r[key])
    return r[key] as string;
  const src = bot[key as keyof Bot<L>] as unknown;
  return strFromLocalized(src as string | LocalizedString<L> | undefined, lang);
}

export function pickArray<L extends string = Locale>(
  bot: Bot<L>,
  lang: L,
  key: keyof Pick<
    Bot<L>,
    "features" | "strengths" | "weaknesses" | "targetUsers"
  >
): string[] {
  const r = bot.resolved;
  if (r && (r.lang as string) === (lang as unknown as string)) {
    const arr = r[key as keyof BotResolvedBlock] as unknown;
    if (Array.isArray(arr)) return (arr as string[]).slice();
  }
  const raw = bot[key];
  return arrOfLocalizedOrString<L>(raw, lang);
}

export function pickPricing<L extends string = Locale>(
  bot: Bot<L>,
  lang: L
): PricingTierResolved[] {
  // Prefer backend-resolved block when lang matches
  if (
    bot.resolved?.lang &&
    (bot.resolved.lang as string) === (lang as unknown as string) &&
    Array.isArray(bot.resolved.pricing)
  ) {
    return bot.resolved.pricing.map((p) => ({
      plan: String(p.plan),
      priceText: String(p.priceText),
      amount: p.amount ?? null,
      currency: p.currency,
      interval: p.interval,
    }));
  }

  const toInterval = (
    v: unknown
  ): PricingTierResolved["interval"] | undefined =>
    v === "month" || v === "year" || v === "one_time" || v === "other"
      ? v
      : undefined;

  const out: PricingTierResolved[] = [];
  for (const p of bot.pricing ?? []) {
    if (!isRecord(p)) continue;

    // Safely read unknown props then narrow step-by-step
    const planUnknown = (p as { plan?: unknown }).plan;
    let plan = "";
    if (typeof planUnknown === "string") plan = planUnknown;
    else if (asLocalizedString<L>(planUnknown))
      plan = (planUnknown as LocalizedString<L>)[lang] ?? "";

    const priceTextUnknown = (p as { priceText?: unknown }).priceText;
    let priceText = "";
    if (typeof priceTextUnknown === "string") priceText = priceTextUnknown;
    else if (asLocalizedString<L>(priceTextUnknown))
      priceText = (priceTextUnknown as LocalizedString<L>)[lang] ?? "";

    const amountUnknown = (p as { amount?: unknown }).amount;
    const amount: number | null =
      typeof amountUnknown === "number" ? amountUnknown : null;

    const currencyUnknown = (p as { currency?: unknown }).currency;
    const currency: string | undefined =
      typeof currencyUnknown === "string" ? currencyUnknown : undefined;

    const intervalUnknown = (p as { interval?: unknown }).interval;
    const interval = toInterval(intervalUnknown);

    if (plan || priceText || amount !== null || currency) {
      out.push({ plan, priceText, amount, currency, interval });
    }
  }
  return out;
}
