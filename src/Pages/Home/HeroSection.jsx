import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { FaHtml5, FaCss3Alt, FaReact } from "react-icons/fa";
import { BiLogoTailwindCss } from "react-icons/bi";
import { BsGithub, BsStarFill } from "react-icons/bs";
import Particles from "../../components/Particles";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const featureButtons = [
  {
    name: "Components",
    icon: <FaPuzzlePiece />,
    color: "from-purple-600 to-indigo-600",
    redirect: "/explore",
  },
  {
    name: "Community",
    icon: <FaUsers />,
    color: "from-green-400 to-teal-500",
    redirect: "/",
  },
  {
    name: "GitHub",
    icon: <FaGithub />,
    color: "from-gray-700 to-black",
    redirect: "https://github.com/Premkolte/AnimateHub",
  },
  {
    name: "Leaderboard",
    icon: <FaStar />,
    color: "from-yellow-400 to-orange-400",
    redirect: "/leaderboard",
  },
  {
    name: "ResourceHub",
    icon: <FaPalette />,
    color: "from-pink-500 to-red-500",
    redirect: "/resourcehub",
  },
  {
    name: "Playgrounds",
    icon: <FaHeart />,
    color: "from-red-400 to-pink-500",
    redirect: "/animationplayground",
  },
];

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  },
  hover: {
    scale: 1.1,
    transition: { duration: 0.2 }
  },
  tap: { 
    scale: 0.98 
  }
};


const techIcons = [
  { icon: FaHtml5, color: "text-orange-600", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { icon: FaCss3Alt, color: "text-blue-600", href: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
  { icon: FaReact, color: "text-sky-500", href: "https://react.dev/learn" },
  { icon: BiLogoTailwindCss, color: "text-teal-400", href: "https://tailwindcss.com/" }
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
                damping: 12
              }
            }
          }}
        >
          Animation UI Library <br /> for Developers
        </motion.h1>

        <motion.p 
          className="text-md mb-10"
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
                delayChildren: 0.2
              }
            }
          }}
        >
          <motion.div variants={item} whileHover="hover" whileTap="tap">
            <Link
              className="block rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-md"
              to="/explore"
            >
              Browse Components
            </Link>
          </motion.div>

          <motion.div variants={item} whileHover="hover" whileTap="tap">
            <Link
              className="block rounded-full border-2 border-blue-400 bg-transparent px-8 py-4 text-lg font-semibold text-blue-600 hover:bg-blue-400 hover:text-white shadow-sm hover:shadow-md"
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
                >
                  <Link
                    to="/favorites"
                    className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-red-500 to-pink-500 px-8 py-4 text-lg font-semibold text-white shadow-md"
                  >

                    <FaHeart />
                    My Favorites
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
                >
                  <Link
                    to="/sign-in"
                    className="flex items-center justify-center gap-2 rounded-full border-2 border-red-400 bg-transparent px-8 py-4 text-lg font-semibold text-red-600 hover:bg-red-400 hover:text-white shadow-sm hover:shadow-md"
                  >
                    <FaHeart />
                    Sign In for Favorites
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
                  delayChildren: 0.4
                }
              }
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
                  scale: 1.2,
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.9 }}
                className={`${color} h-12 w-12`}
              >
                <Icon className="h-full w-full" />
              </motion.a>
            ))}
          </motion.div>

          <motion.a
            href="https://github.com/Premkolte/AnimateHub"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-6 py-3 h-12 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-medium shadow-md"
            variants={item}
            whileHover={{
              scale: 1.05,
              backgroundColor: "#1F2937",
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <BsGithub size={22} />
            <span>Star on GitHub</span>
            <BsStarFill size={22} className="text-yellow-400" />
          </motion.a>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default HeroSection;
