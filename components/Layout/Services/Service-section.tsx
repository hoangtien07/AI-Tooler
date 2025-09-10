// "use client";

// import Link from "next/link";
// import { useMemo, useRef, useState } from "react";

// type Card = {
//   id: "agent" | "explorer" | "training";
//   tone: string;
//   title: string;
//   lead: string;
//   sections: { h: string; list: string[] }[];
//   cta: { href: string; label: string; labelFocused?: string };
// };

// const CARDS: Card[] = [
//   {
//     id: "agent",
//     tone: "bg-emerald-950/60 border-emerald-600/40 hover:ring-emerald-500/70",
//     title: "AI Agent & Automation Development",
//     lead:
//       "Integrate AI into your workflow — from data analysis and content creation to task automation and intelligent agents that answer messages, generate reports, and more.",
//     sections: [
//       {
//         h: "Why AI Agent & Automation?",
//         list: [
//           "Automate repetitive tasks: nhập liệu, báo cáo, phản hồi khách hàng…",
//           "Boost efficiency: quy trình mượt, tăng năng suất, giảm lỗi.",
//           "Enhance CX: phản hồi chính xác 24/7.",
//           "Scalable: mở rộng từ startup đến enterprise.",
//         ],
//       },
//       {
//         h: "Our Services",
//         list: [
//           "Custom AI Agent Development — agent gắn vào quy trình của bạn.",
//           "AI Automation Solutions — tự động hoá quy trình hiện có bằng AI.",
//           "Ongoing Support — theo dõi, tối ưu & mở rộng định kỳ.",
//         ],
//       },
//     ],
//     cta: { href: "#contact", label: "Book a discovery call", labelFocused: "Book automation consult" },
//   },
//   {
//     id: "explorer",
//     tone: "bg-amber-950/60 border-amber-600/40 hover:ring-amber-500/70",
//     title: "AI Tool Explorer",
//     lead:
//       "Discover and access the most powerful AI tools tailored to your industry. We test, review, and recommend the best tools so you don’t have to spend time searching.",
//     sections: [
//       {
//         h: "Why Choose AI Tool Explorer?",
//         list: [
//           "Tailored recommendations theo mục tiêu & quy mô.",
//           "In-depth reviews dựa trên use-case thực tế.",
//           "Comprehensive coverage: automation, content, analytics, CS.",
//           "Save time: chúng tôi tìm — bạn triển khai.",
//         ],
//       },
//     ],
//     cta: { href: "/tools", label: "Explore tools", labelFocused: "Get curated tool list" },
//   },
//   {
//     id: "training",
//     tone: "bg-sky-950/60 border-sky-600/40 hover:ring-sky-500/70",
//     title: "1-on-1 AI Onboarding & Training",
//     lead:
//       "New to AI? We guide you step-by-step — for individuals or teams, in English or your native language.",
//     sections: [
//       {
//         h: "What you get",
//         list: [
//           "Personalized training — học theo nhịp độ, có mentor.",
//           "Tailored to your needs — nội dung theo vai trò & mục tiêu.",
//           "Flexible language — English hoặc ngôn ngữ bản địa.",
//         ],
//       },
//     ],
//     cta: { href: "#contact", label: "Start onboarding", labelFocused: "Book a training session" },
//   },
// ];

// type FilterKey = "all" | "automate" | "tools" | "train";
// const FILTERS: { key: FilterKey; label: string; targets: Card["id"][] }[] = [
//   { key: "automate", label: "Automate", targets: ["agent"] },
//   { key: "tools", label: "Choose Tools", targets: ["explorer"] },
//   { key: "train", label: "Train", targets: ["training"] },
//   { key: "all", label: "All", targets: ["agent", "explorer", "training"] },
// ];

// export default function ServicesSection() {
//   const [filter, setFilter] = useState<FilterKey>("all");

//   const refs = {
//     agent: useRef<HTMLDivElement>(null),
//     explorer: useRef<HTMLDivElement>(null),
//     training: useRef<HTMLDivElement>(null),
//   };

//   const visible = useMemo(
//     () => CARDS.filter((c) => FILTERS.find((f) => f.key === filter)!.targets.includes(c.id)),
//     [filter]
//   );

//   const scrollTo = (id: Card["id"]) =>
//     refs[id]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });

