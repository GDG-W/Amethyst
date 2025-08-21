"use client";

import { useState } from "react";

export default function Index() {
  const topics = ["Ticketing & Access", "Claiming Tickets", "Upgrading Tickets"];
  const questions = [
    {
      id: 1,
      question: "1. What is DevFest?",
      answer: "DevFest is a community-led developer conference...",
    },
    {
      id: 2,
      question: "2. How do I register for the event?",
      answer: "You can register through our official website...",
    },
    {
      id: 3,
      question: "3. What should I bring to the conference?",
      answer: "Please bring your laptop, charger, and ID...",
    },
    {
      id: 4,
      question: "4. Is there parking available?",
      answer: "Yes, free parking is available at the venue...",
    },
    {
      id: 5,
      question: "5. What time does the event start?",
      answer: "The event starts at 9:00 AM with registration...",
    },
  ];
  const [activeTopicIndex, setActiveTopicIndex] = useState(0);
  const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(new Set());

  const handleTopicClick = (index: number) => {
    setActiveTopicIndex(index);
  };

  const toggleQuestion = (questionId: number) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(questionId)) {
      newExpanded.delete(questionId);
    } else {
      newExpanded.add(questionId);
    }
    setExpandedQuestions(newExpanded);
  };

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
        <div className="mx-auto flex w-full max-w-7xl flex-col justify-center gap-[5.75rem] px-8 py-20 lg:flex-row">
          <div className="ml-20 flex max-w-sm flex-col gap-[2.5rem]">
            <div className="flex flex-col gap-3">
              <p className="label-3 text-[#5C5C5C]">FAQs</p>
              <p className="font-akira w-1/3 text-4xl text-black">Your questions answered</p>
            </div>
            <div className="flex flex-col gap-[.875rem]">
              <span className="text-sm">FILTER BY TOPIC</span>
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
                            : "label-4 md:label-3 flex items-center justify-center px-3 py-2 text-center whitespace-nowrap text-black hover:text-gray-600"
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
          <div className="flex h-[26.8125rem] w-full flex-col gap-5">
            <h2 className="font-akira text-[1.75rem] text-black uppercase">General Questions</h2>
            <div className="custom-scrollbar flex w-full flex-col gap-4 overflow-y-auto pr-16">
              {questions.map((item) => (
                <div key={item.id} className="group">
                  <div
                    className="w-[706px] cursor-pointer rounded-xl bg-[#FDE293] p-5 transition-all duration-200"
                    style={{
                      clipPath:
                        "polygon( 98.3% 0%,98.3% 0%,98.576% 0.196%,98.838% 0.765%,99.081% 1.674%,99.304% 2.894%,99.502% 4.393%,99.672% 6.141%,99.81% 8.107%,99.913% 10.259%,99.978% 12.567%,100% 15%,100% 64%,100% 64%,99.978% 66.433%,99.913% 68.741%,99.81% 70.894%,99.672% 72.859%,99.502% 74.607%,99.304% 76.106%,99.081% 77.326%,98.838% 78.236%,98.576% 78.804%,98.3% 79%,96.863% 79%,95.358% 97.177%,95.358% 97.177%,95.284% 97.914%,95.198% 98.488%,95.104% 98.898%,95.004% 99.144%,94.901% 99.226%,94.798% 99.144%,94.698% 98.898%,94.604% 98.488%,94.518% 97.914%,94.443% 97.177%,92.938% 79%,1.7% 79%,1.7% 79%,1.424% 78.804%,1.162% 78.236%,0.919% 77.326%,0.696% 76.106%,0.498% 74.607%,0.328% 72.859%,0.19% 70.894%,0.087% 68.741%,0.022% 66.433%,0% 64%,0% 15%,0% 15%,0.022% 12.567%,0.087% 10.259%,0.19% 8.107%,0.328% 6.141%,0.498% 4.393%,0.696% 2.894%,0.919% 1.674%,1.162% 0.765%,1.424% 0.196%,1.7% 0%,98.3% 0% )",
                    }}
                    onClick={() => toggleQuestion(item.id)}
                  >
                    <div className="flex items-center justify-between pb-3">
                      <span className="pr-4 font-semibold text-gray-800">{item.question}</span>
                      <button
                        className="flex h-[2rem] w-[2rem] flex-shrink-0 items-center justify-center rounded-[.5rem] bg-white text-lg font-bold text-gray-600 shadow-sm transition-all duration-200 group-hover:text-gray-800 hover:shadow-md"
                        aria-label={
                          expandedQuestions.has(item.id) ? "Collapse answer" : "Expand answer"
                        }
                      >
                        {expandedQuestions.has(item.id) ? "−" : "+"}
                      </button>
                    </div>

                    {expandedQuestions.has(item.id) && (
                      <div className="pb-8">
                        <p className="leading-relaxed text-gray-700">{item.answer}</p>
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
