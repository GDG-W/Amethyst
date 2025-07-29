"use client";
import React from "react";
import Logo from "@/components/icons/logo";
import Link from "next/link";


const Header = () => {
  return (
      <header className='flex justify-center bg-white border border-bg-surface-800 px-5 py-4 md:px-10 md:py-5 max-w-[800px] mx-auto rounded-full'>
        <nav className='flex justify-between items-center w-full'>
          <Logo className='w-36 md:w-40 xl:w-48' />
          <Link
            href='/'
            className='flex items-center gap-1 text-static-black underline text-xs md:text-base font-normal cursor-pointer'
          >
            Claim Ticket
          </Link>
        </nav>
      </header>
  );
};

export default Header;
