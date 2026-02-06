import React from "react";
import { motion } from "framer-motion";
import { Rocket, BookOpen, Heart, GitBranch, Users, Bookmark } from "lucide-react";
import { staggerContainer, fadeInUp, cardHoverGlow } from "../../utils/motionVariants";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  },
  tap: {
    scale: 0.98
  }
};

// Icon container animation
const iconAnimation = {
  rest: { scale: 1, rotate: 0 },
  hover: { 
    scale: 1.15, 
    rotate: [0, -5, 5, 0],
    transition: { 
      scale: { duration: 0.3 },
      rotate: { duration: 0.5 }
    }
  }
};

const features = [
  {
    icon: Rocket,
    title: "Ready-to-Use Components",
    description:
      "Copy, paste, and customize beautiful components with minimal setup. Get started in seconds.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: BookOpen,
    title: "Comprehensive Docs",
    description:
      "Detailed documentation with live examples and API references for every component.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Heart,
    title: "Modern & Accessible",
    description:
      "Beautifully designed components that follow accessibility best practices.",
    gradient: "from-rose-500 to-orange-500",
  },
  {
    icon: GitBranch,
    title: "Open Source",
    description:
      "Contribute to the project and see your components used by developers worldwide.",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "Vote on features and help shape the future of the library.",
    gradient: "from-amber-500 to-yellow-500",
  },
  {
    icon: Bookmark,
    title: "Save Favorites",
    description:
      "Bookmark your most-used components for quick access.",
    gradient: "from-indigo-500 to-violet-500",
  }
];

const FeaturesSection = () => {

  return (
    <section className="bg-secondary-50 dark:bg-secondary-900 w-full py-20 overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto px-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={container}
      >

        {/* Heading */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-16 md:mb-20 text-primary-600 dark:text-accent-500 text-center"
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: {
              opacity: 1,
              y: 0,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
              }
            }
          }}
        >
          Why Choose AnimateHub?
        </motion.h2>

        {/* Features Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
              }
            }
          }}
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                variants={item}
                whileTap="tap"
                whileHover="hover"
                initial="rest"
                animate="rest"
                className="group relative bg-white dark:bg-secondary-800/80 
                  text-secondary-800 dark:text-white 
                  border border-secondary-200/50 dark:border-secondary-600/30 
                  p-8 rounded-2xl 
                  backdrop-blur-sm
                  max-w-md mx-auto w-full
                  flex flex-col items-center justify-center
                  h-full
                  cursor-pointer
                  overflow-hidden"
                style={{
                  transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                }}
              >
                {/* Gradient accent on hover */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />
                
                {/* Top gradient line */}
                <motion.div 
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
                />

                {/* Icon with glow effect */}
                <motion.div 
                  className="relative w-20 h-20 flex items-center justify-center rounded-2xl mb-6"
                  variants={iconAnimation}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-10 rounded-2xl group-hover:opacity-20 transition-opacity duration-300`} />
                  <IconComponent
                    size={48}
                    className={`relative z-10 bg-gradient-to-br ${feature.gradient} bg-clip-text text-transparent`}
                    style={{ 
                      stroke: 'url(#icon-gradient-' + index + ')',
                      strokeWidth: 1.5
                    }}
                  />
                  {/* SVG gradient definition */}
                  <svg width="0" height="0" className="absolute">
                    <defs>
                      <linearGradient id={`icon-gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>

                <h3 className="text-xl font-bold mb-3 text-secondary-900 dark:text-white text-center leading-tight group-hover:text-primary-600 dark:group-hover:text-accent-400 transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed text-center group-hover:text-secondary-700 dark:group-hover:text-secondary-200 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Hover glow effect */}
                <motion.div 
                  className={`absolute -inset-px rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10`}
                  style={{ filter: 'blur(20px)' }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FeaturesSection;
