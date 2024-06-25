import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs, faLightbulb, faRocket } from '@fortawesome/free-solid-svg-icons';

const testimonials = [
  {
    quote: "AnimateHub has transformed the way I create animations. The components are so easy to use and customize!",
    name: "Jane Doe",
    role: "Front-end Developer"
  },
  {
    quote: "The best resource for animated UI components. Highly recommended for any web developer!",
    name: "John Smith",
    role: "UI/UX Designer"
  },
  {
    quote: "I love the creative designs and high performance of the animations. AnimateHub is a game-changer!",
    name: "Sarah Johnson",
    role: "Software Engineer"
  }
];

const HomePage = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/explore');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-r from-blue-400 to-purple-500 text-white px-4 mt-20">
      {/* Hero Section */}
      <motion.div
        className="text-center mb-20"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ marginTop: '72px' }} 
      >
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-7 pt-5">
          Welcome to AnimateHub
        </h2>
        <p className="text-base md:text-lg lg:text-xl mb-8 max-w-screen-lg mx-auto">
          Explore various animated components and more! AnimateHub is an open-source project where you can find and contribute to a collection of animated UI components built with React and other modern web technologies.
        </p>
        <motion.button
          className="text-white text-sm md:text-md lg:text-lg py-2 px-8 rounded-full shadow-md bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 focus:outline-none transform hover:scale-110 transition-transform duration-300"
          onClick={handleExploreClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Explore
        </motion.button>
      </motion.div>

      {/* Features Section */}
      <section className="w-full py-20 bg-gray-100 text-gray-800">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h3 className="text-2xl md:text-4xl font-bold mb-12">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <FontAwesomeIcon icon={faCogs} size="3x" className="mb-4 text-blue-500" />
              <h4 className="text-xl font-bold mb-2">Easy Integration</h4>
              <p>Integrate animated components effortlessly into your projects.</p>
            </div>
            <div className="flex flex-col items-center">
              <FontAwesomeIcon icon={faLightbulb} size="3x" className="mb-4 text-yellow-500" />
              <h4 className="text-xl font-bold mb-2">Creative Designs</h4>
              <p>Discover unique and innovative designs to enhance user experience.</p>
            </div>
            <div className="flex flex-col items-center">
              <FontAwesomeIcon icon={faRocket} size="3x" className="mb-4 text-red-500" />
              <h4 className="text-xl font-bold mb-2">High Performance</h4>
              <p>Enjoy high-performance animations that run smoothly on any device.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-20 bg-white text-gray-800">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h3 className="text-2xl md:text-4xl font-bold mb-12">What Our Users Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-lg">
                <p className="text-lg italic mb-4">"{testimonial.quote}"</p>
                <p className="font-bold">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Updates/Blog Section */}
      <section className="w-full py-20 bg-gray-100 text-gray-800">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h3 className="text-2xl md:text-4xl font-bold mb-12">Latest Updates</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-bold mb-2">New Animation Components Released</h4>
              <p className="text-gray-600">Check out our latest additions to the library.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-bold mb-2">Tutorial: Creating Custom Animations</h4>
              <p className="text-gray-600">Learn how to create your own custom animations.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-bold mb-2">Community Spotlight: User Projects</h4>
              <p className="text-gray-600">Discover amazing projects created by our community.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why AnimateHub Section */}
      <section className="w-full py-20 bg-white text-gray-800">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h3 className="text-2xl md:text-4xl font-bold mb-12">Why AnimateHub</h3>
          <p className="text-lg md:text-xl max-w-screen-lg mx-auto mb-8">
            AnimateHub is designed to make web development easier and more fun. Our components are not only easy to use but also highly customizable to fit any project. Join our community and start creating stunning animations today!
          </p>
        </div>
      </section>

      {/* Get Started Section */}
      <section className="w-full py-20 bg-gray-100 text-gray-800">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h3 className="text-2xl md:text-4xl font-bold mb-12">Get Started</h3>
          <p className="text-lg md:text-xl max-w-screen-lg mx-auto mb-8">
            Ready to start creating amazing animations? Head over to our documentation and explore the vast library of components we offer. Whether you're a beginner or an expert, AnimateHub has something for you.
          </p>
          <motion.button
            className="text-white text-sm md:text-md lg:text-lg py-2 px-8 rounded-full shadow-md bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 focus:outline-none transform hover:scale-110 transition-transform duration-300"
            onClick={handleExploreClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Explore Components
          </motion.button>
        </div>
      </section>

      {/* Contact Section */}
      <section className="w-full py-20 bg-gradient-to-r from-blue-400 to-purple-500 text-white">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h3 className="text-2xl md:text-4xl font-bold mb-12">Contact Us</h3>
          <p className="text-lg md:text-xl max-w-screen-lg mx-auto mb-8">
            Got any questions, suggestions, or feedback? We'd love to hear from you!
          </p>
          <motion.button
            className="text-white text-sm md:text-md lg:text-lg py-2 px-8 rounded-full shadow-md bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 focus:outline-none transform hover:scale-110 transition-transform duration-300"
            onClick={() => navigate('/contact')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Contact Us
          </motion.button>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="w-full py-8 bg-gray-800 text-white text-center">
        <p>&copy; 2024 AnimateHub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
