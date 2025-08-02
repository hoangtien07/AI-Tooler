
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/Layout/Themes/theme-provider";
import NavBar from "@/components/Layout/Navbar/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Tooler",
  description: "The only all-in-one gateway to every top-performing tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="sticky top-0 left-1/2 transform -translate-x-1/2 z-10">
            <NavBar />
          </div>
          <main className="main-content">
            <div>{children}</div>
          </main>
          <footer className="footer bg-black text-white">
            <div className="container flex justify-between items-center py-3 text-center">
              <p>Email contact: support@aitooler.io</p>
              <p>© 2025 AI Tooler. All rights reserved.</p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
