import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaReact, FaHtml5, FaCss3Alt } from "react-icons/fa";
import { LuLayoutTemplate } from "react-icons/lu";
import { BiLogoTailwindCss } from "react-icons/bi";
import { BsGithub, BsPeople, BsStarFill } from "react-icons/bs";
import { GiTechnoHeart } from "react-icons/gi";
import { IoMdRocket } from "react-icons/io";
import { MdLibraryBooks } from "react-icons/md";
import Chatbot from "./Chatbot";
import TestimonialSection from "./Testimonial";
import Navbar from "./Navbar";
import Footer from "../Footer";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="w-full bg-slate-900 flex flex-col items-center justify-center min-h-screen text-white pt-[130px]">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center flex items-center justify-center flex-col"
        >
          <div className="bg-blue-800 text-white px-4 py-1 2xl:py-4 rounded-full inline-block text-sm mb-6">
            100% OPEN-SOURCE
          </div>
          <motion.p
            className="2xl:text-6xl xl:text-6xl md:text-5xl text-3xl md:text-6xl mb-6"
            whileHover={{ scale: 1.05 }}
          >
            Animation UI Library <br /> for Developers
          </motion.p>
          <p className="text-md mb-10">
            Open-sourced components made with
            <br />
            <span className="font-bold">HTML + CSS</span> &{" "}
            <span className="font-bold">React + Tailwind</span>.
          </p>

          <div className="flex space-x-6 justify-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="bg-blue-800 text-white 2xl:px-6 xl:px-6 md:px-6 lg:px-6 px-4 py-3 rounded-full 2xl:text-lg xl:text-lg md:text-lg sm:text-md text-sm font-semibold shadow-lg browse-components-button"
              onClick={() => {
                navigate("/explore");
              }}
            >
              Browse Components
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="border border-blue-800 text-blue-800 2xl:px-6 xl:px-6 md:px-6 lg:px-6 px-4 py-3 rounded-full 2xl:text-lg xl:text-lg md:text-lg sm:text-md text-sm font-semibold shadow-lg get-started-button"
              onClick={() => {
                window.location.href =
                  "https://github.com/Premkolte/AnimateHub";
              }}
            >
              Get Started
            </motion.button>
          </div>
          <div className="flex justify-center space-x-6 mt-12">
            <FaHtml5 className="h-12 w-12 text-blue-600" />
            <FaCss3Alt className="h-12 w-12 text-blue-600" />
            <FaReact className="h-12 w-12 text-blue-600" />
            <BiLogoTailwindCss className="h-12 w-12 text-blue-600" />
          </div>

          <motion.a
            href="https://github.com/Premkolte/AnimateHub"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center gap-4 whitespace-nowrap rounded-md text-sm font-medium h-12 px-6 py-3 group bg-blue-800 hover:bg-blue-900 transition-all duration-200 ease-in-out star-github-button m-12"
          >
            <BsGithub size={25} />
            <span className="text-white text-xl">Star on Github</span>
            <BsStarFill size={25} className="text-yellow-500" />
          </motion.a>
        </motion.div>

        {/* Pricing Plans Section */}
        <h2 className="text-4xl text-center">Pricing</h2>
        <div className="flex flex-wrap justify-center gap-12 mt-8">
          {/* Starter Plan */}
          <motion.div
            className="flex flex-col items-center bg-slate-950 p-8 rounded-lg shadow-lg w-[272px] lg:w-80 xl:w-80 2xl:w-80"
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="font-extrabold text-3xl text-center mb-2 text-white">
              Starter
            </h2>
            <p className="opacity-60 text-center text-white">
              For individuals and small teams
            </p>
            <div className="flex flex-col items-center my-8">
              <p className="font-extrabold text-4xl text-white">$0</p>
              <p className="text-sm opacity-60 text-white">per month</p>
            </div>
            <div className="flex flex-col gap-1 text-white">
              <p>
                ✔️ <b>Access to all components</b>
              </p>
              <p>
                ✔️ <b>Access to codebase</b>
              </p>
            </div>
            <button
              className="m-5 px-4 py-2 border-blue-800 border-4 hover:bg-blue-800 rounded-xl"
              onClick={() => {
                navigate("/payment");
              }}
            >
              Get Started
            </button>
          </motion.div>

          {/* Pro Plan */}
          <motion.div
            className="flex flex-col items-center bg-slate-950 p-8 rounded-lg shadow-lg w-[272px] lg:w-80 xl:w-80 2xl:w-80"
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="font-extrabold text-3xl text-center mb-2 text-white">
              Pro
            </h2>
            <p className="opacity-60 text-center text-white">
              For larger teams and enterprises
            </p>
            <div className="flex flex-col items-center my-8">
              <p className="font-extrabold text-4xl text-white">$49</p>
              <p className="text-sm opacity-60 text-white">per month</p>
            </div>
            <div className="flex flex-col gap-1 text-white">
              <p>
                ✔️ <b>Priority support</b>
              </p>
              <p>
                ✔️ <b>Exclusive components</b>
              </p>
              <p>
                ✔️ <b>Custom solutions</b>
              </p>
            </div>
            <button
              className="m-5 px-4 py-2 border-blue-800 border-4 hover:bg-blue-800 rounded-xl"
              onClick={() => {
                navigate("/payment");
              }}
            >
              Get Started
            </button>
          </motion.div>

          {/* Enterprise Plan */}
          <motion.div
            className="flex flex-col items-center bg-slate-950 p-8 rounded-lg shadow-lg w-[272px] lg:w-80 xl:w-80 2xl:w-80"
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="font-extrabold text-3xl text-center mb-2 text-white">
              Enterprise
            </h2>
            <p className="opacity-60 text-center text-white">
              Custom solutions for big enterprises
            </p>
            <div className="flex flex-col items-center my-8">
              <p className="font-extrabold text-4xl text-white">Contact us</p>
              <p className="text-sm opacity-60 text-white">for pricing</p>
            </div>
            <div className="flex flex-col gap-1 text-white">
              <p>
                ✔️ <b>Customizable plans</b>
              </p>
              <p>
                ✔️ <b>Dedicated support</b>
              </p>
              <p>
                ✔️ <b>Advanced analytics</b>
              </p>
            </div>
            <button
              className="mt-5 px-4 py-2 border-blue-800 border-4 hover:bg-blue-800 rounded-xl"
              onClick={() => {
                navigate("/contact");
              }}
            >
              Contact Us
            </button>
          </motion.div>
        </div>

        {/* Features Section */}
        <div className="mt-10 features-section">
          <h2 className="text-4xl mb-8 text-center">Features</h2>
          <div className="flex flex-wrap justify-center gap-12">
            <motion.div
              className="bg-slate-950 text-white p-8 rounded-lg shadow-lg max-w-xs"
              whileHover={{ scale: 1.05 }}
            >
              <IoMdRocket size={50} className="mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
              <p>
                Simple and intuitive components that make development a breeze.
              </p>
            </motion.div>

            <motion.div
              className="bg-slate-950 text-white p-8 rounded-lg shadow-lg max-w-xs"
              whileHover={{ scale: 1.05 }}
            >
              <MdLibraryBooks size={50} className="mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2">Comprehensive Docs</h3>
              <p>
                Detailed documentation to help you get started quickly and
                easily.
              </p>
            </motion.div>

            <motion.div
              className="bg-slate-950 text-white p-8 rounded-lg shadow-lg max-w-xs"
              whileHover={{ scale: 1.05 }}
            >
              <GiTechnoHeart size={50} className="mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2 ">Modern Design</h3>
              <p>
                Beautifully designed components that enhance your project UI.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="testimonial-section">
          <TestimonialSection />
        </div>

        <div className="contributors-section mt-12 w-full flex flex-col items-center text-white">
          <h2 className="text-4xl mb-8 text-center">Contributions</h2>
          <p className="max-w-xl text-lg text-center mb-8">
            Meet the talented people who have contributed to making this amazing
            website possible.
          </p>
          <div className="flex space-x-6">
            <Link to="/contributors">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="bg-blue-800 text-white px-6 py-3 rounded-full 2xl:text-lg xl:text-lg md:text-lg text-sm font-semibold shadow-lg"
              >
                View Contributors
              </motion.button>
            </Link>
            <a
              href="https://github.com/Premkolte/AnimateHub"
              className="bg-blue-800 text-white px-6 text-center py-3 rounded-full 2xl:text-lg xl:text-lg md:text-lg text-sm font-semibold shadow-lg"
            >
              <BsPeople className="2xl:inline-block xl:inline-block lg:inline-block hidden mr-2" />
              Become Contributor
            </a>
          </div>
        </div>
        <div className="templates-section mt-12 w-full flex flex-col items-center text-white">
          <h2 className="text-4xl mb-8 text-center">Templates</h2>
          <p className="max-w-2xl text-lg text-center mb-8">
            Explore our library of handcrafted templates designed to kickstart
            your projects.
          </p>
          <div className="flex space-x-6">
            <Link to="/templates">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="bg-blue-800 text-white px-6 py-3 rounded-full 2xl:text-lg xl:text-lg md:text-lg text-sm font-semibold shadow-lg"
              >
                View Templates
              </motion.button>
            </Link>
            <a
              href="https://github.com/Premkolte/AnimateHub/issues/new/choose"
              className="bg-blue-800 text-white px-6 py-3 text-center rounded-full 2xl:text-lg xl:text-lg md:text-lg text-sm font-semibold shadow-lg"
            >
              <LuLayoutTemplate className="2xl:inline-block xl:inline-block lg:inline-block hidden mr-2" />
              Submit a Template
            </a>
          </div>
        </div>
        <Footer />
        <Chatbot />
      </div>
    </>
  );
};

export default HomePage;
