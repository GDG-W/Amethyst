import Image from "next/image";
import React from "react";

import Button from "@/components/ui/home-button";

const Hero = () => {
  return (
    <div className="max-w-8xl min-h-screen w-full p-4 md:min-h-[80vh] lg:min-h-screen">
      <div className="flex min-h-[calc(100vh-2rem)] w-full flex-col items-center justify-center rounded-xl bg-[#171717] py-12 md:flex-row lg:items-stretch">
        <div className="flex flex-1 flex-col justify-center px-6 py-8 md:py-12 lg:px-16">
          <div className="mb-4 flex justify-start">
            <Image
              src="/road-to-devfest.svg"
              alt="Road to DevFest"
              width={120}
              height={120}
              className="h-28 w-28 md:h-40 md:w-40 lg:h-48 lg:w-48"
            />
          </div>

          <div className="max-w-full text-center md:max-w-2xl md:text-left">
            <h1 className="font-akira text-2xl font-bold text-white uppercase md:text-2xl lg:text-4xl xl:text-5xl">
              DevFest Lagos Returns for <span className="text-[#4285F4]">Epic Five Days</span>
            </h1>

            <p className="mt-4 text-sm text-[#D1D1D1] md:mt-6 md:text-base lg:text-lg">
              Join the largest tech gathering in Lagos happening over five transformative days, from
              Tuesday 18th - Saturday 22nd November 2025.
            </p>

            <div className="mt-6 flex w-full flex-col gap-3 md:mt-8 md:flex-row md:gap-4 lg:max-w-md">
              <Button variant="primary" className="w-full text-[#141414] md:flex-1">
                Buy Tickets
              </Button>
              <Button variant="secondary" className="w-full uppercase md:flex-1">
                Log in
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center justify-end md:items-end lg:justify-center">
          <div className="w-full pt-8 md:pt-20 lg:w-auto">
            <div className="absolute right-10 -mt-8 lg:top-36 lg:right-28 lg:mt-0">
              <Image
                src="/devfest25.svg"
                alt="DevFest 2025"
                width={120}
                height={120}
                className="h-20 w-20 md:h-28 md:w-28 lg:h-32 lg:w-32"
                priority
              />
            </div>
            <div className="flex w-full gap-2 overflow-x-clip lg:justify-end">
              <Image
                src="/hero-mobile.svg"
                alt="DevFest 2024 Image"
                width={600}
                height={900}
                className="h-auto w-full md:hidden lg:max-w-2xl"
                priority
              />
              <Image
                src="/hero-img.svg"
                alt="DevFest 2024 Image"
                width={400}
                height={900}
                className="h-auto w-full lg:max-w-lg"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
