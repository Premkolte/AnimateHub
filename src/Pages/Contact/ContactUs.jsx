import React, { useState } from "react";
import {
  User,
  Mail,
  Send,
  MessageCircle,
  Clock,
  Shield,
  Users,
} from "lucide-react";
import FAQ from "./FAQ";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

// Contact Page Component
const Contact = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Handle input change
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!formData.email.trim() || !validateEmail(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!formData.message.trim()) {
      toast.error("Please enter your message");
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast.success("Message sent successfully 🎉");

    setSubmitStatus("success");
    setIsSubmitting(false);
    setFormData({ name: "", email: "", message: "" });

    setTimeout(() => setSubmitStatus(null), 5000);
  };

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center overflow-hidden w-full min-h-screen"
      initial="hidden"
      animate="visible"
      variants={fadeUp}
    >
      {/* Wrapper Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 py-16">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <motion.div
            className="inline-flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md px-6 py-3 rounded-full border border-gray-200 dark:border-gray-700 shadow-lg mb-8"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.1 }}
          >
            <MessageCircle className="w-6 h-6 text-blue-600" />
            <span className="text-gray-900 dark:text-gray-300 font-medium">
              Let's Connect
            </span>
          </motion.div>
          <motion.h1
            className="text-black dark:text-white text-4xl md:text-6xl font-bold mb-6"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.2 }}
          >
            Get In Touch
          </motion.h1>
          <motion.p
            className="text-base text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.3 }}
          >
            Ready to bring your ideas to life? We'd love to hear about your
            project and discuss how we can help you succeed.
          </motion.p>
        </motion.div>

        {/* Contact Stats & Form Section */}
        <div className="flex flex-col md:flex-row gap-12">
          {/* Contact Stats */}
          <motion.div
            className="w-full md:w-1/3 grid grid-cols-1 gap-8 mb-8 md:mb-0"
            initial="hidden"
            animate="visible"
            variants={fadeLeft}
          >
            {/* Response Time */}
            <motion.div
              className="text-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-2xl border border-pink-400 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              whileHover={{ scale: 1.07 }}
              variants={fadeUp}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-[#3b82f6] to-[#accefbff] dark:from-purple-600 dark:to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                24h
              </h3>
              <p className="text-gray-600 dark:text-gray-300">Response Time</p>
            </motion.div>
            {/* Happy Clients */}
            <motion.div
              className="text-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-2xl border border-pink-400 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              whileHover={{ scale: 1.07 }}
              variants={fadeUp}
              transition={{ delay: 0.1 }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-[#3b82f6] to-[#accefbff] dark:from-purple-600 dark:to-blue-600  rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                500+
              </h3>
              <p className="text-gray-600 dark:text-gray-300">Happy Clients</p>
            </motion.div>
            {/* Secure */}
            <motion.div
              className="text-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-2xl border border-pink-400 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              whileHover={{ scale: 1.07 }}
              variants={fadeUp}
              transition={{ delay: 0.2 }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-[#3b82f6] to-[#accefbff] dark:from-purple-600 dark:to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                100%
              </h3>
              <p className="text-gray-600 dark:text-gray-300">Secure</p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="flex-1"
            initial="hidden"
            animate="visible"
            variants={fadeRight}
          >
            <motion.div
              className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-pink-400 dark:border-gray-700 rounded-3xl shadow-2xl p-8 md:p-12"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              {/* Form Header */}
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Send us a message
                </h2>
                <p className="text-base text-gray-600 dark:text-gray-300 mb-6">
                  Got any questions, suggestions, or feedback? We'd love to hear
                  from you!
                </p>
                <p className="text-base text-gray-600 dark:text-gray-300">
                  Reach out to us via email at{" "}
                  <a
                    href="mailto:contact@animatehub.com"
                    className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                  >
                    contact@animatehub.com
                  </a>{" "}
                  or fill out the form below:
                </p>
              </div>
              {/* Success Message */}
              {submitStatus === "success" && (
                <motion.div
                  className="mb-8 p-4 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-green-800 dark:text-green-200 text-center font-medium">
                    Thank you! Your message has been sent successfully.
                  </p>
                </motion.div>
              )}
              {/* Form Fields */}
              <div className="space-y-10">
                {/* Name & Email Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Name */}
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                    >
                      Your Name *
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-200" />
                      </div>
                      <motion.input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        pattern="[a-zA-Z\s]+"
                        title="Name must only contain letters."
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        transition={{ delay: 0.1 }}
                      />
                    </div>
                  </div>
                  {/* Email */}
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                    >
                      Your Email *
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-200" />
                      </div>
                      <motion.input
                        type="email"
                        id="email"
                        placeholder="Enter your email address"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        transition={{ delay: 0.2 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* Message Field */}
              <div className="space-y-2 mt-4">
                <label
                  htmlFor="message"
                  className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Your Message *
                </label>
                <motion.textarea
                  required
                  id="message"
                  placeholder="Tell us about your project, questions, or how we can help you..."
                  rows="6"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  transition={{ delay: 0.3 }}
                ></motion.textarea>
              </div>
              {/* Submit Button */}
              <div className="text-center mt-6">
                <motion.button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex justify-center items-center gap-3 w-full px-8 py-4 bg-gradient-to-r from-[#3b82f6] to-[#accefbff] dark:from-purple-600 dark:to-blue-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 disabled:scale-100 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  transition={{ delay: 0.4 }}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        />
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
        {/* FAQ Section */}
        <motion.div
          className="mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <FAQ />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;
