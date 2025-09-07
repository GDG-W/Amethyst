import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

import Image from "next/image";
import Link from "next/link";

import Button from "@/components/ui/home-button";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.3,
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, x: -50, rotate: -10 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: {
      duration: 1,
      ease: "easeOut",
      delay: 0.5,
    },
  },
};

const JoinUs = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <div className="flex justify-center bg-[#FCF6DF] px-5 py-10 md:px-36 md:pt-[3.4375rem] md:pb-8">
      <motion.div
        ref={containerRef}
        className="max-auto flex w-full max-w-7xl flex-col items-center justify-center space-y-5 rounded-sm bg-[#171717] p-5 text-white md:space-y-7 md:p-8 lg:rounded-xl lg:p-18"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h1
          className="font-akira w-full text-center text-base font-bold uppercase md:text-2xl"
          variants={titleVariants}
        >
          The future is <br /> technology, join us at <br />
          <span className="text-[#F6B51E]">DevFest Lagos 2025</span> <br /> and help shape that{" "}
          <br /> future in Nigeria
        </motion.h1>

        <motion.div variants={buttonVariants}>
          <Link href="/buy" className="flex w-full justify-center">
            <Button className="w-full text-sm text-[#141414] md:text-base">Buy Tickets</Button>
          </Link>
        </motion.div>

        <div className="relative hidden w-full lg:block">
          <motion.div variants={imageVariants}>
            <Image
              src="/see-you-there.svg"
              alt="See you there"
              width={150}
              height={150}
              className="scale-hover absolute -bottom-8 left-5"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default JoinUs;
