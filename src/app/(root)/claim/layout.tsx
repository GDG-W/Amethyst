import React, { Suspense } from "react";

import Header from "@/components/layout/header";

export default function ClaimLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <Suspense fallback={<>loading...</>}>{children}</Suspense>
    </>
  );
}
