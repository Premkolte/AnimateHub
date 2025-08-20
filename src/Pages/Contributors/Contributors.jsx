import { motion,AnimatePresence } from "framer-motion";
import { FaGithub, FaStar, FaCode, FaHeart } from "react-icons/fa";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const TopContributorsCard = ({ contributor, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 50,
      rotateY: -15
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      rotateY: 0,
      transition: {
        type: "spring",
        duration: 0.8,
        delay: index * 0.2,
        bounce: 0.4
      }
    },
    hover: {
      scale: 1.05,
      y: -10,
      rotateY: 5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  };

  const badgeVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        delay: index * 0.2 + 0.5,
        stiffness: 300
      }
    }
  };

  const getRankBadge = (index) => {
    const badges = [
      { emoji: "🏆", color: "from-yellow-400 to-yellow-600", text: "1st" },
      { emoji: "🥈", color: "from-gray-300 to-gray-500", text: "2nd" },
      { emoji: "🥉", color: "from-amber-600 to-amber-800", text: "3rd" }
    ];
    return badges[index] || badges[2];
  };

  const badge = getRankBadge(index);

  return (
    <motion.div
      className="relative group"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      {/* Rank Badge */}
      <motion.div
        className={`absolute -top-4 -right-4 z-10 w-12 h-12 bg-gradient-to-br ${badge.color} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-xl border-2 border-white`}
        variants={badgeVariants}
      >
        <span className="text-lg">{badge.emoji}</span>
      </motion.div>

      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 to-accent-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
      
      <div className="relative bg-primary-50 dark:bg-secondary-900 rounded-xl p-6 shadow-xl border-2 border-primary-200 dark:border-secondary-700 backdrop-blur-sm max-w-sm mx-auto overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl" />
        </div>

        <div className="relative flex flex-col items-center space-y-4">
          {/* Avatar with Ring Animation */}
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full animate-spin"
              style={{ padding: '3px' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <div className="relative bg-white dark:bg-secondary-800 rounded-full p-1">
              <motion.img
                src={contributor.avatar_url}
                alt={contributor.login}
                className="w-24 h-24 rounded-full object-cover"
                variants={imageVariants}
                initial="hidden"
                animate={imageLoaded ? "visible" : "hidden"}
                onLoad={() => setImageLoaded(true)}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </div>
          </div>

          {/* Name with Typing Animation */}
          <motion.h3 
            className="text-xl font-bold text-secondary-900 dark:text-white text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 + 0.3 }}
          >
            {contributor.login}
          </motion.h3>

          {/* Contributions with Counter Animation */}
          <motion.div
            className="flex items-center space-x-2 text-primary-500 dark:text-accent-500"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2 + 0.4 }}
          >
            <FaCode className="text-lg" />
            <span className="font-semibold">
              {contributor.contributions} contributions
            </span>
          </motion.div>

          {/* Profile Button */}
          <motion.a
            href={contributor.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-secondary-900 to-secondary-700 hover:from-primary-600 hover:to-accent-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg overflow-hidden transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 + 0.6 }}
          >
            {/* Button Background Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <FaGithub className="relative z-10 text-lg" />
            <span className="relative z-10">Visit Profile</span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

const ContributorCard = ({ contributor, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9,
      rotateX: -15
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        duration: 0.6,
        delay: index * 0.08,
        bounce: 0.3
      }
    }
  };

  // Generate different border colors based on index
  const getBorderGradient = (index) => {
    const gradients = [
      "from-blue-400 to-purple-500",
      "from-green-400 to-blue-500", 
      "from-purple-400 to-pink-500",
      "from-yellow-400 to-orange-500",
      "from-pink-400 to-red-500",
      "from-indigo-400 to-blue-500",
      "from-teal-400 to-green-500",
      "from-orange-400 to-red-500"
    ];
    return gradients[index % gradients.length];
  };

  const borderGradient = getBorderGradient(index);

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ 
        scale: 1.08, 
        y: -8,
        rotateY: 5,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      }}
      className="group relative cursor-pointer"
    >
      {/* Animated Border */}
      <div className={`absolute inset-0 bg-gradient-to-r ${borderGradient} rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm`} />
      <div className={`absolute inset-0 bg-gradient-to-r ${borderGradient} rounded-xl opacity-60 group-hover:opacity-100 transition-all duration-300`} style={{ padding: '2px' }}>
        <div className="w-full h-full bg-primary-50 dark:bg-secondary-800 rounded-xl" />
      </div>

      {/* Hover Glow Effects */}
      <div className={`absolute inset-0 bg-gradient-to-br from-primary-400/20 to-accent-500/20 rounded-xl opacity-0 group-hover:opacity-100 blur-lg transition-all duration-500`} />
      <div className="absolute top-0 right-0 w-2 h-full bg-gradient-to-b from-transparent via-primary-500/60 to-accent-500/60 rounded-r-xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
      
      <div className="relative bg-primary-50 dark:bg-secondary-900 rounded-xl p-5 shadow-lg hover:shadow-2xl transition-all duration-500 backdrop-blur-sm border border-primary-200/50 dark:border-secondary-700/50 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-bl ${borderGradient} rounded-xl transform rotate-12 scale-110`} />
        </div>

        {/* Content */}
        <div className="relative flex flex-col items-center space-y-4">
          {/* Avatar with Enhanced Ring */}
          <div className="relative group/avatar">
            {/* Outer rotating ring */}
            <motion.div
              className={`absolute -inset-2 bg-gradient-to-r ${borderGradient} rounded-full opacity-0 group-hover:opacity-100`}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            {/* Inner static ring */}
            <div className="relative bg-white dark:bg-secondary-800 rounded-full p-1 border-2 border-primary-200 dark:border-secondary-600">
              <motion.img
                src={contributor.avatar_url}
                alt={contributor.login}
                className="w-20 h-20 rounded-full object-cover"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={imageLoaded ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                onLoad={() => setImageLoaded(true)}
                whileHover={{ scale: 1.15, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              />
              {/* Avatar overlay effect */}
              <div className={`absolute inset-0 bg-gradient-to-tr ${borderGradient} opacity-0 group-hover/avatar:opacity-20 rounded-full transition-opacity duration-300`} />
            </div>
          </div>

          {/* Name with Gradient Effect */}
          <motion.h3 
            className="text-lg font-bold text-secondary-900 dark:text-white text-center truncate w-full relative"
            whileHover={{ scale: 1.05 }}
          >
            <span className="relative z-10">{contributor.login}</span>
            <div className={`absolute inset-0 bg-gradient-to-r ${borderGradient} bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-bold`}>
              {contributor.login}
            </div>
          </motion.h3>

          {/* Contributions with Icon */}
          <motion.div
            className="flex items-center space-x-2 text-primary-600 dark:text-accent-400"
            whileHover={{ scale: 1.05 }}
          >
            <FaCode className="text-sm" />
            <span className="text-sm font-semibold">
              {contributor.contributions} contributions
            </span>
          </motion.div>

          {/* Enhanced Profile Button */}
          <motion.a
            href={contributor.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn relative inline-flex items-center gap-2 bg-gradient-to-r from-secondary-900 to-secondary-700 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg overflow-hidden transition-all duration-300"
            whileHover={{ 
              scale: 1.08,
              boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Button background animation */}
            <div className={`absolute inset-0 bg-gradient-to-r ${borderGradient} opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300`} />
            
            {/* Button content */}
            <FaGithub className="relative z-10 text-sm" />
            <span className="relative z-10">View Profile</span>
            
            {/* Button shine effect */}
            <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-full transition-all duration-700" />
          </motion.a>
        </div>

        {/* Bottom accent line */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${borderGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-xl`} />
        
        {/* Side accent line */}
        <div className={`absolute top-0 right-0 w-1 h-full bg-gradient-to-b ${borderGradient} opacity-60 group-hover:opacity-100 transition-opacity duration-300 rounded-r-xl`} />
      </div>
    </motion.div>
  );
};

const ContributorsSkeleton = ({ length = 20 }) => {
  return (
    <div className="flex flex-col w-full justify-center items-center space-y-16 text-center">
      {/* Top contributors skeleton */}
      <div className="flex justify-center items-center flex-col gap-4">
        <div className="h-12 w-80 bg-gradient-to-r from-primary-300 to-accent-300 dark:from-primary-600 dark:to-accent-600 rounded-lg animate-pulse" />
        <div className="bg-primary-500 dark:bg-accent-500 w-32 h-1 rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-primary-50 dark:bg-secondary-800 rounded-xl p-6 shadow-xl border-2 border-primary-200 dark:border-secondary-700">
            <div className="flex flex-col items-center space-y-4 animate-pulse">
              <div className="w-24 h-24 bg-gradient-to-br from-primary-300 to-accent-300 dark:from-primary-600 dark:to-accent-600 rounded-full" />
              <div className="h-6 w-32 bg-gradient-to-r from-primary-300 to-accent-300 dark:from-primary-600 dark:to-accent-600 rounded" />
              <div className="h-4 w-40 bg-gradient-to-r from-primary-300 to-accent-300 dark:from-primary-600 dark:to-accent-600 rounded" />
              <div className="h-10 w-32 bg-gradient-to-r from-primary-300 to-accent-300 dark:from-primary-600 dark:to-accent-600 rounded-full" />
            </div>
          </div>
        ))}
      </div>

      {/* All contributors skeleton */}
      <div className="flex justify-center items-center flex-col gap-4">
        <div className="h-12 w-80 bg-gradient-to-r from-primary-300 to-accent-300 dark:from-primary-600 dark:to-accent-600 rounded-lg animate-pulse" />
        <div className="h-6 w-96 bg-gradient-to-r from-primary-200 to-accent-200 dark:from-primary-700 dark:to-accent-700 rounded animate-pulse" />
        <div className="bg-primary-500 dark:bg-accent-500 w-32 h-1 rounded-full" />
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {[...Array(length - 3)].map((_, i) => (
          <div key={i} className="bg-primary-50 dark:bg-secondary-800 border-2 border-primary-200 dark:border-secondary-700 p-4 rounded-lg shadow-md">
            <div className="flex flex-col items-center space-y-3 animate-pulse">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-300 to-accent-300 dark:from-primary-600 dark:to-accent-600 rounded-full" />
              <div className="h-5 w-24 bg-gradient-to-r from-primary-300 to-accent-300 dark:from-primary-600 dark:to-accent-600 rounded" />
              <div className="h-4 w-20 bg-gradient-to-r from-primary-300 to-accent-300 dark:from-primary-600 dark:to-accent-600 rounded" />
              <div className="h-8 w-20 bg-gradient-to-r from-primary-300 to-accent-300 dark:from-primary-600 dark:to-accent-600 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Contributors = () => {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fallback contributors data in case API fails
  const fallbackContributors = [
    {
      id: 1,
      login: "Premkolte",
      avatar_url: "https://github.com/Premkolte.png",
      html_url: "https://github.com/Premkolte",
      contributions: 50
    },
    {
      id: 2,
      login: "ShauraaSharma",
      avatar_url: "https://github.com/ShauraaSharma.png",
      html_url: "https://github.com/ShauraaSharma",
      contributions: 1
    },
    {
      id: 3,
      login: "contributor3",
      avatar_url: "https://github.com/octocat.png",
      html_url: "https://github.com/octocat",
      contributions: 15
    }
  ];

  // Function to force fresh API call (bypass cache completely)
  const forceFreshFetch = async () => {
    try {
      setLoading(true);
      setError(null);
      setContributors([]);

      const headers = {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "AnimateHub-App",
        "X-GitHub-Api-Version": "2022-11-28",
      };

      const GITHUB_TOKEN = import.meta?.env?.VITE_GITHUB_TOKEN;

      if (GITHUB_TOKEN && GITHUB_TOKEN.trim() !== "") {
        headers["Authorization"] = `token ${GITHUB_TOKEN.trim()}`;
      }

      const response = await fetch(
        "https://api.github.com/repos/Premkolte/AnimateHub/contributors",
        { headers }
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        const sortedContributors = data.sort(
          (a, b) => b.contributions - a.contributions
        );
        setContributors(sortedContributors);
      } else {
        throw new Error("No contributors found in API response");
      }
    } catch (error) {
      console.error("Error fetching contributors:", error);
      setError(`Fetch failed: ${error.message}`);
      setContributors(fallbackContributors);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Force fresh fetch on mount
    forceFreshFetch();

    // Periodic refresh every 10 minutes
    const interval = setInterval(() => {
      forceFreshFetch();
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        duration: 1,
        bounce: 0.4
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50/30 to-accent-50/30 dark:from-secondary-900 dark:via-secondary-900 dark:to-secondary-800 text-secondary-900 dark:text-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400/10 dark:bg-accent-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-500/10 dark:bg-primary-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary-400/5 to-accent-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 space-y-12 lg:space-y-20 py-16 lg:py-24">
        {/* Header Section */}
        <motion.div
          className="text-center max-w-4xl mx-auto"
          variants={headerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-full border border-primary-400/30 dark:border-accent-500/30"
            whileHover={{ scale: 1.05 }}
          >
            <FaHeart className="text-red-500 animate-pulse" />
            <span className="text-primary-600 dark:text-accent-400 font-medium">Built by awesome devs</span>
          </motion.div>
          
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent leading-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            Our Amazing Contributors
          </motion.h1>
          
          <motion.h2 
            className="text-base sm:text-lg lg:text-xl max-w-3xl mx-auto font-medium text-secondary-700 dark:text-secondary-300 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            A heartfelt thank you to the talented individuals who dedicate their time and skills to
            make AnimateHub thrive. Your contributions help shape the future of animation components.
          </motion.h2>
        </motion.div>

        {/* Loading State */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-7xl mx-auto"
            >
              <ContributorsSkeleton length={20} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error State */}
        {error && !loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 text-secondary-900 dark:text-white p-6 rounded-xl max-w-md mx-auto text-center backdrop-blur-sm"
          >
            <div className="text-2xl mb-2">ℹ️</div>
            <p className="font-semibold mb-2">Using Cached Data</p>
            <p className="text-sm opacity-80">Contributors data refreshes every 5 minutes. Fresh data coming soon!</p>
          </motion.div>
        )}

        {/* Contributors Display */}
        <AnimatePresence>
          {!loading && contributors.length > 0 && (
            <motion.div
              className="w-full max-w-7xl mx-auto space-y-12 lg:space-y-20"
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Top Contributors Section */}
              <div className="space-y-8">
                <motion.div
                  className="flex justify-center items-center flex-col gap-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-3">
                    <FaStar className="text-yellow-500 text-2xl" />
                    <h3 className="text-primary-500 dark:text-accent-500 font-bold text-2xl sm:text-3xl lg:text-4xl text-center">
                      Top Contributors
                    </h3>
                    <FaStar className="text-yellow-500 text-2xl" />
                  </div>
                  <div className="bg-gradient-to-r from-primary-500 to-accent-500 w-32 h-1 rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {contributors.slice(0, 3).map((contributor, index) => (
                    <TopContributorsCard key={contributor.id || index} contributor={contributor} index={index} />
                  ))}
                </div>
              </div>

              {/* All Contributors Grid */}
              {contributors.length > 3 && (
                <div className="space-y-8">
                  <motion.div
                    className="flex justify-center items-center flex-col gap-4"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h3 className="text-primary-500 dark:text-accent-500 font-bold text-2xl sm:text-3xl lg:text-4xl text-center">
                      All Contributors
                    </h3>
                    <p className="text-base sm:text-lg max-w-2xl mx-auto text-center text-secondary-700 dark:text-secondary-300">
                      Every contribution matters! Thank you to all our amazing contributors who help make
                      AnimateHub better.
                    </p>
                    <div className="bg-gradient-to-r from-primary-500 to-accent-500 w-32 h-1 rounded-full" />
                  </motion.div>

                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6"
                    variants={sectionVariants}
                  >
                    {contributors.slice(3).map((contributor, index) => (
                      <ContributorCard 
                        key={contributor.id || `contributor-${index + 3}`} 
                        contributor={contributor} 
                        index={index}
                      />
                    ))}
                  </motion.div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* No Contributors State */}
        {!loading && contributors.length === 0 && (
          <motion.div
            className="text-center text-secondary-700 dark:text-secondary-300"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <p className="text-xl mb-2">No contributors found</p>
            <p>Check back later!</p>
          </motion.div>
        )}

        {/* Contribution CTA Section */}
        <motion.div
          className="flex flex-col justify-center items-center text-center space-y-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.div
            className="space-y-4"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Become a Contributor
            </h3>
            <p className="text-base sm:text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed px-4">
              Join our community of developers and designers creating amazing animation components.
              Your contributions help make the web more beautiful and interactive!
            </p>
          </motion.div>

          <motion.a
            href="https://github.com/Premkolte/AnimateHub"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-secondary-900 to-secondary-700 hover:from-primary-600 hover:to-accent-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-xl overflow-hidden transition-all duration-500 transform hover:scale-105"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Button Background Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Button Content */}
            <FaGithub className="relative z-10 text-xl sm:text-2xl" />
            <span className="relative z-10">Contribute on GitHub</span>
            
            {/* Shine Effect */}
            <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500" />
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default Contributors;

/* ---- PropTypes ---- */
const contributorShape = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  login: PropTypes.string.isRequired,
  avatar_url: PropTypes.string.isRequired,
  html_url: PropTypes.string.isRequired,
  contributions: PropTypes.number.isRequired,
});

TopContributorsCard.propTypes = {
  contributor: contributorShape.isRequired,
  index: PropTypes.number.isRequired,
};

ContributorCard.propTypes = {
  contributor: contributorShape.isRequired,
  index: PropTypes.number.isRequired,
};

ContributorsSkeleton.propTypes = {
  length: PropTypes.number,
};