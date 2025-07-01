"use client";
import React from "react";
import { useRouter } from "next/navigation";

import LogoIcon from "../icons/LogoIcon";
import CloseIcon from "../icons/CloseIcon";

const Header = () => {
  const router = useRouter();
  const handleClose = () => {
    // Navigate to the home page when the close button is clicked
    router.push("/");
  };
  return (
    <header className='bg-[#FFFAEB] h-screen p-6 sm:p-8 md:p-12'>
      <div className='flex justify-center bg-[#FFFFFF] border border-[#EBEBEB] px-5 py-4 md:px-10 md:py-5 max-w-3xl mx-auto rounded-full'>
        <div className='flex justify-between items-center w-full'>
          <LogoIcon />

          <button
            onClick={handleClose}
            className='flex items-center gap-1 text-[#111111] text-base hover:text-gray-600 font-normal transition-colors cursor-pointer '
          >
            Close
            <CloseIcon />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
