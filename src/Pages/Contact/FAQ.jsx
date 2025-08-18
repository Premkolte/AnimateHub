import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

// FAQ Component
const FAQ = () => {
  // State to track which FAQ items are open
  const [openItems, setOpenItems] = useState(new Set());

  // Function to toggle an FAQ item open/closed
  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  // FAQ data array
  const faqData = [
    {
      question: "What is AnimateHub ?",
      answer:
        "Animate Hub is your go-to resource for all things animation in web development. Discover a wide range of code snippets for animations, hovers, and effects, designed to streamline your workflow. Just copy, paste, and watch your projects come to life!",
    },
    {
      question: "Is this Project Open Source?",
      answer: " Yes! This project is completely open-source...",
    },
    {
      question: "How can I contribute?",
      answer: ` All the steps for contributing to this project are mentioned in the README file of the project. You can check it out <a className="text-blue-600 dark:text-blue-400 underline" href="https://github.com/Premkolte/AnimateHub"><b>here</b></a>.`,
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* FAQ Header Section */}
      <div className="text-center mb-12">
        <h2
          className="text-3xl md:text-4xl font-bold mb-4 
                   bg-black dark:bg-gradient-to-r dark:from-blue-600 dark:via-purple-600 dark:to-indigo-600 
                   bg-clip-text text-transparent"
        >
          Frequently Asked Questions
        </h2>

        {/* Subheading */}
        <p className="text-gray-600 dark:text-gray-600 text-lg">
          Find answers to common questions about our services
        </p>
      </div>

      {/* FAQ Items List */}
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="group bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-pink-400 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 motion-reduce:transition-none"
          >
            {/* FAQ Question Button */}
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-8 py-6 text-left flex items-center justify-between focus:outline-none focus:ring-4 focus:ring-blue-500/20 rounded-2xl transition-all duration-300 motion-reduce:transition-none hover:bg-white/80 dark:hover:bg-gray-800/80"
            >
              <span className="font-semibold text-gray-900 dark:text-white text-lg pr-4">
                {item.question}
              </span>

              {/* Icon */}


              <div className="flex-shrink-0 p-2 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#accefbff] dark:from-purple-600 dark:to-blue-6000 text-white transition-transform duration-300 motion-reduce:transition-none group-hover:scale-110 motion-reduce:group-hover:transform-none">

                {openItems.has(index) ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </div>
            </button>

            {/* FAQ Answer */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out motion-reduce:transition-none ${
                openItems.has(index)
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-8 pb-6">
                {/* Divider Line */}
                <div className="h-px bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-indigo-500/20 mb-4"></div>

                {/* Answer Text */}
                <p
                  className="text-gray-700 dark:text-gray-300 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: item.answer }}
                ></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;