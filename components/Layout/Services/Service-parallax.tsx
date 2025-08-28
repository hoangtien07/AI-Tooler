"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const SERVICE_CONTENT = {
  title: "Service",
  sections: [
    {
      id: "ai_agent_automation",
      title: "AI Agent and AI Automation Development",
      summary:
        "Integrate AI into your workflow — from data analysis and content creation to task automation and building intelligent AI agents that automate tasks, answer messages, generate reports, and more. No coding required, just results.",
      details: {
        heading: "AI Agent and AI Automation Development",
        intro:
          "Take your business to the next level with AI Agent and AI Automation Development. At AI Tooler, we specialize in building intelligent AI agents and automating workflows to optimize efficiency, reduce manual labor, and enhance customer experience.",
        why: {
          title: "Why AI Agent and AI Automation?",
          points: [
            {
              title: "Automate Repetitive Tasks",
              description:
                "Let AI handle time-consuming tasks like data entry, report generation, and customer support, allowing your team to focus on strategic activities.",
            },
            {
              title: "Boost Efficiency",
              description:
                "AI agents streamline workflows, improving overall productivity and minimizing errors.",
            },
            {
              title: "Enhance Customer Experience",
              description:
                "With AI-powered interactions, provide faster and more accurate responses to customer queries 24/7.",
            },
            {
              title: "Scalable Solutions",
              description:
                "Whether you’re a small startup or a growing enterprise, our AI solutions scale with your needs, ensuring continued success.",
            },
          ],
        },
        services: {
          title: "Our Services",
          items: [
            {
              title: "Custom AI Agent Development",
              description:
                "Tailored AI agents that fit seamlessly into your business operations, from answering customer inquiries to managing schedules and more.",
            },
            {
              title: "AI Automation Solutions",
              description:
                "Automate your existing processes with powerful AI tools, enhancing speed, accuracy, and consistency across various functions.",
            },
            {
              title: "Ongoing Support",
              description:
                "We offer continuous monitoring and optimization to ensure your AI solutions evolve with your business.",
            },
          ],
        },
        cta:
          "Let AI Tooler help you harness the power of AI for greater productivity and innovation. Contact us today to start your AI development journey!",
      },
    },
    {
      id: "ai_tool_explorer",
      title: "AI Tool Explorer",
      summary:
        "Discover and access the most powerful AI tools tailored to your industry and needs. We test, review, and recommend the best tools so you don’t have to spend time searching.",
      details: {
        heading:
          "AI Tool Explorer: Discover the Best AI Tools Tailored to Your Needs",
        paragraphs: [
          "At AI Tooler, we understand that navigating the vast world of AI tools can be overwhelming. That’s why we’ve created the AI Tool Explorer – your go-to platform to discover, access, and implement the most powerful AI tools specifically tailored to your industry and business needs.",
          "We don’t just recommend tools – we test, review, and handpick the best AI solutions, ensuring they meet high standards of quality and effectiveness. Whether you’re looking to automate tasks, improve customer service, or gain valuable insights from your data, our AI Tool Explorer will guide you toward the right choice.",
        ],
        why: {
          title: "Why Choose AI Tool Explorer?",
          points: [
            {
              title: "Tailored Recommendations",
              description:
                "We help you find the tools that align perfectly with your business requirements.",
            },
            {
              title: "In-Depth Reviews",
              description:
                "Our expert team tests each tool thoroughly, providing you with unbiased insights based on real-world use cases.",
            },
            {
              title: "Comprehensive Coverage",
              description:
                "From marketing automation to AI-driven analytics, we cover a wide range of industries and solutions.",
            },
            {
              title: "Save Time and Effort",
              description:
                "Skip the research and let us bring the best tools directly to you, ensuring you make informed decisions quickly.",
            },
          ],
        },
        cta:
          "Start exploring the future of AI today with AI Tooler. Let us help you unlock the full potential of AI for your business.",
      },
    },
    {
      id: "onboarding_training",
      title: "1-on-1 AI Onboarding & Training",
      summary:
        "New to AI? Our experts will guide you through how to use AI tools, step-by-step — for individuals or teams, in English or your native language.",
      details: {
        heading: "1-on-1 AI Onboarding & Training",
        intro:
          "New to AI? Don’t worry – our experts are here to guide you every step of the way. Whether you're an individual or part of a team, we offer 1-on-1 AI onboarding and training tailored to your needs. We’ll walk you through how to use AI tools, ensuring you understand the features and how they can streamline your processes.",
        benefits: [
          {
            title: "Personalized Training",
            description: "Learn at your own pace with expert guidance.",
          },
          {
            title: "Tailored to Your Needs",
            description:
              "Whether you’re an individual or a team, we cater to all learning styles and requirements.",
          },
          {
            title: "Flexible Language Options",
            description:
              "Available in English or your native language to make the learning process smooth and effective.",
          },
        ],
        cta:
          "Start your AI journey today with AI Tooler and unlock the full potential of AI tools with ease!",
      },
    },
  ],
};

