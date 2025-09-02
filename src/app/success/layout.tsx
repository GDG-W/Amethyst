import React from "react";

import Header from "@/components/layout/header";

export default function SuccessLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
