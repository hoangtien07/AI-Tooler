"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import "@/libs/i18n";

/** ---------- UI helpers ---------- */
function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.04] px-3 py-1 text-xs text-neutral-700 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-white/80">
      {children}
    </span>
  );
}
function DotDivider() {
  return <span className="mx-2 inline-block h-1 w-1 rounded-full bg-black/30 dark:bg-white/40" />;
}
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl border p-6 shadow-xl backdrop-blur-md border-black/10 bg-white/70 text-neutral-900 dark:border-white/10 dark:bg-white/[0.03] dark:text-white ${className}`}>
      <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(600px_300px_at_80%_-20%,rgba(0,0,0,0.05),transparent_50%)] dark:[background:radial-gradient(600px_300px_at_80%_-20%,rgba(255,255,255,0.06),transparent_50%)]" />
      {children}
    </div>
  );
}

function ParallaxSection({
  eyebrow, title, lead, content, speed = 60, right,
}: {
  eyebrow: string; title: string; lead?: string; content: React.ReactNode; speed?: number; right?: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  return (
    <section ref={ref} className="relative mx-auto container px-4 py-20">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70 [background:radial-gradient(800px_400px_at_20%_-10%,rgba(37,99,235,0.08),transparent_50%)] dark:[background:radial-gradient(1000px_500px_at_20%_-10%,rgba(59,130,246,0.15),transparent_50%)]" />
      <div className={`grid items-stretch gap-8 md:grid-cols-2 ${right ? "md:[&>div:first-child]:order-2" : ""}`}>
        <motion.div style={{ y }}>
          <div className="sticky top-24">
            <div className="mb-4 flex flex-wrap items-center">
              <SectionBadge>{eyebrow}</SectionBadge>
            </div>
            <h2 className="text-balance text-3xl font-semibold leading-tight text-neutral-900 dark:text-white md:text-4xl">
              {title}
            </h2>
            {lead && <p className="mt-4 text-pretty text-base text-neutral-700 dark:text-white/80">{lead}</p>}
          </div>
        </motion.div>
        <motion.div style={{ y }}>{content}</motion.div>
      </div>
    </section>
  );
}

/* ---- Page (i18n) ---- */
export default function ServiceParallaxPage() {
  const { t } = useTranslation("service");

  // Helpers lấy mảng từ JSON
  const s1Points = t("s1.why.points", { returnObjects: true }) as Array<{ title: string; description: string }>;
  const s1Services = t("s1.services.items", { returnObjects: true }) as Array<{ title: string; description: string }>;
  const s2Paras = t("s2.paragraphs", { returnObjects: true }) as string[];
  const s2Points = t("s2.why.points", { returnObjects: true }) as Array<{ title: string; description: string }>;
  const s3Benefits = t("s3.benefits", { returnObjects: true }) as Array<{ title: string; description: string }>;

  return (
    <main className="relative min-h-screen bg-white text-neutral-900 dark:bg-[#0b0f17] dark:text-white" suppressHydrationWarning>

      {/* Hero */}
      <section id="services" className="relative mx-auto container px-4 pb-10 pt-28">
        <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white/70 p-10 backdrop-blur dark:border-white/10 dark:bg-white/[0.03]">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
            <div className="flex flex-wrap items-center justify-center text-sm text-neutral-600 dark:text-white/70">
              <SectionBadge>{t("hero.badge")}</SectionBadge>
              <DotDivider />
              <span>{t("hero.about")}</span>
            </div>
            <h1 className="mt-4 text-center text-balance text-4xl font-bold leading-tight text-neutral-900 dark:text-white md:text-5xl">
              {t("hero.title")}
            </h1>
            <p className="mt-4 mx-auto max-w-4xl text-pretty text-center text-neutral-700 dark:text-white/80">
              {t("hero.summary")}
            </p>
          </motion.div>

          <div className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(168,85,247,0.25),transparent_60%)] blur-2xl dark:bg-[radial-gradient(circle_at_30%_30%,rgba(168,85,247,0.7),transparent_60%)]" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.22),transparent_60%)] blur-2xl dark:bg-[radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.6),transparent_60%)]" />
        </div>
      </section>

      {/* Section 1 */}
      <ParallaxSection
        eyebrow={t("s1.eyebrow")}
        title={t("s1.heading")}
        lead={t("s1.intro")}
        speed={80}
        content={
          <div className="space-y-6">
            <Card>
              <h3 className="text-xl font-semibold">{t("s1.why.title")}</h3>
              <ul className="mt-4 space-y-3 text-neutral-800 dark:text-white/85">
                {s1Points.map((p, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-1 inline-block h-2.5 w-2.5 flex-none rounded-full bg-indigo-500/50 dark:bg-indigo-400/90" />
                    <div>
                      <p className="font-medium">{p.title}</p>
                      <p className="text-neutral-600 dark:text-white/70">{p.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>

            <Card>
              <h3 className="text-xl font-semibold">{t("s1.services.title")}</h3>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                {s1Services.map((s, i) => (
                  <div key={i} className="rounded-2xl border border-black/10 bg-white/80 p-4 dark:border-white/10 dark:bg-white/[0.02]">
                    <p className="font-medium">{s.title}</p>
                    <p className="mt-1 text-sm text-neutral-700 dark:text-white/70">{s.description}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-neutral-700 dark:text-white/80">{t("s1.cta")}</p>
            </Card>
          </div>
        }
      />

      {/* Section 2 */}
      <ParallaxSection
        eyebrow={t("s2.eyebrow")}
        title={t("s2.heading")}
        lead={t("s2.summary")}
        speed={60}
        right
        content={
          <div className="space-y-6">
            <Card>
              <div className="space-y-3 text-neutral-700 dark:text-white/80">
                {s2Paras.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </Card>

            <Card>
              <h3 className="text-xl font-semibold">{t("s2.why.title")}</h3>
              <ul className="mt-4 grid gap-4 md:grid-cols-2">
                {s2Points.map((p, i) => (
                  <li key={i} className="rounded-2xl border border-black/10 bg-white/80 p-4 dark:border-white/10 dark:bg-white/[0.02]">
                    <p className="font-medium">{p.title}</p>
                    <p className="mt-1 text-sm text-neutral-700 dark:text-white/70">{p.description}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-neutral-700 dark:text-white/80">{t("s2.cta")}</p>
            </Card>
          </div>
        }
      />

      {/* Section 3 */}
      <ParallaxSection
        eyebrow={t("s3.eyebrow")}
        title={t("s3.heading")}
        lead={t("s3.intro")}
        speed={70}
        content={
          <div className="space-y-6">
            <Card>
              <h3 className="text-xl font-semibold">Benefits</h3>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                {s3Benefits.map((b, i) => (
                  <div key={i} className="rounded-2xl border border-black/10 bg-white/80 p-4 dark:border-white/10 dark:bg-white/[0.02]">
                    <p className="font-medium">{b.title}</p>
                    <p className="mt-1 text-sm text-neutral-700 dark:text-white/70">{b.description}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-neutral-700 dark:text-white/80">{t("s3.cta")}</p>
            </Card>

            <Card className="bg-gradient-to-br from-indigo-500/10 to-fuchsia-500/10 dark:from-indigo-500/10 dark:to-fuchsia-500/10">
              <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <p className="text-lg font-semibold">{t("s3.banner.title")}</p>
                  <p className="text-neutral-700 dark:text-white/70">{t("s3.banner.desc")}</p>
                </div>
                <a
                  href="#contact"
                  className="inline-flex items-center rounded-xl bg-zinc-900 px-5 py-2 font-medium text-white hover:opacity-90 dark:bg-white/90 dark:text-slate-900 dark:hover:bg-white"
                >
                  {t("s3.banner.button")}
                </a>
              </div>
            </Card>
          </div>
        }
      />
    </main>
  );
}
