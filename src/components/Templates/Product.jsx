import React from "react";
import { motion } from "framer-motion";
import { BsGithub, BsArrowRight } from "react-icons/bs";

const ProductPage = () => {
  const products = [
    {
      title: "Integrated Development Environment (IDE)",
      description: "Powerful IDE for software development with advanced code editing, debugging, and version control features.",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSes6h4HVipGxowJ_ceoboI-X81one-uboB5Q&s",
      category: "Development"
    },
    {
      title: "Cloud Computing Services",
      description: "Secure and scalable cloud computing services for deploying applications, storing data, and managing infrastructure.",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ16tR25CCQM_V7TQRmLQMq48QrBKOz8jxRdQ&s",
      category: "Cloud"
    },
    {
      title: "Version Control System",
      description: "Version control system for tracking changes in source code during software development.",
      imageUrl: "https://miro.medium.com/v2/resize:fit:1200/1*ALqmemof0Xvnk77tm5zVQA.png",
      category: "Development"
    },
    {
      title: "CI/CD Tools",
      description: "Automate the process of building, testing, and deploying software updates using CI/CD tools.",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROhQ2Hmdv-lLZs0Xn0bF0ZWNAim9QDN0HzfA&s",
      category: "DevOps"
    },
    {
      title: "Project Management",
      description: "Tools for planning, organizing, and managing software development projects and teams.",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrxOgwI9NtGKSW-2GEXtODSr0lUrIuwifZGw&s",
      category: "Productivity"
    },
    {
      title: "Database Systems",
      description: "Manage and manipulate databases, ensuring data integrity, security, and efficient retrieval.",
      imageUrl: "https://learnsql.com/blog/what-is-dbms/DBMS.png",
      category: "Data"
    },
  ];

  const categories = [...new Set(products.map(product => product.category))];

  return (
    <div className="w-full flex flex-col items-center min-h-screen bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white p-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl mx-auto mb-16 px-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-accent-500 dark:from-primary-500 dark:to-accent-400 bg-clip-text text-transparent">
          Software Engineering Products
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Discover powerful tools and solutions to streamline your development workflow and boost productivity.
        </p>
        
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {['All', ...categories].map((category, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category === 'All' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-secondary-800 dark:text-gray-300 dark:hover:bg-secondary-700'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto px-4">
        {products.map((product, index) => (
          <motion.div
            key={index}
            className="group bg-white dark:bg-secondary-800 rounded-xl shadow-sm border border-gray-100 dark:border-secondary-700 overflow-hidden hover:shadow-md transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="h-48 bg-gray-100 dark:bg-secondary-700 overflow-hidden">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-medium px-3 py-1 bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-400 rounded-full">
                  {product.category}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                {product.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                {product.description}
              </p>
              <div className="flex justify-between items-center">
                <button className="text-primary-600 dark:text-accent-500 hover:text-primary-800 dark:hover:text-accent-400 font-medium flex items-center transition-colors">
                  Learn more
                  <BsArrowRight className="ml-2" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="mt-20 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Interested in listing your product?
        </p>
        <motion.a
          href="https://github.com/Premkolte/AnimateHub"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-secondary-800 dark:bg-secondary-700 text-white px-6 py-3 rounded-full text-lg font-semibold shadow hover:shadow-xl transition-all"
          whileHover={{ scale: 1.05 }}
        >
          <BsGithub className="text-xl" />
          Contribute to Our Collection
        </motion.a>
      </motion.div>
    </div>
  );
};

export default ProductPage;
