import {Marquee3D} from "@/components/magicui/custom/marquee-custom";
import {MorphingTextCustom} from "@/components/magicui/custom/morphing-text-custom";
import {BentoCustom} from "@/components/magicui/custom/bento-grid-custom";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { GalleryBotSuggest } from "@/components/Layout/BotSuggest/BotSuggest";
import {FlickeringGridCustom} from "@/components/magicui/custom/flickering-grid-custom";
import {Services} from "@/components/Layout/Services/Services";

export default function Home() {
  return (
    <div>
      <div>
        <div className="absolute inset-0 -z-10">
          <FlickeringGridCustom />
        </div>
        <div className="container flex items-center h-fit w-full relative">
          <div className="mt-[160px] mb-2 ml-8 md:ml-0">
            <MorphingTextCustom />
            <p className="text-[38px] mt-[80px] font-bold">Effortlessly create with </p>
            <p className="text-[38px] font-bold mt-[-8px]">Our <span className="text-[#6938ef]">AI Tools</span></p>
            
            <p className="mt-2 font-semibold text-lg text-gray-800 dark:text-gray-300">
              The only all-in-one gateway to every top-performing tool
            </p>

            <ul className="mt-4 space-y-2 text-left text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <CheckCircledIcon className="h-6 w-6 text-[#6938ef]" />
                <span>
                  <strong className="text-[#6938ef]">Discover</strong> a hand-picked vault of 50+ cutting-edge AI bots, organized by use case
                </span>
              </li>

              <li className="flex items-start gap-2">
                <CheckCircledIcon className="h-6 w-6 text-[#6938ef]" />
                <span>
                  <strong className="text-[#6938ef]">Jump </strong>straight to each platform with one-click affiliate links
                </span>
              </li>

              <li className="flex items-start gap-2">
                <CheckCircledIcon className="h-6 w-6 text-[#6938ef]" />
                <span>
                  <strong className="text-[#6938ef]">Unlock </strong>exclusive deals, trials, and bonuses from leading AI providers
                </span>
              </li>

              <li className="flex items-start gap-2">
                <CheckCircledIcon className="h-6 w-6 text-[#6938ef]" />
                <span>
                  <strong className="text-[#6938ef]">Empower </strong>your workflow with the perfect AI partner for every task
                </span>
              </li>
            </ul>
          </div>
          <div className="absolute hidden right-[-100px] top-1/2 transform -translate-y-1/3 z-[-1] md:block">
            <Marquee3D />
          </div>
        </div>
        <BentoCustom />
      </div>
      <div className="container">
        <GalleryBotSuggest />
      </div>
      <Services />
    </div>
  );
}
