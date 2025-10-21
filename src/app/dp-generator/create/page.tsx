import Invert from "@/components/icons/invert-icon";
import Vector from "@/components/icons/vector-icon";
import Logo from "@/components/layout/dp-logo";

import { DPMakerClient } from "./client";
import "./dpai.css";
import "./dpmaker.css";

const DPMaker = () => {
  return (
    <div className="relative min-h-[calc(100vh-32px)] overflow-x-hidden bg-[#FFFAEB]">
      <div className="pointer-events-none absolute top-0 left-0 h-full w-full">
        <div className="absolute -top-[70px] left-[60px] max-md:-top-[90px] max-md:-left-[50px]">
          <Invert />
        </div>
        <div className="absolute -top-[70px] right-20 max-md:right-[-80px]">
          <Vector />
        </div>
      </div>

      {/* Header */}
      <header className="relative flex flex-col items-center justify-center overflow-hidden max-md:mt-[50px]">
        <Logo />
        <div className="z-[1] text-center">
          <h1 className="font-akira my-4 text-center text-3xl leading-[0.85] font-extrabold text-black [--webkit-text-stroke:0.5px_#201313] max-md:text-[24px]">
            DEVFEST LAGOS DP MAKER
          </h1>
          <p className="font-inter mb-2.5 max-w-[600px] text-center text-base font-medium text-[#5c5c5c] opacity-80">
            Create a DevFest branded image to announce your attendance with your network! 📸
          </p>
        </div>
      </header>

      <DPMakerClient />
    </div>
  );
};

export default DPMaker;
