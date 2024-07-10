import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaReact, FaHtml5, FaCss3Alt, FaGithub } from "react-icons/fa";
import { LuLayoutTemplate } from "react-icons/lu";
import { BiLogoTailwindCss } from "react-icons/bi";
import { BsGithub, BsPeople, BsStarFill } from "react-icons/bs";
import { GiTechnoHeart } from "react-icons/gi";
import { IoMdRocket } from "react-icons/io";
import { MdLibraryBooks } from "react-icons/md";
import Chatbot from "./Chatbot";
import TestimonialSection from "./Testimonial";
import Navbar from "./Navbar";
import Footer from "../Footer";
import ReactJoyride from 'react-joyride';

const HomePage = () => {
  const navigate = useNavigate();

  const [steps] = useState([
    {
      target: '.browse-components-button',
      content: 'Click here to browse our components.',
    },
    {
      target: '.get-started-button',
      content: 'Click here to get started with our GitHub repository.',
    },
    {
      target: '.star-github-button',
      content: 'Show your support by starring our GitHub repository.',
    },
    {
      target: '.pricing-section',
      content: 'Check out our pricing plans here.',
    },
    {
      target: '.features-section',
      content: 'Discover the amazing features we offer.',
    },
    {
      target: '.testimonial-section',
      content: 'Read testimonials from our satisfied users.',
    },
    {
      target: '.contributors-section',
      content: 'Meet our talented contributors who have made this amazing website.',
    },
    {
      target: '.templates-section',
      content: 'Explore our handcrafted templates.',
    },
  ]);

  return (
    <>
      <Navbar />
      <ReactJoyride steps={steps} continuous={true} showProgress={true} showSkipButton={true} />
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
              className="bg-black text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg browse-components-button"
              onClick={() => {
                navigate("/explore");
              }}
            >
              Browse Components
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="border border-white text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg get-started-button"
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

        <motion.a href="https://github.com/Premkolte/AnimateHub"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center justify-center gap-4 whitespace-nowrap rounded-md text-sm font-medium h-12 px-6 py-3 group bg-gray-900 hover:bg-gray-950 transition-all duration-200 ease-in-out star-github-button"
        >
          <BsGithub size={25} />
          <span className="text-white text-xl">Star on Github</span>
          <BsStarFill size={25} className="text-yellow-500" />
        </motion.a>

        <div className="text-center space-y-4 py-16 pricing-section">
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
                  <button
                    className="px-4 py-2 border-violet-400 border-4 hover:bg-violet-700 rounded-xl"
                    onClick={() => {
                      navigate("/payment");
                    }}
                  >
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
                  <button
                    className="px-4 py-2 border-violet-400 border-4 hover:bg-violet-700 rounded-xl"
                    onClick={() => {
                      navigate("/payment");
                    }}
                  >
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
                  ✔️<b>Dedicated support team</b>
                </p>
                <p>
                  ✔️<b>Advanced analytics</b>
                </p>
                <div className="flex justify-center mt-8">
                  <button
                    className="px-4 py-2 border-violet-400 border-4 hover:bg-violet-700 rounded-xl"
                    onClick={() => {
                      navigate("/contact");
                    }}
                  >
                    Contact Us
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="features-section">
          <h2 className="text-4xl mb-8 text-center">Features</h2>
          <div className="flex flex-wrap justify-center gap-12">
            <motion.div
              className="bg-white text-black p-8 rounded-lg shadow-lg max-w-xs  bg-green-200"
              whileHover={{ scale: 1.05 }}
            >
              <IoMdRocket size={50} className="mb-4 text-indigo-500" />
              <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
              <p>
                Simple and intuitive components that make development a breeze.
              </p>
            </motion.div>

            <motion.div
              className="bg-white text-black p-8 rounded-lg shadow-lg max-w-xs  bg-green-200"
              whileHover={{ scale: 1.05 }}
            >
              <MdLibraryBooks size={50} className="mb-4 text-indigo-500" />
              <h3 className="text-xl font-semibold mb-2">Comprehensive Docs</h3>
              <p>
                Detailed documentation to help you get started quickly and easily.
              </p>
            </motion.div>

            <motion.div
              className="bg-white text-black p-8 rounded-lg shadow-lg max-w-xs bg-green-200"
              whileHover={{ scale: 1.05 }}
            >
              <GiTechnoHeart size={50} className="mb-4 text-indigo-500 " />
              <h3 className="text-xl font-semibold mb-2 ">Modern Design</h3>
              <p>
                Beautifully designed components that enhance your project's UI.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="testimonial-section">
          <h2 className="text-4xl mb-8 text-center"></h2>
          <TestimonialSection />
        </div>

        <div className="contributors-section mt-12 w-full flex flex-col items-center text-white">
          <h2 className="text-4xl mb-8">Contributors</h2>
          <p className="max-w-xl text-center mb-8">
            Meet the talented people who have contributed to making this amazing website possible.
          </p>
          <div className="flex space-x-6">
            <Link to="/contributors">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="bg-black text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg"
              >
                View Contributors
              </motion.button>
            </Link>
            <a
              href="https://github.com/your-repo"
              className="bg-black text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg"
            >
              <BsPeople className="inline-block mr-2" />
              Become a Contributor
            </a>
          </div>
        </div>

        <div className="templates-section mt-12 w-full flex flex-col items-center text-white">
          <h2 className="text-4xl mb-8">Templates</h2>
          <p className="max-w-xl text-center mb-8">
            Explore our library of handcrafted templates designed to kickstart your projects.
          </p>
          <div className="flex space-x-6">
            <Link to="/templates">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="bg-black text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg"
              >
                View Templates
              </motion.button>
            </Link>
            <a
              href="https://github.com/your-repo"
              className="bg-black text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg"
            >
              <LuLayoutTemplate className="inline-block mr-2" />
              Submit a Template
            </a>
          </div>
        </div>
        <Footer />
        <Chatbot />
      </div>
    
    </>
  );
};

export default HomePage;
