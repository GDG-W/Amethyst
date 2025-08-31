import React from "react";

import Image from "next/image";

import Button from "@/components/ui/home-button";

const JoinUs = () => {
  return (
    <div className="flex justify-center bg-[#FCF6DF] px-3 py-3 md:px-36 md:py-4">
      <div className="relative flex w-full flex-col items-center justify-center space-y-5 overflow-hidden rounded-lg bg-[#171717] p-5 text-white md:space-y-7 md:p-8 lg:rounded-xl lg:p-18">
        <h1 className="font-akira w-full max-w-sm pt-6 text-center text-base leading-tight font-bold uppercase md:max-w-none md:text-2xl md:leading-normal lg:pt-0">
          The future is technology, join us at{" "}
          <span className="text-[#F6B51E]">DevFest Lagos 2025</span> and help shape that future in
          Nigeria
        </h1>

        <Button className="w-full text-sm text-[#141414] md:text-base">Buy Tickets</Button>
        <div className="relative hidden w-full lg:block">
          <Image
            src="/see-you-there.svg"
            alt="See you there"
            width={120}
            height={120}
            className="absolute -bottom-2 -left-2 h-16 w-16 md:h-20 md:w-20 lg:-bottom-8 lg:-left-10 lg:h-[120px] lg:w-[120px] xl:-bottom-12 xl:-left-12 xl:h-32 xl:w-32"
          />
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
