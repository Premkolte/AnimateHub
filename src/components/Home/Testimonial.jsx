import React, { useState, useEffect } from "react";
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
    <div className="flex-none w-72 sm:w-80 sm:w-84 md:w-96 p-4 sm:p-6 md:p-8 h-auto min-h-[220px] sm:min-h-[240px] md:min-h-[260px] rounded-xl shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 text-gray-900 dark:text-white flex flex-col justify-between relative transition-all duration-300 transform hover:scale-105 hover:shadow-xl mx-2 sm:mx-3 border border-blue-100 dark:border-gray-700">
      
      {/* Top accent bar */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-2 w-12 bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-400 dark:to-indigo-400 rounded-t-lg shadow-sm" />
      
      {/* Quote icon */}
      <div className="absolute top-3 right-3 text-blue-200 dark:text-gray-600">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
        </svg>
      </div>

      <p className="mb-4 sm:mb-6 text-sm sm:text-base md:text-lg flex-grow leading-relaxed break-words text-gray-700 dark:text-gray-300 font-medium pr-8">
        {text}
      </p>
      
      <div className="flex flex-col xs:flex-row items-center xs:items-center gap-3 xs:gap-4 mt-auto pt-4 border-t border-blue-100 dark:border-gray-700">
        <img
          src={image}
          alt={name}
          className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-full border-4 border-white dark:border-gray-600 flex-shrink-0 shadow-md object-cover"
        />
        <div className="text-center sm:text-left">
          <h5 className="font-bold text-sm sm:text-base md:text-lg text-gray-800 dark:text-white">{name}</h5>
        </div>
      </div>
    </div>
  );
};

const TestimonialSection = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const maxIndex = testimonials.length - 1;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes scrollLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-100% / 3)); }
          }
        `,
        }}
      />

      <div className="w-full max-w-5xl mx-auto py-8 px-4">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-extrabold mb-8">
          Testimonials
        </h2>

        {isMobile ? (
          <div className="relative flex items-center justify-center max-w-md mx-auto">
            <button
              onClick={prevSlide}
              className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full shadow-md mr-3"
            >
              &#8592;
            </button>

            <div className="overflow-hidden rounded-lg shadow-lg" style={{ width: "280px" }}>
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                  width: `${testimonials.length * 280}px`,
                  transform: `translateX(-${currentIndex * 280}px)`,
                }}
              >
                {testimonials.map((t) => (
                  <div key={t.id} style={{ width: "280px" }}>
                    <TestimonialCard {...t} />
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={nextSlide}
              className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full shadow-md ml-3"
            >
              &#8594;
            </button>
          </div>
        ) : (
          <div className="overflow-hidden">
            <div
              className="flex"
              style={{
                animation: `scrollLeft 20s linear infinite`,
                animationPlayState: isPaused ? "paused" : "running",
                width: "max-content",
              }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {duplicatedTestimonials.map((t, i) => (
                <TestimonialCard key={`${t.id}-${i}`} {...t} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TestimonialSection;
