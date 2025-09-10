// app/[locale]/search/page.tsx
import type { Metadata } from "next";
import type { Locale } from "@/libs/types/blog";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Search",
  description: "Search results",
};

type SearchParams = Record<string, string | string[] | undefined>;

export default async function SearchPage(props: {
  params: Promise<{ locale: Locale }>;
  searchParams?: Promise<SearchParams>;
}) {
  const { locale } = await props.params;
  const sp = (await props.searchParams) ?? {};
  const q = typeof sp.q === "string" ? sp.q : "";

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-bold">Search</h1>
      <p className="mt-2 text-sm text-neutral-600">
        locale: <b>{locale}</b> | q: <b>{q}</b>
      </p>
    </main>
  );
}
