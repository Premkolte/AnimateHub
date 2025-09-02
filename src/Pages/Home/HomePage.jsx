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
import ReactJoyride from "react-joyride";
import Particles from "../../components/Particles";
import { useAuthStore } from "../../store/authStore";
import PricingSection from "./Pricing";

import HeroSection from "./HeroSection";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LandPage from "./LandPage";

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

    {
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
  }, []);

  const steps = [
    {
      target: ".browse-components-button",
      content: "Click here to browse our components.",
    },
    {
      target: ".get-started-button",
      content: "Click here to get started with our GitHub repository.",
    },
    {
      target: ".star-github-button",
      content: "Show your support by starring our GitHub repository.",
    },
    {
      target: ".pricing-section",
      content: "Check out our pricing plans here.",
    },
    {
      target: ".features-section",
      content: "Discover the amazing features we offer.",
    },
    {
      target: ".testimonial-section",
      content: "Read testimonials from our satisfied users.",
    },
    {
      target: ".contributors-section",
      content:
        "Meet our talented contributors who have made this amazing website.",
    },
    {
      target: ".templates-section",
      content: "Explore our handcrafted templates.",
    },
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

  // GSAP ScrollTrigger animations for each section (alternate left/right)
  useGSAP(() => {
    // Animate each section
    const sections = [
      {
        ref: featuresRef,
        from: { x: -20, opacity: 0 },
        to: { x: 0, opacity: 1 },
      },
      {
        ref: templatesRef,
        from: { x: 20, opacity: 0 },
        to: { x: 0, opacity: 1 },
      },
      {
        ref: testimonialsRef,
        from: { x: -20, opacity: 0 },
        to: { x: 0, opacity: 1 },
      },
      {
        ref: pricingRef,
        from: { x: 20, opacity: 0 },
        to: { x: 0, opacity: 1 },
      },
      {
        ref: subscribeRef,
        from: { x: -20, opacity: 0 },
        to: { x: 0, opacity: 1 },
      },
      {
        ref: contributorsRef,
        from: { x: 20, opacity: 0 },
        to: { x: 0, opacity: 1 },
      },
    ];

    sections.forEach(({ ref, from, to }) => {
      if (ref.current) {
        gsap.fromTo(ref.current, from, {
          ...to,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
          },
        });
      }
    });

    // Animate all feature cards only once
    gsap.utils.toArray(".feature-cards").forEach((el, i) => {
      gsap.from(el, {
        opacity: 0,
        y: -20,
        ease: "power2.in",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
      });
    });

    // Clean up triggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  useGSAP(() => {
    const sections = [
      {
        ref: featuresRef,
        from: { x: -20, opacity: 0 },
        to: { x: 0, opacity: 1 },
      },
      {
        ref: templatesRef,
        from: { x: 20, opacity: 0 },
        to: { x: 0, opacity: 1 },
      },
      {
        ref: testimonialsRef,
        from: { x: -20, opacity: 0 },
        to: { x: 0, opacity: 1 },
      },
      {
        ref: pricingRef,
        from: { x: 20, opacity: 0 },
        to: { x: 0, opacity: 1 },
      },
      {
        ref: subscribeRef,
        from: { x: -20, opacity: 0 },
        to: { x: 0, opacity: 1 },
      },
      {
        ref: contributorsRef,
        from: { x: 20, opacity: 0 },
        to: { x: 0, opacity: 1 },
      },
    ];

    sections.forEach(({ ref, from, to }) => {
      if (ref.current) {
        gsap.fromTo(ref.current, from, {
          ...to,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
          },
        });
      }
    });

    // Clean up triggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
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

      <div className="w-full flex flex-col items-center justify-center min-h-screen relative z-10 backdrop-blur-md bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white p-6 space-y-16 pt-2 pb-16">
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

        <LandPage />

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
        <section
          ref={featuresRef}
          className="features-section w-full py-16 text-center"
        >
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
