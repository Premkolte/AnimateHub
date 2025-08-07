import React from "react";
import img1 from "./images/test-1.jfif";
import img2 from "./images/test-2.jfif";
import img3 from "./images/test-3.jpg";

const testimonials = [
  {
    id: 1,
    text: "A fantastic resource for developers. The open-source aspect is a huge plus!",
    name: "Sophie Weill",
    image: img1
  },
  {
    id: 2,
    text: "We've seen significant improvement in user engagement after implementing AnimateHub.",
    name: "Charlie Stone",
    image: img2
  },
  {
    id: 3,
    text: "The components are well-designed and easy to customize. Great job!",
    name: "Tress Reiley",
    image: img3
  }
];

const TestimonialCard = ({ text, name, image }) => {
  return (
    <div className="p-4 sm:p-6 md:p-8 h-auto min-h-[200px] sm:min-h-[240px] rounded-lg border border-transparent bg-primary-50 dark:bg-secondary-800 text-secondary-900 dark:text-white flex flex-col justify-between relative transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:ring-2 hover:ring-blue-400 dark:hover:ring-accent-500 hover:bg-blue-50/50 dark:hover:bg-secondary-700/40">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-2 w-10 bg-primary-500 dark:bg-accent-500 rounded-t-lg" />
      
      <p className="mb-4 text-sm sm:text-base md:text-lg flex-grow leading-relaxed break-words">
        {text}
      </p>

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-0 mt-auto">
        <img
          src={image}
          alt={name}
          className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 rounded-full sm:mr-4 border-4 border-white dark:border-secondary-700 flex-shrink-0"
        />
        <div className="text-center sm:text-left">
          <h5 className="font-bold text-xs sm:text-sm md:text-base">
            {name}
          </h5>
        </div>
      </div>
    </div>
  );
};



const TestimonialSection = () => {
  return (
    <div className="w-full max-w-7xl mx-auto py-6 sm:py-8 md:py-16 px-3 sm:px-4 md:px-6">
      <h2 className="text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold mb-6 sm:mb-8 md:mb-12">
        Testimonials
      </h2>
      <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} {...testimonial} />
        ))}
      </div>
    </div>
  );
};

export default TestimonialSection;
