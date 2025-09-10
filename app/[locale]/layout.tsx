
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/Layout/Themes/theme-provider";
import NavBar from "@/components/Layout/Navbar/Navbar";
import { I18nProvider } from "@/libs/I18nProvider";
import type { Locale } from "@/libs/types/blog";
import HtmlLangSetter from "@/components/Layout/HtmlLangSetter/HtmlLangSetter";

export const metadata: Metadata = {
  title: "AI-Tooler",
  description: "The only all-in-one gateway to every top-performing tool",
};

export default async function LocaleLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await props.params;

  return (
    <>
      {/* cập nhật <html lang="..."> ở client */}
      <HtmlLangSetter locale={locale} />

      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <I18nProvider initialLocale={locale}>
          <NavBar initialLocale={locale} />
          <main className="main-content">{props.children}</main>
          <footer className="footer">
            <div className="container">
              <p>Email contact: support@aitooler.io</p>
              <p>© 2025 AI Tooler. All rights reserved.</p>
            </div>
          </footer>
        </I18nProvider>
      </ThemeProvider>
    </>
  );
}
