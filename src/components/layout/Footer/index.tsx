"use client";

import Image from "next/image";

import Button from "@/components/ui/home-button";

export default function index() {
  const footerLinks = {
    leftColumn: [
      { label: "Login", href: "#" },
      { label: "Claim Ticket", href: "#" },
      { label: "Join the Community", href: "#" },
    ],
    rightColumn: [
      { label: "Privacy Policy", href: "#" },
      { label: "Community Guidelines", href: "#" },
    ],
  };

  const socialLinks = [
    { name: "Twitter", icon: "/x.svg", href: "#" },
    { name: "Instagram", icon: "/instagram.svg", href: "#" },
    { name: "Facebook", icon: "/facebook.svg", href: "#" },
    { name: "YouTube", icon: "/youtube.svg", href: "#" },
    { name: "LinkedIn", icon: "/linkedin.svg", href: "#" },
  ];

  return (
    <>
      <style jsx global>{`
        @keyframes gentle-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .spin-gentle {
          animation: gentle-spin 7s linear infinite;
        }
      `}</style>

      <footer className="relative w-full overflow-hidden bg-[#FCF6DF]">
        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-[3.75rem] lg:pt-[9.1875rem] lg:pb-12">
          <Image
            src="/footer-globe.svg"
            alt="DevFest Lagos 2025"
            width={100}
            height={150}
            className="spin-gentle absolute top-0 right-4 z-10 lg:top-10 lg:right-5"
          />

          <div className="relative">
            <div className="font-akira flex flex-wrap items-center gap-6 text-[2.25rem] leading-[.8] font-bold text-black lg:text-[7rem]">
              <span>DevFest</span>
              <Button className="hidden text-lg md:text-xl lg:flex">Buy Tickets</Button>
              <span className="whitespace-nowrap">Lagos 2025</span>
            </div>
          </div>

          <div className="flex w-full flex-col-reverse items-start justify-between gap-12 lg:flex-row">
            <div className="flex w-full flex-col gap-12">
              <div className="grid grid-cols-2 justify-between lg:gap-[10rem] lg:pt-[3.75rem]">
                <div className="space-y-8">
                  <div className="space-y-4">
                    {footerLinks.leftColumn.map((link, index) => (
                      <a key={index} href={link.href} className="label-3 block">
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="mt-4 space-y-4 lg:mt-0">
                  {footerLinks.rightColumn.map((link, index) => (
                    <a key={index} href={link.href} className="label-3 font-inter block">
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="space-y-3 lg:space-y-6">
                <h3 className="text-lg font-semibold text-black">Follow Us:</h3>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white transition-colors hover:bg-gray-800"
                      aria-label={`Follow us on ${social.name}`}
                    >
                      <Image
                        src={social.icon}
                        width={15}
                        height={15}
                        alt={social.icon}
                        className="text-xl"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 flex w-full flex-col lg:mt-0">
              <Button className="flex text-lg md:text-xl lg:hidden">Buy Tickets</Button>

              <Image
                src="/footer-image.webp"
                alt="DevFest Lagos Community"
                width={550}
                height={200}
                className="w-full"
              />
            </div>
          </div>

          <div className="mt-8 lg:mt-16">
            <p className="label-3 text-center font-semibold text-[#141414]">
              © 2025 DevFest Lagos. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
