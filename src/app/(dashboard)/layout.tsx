import "../globals.css";

import { Inter } from "next/font/google";

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
  src: "../../components/fonts/Akira-Expanded-Demo.otf",
  variable: "--font-akira",
  display: "swap",
});

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="md:mx-5 md:my-3">
      <div
        style={{ backgroundImage: "url('/bg.png')" }}
        className="md:rounded-2.5xl min-h-dvh bg-cover bg-no-repeat px-5 md:min-h-[95dvh]"
      >
        <div className="mx-auto max-w-4xl pt-8 pb-6 md:pt-14">{children}</div>
      </div>
    </div>
  );
}
