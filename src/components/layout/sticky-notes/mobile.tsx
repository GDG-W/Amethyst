"use client";

import Image from "next/image";
import { useState } from "react";

const cardData = [
  {
    title: "Bootcamps & Codelabs",
    text: "Get your hands dirty with real code and frameworks",
    icon: "/lamp.svg",
    backgroundColor: "bg-[#FFE7A5]",
    tilt: "rotate-[8.49deg]",
  },
  {
    title: "Hands-on Workshops",
    text: "Learn by doing with industry experts.",
    icon: "/community-fill.svg",
    backgroundColor: "bg-[#F7F7F7]",
    tilt: "-rotate-[6.18deg]",
  },
  {
    title: "Hackathons & Solution Challenges",
    text: "Build real-world solutions and win big",
    icon: "/shopping-bag.svg",
    backgroundColor: "bg-[#F7F7F7]",
    tilt: " -rotate-[13.75deg]",
  },
  {
    title: "Panel Sessions & Global Keynotes",
    text: "Insights from Googlers, GDEs, and tech leaders",
    icon: "/speak-ai-fill.svg",
    backgroundColor: "bg-[#C3ECF6]",
    tilt: "-rotate-[18.8deg]",
  },
  {
    title: "Ultimate Masterclasses",
    text: "Deep dives into emerging topics and career growth",
    icon: "/shopping-bag-3.svg",
    backgroundColor: "bg-[#F7F7F7]",
    tilt: "rotate-[3.83deg]",
  },
  {
    title: "The Future of Technology",
    text: "Explore AI, Cloud, DevTools, and what's next",
    icon: "/shopping-bag-4.svg",
    backgroundColor: "bg-[#CCF6C5]",
    tilt: "rotate-[22.51deg]",
  },
  {
    title: "Startup & Product Showcases",
    text: "Discover bold ideas and game-changing products",
    icon: "/speak-ai-fill-1.svg",
    backgroundColor: "bg-[#F7F7F7]",
    tilt: "-rotate-[12.03deg]",
  },
  {
    title: "Community and Talent Day",
    text: "Meet hiring teams, showcase your skills, and network",
    icon: "/shopping-bag-3-line.svg",
    backgroundColor: "bg-[#F8D8D8]",
    tilt: "rotate-0",
  },
  {
    title: "Office Hours",
    text: "Get direct feedback from Googlers, GDEs, and mentors",
    icon: "/building-line.svg",
    backgroundColor: "bg-[#F7F7F7]",
    tilt: "-rotate-[13.3deg]",
  },
  {
    title: "After Party Celebration",
    text: "Close out DevFest with music, vibes, and community energy",
    icon: "/emotion-happy-line.svg",
    backgroundColor: "bg-[#FFE7A5]",
    tilt: "rotate-[6.9deg]",
  },
];

interface TiltedCardProps {
  title: string;
  text: string;
  icon: string;
  backgroundColor: string;
  tilt: string | number;
  isCenter: boolean;
}
function TiltedCard({
  title,
  text,
  icon,
  backgroundColor,
  tilt,
  isCenter = false,
}: TiltedCardProps) {
  return (
    <div
      className={`relative h-[16.875rem] w-80 flex-shrink-0 rounded-[1rem] px-5 py-8 transition-transform duration-500 ease-in-out ${backgroundColor} ${isCenter ? "rotate-0" : tilt}`}
    >
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-white">
        <Image src={icon} alt="Card icon" width={24} height={24} />
      </div>

      <div className="flex w-full max-w-[14rem] flex-col gap-4">
        <h2 className="text-[1.68rem] leading-[1] font-medium text-[#171717]">{title}</h2>
        <p className="label-3 text-[#5C5C5C]">{text}</p>
      </div>
    </div>
  );
}

export default function Mobile() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? cardData.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === cardData.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <section className="bg-white px-4 py-10 xl:hidden">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Image
            className="rotate-2"
            src="/sticky-arrow.png"
            alt="arrow pointing to text"
            height={20}
            width={100}
          />
          <div className="flex flex-col gap-6">
            <h2 className="font-akira text-2xl font-bold">What&apos;s Happening This Year?</h2>
            <div className="flex gap-6">
              <button
                onClick={goToPrevious}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-100 bg-white shadow-sm"
                aria-label="Previous card"
              >
                <svg
                  className="h-5 w-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={goToNext}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-100 bg-white shadow-sm"
                aria-label="Next card"
              >
                <svg
                  className="h-5 w-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (320 + 24)}px)`,
            }}
          >
            {cardData.map((card, index) => (
              <div key={index} className="mr-6 last:mr-0">
                <TiltedCard
                  title={card.title}
                  text={card.text}
                  icon={card.icon}
                  backgroundColor={card.backgroundColor}
                  tilt={card.tilt}
                  isCenter={index === currentIndex}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
