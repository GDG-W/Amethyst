import "./globals.css";

import { Inter } from "next/font/google";

import localFont from "next/font/local";

import { RQProvider } from "@/lib/react-query";

import Toaster from "@/components/ui/toast";

import type { Metadata } from "next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevFest Lagos 2025 | Ticketing",
  description:
    "Secure your ticket for DevFest Lagos 2025! Get tickets for the premier tech conference, featuring talks on Mobile, Cloud, Web, AI/ML, Design, and more, from Nov 18th-22nd.",
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
    <html lang="en">
      <body className={`${inter.variable} ${akira.variable}`}>
        <RQProvider>
          <div className="">{children}</div>
        </RQProvider>
        <Toaster />
        <div id="modal-root" />
      </body>
    </html>
  );
}
