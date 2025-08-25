import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsGithub, BsArrowRight, BsSearch, BsX, BsXLg, BsCodeSlash, BsCloud, BsGear, BsKanban, BsDatabase } from "react-icons/bs";

const ProductPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    {
      title: "Integrated Development Environment (IDE)",
      shortDescription: "Powerful IDE for software development with advanced code editing, debugging, and version control features.",
      fullDescription: "Experience the ultimate coding environment with our comprehensive IDE. Features include intelligent code completion, advanced syntax highlighting, integrated debugging tools, Git version control, multiple language support, customizable themes, plugin ecosystem, and real-time collaboration features. Built for developers who demand efficiency and reliability in their daily workflow. Supports over 50 programming languages with advanced refactoring tools, built-in terminal, and seamless integration with popular frameworks.",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSes6h4HVipGxowJ_ceoboI-X81one-uboB5Q&s",
      category: "Development",
      icon: BsCodeSlash,
      features: ["Intelligent Code Completion", "Advanced Debugging", "Git Integration", "Multi-language Support", "Plugin Ecosystem", "Real-time Collaboration"],
      pricing: "Free - $29/month"
    },
    {
      title: "Cloud Computing Services",
      shortDescription: "Secure and scalable cloud computing services for deploying applications, storing data, and managing infrastructure.",
      fullDescription: "Transform your infrastructure with our enterprise-grade cloud computing platform. Offering auto-scaling compute instances, managed databases, serverless functions, CDN, load balancing, and advanced security features. Deploy applications globally with 99.99% uptime SLA. Includes comprehensive monitoring, backup solutions, disaster recovery, and 24/7 technical support. Perfect for startups to enterprise-level applications with flexible pricing models.",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ16tR25CCQM_V7TQRmLQMq48QrBKOz8jxRdQ&s",
      category: "Cloud",
      icon: BsCloud,
      features: ["Auto-scaling", "99.99% Uptime SLA", "Global CDN", "Managed Databases", "Serverless Functions", "24/7 Support"],
      pricing: "Pay-as-you-use - $0.10/hour"
    },
    {
      title: "Version Control System",
      shortDescription: "Version control system for tracking changes in source code during software development.",
      fullDescription: "Streamline your development workflow with our advanced version control system. Features distributed architecture, branching and merging capabilities, conflict resolution, code review tools, integration with CI/CD pipelines, and comprehensive audit trails. Supports large repositories with LFS, advanced permissions management, and seamless integration with popular IDEs. Ideal for teams of any size with enterprise security features.",
      imageUrl: "https://miro.medium.com/v2/resize:fit:1200/1*ALqmemof0Xvnk77tm5zVQA.png",
      category: "Development",
      icon: BsCodeSlash,
      features: ["Distributed Architecture", "Advanced Branching", "Code Reviews", "CI/CD Integration", "Large File Support", "Enterprise Security"],
      pricing: "Free for public - $4/user/month"
    },
    {
      title: "CI/CD Tools",
      shortDescription: "Automate the process of building, testing, and deploying software updates using CI/CD tools.",
      fullDescription: "Accelerate your development lifecycle with our comprehensive CI/CD platform. Automated testing, parallel builds, deployment pipelines, environment management, rollback capabilities, and detailed analytics. Integrates with popular version control systems, cloud providers, and monitoring tools. Features include Docker support, Kubernetes deployment, security scanning, and compliance reporting. Perfect for DevOps teams seeking efficiency and reliability.",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROhQ2Hmdv-lLZs0Xn0bF0ZWNAim9QDN0HzfA&s",
      category: "DevOps",
      icon: BsGear,
      features: ["Automated Testing", "Parallel Builds", "Docker Support", "Kubernetes Deployment", "Security Scanning", "Compliance Reporting"],
      pricing: "Free tier - $30/month pro"
    },
    {
      title: "Project Management",
      shortDescription: "Tools for planning, organizing, and managing software development projects and teams.",
      fullDescription: "Optimize your team's productivity with our comprehensive project management solution. Features include Agile/Scrum boards, Gantt charts, time tracking, resource allocation, team collaboration tools, and advanced reporting. Integrates with development tools, supports custom workflows, and provides real-time insights into project progress. Includes milestone tracking, budget management, and stakeholder communication features for successful project delivery.",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrxOgwI9NtGKSW-2GEXtODSr0lUrIuwifZGw&s",
      category: "Productivity",
      icon: BsKanban,
      features: ["Agile/Scrum Boards", "Gantt Charts", "Time Tracking", "Resource Allocation", "Advanced Reporting", "Budget Management"],
      pricing: "Free for 5 users - $12/user/month"
    },
    {
      title: "Database Systems",
      shortDescription: "Manage and manipulate databases, ensuring data integrity, security, and efficient retrieval.",
      fullDescription: "Power your applications with our robust database management system. Supports SQL and NoSQL databases, ACID compliance, high availability clustering, automated backups, point-in-time recovery, and advanced security features. Includes query optimization, indexing strategies, replication, and monitoring dashboards. Perfect for applications requiring reliable data storage with enterprise-grade performance and scalability.",
      imageUrl: "https://learnsql.com/blog/what-is-dbms/DBMS.png",
      category: "Data",
      icon: BsDatabase,
      features: ["SQL & NoSQL Support", "ACID Compliance", "High Availability", "Automated Backups", "Query Optimization", "Enterprise Security"],
      pricing: "Free tier - $25/month standard"
    },
  ];

  const categories = [...new Set(products.map(product => product.category))];

  // Filter products based on search term and selected category
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.fullDescription.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const clearSearch = () => {
    setSearchTerm("");
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProduct(null);
    document.body.style.overflow = 'unset';
  };

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
        
        {/* Enhanced Search Bar */}
        <motion.div 
          className="relative max-w-md mx-auto mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative">
            <BsSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-12 py-4 bg-white dark:bg-secondary-800 border border-gray-200 dark:border-secondary-700 rounded-2xl shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <BsX className="text-xl" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Enhanced Category Filters */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {['All', ...categories].map((category, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 shadow-sm ${
                category === selectedCategory
                  ? 'bg-primary-600 text-white shadow-lg ring-2 ring-primary-200 dark:ring-primary-800' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-secondary-800 dark:text-gray-300 dark:hover:bg-secondary-700 hover:shadow-md'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Results Counter */}
        <motion.p 
          className="text-sm text-gray-500 dark:text-gray-400 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {filteredProducts.length === products.length 
            ? `Showing all ${products.length} products`
            : `Showing ${filteredProducts.length} of ${products.length} products`
          }
        </motion.p>
      </motion.div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto px-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <motion.div
              key={`${product.title}-${index}`}
              className="group bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 rounded-2xl shadow-sm border border-gray-100 dark:border-secondary-700 overflow-hidden hover:shadow-xl transition-all duration-500 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              layout
            >
              <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-secondary-700 dark:to-secondary-800 overflow-hidden relative">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <motion.span 
                    className="text-xs font-semibold px-3 py-2 bg-primary-100 text-primary-800 dark:bg-primary-900/40 dark:text-primary-300 rounded-xl shadow-sm"
                    whileHover={{ scale: 1.05 }}
                  >
                    {product.category}
                  </motion.span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {product.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 text-sm leading-relaxed">
                  {product.shortDescription}
                </p>
                <div className="flex justify-between items-center">
                  <motion.button 
                    onClick={() => openModal(product)}
                    className="text-primary-600 dark:text-accent-400 hover:text-primary-800 dark:hover:text-accent-300 font-semibold flex items-center transition-all duration-300 group/btn"
                    whileHover={{ x: 5 }}
                  >
                    Learn more
                    <BsArrowRight className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div 
            className="col-span-full text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No products found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Try adjusting your search terms or category filters
            </p>
            <motion.button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 font-medium transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Clear all filters
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Enhanced Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            {/* Enhanced Backdrop with improved opacity and blur */}
            <motion.div 
              className="absolute inset-0 bg-black/75 backdrop-blur-lg bg-opacity-70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Modal Content with enhanced styling */}
            <motion.div
              className="relative bg-white/95 dark:bg-secondary-800/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-secondary-700/50 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Enhanced Close Button */}
              <motion.button
                onClick={closeModal}
                className="absolute top-6 right-6 z-10 p-3 bg-white/90 dark:bg-secondary-700/90 hover:bg-gray-100 dark:hover:bg-secondary-600/90 rounded-full transition-all duration-200 shadow-lg backdrop-blur-sm border border-gray-200/50 dark:border-secondary-600/50"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <BsXLg className="text-lg text-gray-600 dark:text-gray-300" />
              </motion.button>

              {/* Enhanced Header Image */}
              <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-secondary-700 dark:to-secondary-800 rounded-t-3xl overflow-hidden relative">
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                {/* Enhanced Category Badge */}
                <motion.div 
                  className="absolute bottom-6 left-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-3 bg-white/90 dark:bg-secondary-800/90 backdrop-blur-md px-5 py-3 rounded-full shadow-lg border border-white/30 dark:border-secondary-600/30">
                    <selectedProduct.icon className="text-lg text-primary-600 dark:text-primary-400" />
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                      {selectedProduct.category}
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Enhanced Content */}
              <div className="p-8">
                <motion.div 
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-primary-600 to-accent-500 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent">
                    {selectedProduct.title}
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {selectedProduct.fullDescription}
                  </p>
                </motion.div>

                {/* Enhanced Features */}
                <motion.div 
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-primary-500 to-accent-500 rounded-full"></div>
                    Key Features
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedProduct.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-secondary-700/50 dark:to-secondary-600/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-secondary-600/30 shadow-sm"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        whileHover={{ scale: 1.02, x: 5 }}
                      >
                        <div className="w-3 h-3 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full shadow-sm" />
                        <span className="text-gray-700 dark:text-gray-300 font-medium">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Enhanced Pricing */}
                <motion.div 
                  className="mb-8 p-6 bg-gradient-to-br from-primary-50/80 via-accent-50/60 to-primary-100/80 dark:from-primary-900/30 dark:via-accent-900/20 dark:to-primary-800/30 backdrop-blur-sm rounded-2xl border border-primary-200/50 dark:border-primary-700/50 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1 h-6 bg-gradient-to-b from-primary-500 to-accent-500 rounded-full"></div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Pricing
                    </h3>
                  </div>
                  <p className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-500 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent">
                    {selectedProduct.pricing}
                  </p>
                </motion.div>

                {/* Enhanced Action Buttons */}
                <motion.div 
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.button
                    className="flex-1 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform-gpu"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get Started
                  </motion.button>
                  <motion.button
                    className="flex-1 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 dark:from-secondary-700 dark:to-secondary-600 dark:hover:from-secondary-600 dark:hover:to-secondary-500 text-gray-800 dark:text-gray-200 font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform-gpu backdrop-blur-sm"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Demo
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
          className="inline-flex items-center gap-3 bg-gradient-to-r from-secondary-800 to-secondary-900 dark:from-secondary-700 dark:to-secondary-800 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-2xl transition-all duration-300"
          whileHover={{ scale: 1.05, y: -2 }}
        >
          <BsGithub className="text-xl" />
          Contribute to Our Collection
        </motion.a>
      </motion.div>
    </div>
  );
};

export default ProductPage;