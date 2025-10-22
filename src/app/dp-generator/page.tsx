import Link from "next/link";

import Invert from "@/components/icons/invert-icon";
import Vector from "@/components/icons/vector-icon";
import Logo from "@/components/layout/dp-logo";

const Home = () => {
  return (
    <div className="flex h-[calc(100vh-32px)] justify-center overflow-hidden bg-[#FFFAEB]">
      <div className="relative flex max-w-7xl flex-col justify-around md:block">
        <div className="pointer-events-none absolute top-0 left-0 h-full w-full">
          <div className="absolute -top-[70px] max-md:-top-[90px] max-md:-left-[50px]">
            <Invert />
          </div>
          <div className="absolute -top-[70px] right-[0%] max-md:right-[-80px]">
            <Vector />
          </div>
        </div>

        {/* Header */}
        <header className="relative flex flex-col items-center justify-center overflow-hidden max-md:mt-[50px]">
          <Logo />

          <div className="z-[1] text-center">
            <h1 className="font-akira my-4 text-center text-[30px] leading-[0.85] font-bold tracking-[-0.02em] text-black uppercase [font-stretch:condensed] [text-shadow:none] lg:text-7xl">
              DEVFEST LAGOS
              <br />
              DP MAKER
            </h1>
            <p className="text-center font-['Inter',Arial,sans-serif] text-2xl font-medium tracking-[-0.04em] text-black max-md:text-[17px]">
              Tell everyone you will be there!
            </p>
            <Link href="/dp-generator/create">
              <button
                type="button"
                title="Create your DP"
                className="relative mt-4 h-[60px] w-[258px] cursor-pointer rounded-[36px] border-4 border-black bg-[#F6B51E] p-4 font-['Akira','Arial_Black',sans-serif] text-lg font-bold tracking-[1.5px] text-black uppercase opacity-100 transition-all duration-300 ease-in-out max-md:w-[90%]"
              >
                CREATE YOURS!
              </button>
            </Link>
          </div>
        </header>

        {/* Desktop Samples Section */}
        <section className="relative z-[2] flex max-md:hidden">
          <div className="w-full">
            <div className="relative flex items-center justify-center overflow-visible [transform-style:preserve-3d]">
              <img
                className="relative z-[1] block h-auto"
                src="images/home/joint.png"
                alt="Sample DP 1"
              />
            </div>
          </div>
        </section>

        {/* Mobile Section */}
        <section className="relative z-[2] hidden px-2 max-md:mt-[18px] max-md:flex">
          <div className="w-full">
            <div className="relative flex items-center justify-center overflow-visible [transform-style:preserve-3d]">
              <img
                className="relative z-[1] block h-auto"
                src="images/home/mobile.png"
                alt="Sample DP 1"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
