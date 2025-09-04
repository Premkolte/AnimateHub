import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import { Link, useNavigate } from "react-router-dom";
import { LuLayoutTemplate } from 'react-icons/lu';

import { BsGithub } from "react-icons/bs";
import { GiTechnoHeart } from "react-icons/gi";
import { IoMdRocket } from "react-icons/io";
import { MdLibraryBooks } from "react-icons/md";
import TestimonialSection from "./Testimonial";
import Subscribe from "./Subscribe";
import PricingSection from "./Pricing";
import LandPage from "./LandPage";


const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: (
        <IoMdRocket
          size={50}
          className="text-center w-full mb-4 text-primary-600 dark:text-accent-500"
        />
      ),
      title: "Easy to Use",
      description:
        "Simple and intuitive components that make development a breeze.",
    },
    {
      icon: (
        <MdLibraryBooks
          size={50}
          className="text-center w-full mb-4 text-primary-600 dark:text-accent-500"
        />
      ),
      title: "Comprehensive Docs",
      description:
        "Detailed documentation to help you get started quickly and easily.",
    },
    {
      icon: (
        <GiTechnoHeart
          size={50}
          className="text-center w-full mb-4 text-primary-600 dark:text-accent-500"
        />
      ),
      title: "Modern Design",
      description:
        "Beautifully designed components that enhance your project's UI.",
    },
  ];



  return (
    <>
      <div className="w-full flex flex-col items-center justify-center min-h-screen relative z-10 backdrop-blur-md bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white p-6 space-y-16 pt-2 pb-16">
        <LandPage />

       


        {/* Features */}
        <section
          className="features-section w-full py-16 text-center"
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 dark:bg-gradient-to-r dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
              Features
            </h2>

            <div className="flex flex-wrap justify-center gap-12">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="bg-blue-50 dark:bg-gray-800 
            text-secondary-900 dark:text-white 
            border border-blue-400 dark:border-gray-600 
            p-8 rounded-lg shadow-md 
            transition-all duration-300 ease-in-out 
            hover:-translate-y-3 hover:shadow-xl
            max-w-xs w-full"
                >
                  {/* Icon */}
                  <div className="text-3xl mb-4">{feature.icon}</div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p>{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Templates */}

        <section className="templates-section mt-32 w-full flex justify-center px-6">
          <div
            className="w-full max-w-4xl rounded-2xl p-10 
            bg-white/70 dark:bg-secondary-900/60 
            backdrop-blur-xl shadow-2xl border border-white/20"
          >
            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-extrabold mb-4 text-center 
              bg-gradient-to-r from-blue-600 to-indigo-600 
              dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent"
            >
              Templates
            </motion.h2>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center mb-10 text-lg opacity-80"
            >
              Explore our library of handcrafted templates designed to kickstart
              your projects.
            </motion.p>

            {/* Buttons */}
            <div className="flex flex-wrap justify-center gap-4">


              <Link to="/templates">
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 250, damping: 15 }}
                  className="px-8 py-3 rounded-full text-lg font-semibold text-white
            bg-gradient-to-r from-blue-600 to-indigo-600 
            shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  View Templates
                </motion.button>
              </Link>

              <motion.a
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 250, damping: 15 }}
                href="https://github.com/Premkolte/AnimateHub/issues/new/choose"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-3 rounded-full text-lg font-semibold
          bg-white/10 backdrop-blur-md border border-white/20 
          text-secondary-900 dark:text-white
          shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <LuLayoutTemplate className="text-xl" />
                Submit a Template
              </motion.a>
            </div>
          </div>
        </section>

        {/* Testimonials */}

        <section className="testimonial-section w-full">
          <h2 className="text-4xl mb-8 text-center"></h2>
          <div className="overflow-x-hidden">
            <TestimonialSection />
          </div>
        </section>

        {/* Pricing */}

        <section className="text-center space-y-4 py-4 sm:py-6 md:py-10 pricing-section px-3 sm:px-4 md:px-6">
          <PricingSection />
        </section>

        {/* Subscription */}

        <section className="text-center space-y-4 pt-4 sm:pt-6 md:pt-8 pb-6 sm:pb-8 md:pb-16 pricing-section px-3 sm:px-4 md:px-6">
          <Subscribe />
        </section>

        {/* Contributors */}

        <section className="contributors-section mt-24 w-full flex justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="w-full max-w-5xl rounded-2xl p-10 md:p-14 
      bg-white/10 dark:bg-black/20 backdrop-blur-xl 
      border border-white/20 shadow-xl text-center"
          >
            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-extrabold mb-4 
        bg-gradient-to-r from-blue-600 to-indigo-600 
        dark:from-purple-400 dark:to-blue-400 
        bg-clip-text text-transparent"
            >
              Contributors
            </motion.h2>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto mb-10 text-lg opacity-80"
            >
              Meet the talented developers, designers, and open-source
              contributors who made this platform possible. Join the crew and
              help shape the future 🚀
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-6"
            >
              <Link to="/contributors">
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 250, damping: 15 }}
                  className="px-8 py-3 rounded-full text-lg font-semibold text-white
            bg-gradient-to-r from-blue-600 to-indigo-600 
            shadow-lg hover:shadow-blue-500/40 transition-all duration-300"
                >
                  View Contributors
                </motion.button>
              </Link>

              <motion.button
                onClick={() => navigate("/contributor-guide")}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 250, damping: 15 }}
                className="flex items-center gap-2 px-8 py-3 rounded-full text-lg font-semibold
          bg-white/10 backdrop-blur-md border border-white/20 
          text-secondary-900 dark:text-white
          shadow-lg hover:shadow-indigo-500/40 transition-all duration-300"
              >
                <BsGithub className="text-xl" />
                Become a Contributor
              </motion.button>
            </motion.div>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
