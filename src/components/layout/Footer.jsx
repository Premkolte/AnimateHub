import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Smile,
  Users,
  Zap,
  Code,
  Heart,
  Home,
  Compass,
  Info,
  Phone,
  BookOpen,
  X,
  Shield,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

const currentYear = new Date().getFullYear();

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/kolte_prem_26/",
    icon: Instagram,
    gradient: "from-pink-500 via-purple-500 to-orange-500",
    hoverGlow: "group-hover:shadow-[0_0_20px_rgba(236,72,153,0.5)]",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/prem-kolte/",
    icon: Linkedin,
    gradient: "from-blue-600 to-blue-400",
    hoverGlow: "group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]",
  },
  {
    name: "X",
    href: "https://x.com/PremKolte26?mx=2",
    icon: X,
    gradient: "from-gray-900 to-gray-600 dark:from-white dark:to-gray-400",
    hoverGlow: "group-hover:shadow-[0_0_20px_rgba(156,163,175,0.5)]",
  },
  {
    name: "GitHub",
    href: "https://github.com/Premkolte/AnimateHub",
    icon: Github,
    gradient: "from-purple-600 to-violet-500",
    hoverGlow: "group-hover:shadow-[0_0_20px_rgba(147,51,234,0.5)]",
  },
];

const footerLinks = [
  {
    title: "Resources",
    links: [
      {
        name: "Animations",
        href: "/explore",
        icon: Zap,
        color: "text-purple-400",
      },
      {
        name: "Code Snippets",
        href: "/templates",
        icon: Code,
        color: "text-blue-400",
      },
    ],
  },
  {
    title: "Company",
    links: [
      {
        name: "About Us",
        href: "/about",
        icon: Smile,
        color: "text-yellow-400",
      },
      {
        name: "Contributors",
        href: "/contributors",
        icon: Users,
        color: "text-green-400",
      },
    ],
  },
  {
    title: "Quick Links",
    links: [
      {
        name: "Home",
        href: "/",
        icon: Home,
        color: "text-pink-400",
      },
      {
        name: "Explore",
        href: "/explore",
        icon: Compass,
        color: "text-blue-400",
      },
      {
        name: "Contact Us",
        href: "/contact",
        icon: Phone,
        color: "text-red-400",
      },
      {
        name: "Privacy Policy",
        href: "/privacy-policy",
        icon: Shield,
        color: "text-green-400",
      },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100 }
  },
};

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-primary-50 via-white to-primary-50 dark:from-secondary-900 dark:via-secondary-950 dark:to-secondary-900 text-secondary-800 dark:text-white pt-16 pb-8 border-t border-gray-200/50 dark:border-secondary-700/50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-500/5 dark:to-pink-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 dark:from-blue-500/5 dark:to-cyan-500/5 rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Top Content */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Brand Section */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <motion.h2 
              className="text-3xl font-black"
              whileHover={{ scale: 1.02 }}
            >
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 dark:from-purple-400 dark:via-pink-400 dark:to-rose-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                Animate Hub
              </span>
            </motion.h2>
            <p className="mt-4 text-sm leading-relaxed text-secondary-600 dark:text-secondary-400 max-w-md">
              Animate Hub is your go-to resource for all things animation in web
              development. Discover a wide range of code snippets for
              animations, hovers, and effects, designed to streamline your
              workflow. Just copy, paste, and watch your projects come to life!
            </p>
            
            {/* Social Links with Hover Effects */}
            <div className="flex space-x-3 mt-6">
              {socialLinks.map(({ name, href, icon: Icon, gradient, hoverGlow }, idx) => (
                <motion.a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className={`group relative w-10 h-10 rounded-xl flex items-center justify-center bg-secondary-100/80 dark:bg-secondary-800/80 backdrop-blur-sm border border-secondary-200/50 dark:border-secondary-700/50 transition-all duration-300 ${hoverGlow}`}
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Icon className={`w-5 h-5 text-secondary-600 dark:text-secondary-400 group-hover:text-transparent transition-all duration-300`} />
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  <Icon className={`absolute w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer Links */}
          {footerLinks.map((section, sectionIdx) => (
            <motion.div 
              key={section.title}
              variants={itemVariants}
            >
              <h3 className="text-lg font-bold mb-4 text-secondary-800 dark:text-white flex items-center gap-2">
                <span className="w-1 h-6 rounded-full bg-gradient-to-b from-purple-500 to-pink-500" />
                {section.title}
              </h3>
              <ul className="space-y-3 text-sm">
                {section.links.map(({ name, href, icon: Icon, color }, linkIdx) => (
                  <motion.li 
                    key={name}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      to={href}
                      className="group flex items-center space-x-3 text-secondary-600 dark:text-secondary-400 hover:text-secondary-900 dark:hover:text-white transition-all duration-300"
                    >
                      <span className={`flex items-center justify-center w-8 h-8 rounded-lg bg-secondary-100 dark:bg-secondary-800 group-hover:bg-gradient-to-r group-hover:from-purple-500/20 group-hover:to-pink-500/20 transition-all duration-300`}>
                        <Icon className={`w-4 h-4 ${color} group-hover:scale-110 transition-transform duration-300`} />
                      </span>
                      <span className="group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">{name}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          className="relative border-t border-secondary-200/50 dark:border-secondary-700/50 pt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-secondary-600 dark:text-secondary-400 gap-4">
            <motion.p 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
            >
              <Sparkles className="w-4 h-4 text-purple-500" />
              &copy; {currentYear} Animate Hub. All rights reserved.
            </motion.p>
            <motion.p 
              className="flex items-center gap-1"
              whileHover={{ scale: 1.02 }}
            >
              Made with 
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              </motion.span>
              by{" "}
              <motion.a
                href="https://github.com/Premkolte/AnimateHub"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 font-semibold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent hover:from-pink-600 hover:to-purple-600 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                Prem Kolte
              </motion.a>
            </motion.p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
