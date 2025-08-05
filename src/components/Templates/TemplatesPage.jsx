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
    <div className="flex flex-col items-center justify-center w-full min-h-screen p-6 pt-24 space-y-16 text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <BackButton />

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl text-center"
      >
        <div className="inline-block px-4 py-1 mb-6 text-sm text-white bg-green-600 rounded-full">
          100% OPEN-SOURCE
        </div>
        <motion.p
          className="mb-6 text-4xl font-extrabold md:text-6xl"
          whileHover={{ scale: 1.05 }}
        >
          Introducing Templates
          <br /> Handcrafted pages for your needs
        </motion.p>
        <p className="mb-4 text-md md:text-lg">
          Created by our components
          <br />
          <span className="font-bold">by Animate Hub</span>
        </p>
        <div className="inline-block px-4 py-1 font-semibold text-black bg-yellow-500 rounded-full text-md">
          All the templates are open source
        </div>

        <div className="flex justify-center mt-8 space-x-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="px-6 py-3 text-lg font-semibold text-white bg-black rounded-full shadow-lg"
            onClick={() => {
              window.location.href = "https://github.com/Premkolte/AnimateHub";
            }}
          >
            Get Started
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="px-6 py-3 text-lg font-semibold text-white border border-white rounded-full shadow-lg"
            onClick={() => {
              window.location.href = "https://github.com/Premkolte/AnimateHub";
            }}
          >
            Contribute on GitHub
          </motion.button>
        </div>
      </motion.div>

      <div className="flex mt-12 space-x-6">
        <FaHtml5 className="w-12 h-12" />
        <FaCss3Alt className="w-12 h-12" />
        <FaReact className="w-12 h-12" />
        <BiLogoTailwindCss className="w-12 h-12" />
      </div>

      <div className="text-center space-y-8 py-10 md:w-[800px]">
        <h1 className="text-4xl font-extrabold md:text-5xl">
          Create and Share Your Templates
        </h1>
        <p className="mb-6 text-lg md:text-xl">
          You can also create your templates and share them with others. Join
          our community and contribute to the growing library of amazing
          templates!
        </p>
        <Link
          className="inline-block px-6 py-3 mr-3 text-lg font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-purple-700 to-pink-500 leading-pro ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-110 hover:rotate-2 hover:bg-pink-700 hover:text-pink-200 hover:shadow-lg active:opacity-85"
          to="https://github.com/Premkolte/AnimateHub"
          target="_blank"
        >
          Get Started
        </Link>
      </div>

      <div className="py-16 space-y-8 text-center">
        <h1 className="text-4xl font-extrabold md:text-5xl">
          Available Templates
        </h1>
        <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-3">
          {templates.map((template, index) => (
            <TemplateCard key={index} template={template} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;
