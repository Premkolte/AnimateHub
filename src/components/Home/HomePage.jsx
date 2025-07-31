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
import TestimonialSection from "./Testimonial";
import ReactJoyride from 'react-joyride';

const HomePage = () => {
  const navigate = useNavigate();

  const steps = [
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
  ];

  const plans = [
    {
      planName: "Starter",
      planSubText: "For the individual and small teams",
      price: "$0",
      priceSubText: "per month",
      features: [
        "Access to all components",
        "Access to codebase"
      ],
      btnText: "Get Started",
      redirectTo: "/payment"
    },
    {
      planName: "Pro",
      planSubText: "For larger teams and enterprises",
      price: "$49",
      priceSubText: "per month",
      features: [
        "Priority support",
        "Access to exclusive components",
        "Custom solutions"
      ],
      btnText: "Get Started",
      redirectTo: "/payment"
    },
    {
      planName: "Enterprise",
      planSubText: "Tailored solutions for large enterprises",
      price: "Contact us",
      priceSubText: "for pricing",
      features: [
        "Customizable plans",
        "Dedicated support team",
        "Advanced analytics"
      ],
      btnText: "Contact Us",
      redirectTo: "/contact"
    }
  ];

  const features = [
    {
      icon: <IoMdRocket size={50} className="mb-4 text-primary-600 dark:text-accent-500" />,
      title: "Easy to Use",
      description: "Simple and intuitive components that make development a breeze."
    },
    {
      icon: <MdLibraryBooks size={50} className="mb-4 text-primary-600 dark:text-accent-500" />,
      title: "Comprehensive Docs",
      description: "Detailed documentation to help you get started quickly and easily."
    },
    {
      icon: <GiTechnoHeart size={50} className="mb-4 text-primary-600 dark:text-accent-500" />,
      title: "Modern Design",
      description: "Beautifully designed components that enhance your project's UI."
    }
  ];


  return (
    <>
      <ReactJoyride steps={steps} continuous={true} showProgress={true} showSkipButton={true} />
      <div className="w-full flex flex-col items-center justify-center min-h-screen bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white p-6 space-y-16 py-24">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl"
        >
          <div className="bg-primary-600 dark:bg-accent-600 text-white px-4 py-1 rounded-full inline-block text-sm mb-6">
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
              className="bg-primary-600 hover:bg-primary-700 dark:bg-accent-600 dark:hover:bg-accent-700 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg browse-components-button transition-colors duration-200"
              onClick={() => {
                navigate("/explore");
              }}
            >
              Browse Components
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="border-2 border-primary-600 dark:border-accent-600 text-primary-600 dark:text-accent-600 hover:bg-primary-600 hover:text-white dark:hover:bg-accent-600 dark:hover:text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg get-started-button transition-all duration-200"
              onClick={() => {
                window.location.href =
                  "https://github.com/Premkolte/AnimateHub";
              }}
            >
              Get Started
            </motion.button>
          </div>
        </motion.div>

        <section className="flex flex-col space-y-6 mt-12">
          <div className="flex space-x-6">
            <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/HTML"><FaHtml5 className="h-12 w-12" /></a>
            <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS"><FaCss3Alt className="h-12 w-12" /></a>
            <a target="_blank" href="https://react.dev/learn"><FaReact className="h-12 w-12" /></a>
            <a target="_blank" href="https://tailwindcss.com/"><BiLogoTailwindCss className="h-12 w-12" /></a>
          </div>

          <motion.a href="https://github.com/Premkolte/AnimateHub"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center gap-4 whitespace-nowrap rounded-md text-sm font-medium h-12 px-6 py-3 group bg-secondary-700 dark:bg-secondary-800 hover:bg-secondary-800 dark:hover:bg-secondary-600 transition-all duration-200 ease-in-out star-github-button"
          >
            <BsGithub color="white" size={25} />
            <span className="text-white text-xl">Star on Github</span>
            <BsStarFill size={25} className="text-yellow-500" />
          </motion.a>

        </section>






        {/* Features */}
        <section className="features-section py-16 text-center">
          <h2 className="text-4xl font-bold mb-12">Features</h2>

          <div className="flex flex-wrap justify-center gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-primary-50 dark:bg-secondary-800 text-secondary-900 dark:text-white border border-primary-200 dark:border-secondary-700 p-8 rounded-lg shadow-lg max-w-xs w-full"
                whileHover={{ scale: 1.05 }}
              >
                {feature.icon}
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Templates */}
        <section className="templates-section mt-20 w-full flex flex-col items-center text-secondary-900 dark:text-white px-4">
          <h2 className="text-4xl font-bold mb-4 text-center">Templates</h2>
          <p className="max-w-2xl text-center mb-8 text-lg opacity-80">
            Explore our library of handcrafted templates designed to kickstart your projects.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/templates">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-primary-600 dark:bg-accent-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow hover:shadow-xl transition-all"
              >
                View Templates
              </motion.button>
            </Link>

            <motion.a
              whileHover={{ scale: 1.05 }}
              href="https://github.com/Premkolte/AnimateHub/issues/new/choose"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-secondary-800 dark:bg-secondary-700 text-white px-6 py-3 rounded-full text-lg font-semibold shadow hover:shadow-xl transition-all"
            >
              <LuLayoutTemplate className="inline-block mr-2 text-xl" />
              Submit a Template
            </motion.a>
          </div>
        </section>

        {/* Testimonials */}
        <section className="testimonial-section">
          <h2 className="text-4xl mb-8 text-center"></h2>
          <TestimonialSection />
        </section>

        {/* Pricing */}
        <section className="text-center space-y-4 py-6 sm:py-8 md:py-16 pricing-section px-3 sm:px-4 md:px-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">Pricing</h1>

          <div className="flex flex-col xl:flex-row justify-center items-stretch gap-4 sm:gap-6 md:gap-8 xl:gap-12 mt-6 sm:mt-8 max-w-7xl mx-auto">
            {plans.map((plan, idx) => (
              <motion.div
                key={idx}
                className="flex flex-col items-center bg-white dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700 p-4 sm:p-6 md:p-8 rounded-lg shadow-lg w-full max-w-sm min-h-[400px] sm:min-h-[450px]"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-full flex-1">
                  <h2 className="font-extrabold text-xl sm:text-2xl md:text-3xl text-center mb-2">
                    {plan.planName}
                  </h2>
                  <p className="opacity-60 text-center text-xs sm:text-sm md:text-base mb-4">{plan.planSubText}</p>
                  <div className="flex flex-col items-center my-4 sm:my-6 md:my-8">
                    <p className="font-extrabold text-2xl sm:text-3xl md:text-4xl">{plan.price}</p>
                    <p className="text-xs sm:text-sm opacity-60">{plan.priceSubText}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-1 sm:gap-2 w-full flex-1 justify-between">
                  <div>
                    {plan.features.map((feature, index) => (
                      <p key={index} className="text-xs sm:text-sm md:text-base mb-1 sm:mb-2">✔️<b>{feature}</b></p>
                    ))}
                  </div>

                  <div className="flex justify-center mt-4 sm:mt-6 md:mt-8">
                    <Link
                      to={plan.redirectTo}
                      className="px-3 sm:px-4 py-2 border-primary-500 dark:border-accent-500 border-2 text-primary-600 dark:text-accent-600 hover:bg-primary-500 hover:text-white dark:hover:bg-accent-500 dark:hover:text-white rounded-xl transition-all duration-200 text-xs sm:text-sm md:text-base whitespace-nowrap"
                    >
                      {plan.btnText}
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contributors */}
        <section className="contributors-section mt-20 w-full flex flex-col items-center text-secondary-900 dark:text-white px-4">
          <h2 className="text-4xl font-bold mb-4 text-center">Contributors</h2>
          <p className="max-w-2xl text-center mb-6 text-lg opacity-80">
            Meet the talented developers, designers, and open-source contributors
            who made this platform possible. Join the crew and shape the future!
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/contributors">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-primary-600 dark:bg-accent-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow hover:shadow-xl transition-all"
              >
                View Contributors
              </motion.button>
            </Link>

            <motion.a
              whileHover={{ scale: 1.05 }}
              href="https://github.com/Premkolte/AnimateHub"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-secondary-800 dark:bg-secondary-700 text-white px-6 py-3 rounded-full text-lg font-semibold shadow hover:shadow-xl transition-all"
            >
              <BsGithub className="inline-block mr-2 text-xl" />
              Become a Contributor
            </motion.a>
          </div>
        </section>



        {/* <div className="templates-section mt-12 w-full flex flex-col items-center text-white">
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
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="bg-black text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg"
            >
              <a
                href="https://github.com/Premkolte/AnimateHub/issues/new/choose"
                className="bg-black text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg"
              >
                <LuLayoutTemplate className="inline-block mr-2" />
                Submit a Template
              </a>
            </motion.button>
          </div>
        </div> */}
      </div>

    </>
  );
};

export default HomePage;
