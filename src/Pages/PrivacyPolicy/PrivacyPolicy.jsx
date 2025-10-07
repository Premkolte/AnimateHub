import { motion, useReducedMotion } from "framer-motion";
import { Shield, Eye, Lock, Database, Mail, Users, FileText, AlertCircle } from "lucide-react";

const PrivacyPolicy = () => {
  const shouldReduceMotion = useReducedMotion();

  // Animation variants
  const fadeInUp = {
    initial: { y: 50, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: shouldReduceMotion ? 0 : 0.6 },
    },
  };

  const fadeInLeft = {
    initial: { x: -50, opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: shouldReduceMotion ? 0 : 0.8 },
    },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const sections = [
    {
      id: "information-collection",
      title: "Information We Collect",
      icon: Database,
      content: [
        "Personal information you provide when creating an account (name, email address)",
        "Usage data and analytics to improve our services",
        "Device and browser information for compatibility and security",
        "Cookies and similar tracking technologies for functionality and preferences"
      ]
    },
    {
      id: "information-use",
      title: "How We Use Your Information",
      icon: Eye,
      content: [
        "Provide and maintain our animation hub services",
        "Send important updates and notifications about your account",
        "Improve user experience and develop new features",
        "Prevent fraud and ensure platform security"
      ]
    },
    {
      id: "information-sharing",
      title: "Information Sharing",
      icon: Users,
      content: [
        "We do not sell, trade, or rent your personal information to third parties",
        "Anonymous usage statistics may be shared with analytics providers",
        "Information may be disclosed if required by law or to protect our rights",
        "Public content you choose to share (animations, code snippets) will be visible to other users"
      ]
    },
    {
      id: "data-security",
      title: "Data Security",
      icon: Lock,
      content: [
        "Industry-standard encryption for data transmission and storage",
        "Regular security audits and updates to protect your information",
        "Limited access to personal data on a need-to-know basis",
        "Secure backup and recovery procedures for data protection"
      ]
    },
    {
      id: "user-rights",
      title: "Your Rights",
      icon: Shield,
      content: [
        "Access and download your personal data at any time",
        "Request correction of inaccurate information",
        "Delete your account and associated data (some content may remain public)",
        "Opt out of non-essential communications"
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
      className="min-h-screen bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white"
    >
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
        {/* Header Section */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="text-center space-y-6"
        >
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-primary-50 dark:bg-accent-900/30 flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary-600 dark:text-accent-400" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-purple-500 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how AnimateHub collects, 
            uses, and protects your personal information.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <FileText className="w-4 h-4" />
            <span>Last updated: {new Date().toLocaleDateString()}</span>
          </div>
        </motion.div>

        {/* Introduction */}
        <motion.section
          variants={fadeInLeft}
          initial="initial"
          animate="animate"
          className="bg-white dark:bg-secondary-800 p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Introduction</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Welcome to AnimateHub! We are committed to protecting your privacy and ensuring 
            the security of your personal information. This privacy policy describes how we 
            collect, use, store, and protect your information when you use our platform for 
            discovering, sharing, and creating UI animations and components.
          </p>
        </motion.section>

        {/* Privacy Sections */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="space-y-8"
        >
          {sections.map((section, index) => (
            <motion.section
              key={section.id}
              variants={fadeInUp}
              className="bg-white dark:bg-secondary-800 p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary-50 dark:bg-accent-900/30 flex items-center justify-center">
                  <section.icon className="w-6 h-6 text-primary-600 dark:text-accent-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {section.title}
                </h2>
              </div>
              <ul className="space-y-3">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary-600 dark:bg-accent-400 mt-2 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.section>
          ))}
        </motion.div>

        {/* Contact Section */}
        <motion.section
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="bg-gradient-to-r from-primary-50 to-purple-50 dark:from-accent-900/20 dark:to-purple-900/20 p-8 rounded-lg border border-primary-200 dark:border-accent-700"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-accent-900/50 flex items-center justify-center">
              <Mail className="w-6 h-6 text-primary-600 dark:text-accent-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Questions or Concerns?
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            If you have any questions about this privacy policy or how we handle your data, 
            please don't hesitate to contact us. We're here to help and ensure your privacy 
            is protected.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="/contact"
              className="px-6 py-3 bg-primary-600 dark:bg-accent-600 text-white rounded-md hover:bg-primary-700 dark:hover:bg-accent-700 transition-colors font-medium"
            >
              Contact Us
            </a>
            <a
              href="mailto:support@animatehub.com"
              className="px-6 py-3 border border-primary-600 dark:border-accent-600 text-primary-600 dark:text-accent-400 rounded-md hover:bg-primary-50 dark:hover:bg-accent-900/20 transition-colors font-medium"
            >
              Send Email
            </a>
          </div>
        </motion.section>

        {/* Important Notice */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 p-6 rounded-lg"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-200 mb-2">
                Important Notice
              </h3>
              <p className="text-amber-700 dark:text-amber-300 text-sm leading-relaxed">
                We may update this privacy policy from time to time to reflect changes in our 
                practices or for legal reasons. We will notify users of any significant changes 
                via email or through our platform. Your continued use of AnimateHub after any 
                changes indicates your acceptance of the updated policy.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicy;