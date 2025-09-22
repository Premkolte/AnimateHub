import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion" // Import the useReducedMotion hook
import GitHubStats from "./GitHubStats"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faLinkedin, faXTwitter } from "@fortawesome/free-brands-svg-icons"
import Journey from "./Journey"
import CoreTeam from "./CoreTeam"
import Insights from "./Insights"

const About = () => {
  const shouldReduceMotion = useReducedMotion() // This hook returns true if the user prefers reduced motion

  const techUsed = [
    { icon: "⚛️", name: "React 18", desc: "Reusable UI & hooks" },
    { icon: "⚡", name: "Vite 5", desc: "Blazing fast dev server" },
    { icon: "🎨", name: "Tailwind CSS 3", desc: "Utility-first styling" },
    { icon: "🎭", name: "Framer Motion", desc: "Declarative animations" },
  ]
  const [code, setCode] = useState(`Type something excited!`)

  // Animation variants for Framer Motion
  const fadeInLeft = {
    initial: { x: -50, opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: shouldReduceMotion ? 0 : 0.8 }, // Disable animation if reduced motion is preferred
    },
  }

  const fadeInRight = {
    initial: { x: 50, opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: shouldReduceMotion ? 0 : 0.8 }, // Disable animation
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.6 }} // Disable animation
      className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20 text-secondary-900 dark:text-white"
    >
      <div className="max-w-7xl mx-auto px-6 py-20 space-y-24">
        {/* Enhanced Hero Section */}
        <section className="relative">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative flex flex-col lg:flex-row items-center gap-16">
            <motion.div className="flex-1 space-y-8" variants={fadeInLeft} initial="initial" animate="animate">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/20 backdrop-blur-sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></span>
                  <span className="text-sm font-medium text-purple-700 dark:text-purple-300">100% Open Source</span>
                </div>
                
                <h1 className="text-6xl lg:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 dark:from-purple-400 dark:via-blue-400 dark:to-indigo-400 leading-tight">
                  About
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
                    AnimateHub
                  </span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                  A powerful <span className="font-semibold text-purple-600 dark:text-purple-400">open-source animation UI library</span> that simplifies creating beautiful, reusable animations for modern web applications.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2 px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full border border-gray-200/50 dark:border-gray-700/50">
                  <span className="text-2xl">⚛️</span>
                  <span className="font-medium">React</span>
                </div>
                <div className="flex items-center space-x-2 px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full border border-gray-200/50 dark:border-gray-700/50">
                  <span className="text-2xl">🎨</span>
                  <span className="font-medium">Tailwind</span>
                </div>
                <div className="flex items-center space-x-2 px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full border border-gray-200/50 dark:border-gray-700/50">
                  <span className="text-2xl">🎭</span>
                  <span className="font-medium">Framer Motion</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className="flex-1 relative w-full max-w-lg"
              variants={fadeInRight}
              initial="initial"
              animate="animate"
            >
              <div className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/30 p-6">
                {/* Floating decorative elements */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg rotate-12 shadow-lg"></div>
                <div className="absolute -top-2 -right-6 w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full shadow-lg"></div>
                <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl -rotate-12 shadow-lg"></div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Live Code Editor</h3>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-32 p-4 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-mono text-gray-800 dark:text-gray-200 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                    placeholder="// Try typing some code..."
                  />
                  
                  <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Preview:</div>
                    <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words">
                      {code || "Start typing to see your code here..."}
                    </pre>
                  </div>
                  
                  <div className="flex justify-between">
                    <button
                      onClick={() => setCode("")}
                      className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                    >
                      Clear
                    </button>
                    <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-sm font-medium rounded-lg hover:from-purple-600 hover:to-indigo-600 transform hover:scale-105 transition-all shadow-lg">
                      Run Code
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision - Modern Cards */}
        <section className="grid lg:grid-cols-2 gap-8">
          {/* Mission Card */}
          <motion.div
            className="group relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-gray-700/30 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={shouldReduceMotion ? {} : { y: -10 }}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative p-8 lg:p-10">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <span className="text-2xl">🎯</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Mission</h2>
              </div>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Our mission is to empower developers and creators by providing
                <span className="font-semibold text-purple-600 dark:text-purple-400 mx-1">
                  ready-to-use HTML, CSS, JS, and React components
                </span>
                for stunning animations, making modern web design accessible, fun, and effortless.
              </p>
              
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                  Accessibility
                </span>
                <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium">
                  Simplicity
                </span>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                  Innovation
                </span>
              </div>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            className="group relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-gray-700/30 shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            whileHover={shouldReduceMotion ? {} : { y: -10 }}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative p-8 lg:p-10">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <span className="text-2xl">🚀</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Vision</h2>
              </div>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Our vision is to create a community where developers and designers can
                <span className="font-semibold text-indigo-600 dark:text-indigo-400 mx-1">
                  innovate with ready-made animation components
                </span>
                , learn from each other, and bring their creative ideas to life with modern, effortless web design.
              </p>
              
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium">
                  Community
                </span>
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                  Collaboration
                </span>
                <span className="px-3 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 rounded-full text-sm font-medium">
                  Creativity
                </span>
              </div>
            </div>
          </motion.div>
        </section>

        <Journey></Journey>

        <CoreTeam></CoreTeam>

        <Insights></Insights>

        {/* Why Choose Us & What We Offer - Modern Overlapping Cards */}
        <section className="relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-4">
              Why Choose <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">AnimateHub?</span>
            </h2>
            <p className="text-xl text-gray-600 dark:white max-w-3xl mx-auto ">
              Discover what makes us the preferred choice for developers worldwide
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Why Choose Us Card */}
            <motion.div
              className="relative group"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl p-8 lg:p-10 rounded-3xl border border-white/20 dark:border-gray-700/30 shadow-2xl">
                <div className="flex items-center mb-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-3xl">✨</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Why Choose Us?</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                      <span className="text-xl">✂️</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Copy-Paste Simple</h4>
                      <p className="text-gray-600 dark:text-gray-300">Instant integration with zero complex setup required</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                      <span className="text-xl">⚡</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Performance Optimized</h4>
                      <p className="text-gray-600 dark:text-gray-300">Smooth 60fps animations with minimal overhead</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                      <span className="text-xl">🔄</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Always Updated</h4>
                      <p className="text-gray-600 dark:text-gray-300">Regular updates with latest design trends</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* What We Offer Card */}
            <motion.div
              className="relative group lg:mt-12"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl p-8 lg:p-10 rounded-3xl border border-white/20 dark:border-gray-700/30 shadow-2xl">
                <div className="flex items-center mb-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-3xl">🚀</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">What We Offer</h3>
                </div>
                
                <div className="space-y-4">
                  {[
                    { label: "50+ Animation Components", color: "from-blue-500 to-cyan-500", icon: "🎨" },
                    { label: "Live Preview & Code Copy", color: "from-green-500 to-emerald-500", icon: "👁️" },
                    { label: "Ready-to-use Templates", color: "from-purple-500 to-violet-500", icon: "📦" },
                    { label: "Dark/Light Mode Support", color: "from-orange-500 to-red-500", icon: "🌓" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      whileHover={{ x: 8 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    >
                      <div className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center shadow-md`}>
                        <span className="text-lg">{item.icon}</span>
                      </div>
                      <span className="text-lg font-medium text-gray-800 dark:text-white">{item.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Tech Stack - Modern Grid */}
        <section className="relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-4">
              Built With <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Modern Tech</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-black max-w-3xl mx-auto">
              Powered by cutting-edge technologies for optimal performance and developer experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {techUsed.map((tech, index) => (
              <motion.div
                key={tech.name}
                className="group relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/30 p-6 shadow-lg hover:shadow-2xl transition-all duration-500"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                whileHover={shouldReduceMotion ? {} : { y: -8, scale: 1.02 }}
              >
                {/* Gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-2xl flex items-center justify-center text-4xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {tech.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {tech.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {tech.desc}
                  </p>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-2 right-2 w-2 h-2 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-2 left-2 w-1 h-1 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Community & CTA - Enhanced Layout */}
        <section className="space-y-8">
          {/* Join Community Card */}
          <motion.div
            className="relative group overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-indigo-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl p-8 lg:p-12 rounded-3xl border border-white/20 dark:border-gray-700/30 shadow-2xl text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-4xl">👥</span>
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                Join Our Growing Community
              </h2>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Collaborate with developers worldwide and contribute to making web animations accessible to everyone. Be part of something bigger.
              </p>
              
              <div className="flex flex-wrap gap-3 justify-center">
                {[
                  { label: "🔧 Contribute", bg: "from-blue-500 to-cyan-500" },
                  { label: "💡 Suggest", bg: "from-purple-500 to-pink-500" },
                  { label: "📚 Document", bg: "from-green-500 to-emerald-500" },
                  { label: "🐛 Report Issues", bg: "from-orange-500 to-red-500" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className={`px-6 py-3 bg-gradient-to-r ${item.bg} text-white rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-shadow cursor-pointer`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Ready to Start Card */}
          <motion.div
            className="relative group overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl p-8 lg:p-12 rounded-3xl border border-white/20 dark:border-gray-700/30 shadow-2xl text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-4xl">🚀</span>
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                Ready to Start Building?
              </h2>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Explore our comprehensive collection of components and start creating amazing animations today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
                <motion.a
                  href="/explore"
                  className="flex-1 py-4 px-8 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all text-center text-lg"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🎨 Explore Components
                </motion.a>

                <motion.a
                  href="https://github.com/Premkolte/AnimateHub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-4 px-8 bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all text-center text-lg"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ⭐ Star on GitHub
                </motion.a>
              </div>
            </div>
          </motion.div>
        </section>

        {/* {Github Info section} */}
        <GitHubStats />

        <section className="relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-gradient-to-br from-pink-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative bg-gradient-to-br from-blue-500/90 via-purple-600/90 to-pink-500/90 dark:from-gray-800/95 dark:via-purple-900/95 dark:to-indigo-900/95 backdrop-blur-xl text-white rounded-3xl p-12 lg:p-16 text-center shadow-2xl border border-white/10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="w-24 h-24 mx-auto mb-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <span className="text-5xl">🎨</span>
              </div>
              
              <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Ready to Begin Your
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300">
                  AnimateHub Adventure?
                </span>
              </h2>

              <p className="text-xl lg:text-2xl text-blue-100 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
                Explore creative animation components, enhance your projects, and join a vibrant developer community. Your journey starts here!
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-2xl mx-auto">
                <motion.a
                  href="https://animate-hub.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white/90 hover:bg-white text-purple-700 font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all backdrop-blur-sm"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🌟 Visit AnimateHub
                </motion.a>

                <motion.a
                  href="https://github.com/Premkolte/AnimateHub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-transparent border-2 border-white/70 hover:border-white hover:bg-white/10 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all backdrop-blur-sm"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🚀 Explore on GitHub
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Social Media Section */}
        <section className="relative">
          <motion.div
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 lg:p-12 text-center shadow-2xl border border-white/20 dark:border-gray-700/30"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-3xl">📱</span>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Connect With Our Community
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Follow us for the latest updates, animation tips, and community highlights. Join thousands of developers!
            </p>
            
            <div className="flex justify-center space-x-6">
              {[
                { icon: faXTwitter, url: "https://twitter.com/animatehub", label: "Twitter", color: "hover:text-blue-500" },
                { icon: faFacebook, url: "https://facebook.com/animatehub", label: "Facebook", color: "hover:text-blue-700" },
                { icon: faLinkedin, url: "https://linkedin.com/company/animatehub", label: "LinkedIn", color: "hover:text-blue-800" },
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  aria-label={social.label}
                  className={`w-14 h-14 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center text-gray-600 dark:text-gray-300 ${social.color} transform transition-all shadow-lg hover:shadow-xl`}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <FontAwesomeIcon icon={social.icon} size="xl" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </motion.div>
  )
}

export default About
