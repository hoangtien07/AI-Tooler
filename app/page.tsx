// "use client";

// import { Marquee3D } from "@/components/magicui/custom/marquee-custom";
// import { MorphingTextCustom } from "@/components/magicui/custom/morphing-text-custom";
// import { BentoCustom } from "@/components/magicui/custom/bento-grid-custom";
// import { CheckCircledIcon } from "@radix-ui/react-icons";
// import { GalleryBotSuggest } from "@/components/Layout/BotSuggest/BotSuggest";
// import { FlickeringGridCustom } from "@/components/magicui/custom/flickering-grid-custom";
// import { Services } from "@/components/Layout/Services/Services";
// import { useTranslation } from "react-i18next";
// import "@/libs/i18n";
// import { useState, useEffect } from 'react'
// import { BotApi } from "@/libs/api-client";  
// import ServiceHeroParallax from "@/components/Layout/Services/Service-parallax";
// import ScrollMotion from "@/components/Elements/ScrollMotion/ScrollMotion";

// export default function Home() {
//   const { t } = useTranslation("common");
//   // const [isClient, setIsClient] = useState(false)
  
//   //   useEffect(() => {
//   //     setIsClient(true)
//   //   }, [])

//   return (
//     <div suppressHydrationWarning>
//       <ScrollMotion />
//       <div>
//         <div className="absolute inset-0 -z-10">
//           {/* <FlickeringGridCustom /> */}
//         </div>
//         <div className="container flex items-center h-fit w-full relative pt-4">
//           <div className="sm:mt-[20px] mt-[52px] mb-4">
//             <MorphingTextCustom />
//             <p className="text-[20px] sm:text-[32px] mt-[80px] max-w-[440px] font-bold">
//               <span suppressHydrationWarning>
//                 {t("home.hero.titleLine1")}
//               </span>
//             </p>
//                       <p className="text-[20px] sm:text-[32px] font-bold mt-[-8px]">
//               <span suppressHydrationWarning>
//                 {t("home.hero.titleLine2_prefix")}
//               </span>
//               <span className="text-[#6938ef] ml-1" suppressHydrationWarning>
//                 {t("home.hero.titleLine2_highlight")}
//               </span>
//             </p>
//                         <p className="mt-2 font-semibold text-[16px] sm:text-lg text-gray-800 dark:text-gray-300">
//               <span suppressHydrationWarning>
//                 {t("home.hero.subtitle")}
//               </span>
//             </p>

//                         <ul className="mt-6 space-y-3 text-[15px] text-gray-700 dark:text-gray-300">
//               <li className="flex items-start gap-2">
//                 <span className="mt-1 inline-block h-4 w-4 rounded-full border border-gray-400" />
//                 <span>
//                   <strong className="text-[#6938ef]" suppressHydrationWarning>
//                     {t("home.hero.bullets.discover.bold")}
//                   </strong>
//                   <span className="ml-1" suppressHydrationWarning>
//                     {t("home.hero.bullets.discover.text")}
//                   </span>
//                 </span>
//               </li>

//               <li className="flex items-start gap-2">
//                 <span className="mt-1 inline-block h-4 w-4 rounded-full border border-gray-400" />
//                 <span>
//                   <strong className="text-[#6938ef]" suppressHydrationWarning>
//                     {t("home.hero.bullets.jump.bold")}
//                   </strong>
//                   <span className="ml-1" suppressHydrationWarning>
//                     {t("home.hero.bullets.jump.text")}
//                   </span>
//                 </span>
//               </li>

//               <li className="flex items-start gap-2">
//                 <span className="mt-1 inline-block h-4 w-4 rounded-full border border-gray-400" />
//                 <span>
//                   <strong className="text-[#6938ef]" suppressHydrationWarning>
//                     {t("home.hero.bullets.unlock.bold")}
//                   </strong>
//                   <span className="ml-1" suppressHydrationWarning>
//                     {t("home.hero.bullets.unlock.text")}
//                   </span>
//                 </span>
//               </li>

//               <li className="flex items-start gap-2">
//                 <span className="mt-1 inline-block h-4 w-4 rounded-full border border-gray-400" />
//                 <span>
//                   <strong className="text-[#6938ef]" suppressHydrationWarning>
//                     {t("home.hero.bullets.empower.bold")}
//                   </strong>
//                   <span className="ml-1" suppressHydrationWarning>
//                     {t("home.hero.bullets.empower.text")}
//                   </span>
//                 </span>
//               </li>
//             </ul>
//           </div>

//           <div className="flex-1 h-fit overflow-y-hidden z-[-1] md:block hidden">
//             <Marquee3D />
//           </div>
//         </div>

//         <BentoCustom />
//       </div>

//       <div className="container">
//         <GalleryBotSuggest />
//       </div>

//       <ServiceHeroParallax />
//       {/* <Services /> */}
//     </div>
//   );
// }