/** ---------- UI helpers ---------- */
function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.04] px-3 py-1 text-xs text-neutral-700 backdrop-blur
                      dark:border-white/10 dark:bg-white/5 dark:text-white/80">
      {children}
    </span>
  );
}
function DotDivider() {
  return (
    <span className="mx-2 inline-block h-1 w-1 rounded-full bg-black/30 dark:bg-white/40" />
  );
}
function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border p-6 shadow-xl backdrop-blur-md
                  border-black/10 bg-white/70 text-neutral-900
                  dark:border-white/10 dark:bg-white/[0.03] dark:text-white ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-70
                      [background:radial-gradient(600px_300px_at_80%_-20%,rgba(0,0,0,0.05),transparent_50%)]
                      dark:[background:radial-gradient(600px_300px_at_80%_-20%,rgba(255,255,255,0.06),transparent_50%)]" />
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
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  return (
    <section ref={ref} className="relative mx-auto container px-4 py-20">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70
                      [background:radial-gradient(800px_400px_at_20%_-10%,rgba(37,99,235,0.08),transparent_50%)]
                      dark:[background:radial-gradient(1000px_500px_at_20%_-10%,rgba(59,130,246,0.15),transparent_50%)]" />
      <div className={`grid items-stretch gap-8 md:grid-cols-2 ${right ? 'md:[&>div:first-child]:order-2' : ''}`}>
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

/* ---- Page ---- */
export default function Page() {
  return (
    <main className="relative min-h-screen bg-white text-neutral-900 dark:bg-[#0b0f17] dark:text-white">


      {/* Hero */}
      <section id="services" className="relative mx-auto container px-4 pb-10 pt-28">
        <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white/70 p-10 backdrop-blur
                        dark:border-white/10 dark:bg-white/[0.03]">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
            <div className="flex flex-wrap justify-center items-center text-sm text-neutral-600 dark:text-white/70">
              <SectionBadge>Service</SectionBadge>
              <DotDivider />
              <span>About AI Tooler&#39;s Website</span>
            </div>
            <h1 className="mt-4 text-center text-balance text-4xl font-bold leading-tight text-neutral-900 dark:text-white md:text-5xl">
              Unlock AI for your business with elegant, scroll-linked storytelling
            </h1>
            <p className="mt-4 text-center mx-auto max-w-4xl text-pretty text-neutral-700 dark:text-white/80">
              {SERVICE_CONTENT.sections[0].summary}
            </p>
          </motion.div>

          <div className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 rounded-full
                          bg-[radial-gradient(circle_at_30%_30%,rgba(168,85,247,0.25),transparent_60%)] blur-2xl
                          dark:bg-[radial-gradient(circle_at_30%_30%,rgba(168,85,247,0.7),transparent_60%)]" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-64 w-64 rounded-full
                          bg-[radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.22),transparent_60%)] blur-2xl
                          dark:bg-[radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.6),transparent_60%)]" />
        </div>
      </section>

      {/* Section 1 */}
      <ParallaxSection
        eyebrow="Automation & Agents"
        title={SERVICE_CONTENT.sections[0].details.heading}
        lead={SERVICE_CONTENT.sections[0].details.intro}
        speed={80}
        content={
          <div className="space-y-6">
            <Card>
              <h3 className="text-xl font-semibold">{SERVICE_CONTENT.sections[0].details?.why?.title}</h3>
              <ul className="mt-4 space-y-3 text-neutral-800 dark:text-white/85">
                {SERVICE_CONTENT.sections[0].details?.why?.points.map((p, i) => (
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
              <h3 className="text-xl font-semibold">{SERVICE_CONTENT.sections[0].details?.services?.title}</h3>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                {SERVICE_CONTENT.sections[0].details?.services?.items.map((s, i) => (
                  <div key={i} className="rounded-2xl border border-black/10 bg-white/80 p-4 dark:border-white/10 dark:bg-white/[0.02]">
                    <p className="font-medium">{s.title}</p>
                    <p className="mt-1 text-sm text-neutral-700 dark:text-white/70">{s.description}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-neutral-700 dark:text-white/80">{SERVICE_CONTENT.sections[0].details.cta}</p>
            </Card>
          </div>
        }
      />

      {/* Section 2 */}
      <ParallaxSection
        eyebrow="Tool Explorer"
        title={SERVICE_CONTENT.sections[1].details.heading}
        lead={SERVICE_CONTENT.sections[1].summary}
        speed={60}
        right
        content={
          <div className="space-y-6">
            <Card>
              <div className="space-y-3 text-neutral-700 dark:text-white/80">
                {SERVICE_CONTENT.sections[1].details?.paragraphs?.map((t, i) => <p key={i}>{t}</p>)}
              </div>
            </Card>

            <Card>
              <h3 className="text-xl font-semibold">{SERVICE_CONTENT.sections[1].details?.why?.title}</h3>
              <ul className="mt-4 grid gap-4 md:grid-cols-2">
                {SERVICE_CONTENT.sections[1].details?.why?.points.map((p, i) => (
                  <li key={i} className="rounded-2xl border border-black/10 bg-white/80 p-4 dark:border-white/10 dark:bg-white/[0.02]">
                    <p className="font-medium">{p.title}</p>
                    <p className="mt-1 text-sm text-neutral-700 dark:text-white/70">{p.description}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-neutral-700 dark:text-white/80">{SERVICE_CONTENT.sections[1].details.cta}</p>
            </Card>
          </div>
        }
      />

      {/* Section 3 */}
      <ParallaxSection
        eyebrow="Training"
        title={SERVICE_CONTENT.sections[2].details.heading}
        lead={SERVICE_CONTENT.sections[2].details.intro}
        speed={70}
        content={
          <div className="space-y-6">
            <Card>
              <h3 className="text-xl font-semibold">Benefits</h3>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                {SERVICE_CONTENT.sections[2].details?.benefits?.map((b, i) => (
                  <div key={i} className="rounded-2xl border border-black/10 bg-white/80 p-4 dark:border-white/10 dark:bg-white/[0.02]">
                    <p className="font-medium">{b.title}</p>
                    <p className="mt-1 text-sm text-neutral-700 dark:text-white/70">{b.description}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-neutral-700 dark:text-white/80">{SERVICE_CONTENT.sections[2].details.cta}</p>
            </Card>

            <Card className="bg-gradient-to-br from-indigo-500/10 to-fuchsia-500/10 dark:from-indigo-500/10 dark:to-fuchsia-500/10">
              <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <p className="text-lg font-semibold">Ready to elevate with AI?</p>
                  <p className="text-neutral-700 dark:text-white/70">Book a discovery call and we’ll tailor a plan for you.</p>
                </div>
                <a
                  href="#contact"
                  className="inline-flex items-center rounded-xl bg-zinc-900 px-5 py-2 font-medium text-white hover:opacity-90
                             dark:bg-white/90 dark:text-slate-900 dark:hover:bg-white"
                >
                  Get Started
                </a>
              </div>
            </Card>
          </div>
        }
      />
    </main>
  );
}

