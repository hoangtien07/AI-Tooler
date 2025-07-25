import {Marquee3D} from "@/components/magicui/custom/marquee-custom";
import {MorphingTextCustom} from "@/components/magicui/custom/morphing-text-custom";
import {BentoCustom} from "@/components/magicui/custom/bento-grid-custom";
import { CheckCircledIcon } from "@radix-ui/react-icons";

export default function Home() {
  return (
    <div>
      <div className="h-[100vh]">
        <div className="container flex items-center h-fit w-full relative">
          <div className="mt-[160px] ">
            <MorphingTextCustom />
            <p className="text-[38px] mt-[80px] font-bold">Effortlessly create with </p>
            <p className="text-[38px] font-bold mt-[-8px]">Our <span className="text-[#6938ef]">AI Tools</span></p>
            
            <p className="mt-3 font-semibold text-lg text-gray-800 dark:text-gray-300">
              World’s Only Ad Maker Covering Everything From Concept To Creation
            </p>

            <ul className="mt-4 space-y-2 text-left text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <CheckCircledIcon className="h-6 w-6 text-[#6938ef]" />
                <span>
                  <strong className="text-[#6938ef]">Inspiration</strong> from 10M+ Ads library
                </span>
              </li>

              <li className="flex items-start gap-2">
                <CheckCircledIcon className="h-6 w-6 text-[#6938ef]" />
                <span>
                  <strong className="text-[#6938ef]">Instantly</strong> Create Image & Video Ads for{' '}
                </span>
              </li>

              <li className="flex items-start gap-2">
                <CheckCircledIcon className="h-6 w-6 text-[#6938ef]" />
                <span>
                  <strong className="text-[#6938ef]">$5000</strong> Worth Of B-Rolls From{' '}
                  <strong className="font-semibold">iStock</strong> & AI Voice{' '}
                  <strong className="font-semibold">ElevenLabs</strong>
                </span>
              </li>

              <li className="flex items-start gap-2">
                <CheckCircledIcon className="h-6 w-6 text-[#6938ef]" />
                <span>
                  <strong className="text-[#6938ef]">Optimize</strong> Ads for Reach & Growth
                </span>
              </li>
            </ul>
          </div>
          <div className="absolute right-[-100px] top-1/2 transform -translate-y-1/3 z-[-1]">
            <Marquee3D />
          </div>
        </div>
        <BentoCustom />
      </div>
    </div>
  );
}
