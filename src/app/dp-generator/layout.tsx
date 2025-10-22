import localFont from "next/font/local";
import "../globals.css";

const akira = localFont({
  src: "../../components/fonts/Akira-Expanded-Demo.otf",
  variable: "--font-akira",
  display: "swap",
});

export default function DpGeneratorLayout({ children }: { children: React.ReactNode }) {
  return <div className={`bg-[#F6B51E] p-4 ${akira.variable}`}>{children}</div>;
}
