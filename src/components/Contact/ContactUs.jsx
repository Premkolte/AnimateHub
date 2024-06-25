import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto mt-20 px-4 md:px-8"
    >
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg text-gray-700 mb-4">
          Got any questions, suggestions, or feedback? We'd love to hear from you!
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Reach out to us via email at <strong>contact@animatehub.com</strong> or fill out the form
          below:
        </p>
        <form className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="border border-gray-300 rounded-md p-2"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="border border-gray-300 rounded-md p-2"
          />
          <textarea
            placeholder="Your Message"
            rows="4"
            className="border border-gray-300 rounded-md p-2"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Contact;
