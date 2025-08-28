"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import Button from "@/components/ui/home-button";

const images = [
  { id: 1, src: "/gallery-image1.webp", alt: "DevFest moment 1" },
  { id: 2, src: "/gallery-image2.webp", alt: "DevFest moment 2" },
  { id: 3, src: "/gallery-image3.webp", alt: "DevFest moment 3" },
  { id: 4, src: "/gallery-image4.webp", alt: "DevFest moment 4" },
  { id: 5, src: "/gallery-image5.webp", alt: "DevFest moment 5" },
  { id: 6, src: "/gallery-image6.webp", alt: "DevFest moment 6" },
  { id: 7, src: "/gallery-image7.webp", alt: "DevFest moment 7" },
  { id: 8, src: "/gallery-image8.webp", alt: "DevFest moment 8" },
  { id: 9, src: "/gallery-image9.webp", alt: "DevFest moment 9" },
  { id: 10, src: "/gallery-image10.webp", alt: "DevFest moment 10" },
];

export default function Recap() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const infiniteImages = [...images, ...images];

  return (
    <section className="w-full bg-[#FFFFFF]">
      <div className="mx-auto flex h-full max-w-7xl flex-col gap-[6.8125rem] lg:justify-between lg:gap-[13.6875rem]">
        <div className="relative flex h-full justify-between px-5 pt-[6.625rem] pb-8 lg:pr-[6.1875rem] lg:pl-[11.875rem]">
          <div className="flex w-full flex-col items-center justify-center lg:max-w-lg lg:flex-row">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-6">
                <h2 className="font-akira text-xl font-bold">2024 recap</h2>
                <p className="label-3">
                  From inspiring talks to hands-on sessions, DevFest Lagos 2024 had it all — Mental
                  Health, Mobile, Design, Web, Cloud, DevOps, Machine Learning, AR/VR, and more.
                  Here&apos;s a look back at the moments that made it unforgettable.
                </p>
              </div>
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
              height={10}
              alt="laptop image with devfest logo"
            />
          </div>

          {/* Mobile floating image */}
          <Image
            src="/recap-image.png"
            width={150}
            height={150}
            alt="laptop image with devfest logo"
            className="absolute top-20 right-5 block w-[5.68375rem] -translate-y-1/2 lg:hidden"
          />
        </div>

        {/* Carousel */}
        <div className="flex gap-[1.0625rem] overflow-hidden">
          <div
            className="flex items-end gap-[1.0625rem] transition-transform duration-1000 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (256 + 17)}px)`,
            }}
          >
            {infiniteImages.map((image, index) => (
              <div
                key={`${image.id}-${index}`}
                className="flex flex-shrink-0 items-end overflow-hidden rounded-lg"
              >
                <Image
                  src={image.src}
                  width={300}
                  height={0}
                  alt={image.alt}
                  className="h-auto w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
