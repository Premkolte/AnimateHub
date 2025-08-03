import React, { useState } from 'react';

const Item = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-300 dark:border-gray-600">
      <button
        type="button"
        aria-label="Open item"
        title="Open item"
        className="flex items-center justify-between w-full p-4 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="text-lg font-medium text-black dark:text-white">{title}</p>
        <svg
          viewBox="0 0 24 24"
          className={`w-3 transform transition-transform duration-200 text-black dark:text-white ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          <polyline
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeMiterlimit="10"
            points="2,7 12,17 22,7"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="p-4 pt-0">
          <p className="text-black dark:text-white">{children}</p>
        </div>
      )}
    </div>
  );
};

const FAQ = () => {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 text-black dark:text-white">
      <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
          <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight sm:text-4xl md:mx-auto text-black dark:text-white">
            <span className="relative inline-block">
              <svg
                viewBox="0 0 52 24"
                fill="currentColor"
                className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block text-black dark:text-white"
              >
                <defs>
                  <pattern
                    id="faq-pattern"
                    x="0"
                    y="0"
                    width=".135"
                    height=".30"
                  >
                    <circle cx="1" cy="1" r=".7" />
                  </pattern>
                </defs>
                <rect fill="url(#faq-pattern)" width="52" height="24" />
              </svg>
              <span className="relative">Frequently Asked Questions❔</span>
            </span>
          </h2>
          <p className="text-base md:text-lg text-black dark:text-white">
            Here are some of the most frequently asked questions. If you have a
            question that is not answered here, please feel free to reach out to us.
          </p>
        </div>
        <div className="space-y-4">
          <Item title="What is AnimateHub ?">
            Animate Hub is your go-to resource for all things animation in web development. Discover a wide range of code snippets for animations, hovers, and effects, designed to streamline your workflow. Just copy, paste, and watch your projects come to life!
          </Item>
          <Item title="Is this Project Open Source?">
            Yes! This project is completely open-source...
          </Item>
          <Item title="How can I contribute?">
            All the steps for contributing to this project are mentioned in the README file of the project. You can check it out <a className="text-blue-600 dark:text-blue-400 underline" href="https://github.com/Premkolte/AnimateHub">here</a>.
          </Item>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
