"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

import Image from "next/image";

import Link from "next/link";

import Button from "@/components/ui/home-button";

import Header from "../navbar";

const Hero = () => {
  const initialSpeakers = [
    { src: "/speaker1.webp", alt: "Speaker 1" },
    { src: "/speaker2.webp", alt: "Speaker 2" },
    { src: "/speaker3.webp", alt: "Speaker 3" },
    { src: "/speaker4.webp", alt: "Speaker 4" },
    { src: "/speaker5.webp", alt: "Speaker 5" },
    { src: "/speaker6.webp", alt: "Speaker 6" },
    { src: "/speaker7.webp", alt: "Speaker 7" },
    { src: "/speaker8.webp", alt: "Speaker 8" },
    { src: "/speaker9.webp", alt: "Speaker 9" },
  ];

  const [speakerQueue, setSpeakerQueue] = useState(initialSpeakers);
  const [translateX, setTranslateX] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { once: true, margin: "-100px" });

  const getCardWidth = () => {
    const isMobile = window.innerWidth < 768;
    return isMobile ? 272 : 408;
  };

  useEffect(() => {
    const startAnimation = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
        const cardWidth = getCardWidth();
        setIsTransitioning(true);
        setTranslateX(-cardWidth);

        setTimeout(() => {
          setIsTransitioning(false);
          requestAnimationFrame(() => {
            setSpeakerQueue((prev) => {
              const [first, ...rest] = prev;
              return [...rest, first];
            });
            setTranslateX(0);
          });
        }, 1000);
      }, 3000);
    };

    startAnimation();

    const handleResize = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setTranslateX(0);
      setIsTransitioning(false);
      setTimeout(() => {
        startAnimation();
      }, 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const slideUpVariants = {
    hidden: {
      opacity: 0,
      y: 60,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.25, 0, 1] as const,
      },
    },
  };

  const logoVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotate: -10,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1,
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const textRevealVariants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.25, 0, 1] as const,
      },
    },
  };

  const buttonVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0, 1] as const,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut" as const,
      },
    },
    tap: {
      scale: 0.98,
    },
  };

  const carouselContainerVariants = {
    hidden: {
      opacity: 0,
      x: 100,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.25, 0, 1] as const,
        staggerChildren: 0.1,
        delayChildren: 0.5,
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        ease: "easeInOut" as const,
        repeat: Infinity,
      },
    },
  };

  return (
    <motion.div
      ref={heroRef}
      className="w-full overflow-hidden p-4"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <motion.div
        className="w-full overflow-hidden rounded-xl bg-[#171717]"
        variants={slideUpVariants}
        whileHover={{
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          transition: { duration: 0.3 },
        }}
      >
        <motion.div className="pt-5 pb-0" variants={slideUpVariants}>
          <Header />
        </motion.div>

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center overflow-hidden bg-[#171717] pb-6 md:pb-14 lg:flex-row lg:items-stretch">
          <motion.div
            className="flex w-full min-w-0 flex-2 flex-col justify-center px-6"
            variants={containerVariants}
          >
            <motion.div className="flex justify-start md:mb-2 lg:mb-4" variants={logoVariants}>
              <Image
                src="/road-to-devfest.svg"
                alt="Road to DevFest"
                width={120}
                height={120}
                className="h-28 w-28 md:h-36 md:w-36 lg:h-40 lg:w-40"
              />
            </motion.div>

            <div className="mx-auto text-center lg:text-left">
              <motion.div variants={textRevealVariants}>
                <h1 className="font-akira text-[1.5rem] font-bold text-white uppercase min-[375px]:text-[1.625rem] min-[425px]:text-[1.75rem] md:max-w-md md:text-4xl lg:text-left lg:text-[4rem] xl:max-w-3xl">
                  <motion.span
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  >
                    DevFest
                  </motion.span>{" "}
                  <br className="hidden lg:block" />
                  <motion.span
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.6 }}
                  >
                    Lagos
                  </motion.span>{" "}
                  <br className="hidden lg:block" />
                  <motion.span
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                  >
                    Returns for
                  </motion.span>{" "}
                  <motion.span
                    className="text-[#4285F4] md:whitespace-nowrap"
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                      delay: 1.4,
                      duration: 0.8,
                      type: "spring",
                      stiffness: 120,
                    }}
                  >
                    <br className="hidden md:block" />
                    Five Epic Days.
                  </motion.span>
                </h1>
              </motion.div>

              <motion.p
                className="mx-auto mt-4 text-sm text-[#D1D1D1] md:mt-6 md:max-w-md md:text-base lg:mx-0 lg:max-w-xl"
                variants={textRevealVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 1.6 }}
              >
                Join the largest tech gathering in Lagos happening over five transformative days,
                from Tuesday 18th - Saturday 22nd November 2025.
              </motion.p>

              <motion.div
                className="mx-auto mt-6 flex w-full flex-col gap-3 md:mt-6 md:max-w-md md:flex-row md:gap-4 lg:mx-0"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 1.8, staggerChildren: 0.1 }}
              >
                <Link href="/buy">
                  <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="w-full md:flex-1"
                  >
                    <Button
                      variant="primary"
                      className="w-full cursor-pointer whitespace-nowrap text-[#141414]"
                    >
                      Buy Tickets
                    </Button>
                  </motion.div>
                </Link>
                <Link className="flex-1" href="/login">
                  <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="w-full md:flex-1"
                  >
                    <Button
                      variant="secondary"
                      className="w-full flex-1 cursor-pointer whitespace-nowrap uppercase"
                    >
                      Log in
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="flex w-full min-w-0 flex-1 flex-col items-center justify-end md:w-auto md:items-end lg:justify-center"
            variants={carouselContainerVariants}
          >
            <div className="relative w-full pt-8 md:pt-20 lg:w-auto lg:max-w-lg">
              <motion.div
                className="absolute top-2 right-5 z-10 max-[360px]:right-5 md:top-4 md:right-4 lg:top-8 lg:right-8 xl:top-12 xl:right-16"
                variants={floatingVariants}
                animate="animate"
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.3 },
                }}
              >
                <Image
                  src="/devfest25.svg"
                  alt="DevFest 2025"
                  width={120}
                  height={120}
                  className="h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24"
                />
              </motion.div>

              <div className="flex w-full justify-center overflow-hidden md:justify-start">
                <div
                  className={`flex will-change-transform ${
                    isTransitioning ? "transition-transform duration-1000 ease-in-out" : ""
                  }`}
                  style={{
                    transform: `translateX(${translateX}px)`,
                    width: "max-content",
                  }}
                >
                  {speakerQueue.map((speaker, index) => (
                    <div
                      key={`speaker-${index}-${speaker.src}`}
                      className="mr-4 h-80 w-60 flex-shrink-0 md:mr-6 md:h-80 md:w-80 lg:h-[500px] lg:w-96"
                      style={{ minWidth: "16rem" }}
                    >
                      <Image
                        src={speaker.src}
                        alt={speaker.alt}
                        width={400}
                        height={400}
                        className="h-full w-full rounded-md object-cover lg:rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
