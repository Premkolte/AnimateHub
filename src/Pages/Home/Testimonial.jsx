"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
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
    rating: 5,
  },
  {
    id: 2,
    text: "After integrating AnimateHub, our website engagement in India went through the roof!",
    name: "Priya Nair",
    image: img4,
    rating: 4,
  },
  {
    id: 3,
    text: "The UI components are sleek and easy to tweak. Perfect for our startup's needs.",
    name: "Vikranth Jonna",
    image: img2,
    rating: 5,
  },
  {
    id: 4,
    text: "AnimateHub has streamlined our workflow completely. A must-have for Indian tech teams!",
    name: "Ananya Singh",
    image: img5,
    rating: 4,
  },
  {
    id: 5,
    text: "By far the smoothest animation library I've tried. The documentation is crystal clear.",
    name: "Vikram Iyer",
    image: img3,
    rating: 5,
  },
];

/**
 * Deduplicate testimonials by id to prevent duplicate entries.
 * Returns a new array with only unique testimonials.
 */
const getUniqueTestimonials = (items) => {
  const seen = new Set();
  return items.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
};

const TestimonialCard = ({ text, name, image, rating  }) => {
  return (
    <motion.div
      className="flex-none w-72 sm:w-80 md:w-96 p-8 h-auto min-h-[280px] rounded-2xl  bg-white dark:bg-secondary-800/90 backdrop-blur-sm   shadow-lg dark:shadow-lg dark:shadow-accent-900/20  flex flex-col justify-between relative transition-all duration-300   mx-3 hover:shadow-xl hover:shadow-primary-100 dark:hover:shadow-accent-900/30"
    >
      {/* Text */}
      <p className="mb-6 text-base md:text-lg flex-grow leading-relaxed text-gray-700 dark:text-gray-300 font-normal">
        "{text}"
      </p>

      {/* Star Rating */}
      {rating && (
        <div className="flex items-center mb-4">
          {Array.from({ length: 5 }, (_, index) => (
            <span
              key={index}
              className={`text-lg ${
                index < rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
              }`}
            >
              ★
            </span>
          ))}
        </div>
      )}

      {/* User */}
      <div className="flex items-center gap-4 mt-auto pt-5">
        <div className="relative">
          <div className="absolute -inset-1 bg-accent-500/30 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-200"></div>
          <img
            src={image}
            alt={name}
            className="relative h-14 w-14 rounded-full border-2 border-white dark:border-gray-700 shadow-md object-cover"
          />
        </div>
        <div>
          <h5 className="font-semibold text-lg text-gray-900 dark:text-white">
            {name}
          </h5>
        </div>
      </div>
    </motion.div>
  );
};

TestimonialCard.propTypes = {
  text: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  rating: PropTypes.number,
};

const TestimonialSection = () => {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef(null);
  const [scrollWidth, setScrollWidth] = useState(0);

  // Deduplicate testimonials to ensure no duplicate entries exist
  const uniqueTestimonials = useMemo(() => getUniqueTestimonials(testimonials), []);

  // Duplicate once for seamless infinite scroll looping
  const scrollTestimonials = useMemo(
    () => [...uniqueTestimonials, ...uniqueTestimonials],
    [uniqueTestimonials]
  );

  // Measure the exact pixel width of one set of testimonials
  // so the scroll resets seamlessly without visible duplication
  useEffect(() => {
    if (scrollRef.current) {
      const totalWidth = scrollRef.current.scrollWidth;
      setScrollWidth(totalWidth / 2);
    }
  }, [scrollTestimonials]);

  // Calculate animation duration based on content width for consistent speed
  const animationDuration = Math.max(scrollWidth / 50, 20);

  return (
    <section className="w-full py-10 md:py-16 relative overflow-hidden bg-secondary-50 dark:bg-secondary-900">

      <div className="relative mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Loved by developers
            <span className="text-primary-600 dark:text-accent-400">
              {' '}across the globe
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Join thousands of satisfied users who have transformed their projects with our components
          </motion.p>
        </div>

        {/* Scrolling Carousel */}
        <div className="relative">
          <div className="absolute -left-2 top-0 w-12 sm:w-16 md:w-24 h-full bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10" />
          <div className="absolute -right-2 top-0 w-12 sm:w-16 md:w-24 h-full bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10" />

          <div className="overflow-hidden">
            <div
              ref={scrollRef}
              className="flex scroll-container py-14"
              style={{
                animation: scrollWidth
                  ? `scrollLeft ${animationDuration}s linear infinite`
                  : "none",
                animationPlayState: isPaused ? "paused" : "running",
                width: "max-content",
                willChange: "transform",
              }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {scrollTestimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={`testimonial-${testimonial.id}-${index}`}
                  {...testimonial}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Keyframes - scroll by exact pixel width of one set for seamless loop */}
      <style>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-${scrollWidth}px); }
        }
      `}</style>
    </section>
  );
};

export default TestimonialSection;
