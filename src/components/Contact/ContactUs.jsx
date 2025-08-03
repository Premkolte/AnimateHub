import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import BackButton from "../BackButton";
import FAQ from "../../assets/FAQ";

const Contact = () => {
  const Blobs = () => (
    <>
      <svg
        className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 opacity-30 dark:opacity-50"
        width="600"
        height="600"
        viewBox="0 0 600 600"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(300,300)">
          <motion.path
            fill="#e5e7eb"
            className="dark:fill-white"
            animate={{
              d: [
                "M120.5,-132.3C156.6,-109.2,176.1,-54.6,169.7,-4.9C163.2,44.9,130.8,89.7,94.7,124.5C58.6,159.3,18.8,184.1,-34.6,192.9C-88,201.6,-154,194.3,-176.4,155.4C-198.9,116.5,-177.8,46,-157.3,-18.1C-136.8,-82.2,-116.8,-139.9,-78.4,-162.7C-40.1,-185.4,16.6,-173.2,63.2,-153.8C109.8,-134.4,144.4,-108.9,120.5,-132.3Z",
                "M110.1,-127.1C143.1,-104.8,159.1,-52.4,155.5,-3.8C151.9,44.8,128.6,89.7,96.2,128.1C63.8,166.6,21.4,198.6,-29.2,208.8C-79.8,218.9,-139.6,207.2,-177.8,167.2C-216.1,127.2,-232.7,59.1,-220.1,-2.7C-207.4,-64.5,-165.5,-119,-118,-148.8C-70.5,-178.5,-17.2,-183.5,32.2,-169.3C81.6,-155,127,-121.5,110.1,-127.1Z",
                "M109.7,-121.3C140.5,-98.4,148.5,-49.2,145.8,-2.6C143.2,44,129.9,87.9,101.3,120.5C72.7,153.1,28.8,174.4,-17.4,183.3C-63.5,192.1,-112.8,188.4,-146.8,156.2C-180.7,124,-199.3,63.3,-195.3,6.5C-191.4,-50.3,-164.8,-100.5,-125.8,-126.8C-86.8,-153,-43.4,-155.3,4.1,-159.3C51.7,-163.3,103.4,-169.8,109.7,-121.3Z",
                "M120.5,-132.3C156.6,-109.2,176.1,-54.6,169.7,-4.9C163.2,44.9,130.8,89.7,94.7,124.5C58.6,159.3,18.8,184.1,-34.6,192.9C-88,201.6,-154,194.3,-176.4,155.4C-198.9,116.5,-177.8,46,-157.3,-18.1C-136.8,-82.2,-116.8,-139.9,-78.4,-162.7C-40.1,-185.4,16.6,-173.2,63.2,-153.8C109.8,-134.4,144.4,-108.9,120.5,-132.3Z",
              ],
              transition: {
                duration: 10,
                repeat: Infinity,
                repeatType: "mirror",
              },
            }}
          />
        </g>
      </svg>

      <svg
        className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 opacity-30 dark:opacity-50"
        width="600"
        height="600"
        viewBox="0 0 600 600"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(300,300)">
          <motion.path
            fill="#e5e7eb"
            className="dark:fill-white"
            animate={{
              d: [
                "M120.5,-132.3C156.6,-109.2,176.1,-54.6,169.7,-4.9C163.2,44.9,130.8,89.7,94.7,124.5C58.6,159.3,18.8,184.1,-34.6,192.9C-88,201.6,-154,194.3,-176.4,155.4C-198.9,116.5,-177.8,46,-157.3,-18.1C-136.8,-82.2,-116.8,-139.9,-78.4,-162.7C-40.1,-185.4,16.6,-173.2,63.2,-153.8C109.8,-134.4,144.4,-108.9,120.5,-132.3Z",
                "M110.1,-127.1C143.1,-104.8,159.1,-52.4,155.5,-3.8C151.9,44.8,128.6,89.7,96.2,128.1C63.8,166.6,21.4,198.6,-29.2,208.8C-79.8,218.9,-139.6,207.2,-177.8,167.2C-216.1,127.2,-232.7,59.1,-220.1,-2.7C-207.4,-64.5,-165.5,-119,-118,-148.8C-70.5,-178.5,-17.2,-183.5,32.2,-169.3C81.6,-155,127,-121.5,110.1,-127.1Z",
                "M109.7,-121.3C140.5,-98.4,148.5,-49.2,145.8,-2.6C143.2,44,129.9,87.9,101.3,120.5C72.7,153.1,28.8,174.4,-17.4,183.3C-63.5,192.1,-112.8,188.4,-146.8,156.2C-180.7,124,-199.3,63.3,-195.3,6.5C-191.4,-50.3,-164.8,-100.5,-125.8,-126.8C-86.8,-153,-43.4,-155.3,4.1,-159.3C51.7,-163.3,103.4,-169.8,109.7,-121.3Z",
                "M120.5,-132.3C156.6,-109.2,176.1,-54.6,169.7,-4.9C163.2,44.9,130.8,89.7,94.7,124.5C58.6,159.3,18.8,184.1,-34.6,192.9C-88,201.6,-154,194.3,-176.4,155.4C-198.9,116.5,-177.8,46,-157.3,-18.1C-136.8,-82.2,-116.8,-139.9,-78.4,-162.7C-40.1,-185.4,16.6,-173.2,63.2,-153.8C109.8,-134.4,144.4,-108.9,120.5,-132.3Z",
              ],
              transition: {
                duration: 10,
                repeat: Infinity,
                repeatType: "mirror",
              },
            }}
          />
        </g>
      </svg>
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative flex flex-col items-center justify-center overflow-hidden w-full min-h-screen 
        bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 text-gray-900 
        dark:bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] 
        dark:from-indigo-500 dark:via-violet-500 dark:to-fuchsia-500 dark:text-white"
    >
      <div className="my-16">
        <FAQ />
      </div>

      <BackButton />
      <Blobs />

      <div className="relative z-10 mx-auto px-4 sm:px-8 md:px-20 text-black dark:text-white mb-16 max-w-4xl">
        <div className="bg-white/40 bg-opacity-80 backdrop-filter backdrop-blur-md border border-gray-200 rounded-lg shadow-lg p-8 md:p-12 dark:bg-white dark:bg-opacity-20 dark:border-none">
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
                className="btn btn-primary py-2 px-4 w-full sm:w-auto rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faPaperPlane} className="mr-2" /> Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
