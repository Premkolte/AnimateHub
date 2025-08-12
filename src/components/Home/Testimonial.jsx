import React, { useState } from "react";
import img1 from "./images/main.jpg";
import img2 from "./images/img2.jpeg";
import img3 from "./images/img.jpeg";
import img4 from "./images/img3.jpeg";
import img5 from "./images/img4.jpeg";


const testimonials = [
  {
    id: 1,
    text: "An amazing tool for developers in India. The open-source nature makes it even more valuable!",
    name: "Varnikumar Patel",
    image: img1
  },
  {
    id: 2,
    text: "After integrating AnimateHub, our website engagement in India went through the roof!",
    name: "Priya Nair",
    image: img4
  },
  {
    id: 3,
    text: "The UI components are sleek and easy to tweak. Perfect for our startup's needs.",
    name: "Vikranth Jonna",
    image: img2
  },
  {
    id: 4,
    text: "AnimateHub has streamlined our workflow completely. A must-have for Indian tech teams!",
    name: "Ananya Singh",
    image: img5
  },
  {
    id: 5,
    text: "By far the smoothest animation library I've tried. The documentation is crystal clear.",
    name: "Vikram Iyer",
    image: img3
  },
];

const TestimonialCard = ({ text, name, image }) => {
  return (
    <div className="flex-none w-72 xs:w-80 sm:w-84 md:w-96 p-4 sm:p-6 md:p-8 h-auto min-h-[220px] sm:min-h-[240px] md:min-h-[260px] rounded-xl shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 text-gray-900 dark:text-white flex flex-col justify-between relative transition-all duration-300 transform hover:scale-105 hover:shadow-xl mx-2 sm:mx-3 border border-blue-100 dark:border-gray-700">
      {/* Top accent bar */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-2 w-12 bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-400 dark:to-indigo-400 rounded-t-lg shadow-sm" />
      
      {/* Quote icon */}
      <div className="absolute top-3 right-3 text-blue-200 dark:text-gray-600">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
        </svg>
      </div>

      <p className="mb-4 sm:mb-6 text-sm sm:text-base md:text-lg flex-grow leading-relaxed break-words text-gray-700 dark:text-gray-300 font-medium pr-8">{text}</p>
      
      <div className="flex flex-col xs:flex-row items-center xs:items-center gap-3 xs:gap-4 mt-auto pt-4 border-t border-blue-100 dark:border-gray-700">
        <img
          src={image}
          alt={name}
          className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-full border-4 border-white dark:border-gray-600 flex-shrink-0 shadow-md object-cover"
        />
        <div className="text-center xs:text-left">
          <h5 className="font-bold text-sm sm:text-base md:text-lg text-gray-800 dark:text-white">{name}</h5>
          <p className="text-xs sm:text-sm text-blue-600 dark:text-accent-400 font-medium">Verified User</p>
        </div>
      </div>
    </div>
  );
};

const TestimonialSection = () => {
  const [isPaused, setIsPaused] = useState(false);
  
  // Triple duplicate testimonials for seamless continuous loop
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <>
      {/* CSS Animation Keyframes with responsive speed */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes scrollLeft {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-100% / 3));
            }
          }
          
          @media (max-width: 640px) {
            .scroll-container {
              animation-duration: 25s !important;
            }
          }
          
          @media (min-width: 641px) and (max-width: 1024px) {
            .scroll-container {
              animation-duration: 22s !important;
            }
          }
          
          @media (min-width: 1025px) {
            .scroll-container {
              animation-duration: 20s !important;
            }
          }
        `
      }} />
      
      <div className="w-full max-w-full mx-auto py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 bg-gradient-to-b bg-white dark:bg-gray-900">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 sm:mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 dark:text-accent-400 bg-clip-text text-transparent">
            What Our Users Say
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Trusted by developers and teams across India
          </p>
        </div>

        {/* Testimonials Container */}
        <div className="relative">
          {/* Gradient overlays for fade effect */}
          <div className="absolute -left-1 top-0 w-8 sm:w-16 md:w-24 h-full bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10 pointer-events-none" />
          <div className="absolute -right-1 top-0 w-8 sm:w-16 md:w-24 h-full bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10 pointer-events-none" />
          
          {/* Scrolling container */}
          <div className="overflow-hidden">
            <div
              className="flex scroll-container"
              style={{
                animation: `scrollLeft 20s linear infinite`,
                animationPlayState: isPaused ? 'paused' : 'running',
                width: 'max-content'
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
    </>
  );
};

export default TestimonialSection;