"use client";

import { useState } from "react";

export default function Index() {
  const topics = ["Ticketing & Access", "Claiming Tickets", "Upgrading Tickets"];

  const faqData = {
    "Ticketing & Access": [
      {
        id: 1,
        question: "1. What is DevFest?",
        answer:
          "DevFest is a community-led developer conference hosted by Google Developer Groups around the world. It's a day-long event featuring technical talks, workshops, and networking opportunities for developers of all skill levels.",
      },
      {
        id: 2,
        question: "2. How do I register for the event?",
        answer:
          "You can register through our official website by clicking the registration link. Fill out the required information and complete payment to secure your spot at the conference.",
      },
      {
        id: 3,
        question: "3. What should I bring to the conference?",
        answer:
          "Please bring your laptop, charger, and ID for registration. We also recommend bringing business cards for networking and a notebook for taking notes during sessions.",
      },
      {
        id: 4,
        question: "4. Is there parking available?",
        answer:
          "Yes, free parking is available at the venue for all attendees. Additional parking can be found in nearby public areas if the main lot fills up.",
      },
      {
        id: 5,
        question: "5. What time does the event start?",
        answer:
          "The event starts at 9:00 AM with registration and welcome coffee. The first technical session begins at 9:30 AM sharp.",
      },
    ],
    "Claiming Tickets": [
      {
        id: 6,
        question: "1. How do I claim my ticket after purchase?",
        answer:
          "After successful payment, you'll receive a confirmation email with your ticket details and QR code within 24 hours of registration.",
      },
      {
        id: 7,
        question: "2. What if I didn't receive my confirmation email?",
        answer:
          "Check your spam folder first. If you still can't find it, contact our support team with your registration details and we'll resend it immediately.",
      },
      {
        id: 8,
        question: "3. Can I transfer my ticket to someone else?",
        answer:
          "Yes, tickets can be transferred up to 48 hours before the event. Contact support with both the original and new attendee details to process the transfer.",
      },
      {
        id: 9,
        question: "4. Do I need to print my ticket?",
        answer:
          "No, digital tickets on your smartphone work perfectly. Just ensure your phone is charged and the QR code is clearly visible for scanning.",
      },
      {
        id: 10,
        question: "5. What happens if I lose my ticket?",
        answer:
          "Don't worry! Bring a valid ID to the registration desk and we can look up your registration in our system to issue a replacement badge.",
      },
    ],
    "Upgrading Tickets": [
      {
        id: 11,
        question: "1. Can I upgrade my standard ticket?",
        answer:
          "Yes, you can upgrade to VIP through your registration portal up to 3 days before the event, subject to availability.",
      },
      {
        id: 12,
        question: "2. What are the VIP ticket benefits?",
        answer:
          "VIP tickets include priority seating, exclusive networking lunch, premium swag bag, and access to speaker meet-and-greet sessions.",
      },
      {
        id: 13,
        question: "3. Is there a deadline for upgrades?",
        answer:
          "Yes, all ticket upgrades must be completed at least 72 hours before the event to ensure proper arrangements are made.",
      },
      {
        id: 14,
        question: "4. How much does an upgrade cost?",
        answer:
          "Upgrade costs vary depending on your current ticket type. Standard to VIP upgrades are typically $50 plus a small processing fee.",
      },
      {
        id: 15,
        question: "5. Can I get a refund after upgrading?",
        answer:
          "Upgrade fees are non-refundable, but you can transfer your upgraded ticket to another person following our standard transfer policy.",
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
    if (expandedQuestion === questionId) {
      setExpandedQuestion(null);
    } else {
      setExpandedQuestion(questionId);
    }
  };

  const currentTopic = topics[activeTopicIndex];
  const currentQuestions = faqData[currentTopic as keyof typeof faqData] || [];

  return (
    <>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #f9ab00;
          border-radius: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #e09900;
        }
      `}</style>

      <section className="flex w-full justify-center bg-[#FFFAEB]">
        <div className="mx-auto flex w-full max-w-7xl flex-col justify-center gap-[3.875rem] px-5 py-10 md:flex-row lg:gap-[5.75rem] lg:px-8 lg:py-20">
          <div className="flex flex-col gap-6 lg:ml-20 lg:max-w-sm lg:gap-[2.5rem]">
            <div className="flex flex-col gap-3">
              <p className="label-3 text-[#5C5C5C]">FAQs</p>
              <p className="font-akira text-xl text-black lg:w-1/3 lg:text-4xl">
                Your questions answered
              </p>
            </div>
            <div className="flex flex-col gap-[.875rem]">
              <span className="text-sub-600 text-sm">FILTER BY TOPIC</span>
              <div className="flex flex-col gap-1">
                <ul className="flex gap-2 overflow-x-auto md:flex-col">
                  {topics.map((topic, index) => (
                    <li key={index}>
                      <button
                        aria-label="button"
                        onClick={() => handleTopicClick(index)}
                        className={`text-left transition-colors ${
                          index === activeTopicIndex
                            ? "label-4 md:label-3 rounded-lg border border-gray-300 bg-white px-3 py-2 whitespace-nowrap text-black"
                            : "label-4 md:label-3 text-sub-600 flex items-center justify-center px-3 py-2 text-center whitespace-nowrap"
                        }`}
                      >
                        {topic}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col gap-5 md:h-[26.8125rem]">
            <h2 className="font-akira text-xl text-black uppercase lg:text-[1.75rem]">
              General Questions
            </h2>
            <div className="custom-scrollbar flex w-full flex-col gap-4 overflow-y-auto lg:pr-16">
              {currentQuestions.map((item) => (
                <div key={item.id} className="group">
                  <div
                    className="w-full cursor-pointer rounded-xl bg-[#FDE293] p-5 transition-all duration-200 lg:w-[706px]"
                    style={{
                      clipPath:
                        "polygon( 98.3% 0%,98.3% 0%,98.576% 0.196%,98.838% 0.765%,99.081% 1.674%,99.304% 2.894%,99.502% 4.393%,99.672% 6.141%,99.81% 8.107%,99.913% 10.259%,99.978% 12.567%,100% 15%,100% 64%,100% 64%,99.978% 66.433%,99.913% 68.741%,99.81% 70.894%,99.672% 72.859%,99.502% 74.607%,99.304% 76.106%,99.081% 77.326%,98.838% 78.236%,98.576% 78.804%,98.3% 79%,96.863% 79%,95.358% 97.177%,95.358% 97.177%,95.284% 97.914%,95.198% 98.488%,95.104% 98.898%,95.004% 99.144%,94.901% 99.226%,94.798% 99.144%,94.698% 98.898%,94.604% 98.488%,94.518% 97.914%,94.443% 97.177%,92.938% 79%,1.7% 79%,1.7% 79%,1.424% 78.804%,1.162% 78.236%,0.919% 77.326%,0.696% 76.106%,0.498% 74.607%,0.328% 72.859%,0.19% 70.894%,0.087% 68.741%,0.022% 66.433%,0% 64%,0% 15%,0% 15%,0.022% 12.567%,0.087% 10.259%,0.19% 8.107%,0.328% 6.141%,0.498% 4.393%,0.696% 2.894%,0.919% 1.674%,1.162% 0.765%,1.424% 0.196%,1.7% 0%,98.3% 0% )",
                    }}
                    onClick={() => toggleQuestion(item.id)}
                  >
                    <div className="flex w-full items-center justify-between pb-3">
                      <span className="label-3 md:label-4 pr-4 font-semibold text-[#141414]">
                        {item.question}
                      </span>
                      <button
                        className="flex h-[2rem] w-[2rem] flex-shrink-0 items-center justify-center rounded-[.5rem] bg-white text-lg font-bold text-gray-600 shadow-sm transition-all duration-200 group-hover:text-gray-800 hover:shadow-md"
                        aria-label={
                          expandedQuestion === item.id ? "Collapse answer" : "Expand answer"
                        }
                      >
                        {expandedQuestion === item.id ? "−" : "+"}
                      </button>
                    </div>

                    {expandedQuestion === item.id && (
                      <div className="pb-12">
                        <p className="label-4 leading-relaxed text-[#4D4D4D]">{item.answer}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
