// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cookies } from "next/headers";
import { ThemeProvider } from "@/components/Layout/Themes/theme-provider";
import NavBar from "@/components/Layout/Navbar/Navbar";
import { I18nProvider } from "@/lib/I18nProvider";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Tooler",
  description: "The only all-in-one gateway to every top-performing tool",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // ✅ Next 15: cookies() là async
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value === "vi" ? "vi" : "en";

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="impact-site-verification" content="b94e4353-3cd6-40b7-a0ef-00378e410a02" />
        <meta name="value" content="b94e4353-3cd6-40b7-a0ef-00378e410a02" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased relative overflow-x-hidden`}>
        <div className="absolute left-[-100%]">
          Impact-Site-Verification: b94e4353-3cd6-40b7-a0ef-00378e410a02
        </div>

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <I18nProvider initialLocale={locale}>
            <NavBar initialLocale={locale} />
            <main className="main-content">
              <div>{children}</div>
            </main>
            <footer className="footer  text-neutral-600 dark:text-white/60 text-xs sm:text-sm">
              <div className="container flex flex-col sm:flex-row justify-between items-center gap-2 p-4 text-center">
                <p>Email contact: support@aitooler.io</p>
                <p>© 2025 AI Tooler. All rights reserved.</p>
              </div>
            </footer>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

