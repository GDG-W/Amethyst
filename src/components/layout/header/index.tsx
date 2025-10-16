"use client";

import Link from "next/link";

import React from "react";

import { usePathname } from "next/navigation";

import Button from "@/components/ui/button";
import Logo from "@/components/icons/logo";
import LogoutIcon from "@/components/icons/logout-icon";

import { useGetuser } from "@/hooks/useUser";
import { useLogout } from "@/hooks/useAuth";

const Header = () => {
  const pathname = usePathname();
  const { user_id } = useGetuser();

  return (
    <header className="border-bg-surface-800 mx-auto flex max-w-[800px] justify-center rounded-full border bg-white px-5 py-4 md:px-10 md:py-5">
      <nav className="flex w-full items-center justify-between">
        <Link href="/">
          <Logo className="w-36 md:w-40 xl:w-48" />
        </Link>
        {pathname === "/buy" ? (
          <>
            {user_id ? (
              <LogoutButton />
            ) : (
              <Link
                href="/login"
                className="text-strong-950 cursor-pointer text-xs font-normal underline underline-offset-2 md:text-base"
              >
                Login
              </Link>
            )}
          </>
        ) : null}
        {pathname === "/login" || pathname === "/upgrade" ? (
          <Button size="fit">
            <Link href="/buy">Buy Tickets!</Link>
          </Button>
        ) : pathname === "/dashboard" ? (
          <LogoutButton />
        ) : null}
      </nav>
    </header>
  );
};

export default Header;

const LogoutButton = () => {
  const handleLogout = useLogout();
  return (
    <Button size="fit" variant="ghost" className="flex items-center gap-x-1" onClick={handleLogout}>
      <span className="label-2">Logout</span>
      <LogoutIcon />
    </Button>
  );
};
