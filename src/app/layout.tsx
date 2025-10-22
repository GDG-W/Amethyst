import "./globals.css";

import { Inter } from "next/font/google";

import localFont from "next/font/local";

import Script from "next/script";

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
    <html lang="en">
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-ZR44Q96G06"></script>
      <Script id="gtag-script">
        {`
          window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-ZR44Q96G06');
        `}
      </Script>
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
