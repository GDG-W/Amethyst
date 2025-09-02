"use client";
import React from "react";

import Link from "next/link";

import { usePathname } from "next/navigation";

import Logo from "@/components/icons/logo";
import Button from "@/components/ui/home-button";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="mx-auto flex max-w-[300px] justify-center rounded-full border border-[#EBEBEB] bg-[#FCF6DF] px-5 py-4 md:max-w-[700px] md:px-10 md:py-4">
      <nav className="flex w-full items-center justify-center md:justify-between">
        <Logo className="w-36 md:w-40 xl:w-48" />
        {pathname === "/" ? (
          <Link href="/buy">
            <Button
              variant="primary"
              className="hidden max-h-[10px] max-w-[11rem] cursor-pointer py-5 !text-[12px] whitespace-nowrap text-[#141414] md:flex"
            >
              Buy Tickets
            </Button>
          </Link>
        ) : null}
      </nav>
    </header>
  );
};

export default Header;
