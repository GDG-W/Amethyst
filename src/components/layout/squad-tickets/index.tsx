"use client";

import { motion, useInView } from "framer-motion";

import { useRef } from "react";

import TicketCard from "./ticket-card";

const ticketTypes = [
  {
    title: "STANDARD TICKET",
    price: "7,000 per day",
    href: "/buy#standard",
    description: "Open to everyone — whether you're just starting out or deep in the industry",
    features: [
      "Access to all talks and sessions",
      "Available throughout the five days",
      "Access to sponsor booths",
      "Entry to the networking area",
    ],
    variant: "standard" as const,
  },
  {
    title: "PRO TICKET",
    price: "70,000 FOR THURSDAY",
    href: "/buy#pro",
    description:
      "For those who want more access and a more focused, premium experience — all in one day",
    features: [
      "Exclusive access to product demos",
      "Access to masterclasses and technical workshops",
      "Invitation to the Executive Roundtable",
      "Special swags and merch",
    ],
    variant: "pro" as const,
  },
];

export default function Index() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const ticketsRef = useRef(null);

  const isSectionInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const isHeadingInView = useInView(headingRef, { once: true, margin: "-100px" });
  const areTicketsInView = useInView(ticketsRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.3,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0, 1] as const,
      },
    },
  };

  const subtitleVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      filter: "blur(2px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        delay: 0.4,
        ease: [0.25, 0.25, 0, 1] as const,
      },
    },
  };

  const ticketContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5,
      },
    },
  };

  const ticketVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.98,
    },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.25, 0, 1] as const,
      },
    }),
  };

  const floatingVariants = {
    animate: {
      y: [-2, 2, -2],
      transition: {
        duration: 6,
        ease: [0.25, 0.25, 0, 1] as const,
        repeat: Infinity,
      },
    },
  };

  const AnimatedTicketCard = ({
    ticket,
    index,
    inView,
  }: {
    ticket: (typeof ticketTypes)[0];
    index: number;
    inView: boolean;
  }) => {
    if (!inView) {
      return (
        <TicketCard
          title={ticket.title}
          price={ticket.price}
          description={ticket.description}
          features={ticket.features}
          variant={ticket.variant}
          href={ticket.href}
        />
      );
    }

    return (
      <motion.div
        custom={index}
        variants={ticketVariants}
        initial="hidden"
        animate="visible"
        className="transform-gpu"
      >
        <motion.div variants={floatingVariants} animate="animate">
          <TicketCard
            title={ticket.title}
            price={ticket.price}
            description={ticket.description}
            features={ticket.features}
            variant={ticket.variant}
            href={ticket.href}
          />
        </motion.div>
      </motion.div>
    );
  };

  return (
    <motion.section
      ref={sectionRef}
      aria-label="Ticket Section"
      className="flex w-full flex-col items-center justify-center overflow-hidden bg-[#1E1E1E]"
      variants={containerVariants}
      initial="hidden"
      animate={isSectionInView ? "visible" : "hidden"}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-[3.0625rem] overflow-hidden py-20">
        <motion.div
          ref={headingRef}
          className="flex flex-col items-center justify-center gap-[.65rem]"
          variants={containerVariants}
        >
          <motion.h1
            variants={titleVariants}
            initial="hidden"
            animate={isHeadingInView ? "visible" : "hidden"}
            className="font-akira heading-5 md:heading-1 w-5/6 max-w-5xl text-center leading-[2rem] text-white md:w-full md:leading-[4rem]"
          >
            {["BUY", "TICKETS", "FOR", "YOU", "AND", "YOUR", "SQUAD"].map((word, index) => (
              <motion.span
                key={index}
                variants={wordVariants}
                className="mr-3 inline-block"
                style={{
                  display: "inline-block",
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            variants={subtitleVariants}
            initial="hidden"
            animate={isHeadingInView ? "visible" : "hidden"}
            className="label-4 md:label-3 w-5/6 max-w-2xl text-center text-[#CCCCCC]"
          >
            DevFest hits different when you roll with your crew. Grab your Standard or Pro tickets,
            pick your day, and pull up with your friends
          </motion.p>
        </motion.div>

        <motion.div
          ref={ticketsRef}
          className="flex h-full w-full flex-wrap justify-center gap-8 overflow-hidden px-5"
          variants={ticketContainerVariants}
          initial="hidden"
          animate={areTicketsInView ? "visible" : "hidden"}
        >
          {ticketTypes.map((ticket, index) => (
            <AnimatedTicketCard
              key={index}
              ticket={ticket}
              index={index}
              inView={areTicketsInView}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
