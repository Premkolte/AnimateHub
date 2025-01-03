import img1 from "./images/test-1.jfif";
import img2 from "./images/test-2.jfif";
import img3 from "./images/test-3.jpg";

const testimonials = [
  {
    id: 1,
    text: "A fantastic resource for developers. The open-source aspect is a huge plus!",
    name: "Sophie Weill",
    image: img1,
    bgColor: "bg-slate-950",
  },
  {
    id: 2,
    text: "We've seen significant improvement in user engagement after implementing AnimateHub.",
    name: "Charlie Stone",
    image: img2,
    bgColor: "bg-slate-950",
  },
  {
    id: 3,
    text: "The components are well-designed and easy to customize. Great job!",
    name: "Tress Reiley",
    image: img3,
    bgColor: "bg-slate-950",
  },
];

const TestimonialCard = ({ text, name, image, bgColor }) => {
  return (
    <div
      className={`p-8 h-auto rounded-lg shadow-lg ${bgColor} text-white flex flex-col justify-between relative transition-transform transform hover:scale-105`}
    >
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-2 w-10 bg-blue-300 rounded-t-lg"></div>
      <p className="mb-4 text-lg">{text}</p>
      <div className="flex items-center">
        <img
          src={image}
          alt={name}
          className="h-16 w-16 rounded-full mr-4 border-4 border-white"
        />
        <div className="text-center">
          <h5 className="font-bold">{name}</h5>
        </div>
      </div>
    </div>
  );
};

const TestimonialSection = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-4xl mb-8 text-center">Testimonials</h2>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} {...testimonial} />
        ))}
      </div>
    </div>
  );
};

export default TestimonialSection;
