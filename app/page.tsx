import {Marquee3D} from "@/components/magicui/custom/marquee-custom";
import {FlickeringGridCustom} from "@/components/magicui/custom/flickering-grid-custom";
import {MorphingTextCustom} from "@/components/magicui/custom/morphing-text-custom";
import {BentoCustom} from "@/components/magicui/custom/bento-grid-custom";
import TitleHome from "@/public/title-home.png";
import Image from "next/legacy/image";

export default function Home() {
  return (
    <div>
      <div className="h-[100vh]">
        <div className="absolute top-0 left-0 right-0 bottom-0 z-[-2]">
          <FlickeringGridCustom /> {/* Background flickering grid */}
        </div>
        <div className="container flex items-center h-fit w-full relative">
          <div className="mt-[160px] ">
            <MorphingTextCustom />
            <p className="text-[40px] mt-[80px] font-bold">Effortlessly create with </p>
            <p className="text-[40px] font-bold mt-[-8px]">Our <span className="text-[#6938ef]">AI Tools</span></p>
            <div className="max-w-[600px]">
              <Image
                src={TitleHome}
                alt="Title Home"
                className="w-full h-auto scale-90"
              />
            </div>
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
