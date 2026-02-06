import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BiLogoTailwindCss } from "react-icons/bi";
import { BsGithub, BsStarFill } from "react-icons/bs";
import {
  FaPuzzlePiece,
  FaHeart,
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaUsers,
  FaGithub,
  FaStar,
  FaPalette,
} from "react-icons/fa";
import Particles from "../../components/Particles";


const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
  hover: {
    scale: 1.05,
    y: -3,
    transition: { 
      type: "spring",
      stiffness: 400,
      damping: 10 
    },
  },
  tap: {
    scale: 0.97,
  },
};

// Button glow animation
const buttonGlow = {
  rest: {
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
  },
  hover: {
    boxShadow: "0 8px 30px rgba(139, 92, 246, 0.4)",
    transition: { duration: 0.3 }
  }
};

const techIcons = [
  {
    icon: FaHtml5,
    color: "text-orange-600 hover:text-orange-700",
    href: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  {
    icon: FaCss3Alt,
    color: "text-blue-600 hover:text-blue-700",
    href: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  { 
    icon: FaReact, 
    color: "text-sky-500 hover:text-sky-600", 
    href: "https://react.dev/learn" },
  {
    icon: BiLogoTailwindCss,
    color: "text-teal-400 hover:text-teal-500",
    href: "https://tailwindcss.com/",
  },
];

const HeroSection = ({ currentUser }) => {
  return (
    <div className="w-full flex-1 relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={500}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      <motion.div
        className="text-center max-w-3xl mx-auto px-4 pt-28 pb-20"
        initial="hidden"
        animate="show"
        variants={container}
      >
        <motion.div
          variants={item}
          className="bg-primary-600 dark:bg-accent-600 text-white px-4 py-1 rounded-full inline-block text-sm mb-6"
        >
          100% OPEN-SOURCE
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl mb-6 font-bold"
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: {
              opacity: 1,
              y: 0,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 12,
              },
            },
          }}
        >
          <span className="bg-gradient-to-r from-primary-600 via-accent-500 to-pink-500 dark:from-primary-400 dark:via-accent-400 dark:to-pink-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
            Animation UI Library
          </span>
          <br />
          <span className="text-secondary-800 dark:text-white">for Developers</span>
        </motion.h1>

        <motion.p
          className="text-md mb-10 text-secondary-900 dark:text-white"
          variants={item}
        >
          Open-sourced components made with
          <br />
          <span className="font-bold">HTML + CSS</span> &{" "}
          <span className="font-bold">React + Tailwind</span>.
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4 justify-center"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
              },
            },
          }}
        >
          <motion.div 
            variants={item} 
            whileHover="hover" 
            whileTap="tap"
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300 animate-gradient" style={{ backgroundSize: '200% 200%' }} />
            <Link
              className="relative block rounded-full bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-600 px-8 py-4 text-lg font-semibold text-white hover:text-white shadow-lg hover-shine overflow-hidden"
              to="/explore"
            >
              <span className="relative z-10">Browse Components</span>
            </Link>
          </motion.div>

          <motion.div 
            variants={item} 
            whileHover="hover" 
            whileTap="tap"
            className="relative group"
          >
            <Link
              className="block rounded-full border-2 border-primary-400 dark:border-accent-400 bg-white/80 dark:bg-secondary-800/80 backdrop-blur-sm px-8 py-4 text-lg font-semibold text-primary-600 dark:text-accent-400 hover:bg-primary-500 dark:hover:bg-accent-500 hover:text-white dark:hover:text-white hover:border-primary-500 dark:hover:border-accent-500 shadow-lg transition-all duration-300"
              to="https://github.com/Premkolte/AnimateHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Started
            </Link>
          </motion.div>

          <AnimatePresence mode="wait">
            {currentUser ? (
              <motion.div
                key="favorites"
                variants={item}
                initial="hidden"
                animate="show"
                exit="hidden"
                whileHover="hover"
                whileTap="tap"
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                <Link
                  to="/favorites"
                  className="relative flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-red-500 via-pink-500 to-rose-500 px-8 py-4 text-lg font-semibold text-white shadow-lg hover-shine overflow-hidden"
                >
                  <FaHeart className="animate-heartbeat" />
                  <span>My Favorites</span>
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key="signin"
                variants={item}
                initial="hidden"
                animate="show"
                exit="hidden"
                whileHover="hover"
                whileTap="tap"
                className="relative group"
              >
                <Link
                  to="/sign-in"
                  className="flex items-center justify-center gap-2 rounded-full border-2 border-rose-400 bg-white/80 dark:bg-secondary-800/80 backdrop-blur-sm px-8 py-4 text-lg font-semibold text-rose-500 hover:bg-rose-500 hover:text-white hover:border-rose-500 shadow-lg transition-all duration-300"
                >
                  <FaHeart />
                  <span>Sign In for Favorites</span>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.section
          className="flex flex-col items-center space-y-6 mt-16"
          variants={container}
        >
          <motion.div
            className="flex space-x-6 justify-center"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.4,
                },
              },
            }}
          >
            {techIcons.map(({ icon: Icon, color, href }, index) => (
              <motion.a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                variants={item}
                whileHover={{
                  scale: 1.3,
                  y: -8,
                  rotate: [0, -10, 10, 0],
                  transition: { 
                    scale: { duration: 0.2 },
                    rotate: { duration: 0.4 }
                  },
                }}
                whileTap={{ scale: 0.9 }}
                className={`${color} h-12 w-12 transition-all duration-300 hover:drop-shadow-lg`}
              >
                <Icon className="h-full w-full" />
              </motion.a>
            ))}
          </motion.div>

          <motion.a
            href="https://github.com/Premkolte/AnimateHub"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-3 px-6 py-3 h-12 rounded-xl bg-gray-800 dark:bg-gray-900 text-white font-medium shadow-lg overflow-hidden"
            variants={item}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <BsGithub size={22} className="relative z-10" />
            <span className="relative z-10">Star on GitHub</span>
            <motion.span 
              className="relative z-10"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              <BsStarFill size={22} className="text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
            </motion.span>
          </motion.a>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default HeroSection;

