"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import img1 from "/assets/testimonials/img5.jpg";
import img2 from "/assets/testimonials/img2.jpeg";
import img3 from "/assets/testimonials/img.jpeg";
import img4 from "/assets/testimonials/img3.jpeg";
import img5 from "/assets/testimonials/img4.jpeg";

const testimonials = [
  {
    id: 1,
    text: "An amazing tool for developers in India. The open-source nature makes it even more valuable!",
    name: "Varnikumar Patel",
    image: img1,
  },
  {
    id: 2,
    text: "After integrating AnimateHub, our website engagement in India went through the roof!",
    name: "Priya Nair",
    image: img4,
  },
  {
    id: 3,
    text: "The UI components are sleek and easy to tweak. Perfect for our startup's needs.",
    name: "Vikranth Jonna",
    image: img2,
  },
  {
    id: 4,
    text: "AnimateHub has streamlined our workflow completely. A must-have for Indian tech teams!",
    name: "Ananya Singh",
    image: img5,
  },
  {
    id: 5,
    text: "By far the smoothest animation library I've tried. The documentation is crystal clear.",
    name: "Vikram Iyer",
    image: img3,
  },
];

const TestimonialCard = ({ text, name, image }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className="flex-none w-72 sm:w-80 md:w-96 p-6 h-auto min-h-[250px] rounded-2xl
                 bg-white/10 dark:bg-gray-900/40 backdrop-blur-xl border border-white/20 
                 shadow-lg flex flex-col justify-between relative transition-all duration-500 
                 mx-3"
    >
      {/* Quote Icon */}
      <div className="absolute top-4 right-4 text-indigo-400/60">
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
        </svg>
      </div>

      {/* Text */}
      <p className="mb-6 text-base md:text-lg flex-grow leading-relaxed text-gray-800 dark:text-gray-300 font-medium">
        {text}
      </p>

      {/* User */}
      <div className="flex items-center gap-4 mt-auto pt-4 border-t border-white/20 dark:border-gray-700">
        <img
          src={image}
          alt={name}
          className="h-14 w-14 rounded-full border-4 border-white dark:border-gray-600 shadow-lg object-cover"
        />
        <h5 className="font-semibold text-lg text-gray-900 dark:text-white">
          {name}
        </h5>
      </div>
    </motion.div>
  );
};

TestimonialCard.propTypes = {
  text: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

const TestimonialSection = () => {
  const [isPaused, setIsPaused] = useState(false);
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="w-full py-16 sm:py-20 md:py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-transparent backdrop-blur-xl border border-white/10 rounded-xl"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-600 bg-clip-text text-transparent"
          >
            What Our Users Say
          </motion.h2>
          <p className="mt-4 text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Trusted by developers and teams across India
          </p>
        </div>

        {/* Scrolling Carousel */}
        <div className="relative">
          <div className="absolute -left-2 top-0 w-12 sm:w-16 md:w-24 h-full bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10" />
          <div className="absolute -right-2 top-0 w-12 sm:w-16 md:w-24 h-full bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10" />

          <div className="overflow-hidden">
            <div
              className="flex scroll-container"
              style={{
                animation: "scrollLeft 22s linear infinite",
                animationPlayState: isPaused ? "paused" : "running",
                width: "max-content",
              }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {duplicatedTestimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={`${testimonial.id}-${index}`}
                  {...testimonial}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default TestimonialSection;
