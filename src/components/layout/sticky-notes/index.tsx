"use client";

import Image from "next/image";

import TiltedCard from "./tilted-card";
import TiltedCardsGrid from "./card-grid";

export default function stickyNote() {
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
      tilt: "-rotate-[10.8deg]",
    },
    {
      title: "Ultimate Masterclasses",
      text: "Deep dives into emerging topics and career growth",
      icon: "/shopping-bag-3.svg",
      backgroundColor: "bg-[#F7F7F7]",
      tilt: "rotate-[3.83deg]",
      marginTop: "-1rem",
    },
    {
      title: "The Future of Technology",
      text: "Explore AI, Cloud, DevTools, and what's next",
      icon: "/shopping-bag-4.svg",
      backgroundColor: "bg-[#CCF6C5]",
      tilt: "rotate-[22.51deg]",
      marginTop: "1rem",
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
      marginTop: "4rem",
    },
    {
      title: "Office Hours",
      text: "Get direct feedback from Googlers, GDEs, and mentors",
      icon: "/building-line.svg",
      backgroundColor: "bg-[#F7F7F7]",
      tilt: "-rotate-[10.3deg]",
    },
    {
      title: "After Party Celebration",
      text: "Close out DevFest with music, vibes, and community energy",
      icon: "/emotion-happy-line.svg",
      backgroundColor: "bg-[#FFE7A5]",
      tilt: "rotate-[6.9deg]",
      marginTop: "2rem",
    },
  ];

  const topCards = cardData.slice(0, 2);
  const remainingCards = cardData.slice(2);

  return (
    <section className="hidden w-full bg-[#FFFFFF] xl:block">
      <div className="mx-auto flex max-w-7xl items-center pt-20 pl-[5.725rem]">
        <div className="relative flex flex-col">
          <Image
            className="absolute -top-12 -left-15 rotate-2"
            src="/sticky-arrow.png"
            alt="arrow pointing to text"
            height={20}
            width={150}
          />
          <h2 className="font-akira relative max-w-lg text-5xl font-bold">
            What&apos;s Happening This Year?
          </h2>
        </div>

        <div className="flex gap-16">
          {topCards.map((card, index) => (
            <TiltedCard
              key={index}
              title={card.title}
              text={card.text}
              icon={card.icon}
              backgroundColor={card.backgroundColor}
              tilt={card.tilt}
              marginTop={card.marginTop}
              animationDelay={index * 150}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl pb-20">
        <TiltedCardsGrid cards={remainingCards} />
      </div>
    </section>
  );
}
