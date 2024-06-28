import React from "react";
import { motion } from "framer-motion";
import { BsFillPersonFill } from "react-icons/bs";

const ProductPage = () => {
  const products = [
    {
      title: "Integrated Development Environment (IDE)",
      description: "Powerful IDE for software development with advanced code editing, debugging, and version control features.",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSes6h4HVipGxowJ_ceoboI-X81one-uboB5Q&s",
    },
    {
      title: "Cloud Computing Services",
      description: "Secure and scalable cloud computing services for deploying applications, storing data, and managing infrastructure.",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ16tR25CCQM_V7TQRmLQMq48QrBKOz8jxRdQ&s",
    },
    {
      title: "Version Control System (VCS)",
      description: "Version control system for tracking changes in source code during software development.",
      imageUrl: "https://miro.medium.com/v2/resize:fit:1200/1*ALqmemof0Xvnk77tm5zVQA.png",
    },
    {
      title: "Continuous Integration/Continuous Deployment (CI/CD) Tools",
      description: "Automate the process of building, testing, and deploying software updates using CI/CD tools.",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROhQ2Hmdv-lLZs0Xn0bF0ZWNAim9QDN0HzfA&s",
    },
    {
      title: "Project Management Software",
      description: "Tools for planning, organizing, and managing software development projects and teams.",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrxOgwI9NtGKSW-2GEXtODSr0lUrIuwifZGw&s",
    },
    {
      title: "Database Management Systems (DBMS)",
      description: "Manage and manipulate databases, ensuring data integrity, security, and efficient retrieval.",
      imageUrl: "https://learnsql.com/blog/what-is-dbms/DBMS.png",
    },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-6 space-y-16 pt-24">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl"
      >
        <motion.p
          className="text-4xl md:text-6xl mb-6"
          whileHover={{ scale: 1.05 }}
        >
          Software Engineering Products
        </motion.p>
        <p className="text-md mb-10">
          Explore our curated selection of software engineering tools and products.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-7xl mx-auto">
        {products.map((product, index) => (
          <motion.div
            key={index}
            className="bg-slate-900 p-6 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-48 object-cover mb-4"
            />
            <h2 className="font-extrabold text-2xl mb-2">{product.title}</h2>
            <p className="opacity-80 mb-4">{product.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
