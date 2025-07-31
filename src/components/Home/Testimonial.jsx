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
    <div className="p-6 sm:p-8 h-auto sm:h-60 rounded-lg shadow-lg bg-primary-50 dark:bg-secondary-800 text-secondary-900 dark:text-white flex flex-col justify-between relative transition-transform transform hover:scale-105">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-2 w-10 bg-primary-500 dark:bg-accent-500 rounded-t-lg" />
      <p className="mb-4 text-base sm:text-lg flex-grow">{text}</p>
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-0">
        <img
          src={image}
          alt={name}
          className="h-12 w-12 sm:h-16 sm:w-16 rounded-full sm:mr-4 border-4 border-white"
        />
        <div className="text-center sm:text-left">
          <h5 className="font-bold text-sm sm:text-base">{name}</h5>
        </div>
      </div>
    </div>
  );
};

const TestimonialSection = () => {
  return (
    <div className="container mx-auto py-8 sm:py-16 px-4 sm:px-6">
      <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-extrabold mb-8 sm:mb-12">
        Testimonials
      </h2>
      <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} {...testimonial} />
        ))}
      </div>
    </div>
  );
};

export default TestimonialSection;
