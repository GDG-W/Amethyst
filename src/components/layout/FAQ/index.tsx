"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

export default function Index() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const topicsRef = useRef(null);
  const questionsRef = useRef(null);

  const isSectionInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const isHeadingInView = useInView(headingRef, { once: true, margin: "-100px" });
  const areTopicsInView = useInView(topicsRef, { once: true, margin: "-100px" });
  const areQuestionsInView = useInView(questionsRef, { once: true, margin: "-100px" });

  const topics = ["Ticketing & Access", "Claiming Tickets", "Upgrading Tickets"];

  const faqData = {
    "Ticketing & Access": [
      {
        id: 1,
        question: "Can I buy tickets for the event through this platform?",
        answer:
          "Yes! This platform allows you to securely purchase tickets for the one-day or two-day event option.",
      },
      {
        id: 2,
        question: "Is lunch or swag included in my ticket?",
        answer:
          "No — meals and merchandise are not included by default. However, some vendor stalls and sponsors may offer giveaways during the event.",
      },
      {
        id: 3,
        question: "What if I register and can't attend anymore?",
        answer:
          "Tickets are non-refundable for DevFest Lagos 2025 and not transferable. Each ticket is tied to a specific attendee and cannot be transferred to another person.",
      },
      {
        id: 4,
        question: "How do I pay for my ticket?",
        answer:
          "We have a number of payment options for your convenience — card payment, bank transfer, and USSD.",
      },
      {
        id: 5,
        question: "Can I buy tickets for other people?",
        answer:
          "Absolutely! You can purchase tickets for others, but they will need to register for the event separately to claim their tickets.",
      },
      {
        id: 6,
        question: "What information do I need to provide when buying tickets for others?",
        answer:
          "You will need to provide the email address for each person you are purchasing tickets for.",
      },
      {
        id: 7,
        question: "Will the people I buy tickets for receive a confirmation email?",
        answer:
          "No, they will not receive a confirmation email with tickets attached. They will receive an email prompting them to register for the event, and upon successful registration, they will be able to claim their tickets.",
      },
      {
        id: 8,
        question: "I want to purchase tickets for more than 10 people. What should I do?",
        answer:
          "For bulk ticket purchases (more than 10), please email us at team@gdglagos.com and we'll help process your order.",
      },
      {
        id: 9,
        question: "What does a ticket grant me access to?",
        answer:
          "All ticket categories provide full access to all talks, workshops, sponsor booths, and product showcases on the days they cover.",
      },
    ],
    "Claiming Tickets": [
      {
        id: 10,
        question: "I purchased a ticket for someone else. How do they claim their ticket?",
        answer:
          "The person you purchased a ticket for will receive an email prompting them to register for the event. After successful registration, they will receive a confirmation email and be able to claim their ticket through the platform.",
      },
      {
        id: 11,
        question: "I haven't received an email to claim my ticket. What should I do?",
        answer:
          "First, check your spam folder. If you still can't find the email, contact DevFest Lagos directly at team@gdglagos.com.",
      },
      {
        id: 12,
        question: "Can I claim my ticket before registering for the event?",
        answer:
          "Unfortunately, no. Tickets can only be claimed after successful event registration.",
      },
    ],
    "Upgrading Tickets": [
      {
        id: 13,
        question:
          "I purchased a ticket for a day or more, but now I want to attend other days. Can I upgrade my ticket?",
        answer:
          "Yes, you can upgrade your ticket by purchasing additional days to add to your current ticket. This way, you'll be able to attend on more days.",
      },
      {
        id: 14,
        question: "How do I upgrade my ticket?",
        answer:
          "Simply log in to your DevFest Lagos dashboard and navigate to the ticket details section. Then, follow the on-screen instructions to complete the upgrade process.",
      },
      {
        id: 15,
        question: "Will I receive a new ticket ID after upgrading?",
        answer: "No, your ticket ID remains the same after upgrading your ticket.",
      },
    ],
  };

  const [activeTopicIndex, setActiveTopicIndex] = useState(0);
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);

  const handleTopicClick = (index: number) => {
    setActiveTopicIndex(index);
    setExpandedQuestion(null);
  };

  const toggleQuestion = (questionId: number) => {
    setExpandedQuestion((prev) => (prev === questionId ? null : questionId));
  };

  const currentTopic = topics[activeTopicIndex];
  const currentQuestions = faqData[currentTopic as keyof typeof faqData] || [];

  // Animation variants
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

  const slideInFromLeft = {
    hidden: {
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: [0.25, 0.25, 0, 1] },
    },
  };

  const slideInFromRight = {
    hidden: {
      opacity: 0,
      x: 60,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.25, 0.25, 0, 1],
        delay: 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0, 1],
      },
    },
  };

  const topicVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.25, 0, 1],
      },
    }),
  };

  const questionVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.25, 0.25, 0, 1],
      },
    }),
  };

  const accordionVariants = {
    closed: {
      height: 0,
      opacity: 0,
      marginTop: 0,
    },
    open: {
      height: "auto",
      opacity: 1,
      marginTop: 8,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.25, 0, 1],
      },
    },
  };

  const buttonRotateVariants = {
    closed: { rotate: 0 },
    open: {
      rotate: 45,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.25, 0, 1],
      },
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      className="flex w-full justify-center bg-[#FFFAEB]"
      variants={containerVariants}
      initial="hidden"
      animate={isSectionInView ? "visible" : "hidden"}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col justify-center gap-[3.875rem] px-5 py-10 md:flex-row lg:gap-[5.75rem] lg:px-8 lg:py-20">
        <motion.div
          ref={headingRef}
          className="flex flex-col gap-6 lg:ml-20 lg:max-w-sm lg:gap-[2.5rem]"
          variants={slideInFromLeft}
          initial="hidden"
          animate={isHeadingInView ? "visible" : "hidden"}
        >
          <motion.div className="flex flex-col gap-3" variants={containerVariants}>
            <motion.p className="label-3 text-[#5C5C5C]" variants={titleVariants}>
              FAQs
            </motion.p>
            <motion.p
              className="font-akira text-xl text-black lg:w-1/3 lg:text-4xl"
              variants={titleVariants}
            >
              Your questions answered
            </motion.p>
          </motion.div>

          <motion.div
            ref={topicsRef}
            className="flex flex-col gap-[.875rem]"
            variants={containerVariants}
            initial="hidden"
            animate={areTopicsInView ? "visible" : "hidden"}
          >
            <motion.span className="text-sub-600 text-sm" variants={titleVariants}>
              FILTER BY TOPIC
            </motion.span>
            <div className="flex flex-col gap-1">
              <ul className="flex gap-2 overflow-x-auto md:flex-col">
                {topics.map((topic, index) => (
                  <motion.li
                    key={index}
                    custom={index}
                    variants={topicVariants}
                    initial="hidden"
                    animate={areTopicsInView ? "visible" : "hidden"}
                  >
                    <motion.button
                      aria-label="button"
                      onClick={() => handleTopicClick(index)}
                      className={`text-left transition-all duration-300 ${
                        index === activeTopicIndex
                          ? "label-4 md:label-3 rounded-lg border border-gray-300 bg-white px-3 py-2 whitespace-nowrap text-black shadow-sm"
                          : "label-4 md:label-3 text-sub-600 flex items-center justify-center px-3 py-2 text-center whitespace-nowrap hover:rounded-lg hover:bg-white/50"
                      }`}
                      whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {topic}
                    </motion.button>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex h-[26.8125rem] w-full flex-col gap-5"
          // variants={slideInFromRight}
          initial="hidden"
          animate={isSectionInView ? "visible" : "hidden"}
        >
          <AnimatePresence mode="wait">
            <motion.h2
              key={currentTopic}
              className="font-akira text-xl text-black uppercase lg:text-[1.75rem]"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
            >
              {currentTopic === "Ticketing & Access" ? "General Questions" : currentTopic}
            </motion.h2>
          </AnimatePresence>

          <motion.div
            ref={questionsRef}
            className="custom-scrollbar flex w-full flex-col gap-6 overflow-y-auto pr-2 xl:pr-16"
            variants={containerVariants}
            initial="hidden"
            animate={areQuestionsInView ? "visible" : "hidden"}
          >
            <AnimatePresence mode="wait">
              {currentQuestions.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="relative"
                  custom={index}
                  variants={questionVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  layout
                >
                  <motion.svg
                    className="absolute right-5 -bottom-4"
                    width="42"
                    height="37"
                    viewBox="0 0 42 37"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path
                      d="M24.4641 34.5C22.9245 37.1667 19.0755 37.1667 17.5359 34.5L1.08141 6C-0.458187 3.33333 1.46632 0 4.54552 0L37.4545 0C40.5337 0 42.4582 3.33333 40.9186 6L24.4641 34.5Z"
                      fill="#FFE7A5"
                    />
                  </motion.svg>

                  <motion.div
                    className="relative z-10 w-full cursor-pointer rounded-2xl bg-[#FDE293] px-5 py-2 pr-7 transition-all duration-200 xl:w-[706px]"
                    onClick={() => toggleQuestion(item.id)}
                    whileTap={{ scale: 0.99 }}
                    layout
                  >
                    <div className="flex w-full items-center justify-between">
                      <span className="label-3 md:label-4 pr-4 font-semibold text-[#141414]">
                        {item.question}
                      </span>
                      <motion.button
                        className="flex h-[2rem] w-[2rem] flex-shrink-0 items-center justify-center rounded-[.5rem] bg-white text-lg font-bold text-gray-600 shadow-sm transition-all duration-200 hover:text-gray-800 hover:shadow-md"
                        aria-label={
                          expandedQuestion === item.id ? "Collapse answer" : "Expand answer"
                        }
                        variants={buttonRotateVariants}
                        animate={expandedQuestion === item.id ? "open" : "closed"}
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: "#f8f9fa",
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        +
                      </motion.button>
                    </div>

                    <AnimatePresence>
                      {expandedQuestion === item.id && (
                        <motion.div
                          variants={accordionVariants}
                          initial="closed"
                          animate="open"
                          exit="closed"
                          style={{ overflow: "hidden" }}
                        >
                          <motion.p
                            className="label-4 leading-relaxed text-[#4D4D4D]"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ delay: 0.1, duration: 0.3 }}
                          >
                            {item.answer}
                          </motion.p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
