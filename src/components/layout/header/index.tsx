"use client";
import React from "react";

import Link from "next/link";

import { usePathname } from "next/navigation";

import Logo from "@/components/icons/logo";
import Button from "@/components/ui/button";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="border-bg-surface-800 mx-auto flex max-w-[800px] justify-center rounded-full border bg-white px-5 py-4 md:px-10 md:py-5">
      <nav className="flex w-full items-center justify-between">
        <Logo className="w-36 md:w-40 xl:w-48" />
        {pathname === "/buy" ? (
          <>
            <Link
              href="/claim"
              className="text-strong-950 cursor-pointer text-xs font-normal underline underline-offset-2 md:text-base"
            >
              Claim Ticket
            </Link>
          </>
        ) : null}
        {pathname === "/claim" || pathname === "/upgrade" ? (
          <Button size="fit">
            <Link href="/buy">Buy Tickets!</Link>
          </Button>
        ) : null}
      </nav>
    </header>
  );
};

export default Header;
