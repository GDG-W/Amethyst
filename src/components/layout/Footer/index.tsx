"use client";

import { motion, useInView } from "framer-motion";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import Button from "@/components/ui/home-button";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2,
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const globeVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -45, x: 50, y: -50 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    x: 0,
    y: 0,
    transition: {
      duration: 1.2,
      ease: "easeOut",
      delay: 0.3,
    },
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const linkVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const socialVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const copyrightVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: 0.5,
    },
  },
};

export default function Footer() {
  const footerRef = useRef(null);
  const linksRef = useRef(null);
  const socialRef = useRef(null);
  const imageRef = useRef(null);
  const copyrightRef = useRef(null);

  const isFooterInView = useInView(footerRef, { once: true, margin: "-100px" });
  const isLinksInView = useInView(linksRef, { once: true, margin: "-50px" });
  const isSocialInView = useInView(socialRef, { once: true, margin: "-50px" });
  const isImageInView = useInView(imageRef, { once: true, margin: "-50px" });
  const isCopyrightInView = useInView(copyrightRef, { once: true, margin: "-50px" });

  const footerLinks = {
    leftColumn: [
      { label: "Login", href: "/login" },
      { label: "Join the Community", href: "https://gdg.community.dev/gdg-lagos/" },
    ],
    rightColumn: [
      { label: "Privacy Policy", href: "https://policies.google.com/privacy" },
      {
        label: "Community Guidelines",
        href: "https://www.google.com/events/policy/anti-harassmentpolicy.html",
      },
    ],
  };

  const socialLinks = [
    { name: "Twitter", icon: "/x.svg", href: "https://x.com/gdglagos" },
    { name: "Instagram", icon: "/instagram.svg", href: "https://www.instagram.com/gdglagos/#" },
    {
      name: "Facebook",
      icon: "/facebook.svg",
      href: "https://web.facebook.com/people/Google-Developers-Group-Lagos/100075612535619/#",
    },
    { name: "YouTube", icon: "/youtube.svg", href: "https://www.youtube.com/@GDGLagos" },
    { name: "LinkedIn", icon: "/linkedin.svg", href: "https://www.linkedin.com/company/gdg-lagos" },
  ];

  return (
    <>
      <footer className="relative w-full overflow-hidden bg-[#FCF6DF]">
        <motion.div
          ref={footerRef}
          className="relative mx-auto max-w-7xl px-6 py-20 lg:px-[3.75rem] lg:pt-[9.1875rem] lg:pb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isFooterInView ? "visible" : "hidden"}
        >
          {/* Globe Animation */}
          <motion.div
            className="scale-hover absolute top-0 right-4 z-10 w-24 lg:top-10 lg:right-5 lg:w-40"
            variants={globeVariants}
            initial="hidden"
            animate={isFooterInView ? "visible" : "hidden"}
          >
            <Image
              src="/footer-globe.svg"
              alt="DevFest Lagos 2025"
              width={100}
              height={150}
              className="w-full"
            />
          </motion.div>

          {/* Title */}
          <div className="relative">
            <motion.div
              className="font-akira flex flex-wrap items-center gap-6 text-[2.25rem] leading-[.8] font-bold text-black lg:text-[7rem]"
              variants={titleVariants}
            >
              <span>DevFest</span>
              <Link href="/buy">
                <Button className="hidden text-lg md:text-xl lg:flex">Buy Tickets</Button>
              </Link>
              <span className="whitespace-nowrap">Lagos 2025</span>
            </motion.div>
          </div>

          {/* Links & Socials */}
          <div className="flex w-full flex-col-reverse items-start justify-between gap-12 lg:flex-row">
            <div className="flex w-full flex-col gap-12">
              <motion.div
                ref={linksRef}
                className="grid grid-cols-2 justify-between lg:gap-[10rem] lg:pt-[3.75rem]"
                variants={containerVariants}
                initial="hidden"
                animate={isLinksInView ? "visible" : "hidden"}
              >
                <div className="space-y-8">
                  <div className="space-y-4">
                    {footerLinks.leftColumn.map((link, index) => (
                      <motion.a
                        key={index}
                        href={link.href}
                        className="label-3 block"
                        variants={linkVariants}
                        transition={{ delay: index * 0.1 }}
                      >
                        {link.label}
                      </motion.a>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 lg:mt-0">
                  {footerLinks.rightColumn.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.href}
                      className="label-3 font-inter block"
                      variants={linkVariants}
                      transition={{ delay: (index + 2) * 0.1 }}
                    >
                      {link.label}
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                ref={socialRef}
                className="space-y-3 lg:space-y-6"
                variants={contentVariants}
                initial="hidden"
                animate={isSocialInView ? "visible" : "hidden"}
              >
                <h3 className="text-lg font-semibold text-black">Follow Us:</h3>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white transition-colors hover:bg-gray-800"
                      aria-label={`Follow us on ${social.name}`}
                      variants={socialVariants}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Image
                        src={social.icon}
                        width={15}
                        height={15}
                        alt={social.icon}
                        className="text-xl"
                      />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Footer Image */}
            <motion.div
              ref={imageRef}
              className="mt-4 flex w-full flex-col lg:mt-0"
              variants={imageVariants}
              initial="hidden"
              animate={isImageInView ? "visible" : "hidden"}
            >
              <Link href="/buy">
                <Button className="flex text-lg md:text-xl lg:hidden">Buy Tickets</Button>
              </Link>
              <Image
                src="/footer-image.webp"
                alt="DevFest Lagos Community"
                width={550}
                height={200}
                className="w-full"
              />
            </motion.div>
          </div>

          {/* Copyright */}
          <motion.div
            ref={copyrightRef}
            className="mt-8 lg:mt-16"
            variants={copyrightVariants}
            initial="hidden"
            animate={isCopyrightInView ? "visible" : "hidden"}
          >
            <p className="label-3 text-center font-semibold text-[#141414]">
              © 2025 DevFest Lagos. All Rights Reserved.
            </p>
          </motion.div>
        </motion.div>
      </footer>
    </>
  );
}
