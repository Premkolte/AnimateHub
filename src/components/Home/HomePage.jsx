import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaReact, FaHtml5, FaCss3Alt, FaGithub } from "react-icons/fa";
import { LuLayoutTemplate } from "react-icons/lu";
import { BiLogoTailwindCss } from "react-icons/bi";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-6 space-y-16 pt-43 mt-1">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl"
        >
          <div className="bg-black text-white px-4 py-1 rounded-full inline-block text-sm mb-6">
            100% OPEN-SOURCE
          </div>
          <p className="text-4xl md:text-6xl mb-6">
            Animation UI Library <br /> for Developers
          </p>
          <p className="text-md mb-10">
            Open-sourced components made with
            <br />
            <span className="font-bold">HTML + CSS</span> &{" "}
            <span className="font-bold">React + Tailwind</span>.
          </p>

          <div className="flex space-x-6 justify-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="bg-black text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg"
              onClick={() => {
                navigate("/explore");
              }}
            >
              Browse Components
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="border border-white text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg"
              onClick={() => {
                window.location.href =
                  "https://github.com/Premkolte/AnimateHub";
              }}
            >
              Get Started
            </motion.button>
          </div>
        </motion.div>

        <div className="flex space-x-6 mt-12">
          <FaHtml5 className="h-12 w-12" />
          <FaCss3Alt className="h-12 w-12" />
          <FaReact className="h-12 w-12" />
          <BiLogoTailwindCss className="h-12 w-12" />
        </div>

        {/* New Features Section */}
        <div className="text-center space-y-4 py-16">
          <h1 className="text-4xl font-extrabold mb-8">Features</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <h2 className="font-extrabold text-2xl mb-2">Easy Integration</h2>
              <p>Seamlessly integrate with any project using HTML, CSS, React, and Tailwind.</p>
            </motion.div>
            <motion.div
              className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <h2 className="font-extrabold text-2xl mb-2">Fully Responsive</h2>
              <p>Our components are designed to look great on any device.</p>
            </motion.div>
            <motion.div
              className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <h2 className="font-extrabold text-2xl mb-2">Customizable</h2>
              <p>Easily customize the components to match your brand's style.</p>
            </motion.div>
          </div>
        </div>

        {/* Improved Pricing Section */}
        <div className="text-center space-y-4 py-16">
          <h1 className="text-4xl font-extrabold mb-8">Pricing</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center bg-slate-900 p-8 rounded-lg shadow-lg">
              <div>
                <h2 className="font-extrabold text-3xl text-center mb-2">
                  Starter
                </h2>
                <p className="opacity-60 text-center">
                  For the individual and small teams
                </p>
                <div className="flex flex-col items-center my-8">
                  <p className="font-extrabold text-4xl">$0</p>
                  <p className="text-sm opacity-60">per month</p>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <p>
                  ✔️<b>Access to all components</b>
                </p>
                <p>
                  ✔️<b>Access to codebase</b>
                </p>
                <div className="flex justify-center mt-8 ">
                  <button className="px-4 py-2 border-violet-400 border-4 hover:bg-violet-700 rounded-xl">
                    Get Started
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center bg-slate-900 p-8 rounded-lg shadow-lg">
              <div>
                <h2 className="font-extrabold text-3xl text-center mb-2">
                  Pro
                </h2>
                <p className="opacity-60 text-center">
                  For larger teams and enterprises
                </p>
                <div className="flex flex-col items-center my-8">
                  <p className="font-extrabold text-4xl">$49</p>
                  <p className="text-sm opacity-60">per month</p>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <p>
                  ✔️<b>Priority support</b>
                </p>
                <p>
                  ✔️<b>Access to exclusive components</b>
                </p>
                <p>
                  ✔️<b>Custom solutions</b>
                </p>
                <div className="flex justify-center mt-8 ">
                  <button className="px-4 py-2 border-violet-400 border-4 hover:bg-violet-700 rounded-xl">
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="text-center space-y-4 py-16">
          <h1 className="text-4xl font-extrabold mb-8">Testimonials</h1>
          <Carousel showArrows={true} showThumbs={false} infiniteLoop={true} autoPlay={true}>
            <motion.div
              className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <p className="mb-4">
                "AnimateHub has transformed the way we build and integrate UI
                components. Highly recommend!"
              </p>
              <h3 className="font-bold">John Doe</h3>
              <p>CEO, TechCorp</p>
            </motion.div>
            <motion.div
              className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <p className="mb-4">
                "The components are easy to use and customizable. Great for any
                developer looking to save time."
              </p>
              <h3 className="font-bold">Jane Smith</h3>
              <p>Lead Developer, DevWorks</p>
            </motion.div>
            <motion.div
              className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <p className="mb-4">
                "A fantastic resource for developers. The open-source aspect is
                a huge plus!"
              </p>
              <h3 className="font-bold">Alex Johnson</h3>
              <p>Freelance Developer</p>
            </motion.div>
          </Carousel>
        </div>

        {/* Contribute Section */}
        <div className="text-center mt-12">
          <h2 className="text-4xl font-extrabold mb-4">
            Want to contribute or have some suggestions?
          </h2>
          <p className="text-2xl">Come to our GitHub and raise an issue!</p>
          <a
            href="https://github.com/Premkolte/AnimateHub"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex gap-2 bg-black text-white px-6 py-3 rounded-full text-xl font-semibold shadow-lg transition-transform transform hover:scale-105"
          >
            <FaGithub size={30} />Visit GitHub
          </a>
        </div>

        {/* Template Section */}
        <div className="w-full flex flex-col items-center border-y-2 border-white py-14">
          <LuLayoutTemplate size={100} />
          <h2 className="text-4xl font-extrabold mb-4">
            Looking for Templates Instead?
          </h2>
          <p className="text-2xl">Coming Soon!</p>
        </div>

        {/* FAQ Section */}
        <div className="text-center space-y-4 py-16">
          <h1 className="text-4xl font-extrabold mb-8">FAQ</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <h2 className="font-extrabold text-2xl mb-2">How do I start?</h2>
              <p>Visit our GitHub and follow the instructions to get started.</p>
            </motion.div>
            <motion.div
              className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <h2 className="font-extrabold text-2xl mb-2">Is it free?</h2>
              <p>Yes! You can use all components for free. We also offer a Pro plan for advanced features.</p>
            </motion.div>
            <motion.div
              className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <h2 className="font-extrabold text-2xl mb-2">How can I contribute?</h2>
              <p>Contribute by raising issues or submitting pull requests on our GitHub repository.</p>
            </motion.div>
            <motion.div
              className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <h2 className="font-extrabold text-2xl mb-2">What technologies are used?</h2>
              <p>We use HTML, CSS, React, and Tailwind for our components.</p>
            </motion.div>
          </div>
        </div>

        <footer className="bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 p-5 w-full text-left mt-16">
          <p className="text-lg">&copy; 2024 Animate Hub. All rights reserved.</p>
          <div className="mt-4 flex justify-between">
            <a href="/privacy-policy" className="text-white">Privacy Policy</a>
            <a href="/terms-of-service" className="text-white">Terms of Service</a>
            <a href="/contact" className="text-white">Contact</a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
