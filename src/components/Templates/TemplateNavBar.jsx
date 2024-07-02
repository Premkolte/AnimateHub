import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaDownload, FaGithub, FaTwitter } from "react-icons/fa";

const TemplateNavBar = ({ templateName }) => {
  const openTweetComposer = () => {
    const tweetText = encodeURIComponent(
      `Just stumbled upon an incredible template on AnimateHub! 🎉 Check it out here: https://github.com/Premkolte/AnimateHub/tree/main/src/components/Templates/${templateName}.jsx #UI #Animate #TailwindCSS`
    );
    const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
    window.open(tweetUrl, "_blank", "width=600,height=400");
  };

  return (
    <div className="flex flex-row justify-around items-center h-16 bg-gradient-to-r from-violet-500 to-purple-500 text-white">
      <motion.div
        className="text-lg md:text-xl lg:text-2xl font-bold tracking-wider"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ scale: 1.1, rotate: 7 }}
        whileTap={{ scale: 1.6 }}
      >
        <Link to="/" className="flex items-center space-x-2">
          <motion.span
            initial={{ scale: 2 }}
            animate={{ scale: 1.2 }}
            transition={{ duration: 0.2, delay: 0.3 }}
          >
            🌀
          </motion.span>
          <span>AnimateHub</span>
        </Link>
      </motion.div>

      <div className="flex space-x-6">
        <FaTwitter
          size={25}
          className="hover:text-blue-300"
          onClick={openTweetComposer}
        />
        <Link
          to={`https://github.com/Premkolte/AnimateHub/tree/main/src/components/Templates/${templateName}.jsx`}
        >
          <FaGithub size={25} className="hover:text-blue-300" />
        </Link>
        <Link
          to={`https://github.com/Premkolte/AnimateHub/tree/main/src/components/Templates/${templateName}.jsx`}
        >
          <FaDownload size={25} className="hover:text-blue-300" />
        </Link>
      </div>
    </div>
  );
};
export default TemplateNavBar;
