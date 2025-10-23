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

const APP_URL = process.env.NEXT_PUBLIC_APP_URL!;

export const metadata: Metadata = {
  title: "DevFest Lagos 2025 | Ticketing",
  description:
    "Secure your ticket for DevFest Lagos 2025! Get tickets for the premier tech conference, featuring talks on Mobile, Cloud, Web, AI/ML, Design, and more, from Nov 18th-22nd.",
  openGraph: {
    title: "DevFest Lagos 2025 | Ticketing",
    description:
      "Secure your ticket for DevFest Lagos 2025! Get tickets for the premier tech conference, featuring talks on Mobile, Cloud, Web, AI/ML, Design, and more, from Nov 18th-22nd.",
    url: APP_URL,
    images: [
      {
        url: "https://storage.googleapis.com/devfestlagos2025/Ruby/meta-tag.jpg",
        width: 1200,
        height: 630,
        alt: "DevFest Lagos 2025 | Ticketing OG Image",
      },
    ],
  },
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
