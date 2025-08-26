import "./globals.css";

import { Inter } from "next/font/google";
import { RQProvider } from "@/lib/react-query";
import localFont from "next/font/local";

import type { Metadata } from "next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevFest '25 | Ticketing",
  description: "Purchase your tickets to attend one of the biggest tech conferences in Africa",
};
const akira = localFont({
  src: "../components/fonts/Akira-Expanded-Demo.otf",
  variable: "--font-akira",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <body className={`${inter.variable} ${akira.variable} `}>
        <div className="">{children}</div>
      </body>
    </html>
  );
}
