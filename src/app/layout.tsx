import { Inter } from "next/font/google";

import "./globals.css";
import localFont from "next/font/local";

import Toaster from "@/components/ui/toast";
import { RQProvider } from "@/lib/react-query";

import Toaster from "@/components/ui/toast";

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
    <html lang="en" className="relative">
      <body>
        <div
          style={{ backgroundImage: "url('/bg.png')" }}
          className={`${inter.variable} ${akira.variable} md:rounded-2.5xl min-h-dvh bg-cover bg-no-repeat px-5 antialiased md:mx-5 md:my-3 md:min-h-[95dvh]`}
        >
          <RQProvider>
            <div className="mx-auto max-w-4xl pt-8 pb-6 md:pt-14">{children}</div>
          </RQProvider>
        </div>
        <Toaster />
        <div id="modal-root" />
      </body>
    </html>
  );
}
