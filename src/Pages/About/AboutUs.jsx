import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion"; // Import the useReducedMotion hook
import GitHubStats from "./GitHubStats";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Journey from "./Journey";
import {
  faTwitter,
  faFacebook,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import CoreTeam from "./CoreTeam";
import Insights from "./Insights";

const About = () => {
  const shouldReduceMotion = useReducedMotion(); // This hook returns true if the user prefers reduced motion

  const techUsed = [
    { icon: "⚛️", name: "React 18", desc: "Reusable UI & hooks" },
    { icon: "⚡", name: "Vite 5", desc: "Blazing fast dev server" },
    { icon: "🎨", name: "Tailwind CSS 3", desc: "Utility-first styling" },
    { icon: "🎭", name: "Framer Motion", desc: "Declarative animations" },
  ];
  const [code, setCode] = useState(
    `Type something excited!`
  );

  // Animation variants for Framer Motion
  const fadeInLeft = {
    initial: { x: -50, opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: shouldReduceMotion ? 0 : 0.8 }, // Disable animation if reduced motion is preferred
    },
  };

  const fadeInRight = {
    initial: { x: 50, opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: shouldReduceMotion ? 0 : 0.8 }, // Disable animation
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.6 }} // Disable animation
      className="min-h-screen w-full bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white"
    >
      <div className="max-w-7xl mx-auto px-6 py-20 space-y-32">
        {/* Hero Section - Full width split */}
        <section className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            className="flex-1 space-y-6"
            variants={fadeInLeft}
            initial="initial"
            animate="animate"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-500">
              About AnimateHub
            </h1>
            <p className="text-lg md:text-xl opacity-80 leading-relaxed">
              A powerful open-source animation UI library that simplifies
              creating beautiful, reusable animations for modern web
              applications.
            </p>
            <div className="inline-block px-6 py-2 text-sm font-semibold rounded-full bg-gradient-to-r from-primary-600 to-purple-600 text-white dark:from-accent-600 dark:to-purple-400 animate-pulse motion-reduce:animate-none shadow-lg">
              100% OPEN-SOURCE
            </div>
          </motion.div>
          <motion.div
            className="flex-1 relative w-full h-64 md:h-96 bg-gradient-to-r from-purple-200 to-indigo-200 dark:from-purple-700 dark:to-indigo-700 rounded-3xl shadow-xl overflow-auto flex flex-col p-4"
            variants={fadeInRight}
            initial="initial"
            animate="animate"
          >
            {/* Background shapes */}
            <div className="absolute top-4 left-4 w-24 h-24 bg-purple-300 dark:bg-purple-600 rounded-full blur-3xl opacity-40"></div>
            <div className="absolute bottom-6 right-6 w-32 h-32 bg-indigo-300 dark:bg-indigo-600 rounded-full blur-3xl opacity-30"></div>

            {/* Editable code area */}
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="relative text-sm p-4 rounded-xl bg-white dark:bg-secondary-800 text-black dark:text-white w-full h-full resize-none overflow-auto focus:outline-none"
              placeholder="Type anything here..."
            />

            {/* Display typed code safely */}
            <pre className="mt-2 p-2 bg-gray-100 dark:bg-gray-900 text-sm rounded overflow-auto">
              {code.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
            </pre>

            {/* Clear button */}
            <button
              onClick={() => setCode("")}
              className="mt-2 self-end px-4 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 transition motion-reduce:transition-none"
            >
              Clear
            </button>
          </motion.div>
        </section>
        <section className="flex w-full min-h-[300px] rounded-2xl shadow-xl overflow-hidden">
  {/* Left div */}
  <motion.div
    className="flex-1 bg-gradient-to-br from-purple-700 to-pink-600 dark:from-purple-900 dark:to-pink-800 text-white flex items-center justify-center p-8"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 200 }}
  >
    <h2 className="text-3xl font-extrabold tracking-wide">Mission</h2>
  </motion.div>

  {/* Right div */}
  <motion.div
    className="flex-[3] bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 flex items-center p-8"
    initial={{ opacity: 0, x: 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    <p className="text-lg leading-relaxed">
      Our mission is to empower developers and creators by providing
      <span className="font-semibold text-purple-600 dark:text-purple-400">
        {" "}
        ready-to-use HTML, CSS, JS, and React components
      </span>
      for stunning animations, making modern web design accessible, fun,
      and effortless.
    </p>
  </motion.div>
</section>

        <section className="flex w-full min-h-[300px] rounded-2xl shadow-xl overflow-hidden">
  {/* Left div */}
  <motion.div
    className="flex-[3] bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 flex items-center p-8"
    initial={{ opacity: 0, x: 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    <p className="text-lg leading-relaxed">
      Our vision is to create a community where developers and designers can
      <span className="font-semibold text-purple-600 dark:text-purple-400">
        {" "}
        innovate with ready-made animation components
      </span>
      , learn from each other, and bring their creative ideas to life with
      modern, effortless web design.
    </p>
  </motion.div>

  {/* Right div */}
  <motion.div
    className="flex-1 bg-gradient-to-br from-purple-700 to-pink-600 dark:from-purple-900 dark:to-pink-800 text-white flex items-center justify-center p-8"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 200 }}
  >
    <h2 className="text-3xl font-extrabold tracking-wide">Vision</h2>
  </motion.div>
</section>

        <Journey></Journey>

        <CoreTeam></CoreTeam>

        <Insights></Insights>

        {/* Why Choose Us & What We Offer - Staggered overlapping cards */}
        <section className="relative flex flex-col md:flex-row gap-12">
          <motion.div
            className="md:w-1/2 bg-gradient-to-br from-purple-50 to-white dark:from-secondary-800 dark:to-secondary-700 p-8 rounded-3xl shadow-xl border border-purple-200 dark:border-secondary-700 -mt-12 md:mt-0 z-10"
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }} // Disable hover animation
          >
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-4 text-purple-700 dark:text-purple-400">
              ✨ Why Choose Us?
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-2xl">✂️</span>
                <div>
                  <h3 className="font-semibold text-lg">Copy-Paste Simple</h3>
                  <p className="opacity-80 text-sm">
                    Instant integration, no complex setup
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">⚡</span>
                <div>
                  <h3 className="font-semibold text-lg">
                    Performance Optimized
                  </h3>
                  <p className="opacity-80 text-sm">Smooth 60fps animations</p>
                </div>
              </li>
            </ul>
          </motion.div>

          <motion.div
            className="md:w-1/2 bg-gradient-to-br from-indigo-50 to-white dark:from-secondary-800 dark:to-secondary-700 p-8 rounded-3xl shadow-xl border border-indigo-200 dark:border-secondary-700 translate-y-12 md:-translate-y-6 z-0"
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }} // Disable hover animation
          >
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-4 text-indigo-700 dark:text-indigo-400">
              🚀 What We Offer
            </h2>
            <ul className="space-y-3">
              {[
                { label: "50+ Animation Components", color: "bg-blue-500" },
                { label: "Live Preview & Code Copy", color: "bg-green-500" },
                { label: "Ready-to-use Templates", color: "bg-purple-500" },
                { label: "Dark/Light Mode Support", color: "bg-orange-500" },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span
                    className={`w-3 h-3 rounded-full ${item.color} flex-shrink-0`}
                  ></span>
                  <span className="text-lg">{item.label}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </section>

        {/* Tech Stack */}
        <section className="w-full bg-blue-100 rounded-full dark:bg-secondary-700 rounded-xl p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 flex items-center justify-center gap-3">
            🛠️ Built With Modern Tech
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {techUsed.map((tech) => (
              <div
                key={tech.name}
                className="bg-primary-50 dark:bg-secondary-800 text-secondary-900 dark:text-white border border-primary-200 dark:border-secondary-700 p-8 rounded-lg shadow-sm hover:shadow-sm dark:shadow-none hover:ring-1 hover:ring-primary-300 dark:hover:ring-accent-500 transform transition-transform duration-300 ease-in-out w-full text-center motion-reduce:transition-none motion-reduce:hover:transform-none"
              >
                <span className="text-4xl">{tech.icon}</span>
                <h3 className="mt-3 text-lg font-semibold text-blue-600 dark:text-blue-400">
                  {tech.name}
                </h3>
                <p className="text-sm opacity-80 mt-1">{tech.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Community & CTA - Alternating layout */}
        <section className="flex flex-col gap-8">
          {/* Join Community Card */}
          <motion.div className="p-8 rounded-3xl text-center bg-gradient-to-tr from-purple-50 to-white dark:from-secondary-800 dark:to-secondary-700 shadow-xl border border-purple-200 dark:border-secondary-700 w-full">
            <h2 className="text-2xl text-center font-bold mb-4 text-purple-700 dark:text-purple-400 gap-2">
              👥 Join Community
            </h2>
            <p className="text-sm opacity-80 mb-4">
              Collaborate with developers worldwide and contribute to making web
              animations accessible to everyone.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {["🔧 Contribute", "💡 Suggest", "📚 Document"].map((item, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-purple-100 dark:bg-secondary-700 text-purple-800 dark:text-white rounded-full text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Ready to Start Card */}
          <motion.div className="p-8 rounded-3xl text-center bg-gradient-to-tr from-indigo-50 to-white dark:from-secondary-800 dark:to-secondary-700 shadow-xl border border-indigo-200 dark:border-secondary-700 w-full">
            <h2 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">
              Ready to Start?
            </h2>
            <p className="text-sm opacity-80 mb-4">
              Explore our components and start building today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Explore Components Button with moving gradient */}
              <a
                href="/explore"
                className="flex-1 text-center py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-[length:200%_200%] animate-gradient-x motion-reduce:animate-none hover:scale-105 transform transition-all motion-reduce:transition-none motion-reduce:hover:transform-none"
              >
                🚀 Explore Components
              </a>

              {/* Star on GitHub Button */}
              <a
                href="https://github.com/Premkolte/AnimateHub"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 via-blue-300 to-indigo-600 bg-[length:200%_200%] animate-gradient-x motion-reduce:animate-none hover:scale-105 transform transition-all motion-reduce:transition-none motion-reduce:hover:transform-none"
              >
                ⭐ Star on GitHub
              </a>
            </div>
          </motion.div>
        </section>

        {/* {Github Info section} */}
        <GitHubStats />

        <section className="w-full py-20 bg-gradient-to-r from-blue-300 to-pink-300 dark:from-gray-800 dark:to-purple-900 text-black dark:text-white rounded-3xl text-center px-6 transition-colors duration-500">
  {/* Tagline */}
  <h2 className="text-3xl md:text-3xl font-extrabold mb-4">
    Ready to Begin Your AnimateHub Adventure?
  </h2>

  {/* Subheading / Description */}
  <p className="text-base text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
    Explore creative animation components, enhance your projects, and
    join a vibrant developer community. Your journey starts here!
  </p>

  {/* Buttons */}
  <div className="flex flex-col sm:flex-row justify-center gap-4">
    <a
      href="https://animate-hub.vercel.app/"
      target="_blank"
      rel="noopener noreferrer"
      className="px-6 py-3 bg-white dark:bg-gray-100 text-purple-700 dark:text-purple-700 font-semibold rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-200 transition"
    >
      Visit AnimateHub
    </a>

    <a
      href="https://github.com/Premkolte/AnimateHub"
      target="_blank"
      rel="noopener noreferrer"
      className="px-6 py-3 bg-transparent border-2 border-white dark:border-gray-300 text-white dark:text-gray-300 font-semibold rounded-full shadow-lg hover:bg-white hover:text-purple-700 dark:hover:bg-gray-200 dark:hover:text-purple-700 transition"
    >
      Explore on GitHub
    </a>
  </div>
</section>

        {/* Social Media */}
        <section className="text-center p-8 rounded-3xl bg-gradient-to-tr from-purple-200 to-white dark:from-secondary-800 dark:to-secondary-700 shadow-xl border border-purple-500 dark:border-secondary-700">
          <h2 className="text-2xl font-bold mb-2 text-black dark:text-white">
            Connect With Us
          </h2>
          <p className="text-sm opacity-80 mb-4">
            Follow us for updates, tips, and community highlights.
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="https://twitter.com/animatehub"
              aria-label="Twitter"
              className="hover:text-blue-500 transform hover:scale-110 transition-all motion-reduce:transition-none motion-reduce:hover:transform-none"
            >
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
            <a
              href="https://facebook.com/animatehub"
              aria-label="Facebook"
              className="hover:text-blue-700 transform hover:scale-110 transition-all motion-reduce:transition-none motion-reduce:hover:transform-none"
            >
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
            <a
              href="https://linkedin.com/company/animatehub"
              aria-label="LinkedIn"
              className="hover:text-blue-800 transform hover:scale-110 transition-all motion-reduce:transition-none motion-reduce:hover:transform-none"
            >
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default About;
