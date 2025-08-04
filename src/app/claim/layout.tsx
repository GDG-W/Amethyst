import React from "react";

import Header from "@/components/layout/header";

export default function ClaimLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <h1 className='heading-5 md:heading-4 mt-11 mb-2 text-center font-semibold md:mt-17 md:mb-5'>
        Finish your registration to claim <br /> your ticket
      </h1>
      {children}
    </>
  );
}
