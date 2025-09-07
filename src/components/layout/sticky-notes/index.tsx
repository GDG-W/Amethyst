"use client";

import { motion, useInView } from "framer-motion";

import Image from "next/image";

import { useRef } from "react";

import TiltedCard from "./tilted-card";

interface CardData {
  title: string;
  text: string;
  icon: string;
  backgroundColor: string;
  tilt: string;
  marginTop?: string;
}

interface DraggableWrapperProps {
  children: React.ReactNode;
}

interface AnimatedTiltedCardProps {
  card: CardData;
  index: number;
  inView: boolean;
}

interface AnimatedTiltedCardsGridProps {
  cards: CardData[];
  inView: boolean;
}

export default function StickyNote() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const topCardsRef = useRef(null);
  const gridRef = useRef(null);

  const isTitleInView = useInView(titleRef, { once: true, margin: "-100px" });
  const areTopCardsInView = useInView(topCardsRef, { once: true, margin: "-100px" });
  const isGridInView = useInView(gridRef, { once: true, margin: "-100px" });

  const cardData: CardData[] = [
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

  // Variants with proper TypeScript types
  const titleVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.25, 0.25, 0, 1] as const },
    },
  };

  const arrowVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 2,
      transition: { duration: 0.6, ease: [0.25, 0.25, 0, 1] as const, delay: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: (delay: number = 0) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, delay, ease: [0.25, 0.25, 0, 1] as const },
    }),
  };

  // Draggable wrapper with proper types
  const DraggableWrapper: React.FC<DraggableWrapperProps> = ({ children }) => (
    <motion.div
      drag
      dragConstraints={{ left: -80, right: 80, top: -80, bottom: 80 }}
      dragElastic={0.1}
      dragTransition={{ bounceStiffness: 400, bounceDamping: 25 }}
      whileHover={{ scale: 1.03, rotate: (Math.random() - 0.5) * 4, transition: { duration: 0.2 } }}
      whileDrag={{ scale: 1.08, rotate: (Math.random() - 0.5) * 8, cursor: "grabbing", zIndex: 50 }}
      className="cursor-grab active:cursor-grabbing"
      style={{ willChange: "transform" }}
    >
      {children}
    </motion.div>
  );

  // Single Card with proper types
  const AnimatedTiltedCard: React.FC<AnimatedTiltedCardProps> = ({ card, index, inView }) => (
    <DraggableWrapper>
      <motion.div
        variants={cardVariants}
        custom={index * 0.1}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <TiltedCard {...card} animationDelay={index * 150} />
      </motion.div>
    </DraggableWrapper>
  );

  // Grid with proper types
  const AnimatedTiltedCardsGrid: React.FC<AnimatedTiltedCardsGridProps> = ({ cards, inView }) => (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 pt-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {cards.map((card, index) => (
        <DraggableWrapper key={index}>
          <motion.div
            variants={cardVariants}
            custom={(index + 2) * 0.08}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <div style={{ marginTop: card.marginTop || "0" }}>
              <TiltedCard {...card} animationDelay={(index + 2) * 150} />
            </div>
          </motion.div>
        </DraggableWrapper>
      ))}
    </div>
  );

  return (
    <section ref={sectionRef} className="hidden w-full overflow-hidden bg-[#FFFFFF] xl:block">
      <div className="mx-auto flex max-w-7xl items-center overflow-hidden pt-20 pl-[5.725rem]">
        <div className="relative flex flex-col" ref={titleRef}>
          <motion.div
            variants={arrowVariants}
            initial="hidden"
            animate={isTitleInView ? "visible" : "hidden"}
            whileHover={{ scale: 1.1, rotate: 8, transition: { duration: 0.3 } }}
          >
            <Image
              className="scale-hover absolute -top-12 -left-15 rotate-2"
              src="/sticky-arrow.png"
              alt="arrow pointing to text"
              height={20}
              width={150}
            />
          </motion.div>

          <motion.h2
            variants={titleVariants}
            initial="hidden"
            animate={isTitleInView ? "visible" : "hidden"}
            className="font-akira relative max-w-lg text-5xl font-bold"
          >
            What&apos;s Happening This Year?
          </motion.h2>
        </div>

        <div className="relative flex gap-16" ref={topCardsRef}>
          {topCards.map((card, index) => (
            <AnimatedTiltedCard key={index} card={card} index={index} inView={areTopCardsInView} />
          ))}

          <motion.div
            initial="hidden"
            animate={areTopCardsInView ? "visible" : "hidden"}
            whileHover={{ scale: 1.1, rotate: 8, transition: { duration: 0.3 } }}
          >
            <Image
              className="scale-hover absolute top-6 right-0 rotate-2"
              src="/learn.svg"
              alt="arrow pointing to text"
              height={20}
              width={150}
            />
          </motion.div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl pb-20" ref={gridRef}>
        <AnimatedTiltedCardsGrid cards={remainingCards} inView={isGridInView} />
      </div>
    </section>
  );
}
