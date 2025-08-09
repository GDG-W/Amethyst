import React from "react";

import Link from "next/link";

import Header from "@/components/layout/header";

export default function BuyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <h1 className="heading-5 md:heading-4 mt-11 mb-2 font-semibold md:mt-17 md:mb-5">
        Be a part of the <br /> DevFest 2025 physically!
      </h1>
      <p className="text-soft-400 text-xs">
        <span>Already have a ticket? </span>
        <Link href="/claim" className="text-sub-600 underline underline-offset-2">
          Claim Ticket
        </Link>
      </p>
      {children}
    </>
  );
}
