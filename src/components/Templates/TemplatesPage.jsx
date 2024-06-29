import React from "react";
import { motion } from "framer-motion";
import { FaHtml5, FaCss3Alt, FaReact } from "react-icons/fa";
import { BiLogoTailwindCss } from "react-icons/bi";
import { templates } from "./AvailableTemplates";
import TemplateCard from "./TemplateCard";
import BackButton from "../BackButton";
import Footer from "../Footer";
import { Link } from "react-router-dom";

const TemplatesPage = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-6 space-y-16 pt-24">
      <BackButton />

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl"
      >
        <div className="bg-green-600 text-white px-4 py-1 rounded-full inline-block text-sm mb-6">
          100% OPEN-SOURCE
        </div>
        <motion.p
          className="text-4xl md:text-6xl mb-6 font-extrabold"
          whileHover={{ scale: 1.05 }}
        >
          Introducing Templates
          <br /> Handcrafted pages for your needs
        </motion.p>
        <p className="text-md md:text-lg mb-4">
          Created by our components
          <br />
          <span className="font-bold">by Animate Hub</span>
        </p>
        <div className="bg-yellow-500 text-black px-4 py-1 rounded-full inline-block text-md font-semibold">
          All the templates are open source
        </div>

        <div className="flex space-x-6 justify-center mt-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="bg-black text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg"
            onClick={() => {
              window.location.href = "https://github.com/Premkolte/AnimateHub";
            }}
          >
            Get Started
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="border border-white text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg"
            onClick={() => {
              window.location.href = "https://github.com/Premkolte/AnimateHub";
            }}
          >
            Contribute on GitHub
          </motion.button>
        </div>
      </motion.div>

      <div className="flex space-x-6 mt-12">
        <FaHtml5 className="h-12 w-12" />
        <FaCss3Alt className="h-12 w-12" />
        <FaReact className="h-12 w-12" />
        <BiLogoTailwindCss className="h-12 w-12" />
      </div>

      <div className="text-center space-y-8 py-10 md:w-[800px]">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Create and Share Your Templates
        </h1>
        <p className="text-lg md:text-xl mb-6">
          You can also create your templates and share them with others. Join
          our community and contribute to the growing library of amazing
          templates!
        </p>
        <Link
          className="inline-block px-6 py-3 mr-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-purple-700 to-pink-500 leading-pro text-lg ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-110 hover:rotate-2 hover:bg-pink-700 hover:text-pink-200 hover:shadow-lg active:opacity-85"
          to="https://github.com/Premkolte/AnimateHub"
          target="_blank"
        >
          Get Started
        </Link>
      </div>

      <div className="text-center space-y-8 py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Available Templates
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {templates.map((template, index) => (
            <TemplateCard key={index} template={template} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TemplatesPage;
