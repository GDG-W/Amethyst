"use client";
import React from "react";
import { useRouter } from "next/navigation";

import LogoIcon from "../icons/logo";

const Header = () => {
  const router = useRouter();
  const handleClaimTicket = () => {
    // Navigate to the user profile to claim the ticket
    router.push("/");
  };
  return (
    <header className='bg-[#FFFAEB] h-screen p-6 sm:p-8 md:p-12'>
      <div className='flex justify-center bg-white border border-bg-surface-800 px-5 py-4 md:px-10 md:py-5 max-w-3xl mx-auto rounded-full'>
        <div className='flex justify-between items-center w-full'>
          <LogoIcon className='w-36 md:w-40 xl:w-48' />
          <button
            onClick={handleClaimTicket}
            className='flex items-center gap-1 text-static-black underline text-xs md:text-base font-normal cursor-pointer'
          >
            Claim Ticket
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
