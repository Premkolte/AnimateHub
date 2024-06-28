import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaReact, FaHtml5, FaCss3Alt, FaGithub } from "react-icons/fa";
import { LuLayoutTemplate } from "react-icons/lu";
import { BiLogoTailwindCss } from "react-icons/bi";
import { BsPeople } from "react-icons/bs";
import { GiTechnoHeart } from "react-icons/gi";
import { IoMdRocket } from "react-icons/io";
import { MdLibraryBooks } from "react-icons/md";
import Chatbot from "./Chatbot";
import TestimonialSection from "./Testimonial";
import Navbar from "./Navbar";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="w-full flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-6 space-y-16 pt-24">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl"
        >
          <div className="bg-black text-white px-4 py-1 rounded-full inline-block text-sm mb-6">
            100% OPEN-SOURCE
          </div>
          <motion.p
            className="text-4xl md:text-6xl mb-6"
            whileHover={{ scale: 1.05 }}
          >
            Animation UI Library <br /> for Developers
          </motion.p>
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

        <div className="text-center space-y-4 py-16">
          <h1 className="text-4xl">Pricing</h1>
          <div className="flex flex-col md:flex-row justify-center items-center gap-12 mt-8">
            {/* Starter Plan */}
            <motion.div
              className="flex flex-col items-center bg-slate-900 p-8 rounded-lg shadow-lg min-w-sm"
              whileHover={{ scale: 1.05 }}
            >
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
                <div className="flex justify-center mt-8">
                  <button className="px-4 py-2 border-violet-400 border-4 hover:bg-violet-700 rounded-xl">
                    Get Started
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Pro Plan */}
            <motion.div
              className="flex flex-col items-center bg-slate-900 p-8 rounded-lg shadow-lg min-w-sm"
              whileHover={{ scale: 1.05 }}
            >
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
                <div className="flex justify-center mt-8">
                  <button className="px-4 py-2 border-violet-400 border-4 hover:bg-violet-700 rounded-xl">
                    Get Started
                  </button>
                </div>
              </div>
            </motion.div>

            {/* New Pricing Section */}
            <motion.div
              className="flex flex-col items-center bg-slate-900 p-8 rounded-lg shadow-lg min-w-sm"
              whileHover={{ scale: 1.05 }}
            >
              <div>
                <h2 className="font-extrabold text-3xl text-center mb-2">
                  Enterprise
                </h2>
                <p className="opacity-60 text-center">
                  Tailored solutions for large enterprises
                </p>
                <div className="flex flex-col items-center my-8">
                  <p className="font-extrabold text-4xl">Contact us</p>
                  <p className="text-sm opacity-60">for pricing</p>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <p>
                  ✔️<b>Customizable plans</b>
                </p>
                <p>
                  ✔️<b>Dedicated support</b>
                </p>
                <div className="flex justify-center mt-8">
                  <button className="px-4 py-2 border-violet-400 border-4 hover:bg-violet-700 rounded-xl">
                    Contact Sales
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Updated Features Section */}

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8 py-16"
        >
          <h1 className="text-4xl font-extrabold">Features</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <motion.div
              className="bg-slate-900 p-6 rounded-lg shadow-lg min-h-[250px]"
              whileHover={{ scale: 1.05 }}
            >
              <GiTechnoHeart className="text-4xl mb-4 mx-auto text-purple-500" />
              <h2 className="font-extrabold text-2xl mb-2">Easy Integration</h2>
              <p>
                Seamlessly integrate with any project using HTML, CSS, React,
                and Tailwind.
              </p>
            </motion.div>
            <motion.div
              className="bg-slate-900 p-6 rounded-lg shadow-lg min-h-[250px]"
              whileHover={{ scale: 1.05 }}
            >
              <IoMdRocket className="text-4xl mb-4 mx-auto text-purple-500" />
              <h2 className="font-extrabold text-2xl mb-2">High Performance</h2>
              <p>
                Optimized for speed and efficiency, ensuring smooth animations
                and interactions.
              </p>
            </motion.div>
            <motion.div
              className="bg-slate-900 p-6 rounded-lg shadow-lg min-h-[250px]"
              whileHover={{ scale: 1.05 }}
            >
              <MdLibraryBooks className="text-4xl mb-4 mx-auto text-purple-500" />
              <h2 className="font-extrabold text-2xl mb-2">
                Comprehensive Documentation
              </h2>
              <p>
                Extensive documentation and examples to help developers get
                started quickly.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Updated Testimonials Section */}

        <TestimonialSection />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-12"
        >
          <h2 className="text-4xl font-extrabold mb-4">
            Want to contribute or have some suggestions?
          </h2>
          <p className="text-2xl">Come to our GitHub and raise an issue!</p>
          <div className="mt-8 flex justify-center items-center gap-4">
            <motion.a
              href="https://github.com/Premkolte/AnimateHub"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full text-xl font-semibold shadow-lg transition-transform transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
            >
              <FaGithub size={30} />
              Visit GitHub
            </motion.a>
            <Link
              to="/contributors"
              className="inline-flex items-center gap-2 bg-indigo-500 text-white px-6 py-3 rounded-full text-xl font-semibold shadow-lg transition-transform transform hover:scale-105"
            >
              <BsPeople size={30} />
              View Contributors
            </Link>
          </div>
        </motion.div>

        {/* Updated Template Section */}
        <div className="w-full flex flex-col items-center border-y-2 border-white py-14">
          <LuLayoutTemplate size={100} />
          <h2 className="text-4xl font-extrabold mb-4">
            Looking for Templates Instead?
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-12 mt-8">
            {/* Portfolio Template */}
            <div className="flex flex-col items-center bg-slate-900 p-8 rounded-lg shadow-lg min-w-sm">
              <div>
                <h2 className="font-extrabold text-3xl text-center mb-2">
                  Portfolio
                </h2>
                <p className="opacity-60 text-center">
                  Showcase your projects and skills with a professional
                  portfolio template.
                </p>
                <div className="flex justify-center mt-8">
                  <Link
                    to="/portfolio"
                    className="px-4 py-2 border-violet-400 border-4 hover:bg-violet-700 rounded-xl"
                  >
                    View Template
                  </Link>
                </div>
              </div>
            </div>

            {/* Product Template */}
            <div className="flex flex-col items-center bg-slate-900 p-8 rounded-lg shadow-lg min-w-sm">
              <div>
                <h2 className="font-extrabold text-3xl text-center mb-2">
                  Product
                </h2>
                <p className="opacity-60 text-center">
                  Promote your product with a clean and effective product
                  template.
                </p>
                <div className="flex justify-center mt-8">
                  <Link
                    to="/product"
                    className="px-4 py-2 border-violet-400 border-4 hover:bg-violet-700 rounded-xl"
                  >
                    View Template
                  </Link>
                </div>
              </div>
            </div>

            {/* Blog Template */}
            <div className="flex flex-col items-center bg-slate-900 p-8 rounded-lg shadow-lg min-w-sm">
              <div>
                <h2 className="font-extrabold text-3xl text-center mb-2">
                  Blog
                </h2>
                <p className="opacity-60 text-center">
                  Share your thoughts and insights with a customizable blog
                  template.
                </p>
                <div className="flex justify-center mt-8">
                  <Link
                    to="/blog"
                    className="px-4 py-2 border-violet-400 border-4 hover:bg-violet-700 rounded-xl"
                  >
                    View Template
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 p-5 w-full text-left mt-16">
          <p className="text-lg">
            &copy; 2024 Animate Hub. All rights reserved.
          </p>
        </footer>

        {/* Include the Chatbot Component */}
        <Chatbot />
      </div>
    </>
  );
};

export default HomePage;
