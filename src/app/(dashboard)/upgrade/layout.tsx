import React from "react";

import Header from "@/components/layout/header";

export default function UpgradeLayout({
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
