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
      target: '.contribute-section',
      content: 'Contribute to our project or suggest improvements.',
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

        <section className="bg-slate-900 p-8 rounded-lg shadow-lg text-white features-section">
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-4xl font-extrabold text-center mb-6">
              Features
            </h2>
            <p className="text-center text-md mb-10 max-w-4xl">
              Animation UI Library offers a variety of features to make your
              development process seamless and efficient. Our components are
              designed with the latest technologies and best practices to ensure
              high performance and compatibility.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                className="bg-black p-6 rounded-lg shadow-lg flex flex-col items-center"
                whileHover={{ scale: 1.05 }}
              >
                <IoMdRocket size={40} className="mb-4 text-indigo-400" />
                <h3 className="font-bold text-lg mb-2">Fast Performance</h3>
                <p className="text-center text-sm opacity-60">
                  Our components are optimized for fast load times and smooth
                  performance.
                </p>
              </motion.div>
              <motion.div
                className="bg-black p-6 rounded-lg shadow-lg flex flex-col items-center"
                whileHover={{ scale: 1.05 }}
              >
                <GiTechnoHeart size={40} className="mb-4 text-red-400" />
                <h3 className="font-bold text-lg mb-2">Modern Design</h3>
                <p className="text-center text-sm opacity-60">
                  We use the latest design trends to provide a modern and
                  attractive UI.
                </p>
              </motion.div>
              <motion.div
                className="bg-black p-6 rounded-lg shadow-lg flex flex-col items-center"
                whileHover={{ scale: 1.05 }}
              >
                <MdLibraryBooks size={40} className="mb-4 text-yellow-400" />
                <h3 className="font-bold text-lg mb-2">Comprehensive Docs</h3>
                <p className="text-center text-sm opacity-60">
                  Our documentation covers everything you need to know to get
                  started.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <div className="testimonial-section">
          <TestimonialSection />
        </div>

        <section className="flex flex-col items-center bg-slate-900 p-8 rounded-lg shadow-lg text-white contribute-section">
          <h2 className="text-4xl font-extrabold text-center mb-6">
            Contribute to Our Project
          </h2>
          <p className="text-center text-md mb-10 max-w-4xl">
            Animation UI Library is open-source and we welcome contributions
            from the community. Whether it's reporting bugs, suggesting new
            features, or contributing code, your help is appreciated.
          </p>
          <motion.a
            href="https://github.com/Premkolte/AnimateHub"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center gap-4 whitespace-nowrap rounded-md text-sm font-medium h-12 px-6 py-3 group bg-gray-900 hover:bg-gray-950 transition-all duration-200 ease-in-out"
          >
            <BsPeople size={25} />
            <span className="text-white text-xl">Contribute on Github</span>
          </motion.a>
        </section>

        <section className="bg-slate-900 p-8 rounded-lg shadow-lg text-white templates-section">
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-4xl font-extrabold text-center mb-6">
              Templates
            </h2>
            <p className="text-center text-md mb-10 max-w-4xl">
              Explore our collection of professionally designed templates to
              kickstart your project. Each template is fully customizable and
              easy to integrate.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div
                className="bg-black p-6 rounded-lg shadow-lg flex flex-col items-center"
                whileHover={{ scale: 1.05 }}
              >
                <LuLayoutTemplate size={40} className="mb-4 text-green-400" />
                <h3 className="font-bold text-lg mb-2">Landing Page</h3>
                <p className="text-center text-sm opacity-60">
                  A modern landing page template to showcase your product.
                </p>
              </motion.div>
              <motion.div
                className="bg-black p-6 rounded-lg shadow-lg flex flex-col items-center"
                whileHover={{ scale: 1.05 }}
              >
                <LuLayoutTemplate size={40} className="mb-4 text-blue-400" />
                <h3 className="font-bold text-lg mb-2">Portfolio</h3>
                <p className="text-center text-sm opacity-60">
                  A clean and minimal portfolio template to display your work.
                </p>
              </motion.div>
              <motion.div
                className="bg-black p-6 rounded-lg shadow-lg flex flex-col items-center"
                whileHover={{ scale: 1.05 }}
              >
                <LuLayoutTemplate size={40} className="mb-4 text-pink-400" />
                <h3 className="font-bold text-lg mb-2">E-commerce</h3>
                <p className="text-center text-sm opacity-60">
                  An elegant e-commerce template to sell your products online.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <Chatbot />
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
