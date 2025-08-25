import "./globals.css";

import { Inter } from "next/font/google";

import type { Metadata } from "next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevFest '25 | Ticketing",
  description: "Purchase your tickets to attend one of the biggest tech conferences in Africa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="md:mx-5 md:my-3">
      <body
        style={{ backgroundImage: "url('/bg.png')" }}
        className={`${inter.variable} md:rounded-2.5xl min-h-dvh bg-cover bg-no-repeat px-5 antialiased md:min-h-[95dvh]`}
      >
        <div className="mx-auto max-w-4xl pt-8 md:pt-14">{children}</div>
      </body>
    </html>
  );
}
