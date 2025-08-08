import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const TemplateCard = ({ template }) => {
  return (
    <motion.div
      className="group p-6 sm:p-8 h-auto min-h-[240px] rounded-xl border border-gray-200 dark:border-white/10 bg-primary-50 dark:bg-secondary-800 text-secondary-900 dark:text-white flex flex-col justify-between shadow-sm transition-all duration-300 ease-in-out hover:ring-2 hover:ring-primary-400 dark:hover:ring-accent-500 hover:-translate-y-1"
      whileHover={{ scale: 1.015 }}
    >
      {/* Template Name */}
      <h2 className="text-2xl font-bold mb-2 text-center group-hover:text-primary-600 dark:group-hover:text-accent-400 transition-colors duration-300">
        {template.name}
      </h2>

      {/* Description */}
      <p className="text-sm sm:text-base text-center text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
        {template.description}
      </p>

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mt-auto">
        <Link
          to={`/templates/${template.name}`}
          className="px-5 py-2.5 bg-primary-600 dark:bg-accent-500 text-white rounded-full font-medium text-sm sm:text-base transition hover:bg-primary-700 dark:hover:bg-accent-600 shadow-md"
        >
          View Template
        </Link>
        <Link
          to={template.codeLink}
          className="px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full font-medium text-sm sm:text-base transition hover:bg-gray-800 dark:hover:bg-white/80 shadow-md"
        >
          View Code
        </Link>
      </div>
    </motion.div>
  );
};

export default TemplateCard;
