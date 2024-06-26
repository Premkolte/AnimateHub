import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative flex items-center justify-center min-h-screen"
    >
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-white-900 opacity-50 "
        style={{ zIndex: -1 }}
      ></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 text-white mb-10">
        <div className="bg-indigo-600 bg-opacity-90 rounded-lg shadow-lg p-8 md:p-12 lg:w-2/3 xl:w-1/2 mx-auto mt-7">
          <h1 className="text-3xl font-bold mb-3 ">About Us</h1>
          <p className="text-lg mb-4">
            AnimateHub is your ultimate resource for learning and exploring animation techniques in web development. Whether you're a beginner or an expert, our curated collection of snippets and tutorials will help you bring your web projects to life.
          </p>
          <p className="text-lg mb-4">
            Our mission is to inspire creativity and innovation through animation. Join our community and start creating stunning animations today!
          </p>
          <p className="text-lg mb-4">
            Connect with us on social media:
          </p>
          <ul className="list-none flex space-x-6">
            <li>
              <a href="https://twitter.com/animatehub" className="text-indigo-250 hover:underline">
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </a>
            </li>
            <li>
              <a href="https://facebook.com/animatehub" className="text-indigo-250 hover:underline">
                <FontAwesomeIcon icon={faFacebook} size="2x" />
              </a>
            </li>
            <li>
              <a href="https://linkedin.com/company/animatehub" className="text-indigo-250 hover:underline">
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
