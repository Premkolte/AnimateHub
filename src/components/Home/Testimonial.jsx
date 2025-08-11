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

const TestimonialCard = ({ text, name, image, noMargin = false, style }) => (
  <div
    className={`flex-none p-4 sm:p-6 md:p-8 rounded-lg shadow-lg bg-blue-50 dark:bg-gray-800 text-gray-900 dark:text-white flex flex-col justify-between relative transition-transform transform hover:scale-105 ${
      noMargin ? "mx-0" : "mx-3"
    }`}
    style={{
      width: "280px",
      minHeight: "260px",
      ...style,
    }}
  >
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-2 w-10 bg-blue-500 dark:bg-blue-400 rounded-t-lg" />
    <p className="mb-4 text-sm sm:text-base md:text-lg flex-grow leading-relaxed break-words">
      {text}
    </p>
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-0 mt-auto">
      <img
        src={image}
        alt={name}
        className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 rounded-full sm:mr-4 border-4 border-white flex-shrink-0"
      />
      <div className="text-center sm:text-left">
        <h5 className="font-bold text-xs sm:text-sm md:text-base pt-4">
          {name}
        </h5>
      </div>
    </div>
  </div>
);

const TestimonialSection = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const maxIndex = testimonials.length - 1;

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
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

  // Desktop infinite scroll (no changes)
  const duplicatedTestimonials = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ];

  return (
    <>
      {!isMobile && (
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
      )}

      <div className="w-full max-w-5xl mx-auto py-6 sm:py-8 md:py-16 px-3 sm:px-4 md:px-6">
        <h2 className="text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold mb-6 sm:mb-8 md:mb-12">
          Testimonials
        </h2>

        {isMobile ? (
          <div className="relative flex items-center justify-center max-w-md mx-auto px-4 py-4">
            <button
              onClick={prevSlide}
              className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none shadow-md mr-3"
              aria-label="Previous"
            >
              &#8592;
            </button>

            <div
              className="overflow-hidden rounded-lg shadow-lg"
              style={{ width: "280px" }}
            >
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                  width: `${testimonials.length * 280}px`,
                  transform: `translateX(-${currentIndex * 280}px)`,
                }}
              >
                {testimonials.map(({ id, text, name, image }) => (
                  <div
                    key={id}
                    className="flex-shrink-0"
                    style={{ width: "280px" }}
                  >
                    <TestimonialCard
                      text={text}
                      name={name}
                      image={image}
                      noMargin={true}
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={nextSlide}
              className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none shadow-md ml-3"
              aria-label="Next"
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
              {duplicatedTestimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={`${testimonial.id}-${index}`}
                  {...testimonial}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TestimonialSection;
