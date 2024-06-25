import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto mt-20 px-4 md:px-8"
    >
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p className="text-lg text-gray-700 mb-4">
          AnimateHub is your ultimate resource for learning and exploring animation techniques in
          web development. Whether you're a beginner or an expert, our curated collection of
          snippets and tutorials will help you bring your web projects to life.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Our mission is to inspire creativity and innovation through animation. Join our community
          and start creating stunning animations today!
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Connect with us on social media:
          <ul className="list-disc pl-8">
            <li>
              <a href="https://twitter.com/animatehub" className="text-blue-500 hover:underline">
                Twitter
              </a>
            </li>
            <li>
              <a href="https://facebook.com/animatehub" className="text-blue-500 hover:underline">
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/company/animatehub"
                className="text-blue-500 hover:underline"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </p>
      </div>
    </motion.div>
  );
};

export default About;
