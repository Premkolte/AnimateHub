
import React, { useState, useEffect } from "react";
import React, { useRef, useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaReact, FaHtml5, FaCss3Alt, FaHeart } from "react-icons/fa";
import { LuLayoutTemplate } from "react-icons/lu";
import { BiLogoTailwindCss } from "react-icons/bi";
import { BsGithub, BsStarFill } from "react-icons/bs";
import { GiTechnoHeart } from "react-icons/gi";
import { IoMdRocket } from "react-icons/io";
import { MdLibraryBooks } from "react-icons/md";
import TestimonialSection from "./Testimonial";
import Subscribe from "./Subscribe";
import ReactJoyride from "react-joyride";
import Particles from "../../components/Particles";
import { useAuthStore } from "../../store/authStore";
import PricingSection from "./Pricing";

import { dark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import HeroSection from "./HeroSection";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const HomePage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuthStore();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Section refs for scroll animations
  const featuresRef = useRef(null);
  const templatesRef = useRef(null);
  const testimonialsRef = useRef(null);
  const pricingRef = useRef(null);
  const subscribeRef = useRef(null);
  const contributorsRef = useRef(null);

  // Handler to update mouse position
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [bulbs, setBulbs] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (dark) {
      const colors = [
        "#ff0084ff",
        "#006effff",
        "#ed3b3bff",
        "#ff0022ff",
        "#00ffa2ff",
        "#11ff00ff",
        "#00ccffff",
        "#ff0000ff",
        "#00e5ffff",
        "#0037ffff",
        "#abffa5ff",
        "#ff00ddff",
      ];
      const newBulbs = [];
      for (let i = 0; i < 15; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = `${50 + Math.random() * 100}px`;
        const top = `${Math.random() * 100}%`;
        const left = `${Math.random() * 100}%`;
        const blur = `${20 + Math.random() * 20}px`;
        const opacity = 0.1 + Math.random() * 0.1;
        newBulbs.push({ color, size, top, left, blur, opacity });
      }
      setBulbs(newBulbs);
    }
  }, [dark]);

  const steps = [
    { target: ".browse-components-button", content: "Click here to browse our components." },
    { target: ".get-started-button", content: "Click here to get started with our GitHub repository." },
    { target: ".star-github-button", content: "Show your support by starring our GitHub repository." },
    { target: ".pricing-section", content: "Check out our pricing plans here." },
    { target: ".features-section", content: "Discover the amazing features we offer." },
    { target: ".testimonial-section", content: "Read testimonials from our satisfied users." },
    { target: ".contributors-section", content: "Meet our talented contributors who have made this amazing website." },
    { target: ".templates-section", content: "Explore our handcrafted templates." },
  ];

  const features = [
    {
      icon: (
        <IoMdRocket
          size={50}
          className="text-center w-full mb-4 text-primary-600 dark:text-accent-500"
        />
      ),
      title: "Easy to Use",
      description: "Simple and intuitive components that make development a breeze.",
    },
    {
      icon: (
        <MdLibraryBooks
          size={50}
          className="text-center w-full mb-4 text-primary-600 dark:text-accent-500"
        />
      ),
      title: "Comprehensive Docs",
      description: "Detailed documentation to help you get started quickly and easily.",
    },
    {
      icon: (
        <GiTechnoHeart
          size={50}
          className="text-center w-full mb-4 text-primary-600 dark:text-accent-500"
        />
      ),
      title: "Modern Design",
      description: "Beautifully designed components that enhance your project's UI.",
    },
  ];

  // GSAP ScrollTrigger animations for each section (alternate left/right)
  useGSAP(() => {
    const sections = [
      { ref: featuresRef, from: { x: -20, opacity: 0 }, to: { x: 0, opacity: 1 } },
      { ref: templatesRef, from: { x: 20, opacity: 0 }, to: { x: 0, opacity: 1 } },
      { ref: testimonialsRef, from: { x: -20, opacity: 0 }, to: { x: 0, opacity: 1 } },
      { ref: pricingRef, from: { x: 20, opacity: 0 }, to: { x: 0, opacity: 1 } },
      { ref: subscribeRef, from: { x: -20, opacity: 0 }, to: { x: 0, opacity: 1 } },
      { ref: contributorsRef, from: { x: 20, opacity: 0 }, to: { x: 0, opacity: 1 } },
    ];

    sections.forEach(({ ref, from, to }) => {
      if (ref.current) {
        gsap.fromTo(
          ref.current,
          from,
          {
            ...to,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 80%",
              end: "top 40%",
              scrub:1
            },
          }
        );
      }
    });

    // Clean up triggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <ReactJoyride
        steps={steps}
        continuous={true}
        showProgress={true}
        showSkipButton={true}
      />

      <div
        className="
w-full flex flex-col items-center justify-center min-h-screen relative z-10 backdrop-blur-md bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white p-6 space-y-16 pt-2 pb-16"
      >
        <div className="absolute inset-0 -z-10">
          {bulbs.map((b, i) => (
            <span
              key={i}
              className="absolute rounded-full"
              style={{
                width: b.size,
                height: b.size,
                top: b.top,
                left: b.left,
                backgroundColor: b.color,
                filter: `blur(${b.blur})`,
                opacity: b.opacity,
              }}
            ></span>
          ))}
        </div>


      <div className="w-full flex flex-col items-center justify-center min-h-screen bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white p-6 space-y-16 py-24 overflow-x-hidden">

        <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
          <Particles
            particleColors={["#ffffff", "#ffffff"]}
            particleCount={300}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
          />
        </div>

        <HeroSection></HeroSection>

        {/* Features */}
        <section className="features-section w-full py-16 text-center">
          <div className="max-w-7xl mx-auto">
            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-5xl font-bold mb-12 
        bg-gradient-to-r from-blue-600 to-cyan-600 
        dark:from-purple-400 dark:to-blue-400 
        bg-clip-text text-transparent"
            >
              Features
            </motion.h2>

            {/* Cards */}

        <motion.div
          className="text-center max-w-3xl relative -top-20"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-primary-600 dark:bg-accent-600 text-white px-4 py-1 rounded-full inline-block text-sm mb-6">
            100% OPEN-SOURCE
          </div>
          <motion.p
            className="text-4xl md:text-6xl mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            Animation UI Library <br /> for Developers
          </motion.p>
          <p className="text-md mb-10">
            Open-sourced components made with
            <br />
            <span className="font-bold">HTML + CSS</span> &{" "}
            <span className="font-bold">React + Tailwind</span>.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            {/* --- BROWSE COMPONENTS BUTTON MODIFIED --- */}
            <motion.button
              style={{ position: "relative", overflow: "hidden" }}
              className="browse-components-button rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-md"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={() => navigate("/explore")}
            >
              <motion.div
                className="pointer-events-none absolute -inset-px rounded-full"
                style={{
                  background: `radial-gradient(250px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 222, 105, 0.5), transparent 80%)`,
                }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
              <span className="relative z-10">
                Browse Components
              </span>
            </motion.button>

            {/* Fancy Secondary Button */}
            <motion.button
              className="get-started-button rounded-full border-2 border-blue-400 bg-transparent px-8 py-4 text-lg font-semibold text-blue-600 hover:bg-blue-400 hover:text-white shadow-sm hover:shadow-md transition-all duration-300 ease-out hover:scale-105"
              whileHover={{ scale: 1.035 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={() => window.location.href = "https://github.com/Premkolte/AnimateHub"}
            >
              Get Started
            </motion.button>

            {/* Favorites Button - Only show for signed in users */}
            {currentUser ? (
              <motion.button
                className="flex items-center gap-2 rounded-full bg-gradient-to-br from-red-500 to-pink-500 px-8 py-4 text-lg font-semibold text-white shadow-md hover:shadow-lg transition-all duration-300 ease-out hover:scale-105"
                whileHover={{ scale: 1.035 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={() => navigate("/favorites")}
              >
                <FaHeart />
                My Favorites
              </motion.button>
            ) : (
              <motion.button
                className="flex items-center gap-2 rounded-full border-2 border-red-400 bg-transparent px-8 py-4 text-lg font-semibold text-red-600 hover:bg-red-400 hover:text-white shadow-sm hover:shadow-md transition-all duration-300 ease-out hover:scale-105"
                whileHover={{ scale: 1.035 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={() => navigate("/sign-in")}
              >
                <FaHeart />
                Sign In for Favorites
              </motion.button>
            )}
          </div>
        </motion.div>

        <section className="flex flex-col space-y-6 mt-12 relative -top-16">
          <div className="flex space-x-6">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://developer.mozilla.org/en-US/docs/Web/HTML"
            >
              <FaHtml5 className="h-12 w-12" />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://developer.mozilla.org/en-US/docs/Web/CSS"
            >
              <FaCss3Alt className="h-12 w-12" />
            </a>
            <a target="_blank" rel="noopener noreferrer" href="https://react.dev/learn">
              <FaReact className="h-12 w-12" />
            </a>
            <a target="_blank" rel="noopener noreferrer" href="https://tailwindcss.com/">
              <BiLogoTailwindCss className="h-12 w-12" />
            </a>
          </div>

          <motion.a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/Premkolte/AnimateHub"
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
        <section ref={featuresRef} className="features-section w-full py-16 text-center">
          <div id="featuresGSAP" className="max-w-7xl mx-auto">
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
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-6"

        <section ref={templatesRef} className="templates-section mt-20 w-full flex flex-col items-center text-secondary-900 dark:text-white px-4">
          <h2 className="text-4xl font-bold mb-4 text-center">Templates</h2>
          <p className="max-w-2xl text-center mb-8 text-lg opacity-80">
            Explore our library of handcrafted templates designed to kickstart
            your projects.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/templates">
              <motion.button
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-primary-600 dark:bg-accent-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow hover:shadow-xl transition-all duration-300 ease-out hover:scale-105"
              >
                View Templates
              </motion.button>
            </Link>
            <motion.a
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              href="https://github.com/Premkolte/AnimateHub/issues/new/choose"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-secondary-800 dark:bg-secondary-700 text-white px-6 py-3 rounded-full text-lg font-semibold shadow hover:shadow-xl transition-all duration-300 ease-out hover:scale-105"

            >
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
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}

        <section className="testimonial-section w-full">

        <section ref={testimonialsRef} className="testimonial-section w-full">

          <h2 className="text-4xl mb-8 text-center"></h2>
          <div className="overflow-x-hidden">
            <TestimonialSection />
          </div>
        </section>

        {/* Pricing */}

<section className="text-center space-y-4 py-4 sm:py-6 md:py-10 pricing-section px-3 sm:px-4 md:px-6">

        <section ref={pricingRef} className="text-center space-y-4 py-6 sm:py-8 md:py-16 pricing-section px-3 sm:px-4 md:px-6">

          <PricingSection />
        </section>

        {/* Subscription */}

<section className="text-center space-y-4 pt-4 sm:pt-6 md:pt-8 pb-6 sm:pb-8 md:pb-16 pricing-section px-3 sm:px-4 md:px-6">

        <section ref={subscribeRef} className="text-center space-y-4 py-6 sm:py-8 md:py-16 pricing-section px-3 sm:px-4 md:px-6">

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
      Meet the talented developers, designers, and open-source contributors who made this platform possible.  
      Join the crew and help shape the future 🚀
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


        <section ref={contributorsRef} className="contributors-section mt-20 w-full flex flex-col items-center text-secondary-900 dark:text-white px-4 py-8">
          <h2 className="text-4xl font-bold mb-4 text-center">Contributors</h2>
          <p className="max-w-2xl text-center mb-6 text-lg opacity-80">
            Meet the talented developers, designers, and open-source
            contributors who made this platform possible. Join the crew and
            shape the future!
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/contributors">
              <motion.button
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-primary-600 dark:bg-accent-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow hover:shadow-xl transition-all duration-300 ease-out hover:scale-105"
              >
                View Contributors
              </motion.button>
            </Link>
            <motion.a
              onClick={() => navigate('/contributor-guide')}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer flex items-center bg-secondary-800 dark:bg-secondary-700 text-white px-6 py-3 rounded-full text-lg font-semibold shadow hover:shadow-xl transition-all duration-300 ease-out hover:scale-105"
            >
              <BsGithub className="inline-block mr-2 text-xl" />
              Become a Contributor
            </motion.a>
          </div>
        </section>

      </div>
    </>
  );
};

export default HomePage;
