import React from "react";
import { motion } from "framer-motion";
import GitHubStats from "./GitHubStats";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebook,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const About = () => {
  const techUsed = [
    {
      icon: "⚛️",
      name: "React 18",
      desc: "Reusable UI & hooks",
    },
    {
      icon: "⚡",
      name: "Vite 5",
      desc: "Blazing fast dev server",
    },
    {
      icon: "🎨",
      name: "Tailwind CSS 3",
      desc: "Utility-first styling",
    },
    {
      icon: "🎭",
      name: "Framer Motion",
      desc: "Declarative animations",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full py-16 px-4 bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white"
    >
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Hero */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">About AnimateHub</h1>
          <p className="text-lg max-w-3xl mx-auto opacity-80">
            A powerful open-source animation UI library that simplifies creating
            beautiful, reusable animations for modern web applications.
          </p>
          <div className="inline-block px-4 py-1 text-sm rounded-full bg-primary-600 text-white dark:bg-accent-600">
            100% OPEN-SOURCE
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="grid md:grid-cols-2 gap-8">
          <div className="bg-primary-50 dark:bg-secondary-800 text-secondary-900 dark:text-white border border-primary-200 dark:border-secondary-700 p-8 rounded-lg shadow-sm hover:shadow-sm dark:shadow-none hover:ring-1 hover:ring-primary-300 dark:hover:ring-accent-500 transform transition-transform  duration-300 ease-in-out w-full">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              ✨ Why Choose Us?
            </h2>
            <div className="space-y-3 mt-3">
              <div className="flex items-start gap-3">
                <span className="text-xl">✂️</span>
                <div>
                  <h3 className="font-semibold">Copy-Paste Simple</h3>
                  <p className="opacity-80">
                    Instant integration, no complex setup
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">⚡</span>
                <div>
                  <h3 className="font-semibold">Performance Optimized</h3>
                  <p className="opacity-80">Smooth 60fps animations</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-primary-50 dark:bg-secondary-800 text-secondary-900 dark:text-white border border-primary-200 dark:border-secondary-700 p-8 rounded-lg shadow-sm hover:shadow-sm dark:shadow-none hover:ring-1 hover:ring-primary-300 dark:hover:ring-accent-500 transform transition-transform  duration-300 ease-in-out w-full">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              🚀 What We Offer
            </h2>
            <ul className="space-y-3 mt-3">
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
          </div>
        </section>

        {/* Tech Stack */}
        <section className="w-full bg-white dark:bg-secondary-900 rounded-xl p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 flex items-center justify-center gap-3">
            🛠️ Built With Modern Tech
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {techUsed.map((tech) => (
              <div
                key={tech.name}
                className="bg-primary-50 dark:bg-secondary-800 text-secondary-900 dark:text-white border border-primary-200 dark:border-secondary-700 p-8 rounded-lg shadow-sm hover:shadow-sm dark:shadow-none hover:ring-1 hover:ring-primary-300 dark:hover:ring-accent-500 transform transition-transform duration-300 ease-in-out w-full text-center"
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

        {/* Community & CTA */}
        <section className="grid md:grid-cols-2 gap-8">
          <div className="bg-primary-50 dark:bg-secondary-800 text-secondary-900 dark:text-white border border-primary-200 dark:border-secondary-700 p-8 rounded-lg shadow-sm hover:shadow-sm dark:shadow-none hover:ring-1 hover:ring-primary-300 dark:hover:ring-accent-500 transform transition-transform duration-300 ease-in-out w-full">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              👥 Join Community
            </h2>
            <p className="mb-4 opacity-80">
              Collaborate with developers worldwide and contribute to making web
              animations accessible to everyone.
            </p>
            <div className="flex flex-wrap gap-2">
              {["🔧 Contribute", "💡 Suggest", "📚 Document"].map((item, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-secondary-100 dark:bg-secondary-700 text-secondary-800 dark:text-white text-sm rounded-full"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-primary-50 dark:bg-secondary-800 text-secondary-900 dark:text-white border border-primary-200 dark:border-secondary-700 p-8 rounded-lg shadow-sm hover:shadow-sm dark:shadow-none hover:ring-1 hover:ring-primary-300 dark:hover:ring-accent-500 transform transition-transform duration-300 ease-in-out w-full">
            <h2 className="text-2xl font-semibold mb-4">Ready to Start?</h2>
            <p className="mb-4 opacity-80">
              Explore our components and start building today.
            </p>
            <div className="space-y-3">
              <a
                href="/explore"
                className="block text-center bg-primary-600 dark:bg-accent-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 dark:hover:bg-accent-700 transition-all"
              >
                🚀 Explore Components
              </a>
              <a
                href="https://github.com/Premkolte/AnimateHub"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-secondary-700 dark:bg-secondary-600 text-white py-3 rounded-lg font-semibold hover:bg-secondary-800 dark:hover:bg-secondary-500 transition-all"
              >
                ⭐ Star on GitHub
              </a>
            </div>
          </div>
        </section>
        
        
        {/* {Github Info section} */}
        <GitHubStats />


        {/* Social Media */}
        <section className="text-center bg-primary-50 dark:bg-secondary-800 text-secondary-900 dark:text-white border border-primary-200 dark:border-secondary-700 p-8 rounded-lg shadow-sm hover:shadow-sm dark:shadow-none hover:ring-1 hover:ring-primary-300 dark:hover:ring-accent-500 transform transition-transform duration-300 ease-in-out w-full">
          <h2 className="text-2xl font-semibold mb-2">Connect With Us</h2>
          <p className="mb-4 opacity-80">
            Follow us for updates, tips, and community highlights.
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="https://twitter.com/animatehub"
              aria-label="Twitter"
              className="hover:text-blue-500 transition-transform transform hover:scale-110"
            >
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
            <a
              href="https://facebook.com/animatehub"
              aria-label="Facebook"
              className="hover:text-blue-700 transition-transform transform hover:scale-110"
            >
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
            <a
              href="https://linkedin.com/company/animatehub"
              aria-label="LinkedIn"
              className="hover:text-blue-800 transition-transform transform hover:scale-110"
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
