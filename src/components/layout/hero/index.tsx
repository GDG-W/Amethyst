"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

import Link from "next/link";

import Button from "@/components/ui/home-button";

const Hero = () => {
  const speakers = [
    { src: "/speaker1.svg", alt: "Speaker 1" },
    { src: "/speaker2.svg", alt: "Speaker 2" },
    { src: "/speaker3.svg", alt: "Speaker 3" },
    { src: "/speaker4.svg", alt: "Speaker 4" },
    { src: "/speaker5.svg", alt: "Speaker 5" },
    { src: "/speaker6.svg", alt: "Speaker 6" },
    { src: "/speaker7.svg", alt: "Speaker 7" },
    { src: "/speaker8.svg", alt: "Speaker 8" },
    { src: "/speaker9.svg", alt: "Speaker 9" },
  ];

  const infiniteSpeakers = [
    ...speakers,
    ...speakers,
    ...speakers,
    ...speakers,
    ...speakers,
    ...speakers,
  ];

  const [translateX, setTranslateX] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    const updateCardWidth = () => {
      setCardWidth(window.innerWidth >= 768 ? 408 : 272);
    };

    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);

    return () => window.removeEventListener("resize", updateCardWidth);
  }, []);

  const totalWidth = speakers.length * cardWidth;

  useEffect(() => {
    if (cardWidth === 0) return;

    const startAnimation = () => {
      intervalRef.current = setInterval(() => {
        setTranslateX((prev) => {
          const newTranslateX = prev - cardWidth;
          const singleSetWidth = speakers.length * cardWidth;

          if (Math.abs(newTranslateX) >= singleSetWidth * 2) {
            setIsTransitioning(false);

            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                setIsTransitioning(true);
              });
            });

            return -singleSetWidth;
          }

          return newTranslateX;
        });
      }, 3000);
    };

    startAnimation();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [cardWidth, speakers.length, totalWidth]);

  return (
    <div className="min-h-screen w-full p-4 md:min-h-[80vh] lg:min-h-screen">
      <div className="max-w-8xl mx-auto">
        <div className="flex min-h-[calc(100vh-2rem)] w-full flex-col items-center justify-center rounded-xl bg-[#171717] py-12 md:flex-row lg:items-stretch">
          <div className="flex flex-1 flex-col justify-center px-6 py-8 md:py-12 lg:px-16">
            <div className="mb-4 flex justify-start">
              <Image
                src="/road-to-devfest.svg"
                alt="Road to DevFest"
                width={120}
                height={120}
                className="h-28 w-28 md:h-36 md:w-36 lg:h-40 lg:w-40"
              />
            </div>

            <div className="text-center md:text-left">
              <h1 className="font-akira text-xl font-bold text-balance text-white uppercase md:max-w-md md:text-left md:text-3xl lg:max-w-xl lg:text-4xl">
                DevFest <br className="hidden md:block" /> Lagos <br className="hidden md:block" />{" "}
                Returns for{" "}
                <span className="text-[#4285F4]">
                  {" "}
                  <br className="hidden md:block" />
                  Five Epic Days.
                </span>
              </h1>

              <p className="mt-4 text-sm text-[#D1D1D1] md:mt-6 md:max-w-md md:text-base lg:max-w-xl">
                Join the largest tech gathering in Lagos happening over five transformative days,
                from Tuesday 18th - Saturday 22nd November 2025.
              </p>

              <div className="mt-6 flex w-full flex-col gap-3 md:mt-8 md:max-w-md md:flex-row md:gap-4">
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
                    className="w-full flex-1 cursor-pointer uppercase md:flex-1"
                  >
                    Log in
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-1 flex-col items-center justify-end md:items-end lg:justify-center">
            <div className="relative w-full pt-8 md:pt-20 lg:w-auto lg:max-w-lg">
              <div className="absolute top-2 right-4 z-10 md:top-4 md:right-4 lg:top-8 lg:right-8 xl:top-12 xl:right-16">
                <Image
                  src="/devfest25.svg"
                  alt="DevFest 2025"
                  width={120}
                  height={120}
                  className="h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24"
                />
              </div>

              <div className="flex w-full overflow-hidden" ref={containerRef}>
                <div
                  className={`flex ${isTransitioning ? "transition-transform duration-1000 ease-in-out" : ""}`}
                  style={{
                    transform: `translateX(${translateX}px)`,
                  }}
                >
                  {infiniteSpeakers.map((speaker, index) => (
                    <div
                      key={`${Math.floor(index / speakers.length)}-${index % speakers.length}`}
                      className="mr-4 h-80 w-64 flex-shrink-0 md:mr-6 md:h-96 md:w-96 lg:h-[500px]"
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
