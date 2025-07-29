import { Inter } from "next/font/google";
import Link from "next/link";

import Header from "@/components/layout/header";

import "./globals.css";
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
    <html lang='en' className='md:mx-5 md:my-3'>
      <body
        style={{ backgroundImage: "url('/bg.png')" }}
        className={`${inter.variable} md:rounded-2.5xl min-h-dvh bg-cover bg-no-repeat px-5 antialiased md:min-h-[95dvh]`}
      >
        <div className='mx-auto max-w-4xl pt-8 md:pt-14'>
          <Header />
          <h1 className='heading-5 md:heading-4 mt-11 mb-2 font-semibold md:mt-17 md:mb-5'>
            Be a part of the <br /> DevFest 2025 physically!
          </h1>
          <p className='text-soft-400 text-xs'>
            <span>Already have a ticket? </span>
            <Link href='/' className='text-sub-600 underline underline-offset-2'>
              Claim Ticket
            </Link>
          </p>
          {children}
        </div>
      </body>
    </html>
  );
}
