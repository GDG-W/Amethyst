"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import Button from "@/components/ui/home-button";

const images = [
  { id: 1, src: "/gallery-image1.png", alt: "DevFest moment 1" },
  { id: 2, src: "/gallery-image2.png", alt: "DevFest moment 2" },
  { id: 3, src: "/gallery-image3.png", alt: "DevFest moment 3" },
  { id: 4, src: "/gallery-image4.png", alt: "DevFest moment 4" },
  { id: 5, src: "/gallery-image5.png", alt: "DevFest moment 5" },
  { id: 6, src: "/gallery-image6.png", alt: "DevFest moment 6" },
  { id: 7, src: "/gallery-image7.png", alt: "DevFest moment 7" },
  { id: 8, src: "/gallery-image8.png", alt: "DevFest moment 8" },
  { id: 9, src: "/gallery-image9.png", alt: "DevFest moment 9" },
  { id: 10, src: "/gallery-image10.png", alt: "DevFest moment 10" },
];

export default function Recap() {
  const [imageQueue, setImageQueue] = useState(images);
  const [translateX, setTranslateX] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const cardWidth = 256 + 16;

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIsTransitioning(true);
      setTranslateX(-cardWidth);

      setTimeout(() => {
        setIsTransitioning(false);

        requestAnimationFrame(() => {
          setImageQueue((prev) => {
            const [first, ...rest] = prev;
            return [...rest, first];
          });
          setTranslateX(0);
        });
      }, 1000);
    }, 3000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [cardWidth]);

  return (
    <section className="w-full bg-[#FFFFFF]">
      <div className="mx-auto flex h-full max-w-7xl flex-col gap-[6.8125rem] lg:justify-between lg:gap-[13.6875rem]">
        <div className="relative flex h-full justify-between px-5 pt-[6.625rem] pb-8 lg:pr-[6.1875rem] lg:pl-[11.875rem]">
          <div className="flex w-full flex-col items-center justify-center lg:max-w-lg lg:flex-row">
            <div className="flex flex-col gap-6">
              <h2 className="font-akira text-xl font-bold md:text-[2rem]">2024 recap</h2>
              <p className="label-3">
                From inspiring talks to hands-on sessions, DevFest Lagos 2024 had it all — Mental
                Health, Mobile, Design, Web, Cloud, DevOps, Machine Learning, AR/VR, and more.
                Here&apos;s a look back at the moments that made it unforgettable.
              </p>
              <div className="flex w-full flex-col gap-3 md:flex-row">
                <Link href="/buy">
                  <Button className="w-full md:flex-1">Buy TicketS</Button>
                </Link>
                <Link href="https://youtu.be/4HeUaiZLZ34?si=_-n9psHWDKjv36w" target="_blank">
                  <Button className="w-full whitespace-nowrap md:flex-1" variant="secondary">
                    VIEW EVENT HIGHLIGHTS
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <Image
              src="/recap-image.png"
              width={150}
              height={150}
              alt="laptop image with devfest logo"
              className="scale-hover"
            />
          </div>

          <Image
            src="/recap-image.png"
            width={150}
            height={150}
            alt="laptop image with devfest logo"
            className="absolute top-20 right-5 block w-[5.68375rem] -translate-y-1/2 lg:hidden"
          />
        </div>

        <div className="overflow-hidden">
          <div
            className={`flex h-[400px] items-end gap-[1.0625rem] will-change-transform ${
              isTransitioning ? "transition-transform duration-1000 ease-in-out" : ""
            }`}
            style={{
              transform: `translateX(${translateX}px)`,
            }}
          >
            {imageQueue.map((image, index) => (
              <div
                key={`${image.id}-${index}`}
                className="flex flex-shrink-0 items-end overflow-hidden rounded-lg"
              >
                <Image
                  src={image.src}
                  width={256}
                  height={200}
                  alt={image.alt}
                  className="h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
