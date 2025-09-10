// app/[locale]/page.tsx
import type { Locale } from "@/libs/types/blog";
import HomeClient from "@/components/Layout/HomeClient/HomeClient";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  // I18nProvider đã được bọc ở app/[locale]/layout.tsx nên chỉ cần render Client Component
  return <HomeClient />;
}
