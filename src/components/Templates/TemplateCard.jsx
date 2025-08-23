import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const TemplateCard = ({ template }) => {
  return (
    <motion.div
      className="group relative p-6 sm:p-8 h-auto min-h-[280px] rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl text-secondary-900 dark:text-white flex flex-col justify-between shadow-lg transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-primary-500/20 dark:hover:shadow-accent-500/20 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ 
        scale: 1.02,
        y: -8,
        transition: { duration: 0.3, type: "spring", stiffness: 300 }
      }}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 dark:from-primary-500/10 dark:to-accent-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={{ scale: 0.8 }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.6 }}
      />

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full opacity-20 group-hover:opacity-60"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-6 left-4 w-4 h-4 bg-gradient-to-br from-accent-400 to-primary-400 rounded-full opacity-30 group-hover:opacity-70"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* Content wrapper with relative positioning */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        {/* Header section */}
        <div className="text-center mb-6">
          {/* Template Name with enhanced animations */}
          <motion.h2 
            className="text-2xl sm:text-3xl font-bold mb-3 bg-gradient-to-r from-secondary-900 to-secondary-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent group-hover:from-primary-600 group-hover:to-accent-500 transition-all duration-500"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {template.name}
          </motion.h2>

          {/* Enhanced description */}
          <motion.p 
            className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {template.description}
          </motion.p>
        </div>

        {/* Enhanced single button - FIXED VERSION */}
        <motion.div 
          className="flex justify-center mt-auto"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link
            to={`/templates/${template.name}`}
            className="relative inline-block group/btn"
          >
            <motion.button
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 15px 35px rgba(59, 130, 246, 0.4)",
                transition: { duration: 0.3 }
              }}
              whileTap={{ 
                scale: 0.98,
                transition: { duration: 0.1 }
              }}
              className="relative px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full font-semibold text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden group/button"
            >
              {/* Animated background overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover/button:translate-x-full transition-transform duration-700 ease-out" />
              
              {/* Button content */}
              <div className="relative z-10 flex items-center justify-center gap-2">
                <span className="transition-all duration-300 group-hover/button:tracking-wide">
                  View Template
                </span>
                
                {/* Animated arrow - FIXED: No more fluttering */}
                <div className="overflow-hidden w-4">
                  <motion.div
                    className="flex items-center justify-center"
                    whileHover={{
                      x: 2,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                  >
                    <span className="text-lg leading-none">→</span>
                  </motion.div>
                </div>
              </div>

              {/* Pulse effect on hover */}
              <motion.div
                className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover/button:scale-100 opacity-0 group-hover/button:opacity-100"
                transition={{ 
                  scale: { duration: 0.4, ease: "easeOut" },
                  opacity: { duration: 0.3 }
                }}
              />
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Enhanced hover border effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          backgroundSize: "200% 200%",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "subtract",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor"
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Subtle glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
        initial={{ scale: 0.8 }}
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.6 }}
      />
    </motion.div>
  );
};

export default TemplateCard;