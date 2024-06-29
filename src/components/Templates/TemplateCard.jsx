import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const TemplateCard = ({ template }) => {
  return (
    <motion.div
      className="bg-slate-900 p-6 rounded-lg shadow-lg min-h-[250px]"
      whileHover={{ scale: 1.05 }}
    >
      <h2 className="font-extrabold text-2xl mb-2 text-white">
        {template.name}
      </h2>
      <p className="opacity-60 text-center text-white">
        {template.description}
      </p>
      <div className="flex justify-center mt-8">
        <Link
          to={`/templates/${template.name}`}
          className="px-4 py-2 border-violet-400 border-4 hover:bg-violet-700 rounded-xl text-white"
        >
          View Template
        </Link>
        <Link
          to={template.codeLink}
          className="ml-4 px-4 py-2 border-violet-400 border-4 hover:bg-violet-700 rounded-xl text-white"
        >
          View Code
        </Link>
      </div>
    </motion.div>
  );
};

export default TemplateCard;
