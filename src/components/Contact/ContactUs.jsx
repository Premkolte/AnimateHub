import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser } from '@fortawesome/free-regular-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-white-900 opacity-50"
        style={{ zIndex: -1 }}
      ></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto mt-20 px-19 md:px-10 text-white mt-10 w-150">
        <div className="bg-violet-600 bg-opacity-90 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg mb-4">
            Got any questions, suggestions, or feedback? We'd love to hear from you!
          </p>
          <p className="text-lg mb-4">
            Reach out to us via email at <strong>contact@animatehub.com</strong> or fill out the form
            below:
          </p>
          <form className="flex flex-col space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="sr-only" htmlFor="name">Your Name</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon icon={faUser} className="text-gray-500" />
                  </span>
                  <input
                    type="text"
                    id="name"
                    placeholder="Your Name"
                    className="form-control border border-gray-300 rounded-md py-2 pl-10 pr-4 bg-gray-100 text-gray-800"
                  />
                </div>
              </div>
              <div className="flex-1">
                <label className="sr-only" htmlFor="email">Your Email</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon icon={faEnvelope} className="text-gray-500" />
                  </span>
                  <input
                    type="email"
                    id="email"
                    placeholder="Your Email"
                    className="form-control border border-gray-300 rounded-md py-2 pl-10 pr-4 bg-gray-100 text-gray-800"
                  />
                </div>
              </div>
            </div>
            <div className="flex-1">
              <label className="sr-only" htmlFor="message">Your Message</label>
              <textarea
                id="message"
                placeholder="Your Message"
                rows="4"
                className="form-control border border-gray-300 rounded-md py-2 px-4 bg-gray-100 text-gray-800"
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn btn-primary py-2 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
            >
              <FontAwesomeIcon icon={faPaperPlane} className="me-2" /> Send Message
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
