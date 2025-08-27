import Image from "next/image";
import Link from "next/link";
import React from "react";

import Button from "@/components/ui/home-button";

const JoinUs = () => {
  return (
    <div className="flex justify-center bg-[#FCF6DF] px-3 py-3 md:px-36 md:pt-[3.4375rem] md:pb-8">
      <div className="max-auto flex w-full max-w-7xl flex-col items-center justify-center space-y-5 rounded-sm bg-[#171717] p-5 text-white md:space-y-7 md:p-8 lg:rounded-xl lg:p-18">
        <h1 className="font-akira w-full text-center text-base font-bold uppercase md:text-2xl">
          The future is <br /> technology, join us at <br />
          <span className="text-[#F6B51E]">DevFest Lagos 2025</span> <br /> and help shape that{" "}
          <br /> future in Nigeria
        </h1>

        <Link href="/buy" className="flex w-full justify-center">
          <Button className="w-full text-sm text-[#141414] md:text-base">Buy Tickets</Button>
        </Link>
        <div className="relative hidden w-full lg:block">
          <Image
            src="/see-you-there.svg"
            alt="See you there"
            width={150}
            height={150}
            className="absolute -bottom-8 left-5"
          />
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