//   return (
//     <section id="services" className="mx-auto max-w-6xl px-4 py-14">
//       {/* HERO mini flowchart */}
//       <div className="mb-10">
//         <div className="flex flex-col items-center">
//           <div className="rounded-xl border text-white bg-neutral-900 px-4 py-2 text-sm font-medium">
//             Service
//           </div>
//           <div className="h-6 w-px bg-neutral-700" aria-hidden />
//           <div className="grid w-full gap-4 md:grid-cols-3">
//             <button
//               onClick={() => scrollTo("agent")}
//               className="rounded-xl border bg-emerald-950/50 p-4 text-left transition hover:ring-2 hover:ring-emerald-500"
//             >
//               <div className="font-semibold">AI Agent & Automation</div>
//               <p className="text-sm opacity-75">Tự động hoá & agent thông minh</p>
//             </button>
//             <button
//               onClick={() => scrollTo("explorer")}
//               className="rounded-xl border bg-amber-950/50 p-4 text-left transition hover:ring-2 hover:ring-amber-500"
//             >
//               <div className="font-semibold">AI Tool Explorer</div>
//               <p className="text-sm opacity-75">Chọn đúng công cụ AI</p>
//             </button>
//             <button
//               onClick={() => scrollTo("training")}
//               className="rounded-xl border bg-sky-950/50 p-4 text-left transition hover:ring-2 hover:ring-sky-500"
//             >
//               <div className="font-semibold">1-on-1 Onboarding & Training</div>
//               <p className="text-sm opacity-75">Hướng dẫn từng bước</p>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Target selector */}
//       <div className="mb-6 flex flex-wrap items-center gap-2">
//         <span className="mr-2 text-sm opacity-60">Mục tiêu:</span>
//         {FILTERS.map((f) => (
//           <button
//             key={f.key}
//             onClick={() => setFilter(f.key)}
//             className={`rounded-full border px-3 py-1 text-sm transition ${
//               filter === f.key ? "bg-white text-neutral-900" : "bg-neutral-900 hover:bg-neutral-800"
//             }`}
//           >
//             {f.label}
//           </button>
//         ))}
//       </div>

//       {/* Cards */}
//       <div className="grid gap-4 md:grid-cols-3">
//         {CARDS.map((c) => {
//           const hidden =
//             filter !== "all" &&
//             !FILTERS.find((f) => f.key === filter)!.targets.includes(c.id);
//           const ctaLabel = filter === "all" ? c.cta.label : c.cta.labelFocused || c.cta.label;
//           return (
//             <article
//               key={c.id}
//               ref={refs[c.id]}
//               id={`svc-${c.id}`}
//               className={`border rounded-2xl p-5 transition ${c.tone} ${
//                 hidden ? "hidden md:block md:opacity-50 md:grayscale" : ""
//               }`}
//               aria-labelledby={`svc-title-${c.id}`}
//             >
//               <h2 id={`svc-title-${c.id}`} className="text-xl font-semibold mb-2">
//                 {c.title}
//               </h2>
//               <p className="opacity-90 mb-3">{c.lead}</p>

//               {c.sections.map((s) => (
//                 <div key={s.h} className="mb-3">
//                   <h3 className="font-medium mb-1">{s.h}</h3>
//                   <ul className="list-disc list-inside space-y-1 text-sm opacity-90">
//                     {s.list.map((li) => (
//                       <li key={li}>{li}</li>
//                     ))}
//                   </ul>
//                 </div>
//               ))}

//               <Link
//                 href={c.cta.href}
//                 className="inline-block mt-2 rounded-xl bg-white px-3 py-2 text-sm font-medium text-neutral-900"
//               >
//                 {ctaLabel}
//               </Link>
//             </article>
//           );
//         })}
//       </div>

//       {/* Metrics + Case studies */}
//       <div className="mt-12 grid gap-4 md:grid-cols-3">
//         <div className="rounded-2xl border bg-neutral-900/50 p-5">
//           <div className="text-3xl font-semibold">▲ 68%</div>
//           <div className="text-sm opacity-70">
//             Tăng năng suất trung bình sau 6 tuần triển khai
//           </div>
//         </div>
//         <div className="rounded-2xl border bg-neutral-900/50 p-5">
//           <div className="text-3xl font-semibold">− 43%</div>
//           <div className="text-sm opacity-70">Giảm thời gian xử lý nghiệp vụ lặp lại</div>
//         </div>
//         <div className="rounded-2xl border bg-neutral-900/50 p-5">
//           <div className="text-3xl font-semibold">+ 27 pts</div>
//           <div className="text-sm opacity-70">CSAT tăng sau khi tích hợp AI vào CSKH</div>
//         </div>
//       </div>

//       <div className="mt-6 grid gap-4 md:grid-cols-3">
//         <div className="rounded-2xl border bg-neutral-900/40 p-5">
//           <h4 className="font-semibold mb-1">Case study · SaaS</h4>
//           <p className="text-sm opacity-80">
//             Agent tổng hợp báo cáo & trả lời khách hàng: tiết kiệm ~25 giờ/tuần, độ trễ phản hồi giảm 60%.
//           </p>
//         </div>
//         <div className="rounded-2xl border bg-neutral-900/40 p-5">
//           <h4 className="font-semibold mb-1">Case study · E-commerce</h4>
//           <p className="text-sm opacity-80">
//             Tự động hoá mô tả sản phẩm + ảnh AI + email cá nhân hoá: CTR tăng 34%, time-to-publish −70%.
//           </p>
//         </div>
//         <div className="rounded-2xl border bg-neutral-900/40 p-5">
//           <h4 className="font-semibold mb-1">Case study · Education</h4>
//           <p className="text-sm opacity-80">
//             Training 1-on-1 cho đội ngũ: xây library prompt & SOP, thời gian soạn học liệu giảm 50%.
//           </p>
//         </div>
//       </div>

//       {/* Sticky contact (mobile) */}
//       <div className="fixed inset-x-4 bottom-4 z-50 md:hidden">
//         <div className="rounded-2xl border bg-neutral-900/90 backdrop-blur p-3">
//           <div className="flex items-center justify-between gap-3">
//             <span className="text-sm">Cần tư vấn nhanh?</span>
//             <Link
//               href="#contact"
//               className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-neutral-900"
//             >
//               Book a call
//             </Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
