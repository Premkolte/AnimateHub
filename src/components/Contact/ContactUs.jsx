import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import FAQ from "../../assets/FAQ";

const Contact = () => {


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative flex flex-col items-center justify-center overflow-hidden w-full min-h-screen bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white"
    >
      <div className="my-16 relative z-10 mx-auto px-4 sm:px-8 md:px-20 text-black dark:text-white mb-16 max-w-4xl">
        <div className="bg-white/40 bg-opacity-80 backdrop-filter backdrop-blur-md border border-gray-200 rounded-lg shadow-lg p-8 md:p-12 dark:bg-secondary-800 dark:border-none">
          <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg mb-4">
            Got any questions, suggestions, or feedback? We'd love to hear from you!
          </p>
          <p className="text-lg mb-10">
            Reach out to us via email at <strong>contact@animatehub.com</strong> or fill out the form below:
          </p>

          <form>
            <div className="p-10 pt-2 pb-10 px-4 sm:px-8 md:px-20">
              <label htmlFor="name" className="sr-only">Your Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faUser} className="text-gray-500" />
                </span>
                <input
                  type="text"
                  id="name"
                  required
                  placeholder="Your Name"
                  pattern="[a-zA-Z\s]+"
                  title="Name must only contain letters."
                  className="form-control border border-gray-300 rounded-md py-2 pl-10 pr-4 bg-gray-100 text-gray-800 w-full"
                />
              </div>
            </div>

            <div className="p-10 pt-2 pb-10 px-4 sm:px-8 md:px-20">
              <label htmlFor="email" className="sr-only">Your Email</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faEnvelope} className="text-gray-500" />
                </span>
                <input
                  type="email"
                  id="email"
                  placeholder="Your Email"
                  required
                  className="form-control border border-gray-300 rounded-md py-2 pl-10 pr-4 bg-gray-100 text-gray-800 w-full"
                />
              </div>
            </div>

            <div className="p-10 pt-2 px-4 sm:px-20 md:px-20">
              <label htmlFor="message" className="sr-only">Your Message</label>
              <textarea
                required
                id="message"
                placeholder="Your Message"
                rows="6"
                className="form-control border border-gray-300 rounded-md py-2 px-4 bg-gray-100 text-gray-800 w-full"
              ></textarea>
            </div>

            <div className="p-10 pt-4 text-center">
              <button
                type="submit"
                className="btn btn-primary py-2 px-4 w-full sm:w-auto rounded-md bg-primary-500 hover:bg-primary-600 dark:bg-accent-500 dark:hover:bg-accent-600 text-white transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faPaperPlane} className="mr-2" /> Send Message
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="my-16">
        <FAQ />
      </div>
    </motion.div>
  );
};

export default Contact;
