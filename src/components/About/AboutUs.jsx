import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebook,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import BackButton from "../BackButton";

const About = () => {
  const Blobs = () => (
    <>
      <svg
        className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 opacity-30 dark:opacity-50"
        width="600"
        height="600"
        viewBox="0 0 600 600"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(300,300)">
          <motion.path
            fill="#e5e7eb"
            className="dark:fill-white"
            animate={{
              d: [
                "M120.5,-132.3C156.6,-109.2,176.1,-54.6,169.7,-4.9C163.2,44.9,130.8,89.7,94.7,124.5C58.6,159.3,18.8,184.1,-34.6,192.9C-88,201.6,-154,194.3,-176.4,155.4C-198.9,116.5,-177.8,46,-157.3,-18.1C-136.8,-82.2,-116.8,-139.9,-78.4,-162.7C-40.1,-185.4,16.6,-173.2,63.2,-153.8C109.8,-134.4,144.4,-108.9,120.5,-132.3Z",
                "M110.1,-127.1C143.1,-104.8,159.1,-52.4,155.5,-3.8C151.9,44.8,128.6,89.7,96.2,128.1C63.8,166.6,21.4,198.6,-29.2,208.8C-79.8,218.9,-139.6,207.2,-177.8,167.2C-216.1,127.2,-232.7,59.1,-220.1,-2.7C-207.4,-64.5,-165.5,-119,-118,-148.8C-70.5,-178.5,-17.2,-183.5,32.2,-169.3C81.6,-155,127,-121.5,110.1,-127.1Z",
                "M109.7,-121.3C140.5,-98.4,148.5,-49.2,145.8,-2.6C143.2,44,129.9,87.9,101.3,120.5C72.7,153.1,28.8,174.4,-17.4,183.3C-63.5,192.1,-112.8,188.4,-146.8,156.2C-180.7,124,-199.3,63.3,-195.3,6.5C-191.4,-50.3,-164.8,-100.5,-125.8,-126.8C-86.8,-153,-43.4,-155.3,4.1,-159.3C51.7,-163.3,103.4,-169.8,109.7,-121.3Z",
                "M120.5,-132.3C156.6,-109.2,176.1,-54.6,169.7,-4.9C163.2,44.9,130.8,89.7,94.7,124.5C58.6,159.3,18.8,184.1,-34.6,192.9C-88,201.6,-154,194.3,-176.4,155.4C-198.9,116.5,-177.8,46,-157.3,-18.1C-136.8,-82.2,-116.8,-139.9,-78.4,-162.7C-40.1,-185.4,16.6,-173.2,63.2,-153.8C109.8,-134.4,144.4,-108.9,120.5,-132.3Z",
              ],
              transition: {
                duration: 10,
                repeat: Infinity,
                repeatType: "mirror",
              },
            }}
          />
        </g>
      </svg>

      <svg
        className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 opacity-30 dark:opacity-50"
        width="600"
        height="600"
        viewBox="0 0 600 600"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(300,300)">
          <motion.path
            fill="#e5e7eb"
            className="dark:fill-white"
            animate={{
              d: [
                "M120.5,-132.3C156.6,-109.2,176.1,-54.6,169.7,-4.9C163.2,44.9,130.8,89.7,94.7,124.5C58.6,159.3,18.8,184.1,-34.6,192.9C-88,201.6,-154,194.3,-176.4,155.4C-198.9,116.5,-177.8,46,-157.3,-18.1C-136.8,-82.2,-116.8,-139.9,-78.4,-162.7C-40.1,-185.4,16.6,-173.2,63.2,-153.8C109.8,-134.4,144.4,-108.9,120.5,-132.3Z",
                "M110.1,-127.1C143.1,-104.8,159.1,-52.4,155.5,-3.8C151.9,44.8,128.6,89.7,96.2,128.1C63.8,166.6,21.4,198.6,-29.2,208.8C-79.8,218.9,-139.6,207.2,-177.8,167.2C-216.1,127.2,-232.7,59.1,-220.1,-2.7C-207.4,-64.5,-165.5,-119,-118,-148.8C-70.5,-178.5,-17.2,-183.5,32.2,-169.3C81.6,-155,127,-121.5,110.1,-127.1Z",
                "M109.7,-121.3C140.5,-98.4,148.5,-49.2,145.8,-2.6C143.2,44,129.9,87.9,101.3,120.5C72.7,153.1,28.8,174.4,-17.4,183.3C-63.5,192.1,-112.8,188.4,-146.8,156.2C-180.7,124,-199.3,63.3,-195.3,6.5C-191.4,-50.3,-164.8,-100.5,-125.8,-126.8C-86.8,-153,-43.4,-155.3,4.1,-159.3C51.7,-163.3,103.4,-169.8,109.7,-121.3Z",
                "M120.5,-132.3C156.6,-109.2,176.1,-54.6,169.7,-4.9C163.2,44.9,130.8,89.7,94.7,124.5C58.6,159.3,18.8,184.1,-34.6,192.9C-88,201.6,-154,194.3,-176.4,155.4C-198.9,116.5,-177.8,46,-157.3,-18.1C-136.8,-82.2,-116.8,-139.9,-78.4,-162.7C-40.1,-185.4,16.6,-173.2,63.2,-153.8C109.8,-134.4,144.4,-108.9,120.5,-132.3Z",
              ],
              transition: {
                duration: 10,
                repeat: Infinity,
                repeatType: "mirror",
              },
            }}
          />
        </g>
      </svg>
    </>
  );

  return (
    <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
  className="relative flex flex-col items-center justify-center w-full min-h-screen overflow-y-auto py-8 overflow-x-hidden
    bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 text-gray-900 
    dark:bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] 
    dark:from-indigo-500 dark:via-violet-500 dark:to-fuchsia-500 dark:text-white"
>
      <BackButton />
      <Blobs />

      <div className="relative z-10 mx-auto px-4 sm:px-8 md:px-20 text-black dark:text-white mb-16 max-w-4xl space-y-8">
        
        {/* Hero Section */}
        <div className="bg-white/40 bg-opacity-80 backdrop-filter backdrop-blur-md border border-gray-200 rounded-lg shadow-lg p-8 md:p-12 dark:bg-white dark:bg-opacity-20 dark:border-none">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            About AnimateHub
          </h1>
          <div className="inline-block px-4 py-2 mb-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
            100% OPEN-SOURCE
          </div>
          <p className="text-lg mb-4 leading-relaxed">
            A powerful open-source animation UI library that simplifies creating beautiful, reusable animations for modern web applications.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/40 bg-opacity-80 backdrop-filter backdrop-blur-md border border-gray-200 rounded-lg shadow-lg p-6 dark:bg-white dark:bg-opacity-20 dark:border-none">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <span className="text-2xl mr-3">✨</span>
              Why Choose Us?
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="text-green-500 text-lg">✂️</span>
                <div>
                  <h3 className="font-semibold">Copy-Paste Simple</h3>
                  <p className="text-lg opacity-90">Instant integration, no complex setup</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-blue-500 text-lg">⚡</span>
                <div>
                  <h3 className="font-semibold">Performance Optimized</h3>
                  <p className="text-lg opacity-90">Smooth 60fps animations</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/40 bg-opacity-80 backdrop-filter backdrop-blur-md border border-gray-200 rounded-lg shadow-lg p-6 dark:bg-white dark:bg-opacity-20 dark:border-none">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <span className="text-2xl mr-3">🚀</span>
              What We Offer
            </h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0"></span>
                <span className="text-lg">50+ Animation Components</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></span>
                <span className="text-lg">Live Preview & Code Copy</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="w-3 h-3 bg-purple-500 rounded-full flex-shrink-0"></span>
                <span className="text-lg">Ready-to-use Templates</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="w-3 h-3 bg-orange-500 rounded-full flex-shrink-0"></span>
                <span className="text-lg">Dark/Light Mode Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="bg-white/40 bg-opacity-80 backdrop-filter backdrop-blur-md border border-gray-200 rounded-lg shadow-lg p-6 md:p-8 dark:bg-white dark:bg-opacity-20 dark:border-none">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <span className="text-2xl mr-3">🛠️</span>
            Built With Modern Technology
          </h2>
          <div className="flex flex-wrap justify-center gap-8 p-4 bg-gray-50/50 dark:bg-gray-800/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <span className="text-blue-500 text-2xl">⚛️</span>
              <span className="font-semibold">React 18</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-purple-500 text-2xl">⚡</span>
              <span className="font-semibold">Vite 5</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-cyan-500 text-2xl">🎨</span>
              <span className="font-semibold">Tailwind CSS 3</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500 text-2xl">🎭</span>
              <span className="font-semibold">Framer Motion</span>
            </div>
          </div>
        </div>

        {/* Community & CTA */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/40 bg-opacity-80 backdrop-filter backdrop-blur-md border border-gray-200 rounded-lg shadow-lg p-6 dark:bg-white dark:bg-opacity-20 dark:border-none">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <span className="text-2xl mr-3">👥</span>
              Join Community
            </h2>
            <p className="text-lg mb-4">
              Collaborate with developers worldwide and contribute to making web animations accessible to everyone.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                🔧 Contribute
              </span>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                💡 Suggest
              </span>
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                📚 Document
              </span>
            </div>
          </div>

          <div className="bg-white/40 bg-opacity-80 backdrop-filter backdrop-blur-md border border-gray-200 rounded-lg shadow-lg p-6 dark:bg-white dark:bg-opacity-20 dark:border-none">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Start?
            </h2>
            <p className="text-lg mb-4">
              Explore our collection and start creating beautiful animations today!
            </p>
            <div className="space-y-3">
              <a
                href="/explore"
                className="block w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
              >
                🚀 Explore Components
              </a>
              <a
                href="https://github.com/Premkolte/AnimateHub"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
              >
                ⭐ Star on GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white/40 bg-opacity-80 backdrop-filter backdrop-blur-md border border-gray-200 rounded-lg shadow-lg p-6 md:p-8 dark:bg-white dark:bg-opacity-20 dark:border-none text-center">
          <h2 className="text-2xl font-bold mb-4">
            Connect With Us
          </h2>
          <p className="text-lg mb-6">
            Follow us for updates, tips, and community highlights.
          </p>
          <div className="flex justify-center space-x-8">
            <a
              href="https://twitter.com/animatehub"
              className="text-blue-500 hover:text-blue-600 transition-colors duration-200 hover:scale-110 transform"
              aria-label="Follow us on Twitter"
            >
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
            <a
              href="https://facebook.com/animatehub"
              className="text-blue-600 hover:text-blue-700 transition-colors duration-200 hover:scale-110 transform"
              aria-label="Follow us on Facebook"
            >
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
            <a
              href="https://linkedin.com/company/animatehub"
              className="text-blue-700 hover:text-blue-800 transition-colors duration-200 hover:scale-110 transform"
              aria-label="Follow us on LinkedIn"
            >
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default About;
