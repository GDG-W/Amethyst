"use client";
import React from "react";
import { useRouter } from "next/navigation";

import LogoIcon from "../icons/logo";
import CloseIcon from "../icons/close-icon";

const HeaderComponent = () => {
  const router = useRouter();
  const handleClose = () => {
    // Navigate to the home page when the close button is clicked
    router.push("/");
  };
  return (
    <header className='bg-[#FFFAEB] h-screen p-6 sm:p-8 md:p-12'>
      <div className='flex justify-center bg-[#FFFFFF] border border-[#EBEBEB] px-5 py-4 md:px-10 md:py-5 max-w-3xl mx-auto rounded-full'>
        <div className='flex justify-between items-center w-full'>
          <LogoIcon className='w-36 md:w-40 xl:w-48' />
          <button
            onClick={handleClose}
            className='flex items-center gap-1 text-[#111111] text-base hover:text-gray-600 focus:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-normal transition-colors cursor-pointer'
          >
            Close
            <CloseIcon aria-hidden='true' />
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
