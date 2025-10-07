import React from "react";
import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";

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

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  },
  hover: {
    y: -5,
    transition: { duration: 0.2 }
  }
};

const plans = [
  {
    name: "Starter",
    description: "Perfect for individuals getting started",
    price: "$9",
    period: "per month",
    features: [
      "5 Projects",
      "10GB Storage",
      "Basic Support",
      "Standard Analytics",
      "Email Integration"
    ],
    cta: "Get Started",
    popular: false
  },
  {
    name: "Professional",
    description: "Most popular for growing teams",
    price: "$29",
    period: "per month",
    features: [
      "Unlimited Projects",
      "100GB Storage",
      "Priority Support",
      "Advanced Analytics",
      "API Access",
      "Team Collaboration",
      "Custom Integrations"
    ],
    cta: "Start Free Trial",
    popular: true
  },
  {
    name: "Enterprise",
    description: "For large organizations with advanced needs",
    price: "Custom",
    period: "Let's talk",
    features: [
      "Everything in Pro",
      "Unlimited Storage",
      "24/7 Dedicated Support",
      "Custom Solutions",
      "SSO Integration",
      "Advanced Security"
    ],
    cta: "Contact Sales",
    popular: false
  }
];

const PricingCard = ({ plan, variants }) => (
  <motion.div
    variants={variants}
    whileHover="hover"
    className={`relative flex flex-col p-6 sm:p-8 rounded-2xl bg-white dark:bg-secondary-900 
      border border-secondary-200 dark:border-secondary-600
      shadow-lg hover:shadow-xl hover:border-primary-600 dark:hover:border-accent-600 transition-all duration-300
      ${plan.popular ? 'ring-2 ring-primary-500 dark:ring-accent-500' : ''}
      h-full w-full max-w-md mx-auto sm:max-w-none`}
  >
    {plan.popular && (
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
        <div className="bg-primary-500 dark:bg-accent-500 text-white text-xs font-medium px-4 py-1 rounded-full whitespace-nowrap">
          Most Popular
        </div>
      </div>
    )}

    <h3 className="text-xl sm:text-2xl font-bold text-secondary-900 dark:text-white mb-2">
      {plan.name}
    </h3>

    <p className="text-sm sm:text-base text-secondary-600 dark:text-secondary-300 mb-4 sm:mb-6">
      {plan.description}
    </p>

    <div className="mb-6 sm:mb-8">
      <div className="flex items-baseline flex-wrap gap-2">
        <span className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-white">
          {plan.price}
        </span>
        <span className="text-sm sm:text-base text-secondary-500 dark:text-secondary-400">
          {plan.period}
        </span>
      </div>
    </div>

    <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 text-left">
      {plan.features.map((feature, index) => (
        <li key={index} className="flex items-start sm:items-center">
          <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 sm:mt-0 mr-2 flex-shrink-0" />
          <span className="text-sm sm:text-base text-secondary-700 dark:text-secondary-300">{feature}</span>
        </li>
      ))}
    </ul>

    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`mt-auto w-full py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg text-sm sm:text-base font-medium transition-colors
        ${plan.popular
          ? 'bg-primary-600 hover:bg-primary-700 dark:bg-accent-600 dark:hover:bg-accent-700 text-white'
          : 'bg-secondary-100 hover:bg-secondary-200 dark:bg-secondary-700 dark:hover:bg-secondary-600 text-gray-900 dark:text-white'}`}
    >
      {plan.cta}
    </motion.button>
  </motion.div>
);

const PricingSection = () => {
  return (
    <section className="w-full sm:py-10 md:py-2 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
        >
          <motion.div
            className="text-center mb-16"
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-primary-600 dark:text-accent-500">
              Simple, transparent pricing
            </h2>
            <p className="max-w-2xl mx-auto text-secondary-600 dark:text-secondary-300 text-base sm:text-lg px-4">
              Choose the perfect plan for your needs. No hidden fees, no surprises.
            </p>
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-primary-600 via-accent-600 to-primary-600 dark:from-primary-400 dark:via-accent-400 dark:to-primary-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              Pricing Plans
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-secondary-600 dark:text-secondary-300 max-w-3xl mx-auto font-medium">
            Scale your business with confidence. No hidden fees, cancel anytime.
          </p>
        </motion.div>

        {/* Enhanced Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap xl:flex-nowrap xl:flex-row justify-center items-stretch gap-4 sm:gap-3 xl:gap-6 mt-12 max-w-7xl mx-auto"
        >
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.id}
              variants={cardVariants}
              className={`relative flex flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl border-2 p-6 sm:p-8 pt-14 sm:pt-16 rounded-3xl w-full max-w-sm min-h-[450px] sm:min-h-[480px] transition-all duration-500 ease-out group overflow-hidden ${
                plan.isPopular
                  ? 'border-primary-500 dark:border-accent-500 shadow-2xl shadow-primary-500/20 dark:shadow-accent-500/20 transform scale-105 xl:scale-110 z-20'
                  : 'border-secondary-200 dark:border-secondary-700 shadow-xl hover:shadow-2xl hover:border-primary-300 dark:hover:border-accent-400'
              }`}
              whileHover={{ 
                y: plan.isPopular ? -8 : -12,
                scale: plan.isPopular ? 1.02 : 1.05,
                transition: { type: "spring", stiffness: 400, damping: 25 }
              }}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="absolute top-4 right-4 z-[60]">
                  <div className="bg-gradient-to-r from-primary-500 to-accent-500 dark:from-primary-600 dark:to-accent-600 text-white px-3 py-2 rounded-full text-xs font-bold shadow-xl border-2 border-white dark:border-secondary-800">
                    ⭐ MOST POPULAR
                  </div>
                </div>
              )}

              {/* Enhanced Glow Effect for Popular Plan */}
              {plan.isPopular && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-accent-500/10 to-primary-500/10 dark:from-primary-400/10 dark:via-accent-400/10 dark:to-primary-400/10 rounded-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary-500/20 to-accent-500/20 dark:from-primary-400/20 dark:to-accent-400/20 rounded-3xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                </>
              )}

              <div className="w-full flex-1 relative z-10">
                {/* Enhanced Plan Header */}
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300 ${
                  plan.isPopular 
                    ? 'bg-gradient-to-br from-primary-500 to-accent-500 dark:from-primary-600 dark:to-accent-600' 
                    : 'bg-gradient-to-br from-secondary-100 to-secondary-200 dark:from-secondary-700 dark:to-secondary-600'
                }`}>
                  <div className={`text-2xl font-bold ${
                    plan.isPopular ? 'text-white' : 'text-primary-600 dark:text-accent-400'
                  }`}>
                    {idx === 0 && '🚀'}
                    {idx === 1 && '⚡'}
                    {idx === 2 && '👑'}
                  </div>
                </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4 max-w-7xl mx-auto mb-12 sm:mb-16"
          >
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                variants={item}
                className="h-full"
              >
                <PricingCard plan={plan} variants={item} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
