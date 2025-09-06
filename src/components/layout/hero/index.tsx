"use client";

import React, { useEffect, useRef, useState } from "react";

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

  return (
    <div className="w-full p-4">
      <div className="w-full overflow-hidden rounded-xl bg-[#171717]">
        <div className="pt-5 pb-0">
          <Header />
        </div>
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center bg-[#171717] pb-6 md:pb-14 lg:flex-row lg:items-stretch">
          <div className="flex w-full flex-2 flex-col justify-center px-6">
            <div className="flex justify-start md:mb-2 lg:mb-4">
              <Image
                src="/road-to-devfest.svg"
                alt="Road to DevFest"
                width={120}
                height={120}
                className="scale-hover h-28 w-28 md:h-36 md:w-36 lg:h-40 lg:w-40"
              />
            </div>

            <div className="mx-auto text-center lg:text-left">
              <h1 className="font-akira text-[1.5rem] font-bold text-white uppercase min-[375px]:text-[1.625rem] min-[425px]:text-[1.75rem] md:max-w-md md:text-4xl lg:text-left lg:text-[4rem] xl:max-w-3xl">
                DevFest <br className="hidden lg:block" /> Lagos <br className="hidden lg:block" />{" "}
                Returns for{" "}
                <span className="text-[#4285F4] md:whitespace-nowrap">
                  {" "}
                  <br className="hidden md:block" />
                  Five Epic Days.
                </span>
              </h1>

              <p className="mx-auto mt-4 text-sm text-[#D1D1D1] md:mt-6 md:max-w-md md:text-base lg:mx-0 lg:max-w-xl">
                Join the largest tech gathering in Lagos happening over five transformative days,
                from Tuesday 18th - Saturday 22nd November 2025.
              </p>

              <div className="mx-auto mt-6 flex w-full flex-col gap-3 md:mt-6 md:max-w-md md:flex-row md:gap-4 lg:mx-0">
                <Link href="/buy">
                  <Button
                    variant="primary"
                    className="w-full cursor-pointer whitespace-nowrap text-[#141414] md:flex-1"
                  >
                    Buy Tickets
                  </Button>
                </Link>
                <Link className="flex-1" href="/login">
                  <Button
                    variant="secondary"
                    className="w-full flex-1 cursor-pointer whitespace-nowrap uppercase md:flex-1"
                  >
                    Log in
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-1 flex-col items-center justify-end md:w-auto md:items-end lg:justify-center">
            <div className="relative w-full pt-8 md:pt-20 lg:w-auto lg:max-w-lg">
              <div className="absolute top-2 right-2 z-10 md:top-4 md:right-4 lg:top-8 lg:right-8 xl:top-12 xl:right-16">
                <Image
                  src="/devfest25.svg"
                  alt="DevFest 2025"
                  width={120}
                  height={120}
                  className="scale-hover h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24"
                />
              </div>

              {/* Infinite Queue Carousel */}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
