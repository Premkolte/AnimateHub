import React from 'react';
import { motion } from 'framer-motion';

const PricingSection = () => {
  // Sample plans data - replace with your actual plans
  const plans = [
    {
      planName: "Starter",
      planSubText: "Perfect for individuals getting started",
      price: "$9",
      priceSubText: "per month",
      features: [
        "5 Projects",
        "10GB Storage",
        "Basic Support",
        "Standard Analytics",
        "Email Integration"
      ],
      btnText: "Get Started",
      redirectTo: "/starter",
      isPopular: false
    },
    {
      planName: "Professional",
      planSubText: "Most popular for growing teams",
      price: "$29",
      priceSubText: "per month",
      features: [
        "Unlimited Projects",
        "100GB Storage",
        "Priority Support",
        "Advanced Analytics",
        "API Access",
        "Team Collaboration",
        "Custom Integrations"
      ],
      btnText: "Start Free Trial",
      redirectTo: "/professional",
      isPopular: true
    },
    {
      planName: "Enterprise",
      planSubText: "For large organizations with advanced needs",
      price: "$99",
      priceSubText: "per month",
      features: [
        "Everything in Pro",
        "Unlimited Storage",
        "24/7 Dedicated Support",
        "Custom Solutions",
        "SSO Integration",
        "Advanced Security"
      ],
      btnText: "Contact Sales",
      redirectTo: "/enterprise",
      isPopular: false
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
        duration: 0.7
      }
    }
  };

  return (
    <section className="relative text-center space-y-1 py-8 sm:py-10 md:py-12 pricing-section px-3 sm:px-4 md:px-6 overflow-visible">
       
      <div className="relative z-10">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 sm:mb-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-secondary-800 rounded-full mb-8 shadow-lg border border-primary-200 dark:border-accent-700"
          >
            <div className="w-2 h-2 bg-primary-500 dark:bg-accent-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-primary-600 dark:text-accent-400">Choose Your Perfect Plan</span>
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
              key={idx}
              variants={cardVariants}
              className={`relative flex flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl border-2 p-6 sm:p-8 rounded-3xl w-full max-w-sm min-h-[450px] sm:min-h-[480px] transition-all duration-500 ease-out group overflow-hidden ${
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

                <h2 className={`font-black text-xl sm:text-2xl md:text-3xl text-center mb-2 ${
                  plan.isPopular 
                    ? 'bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent' 
                    : 'text-secondary-900 dark:text-white'
                }`}>
                  {plan.planName}
                </h2>
                <p className="text-secondary-600 dark:text-secondary-300 text-center text-xs sm:text-sm mb-6 font-medium leading-relaxed">
                  {plan.planSubText}
                </p>
                
                {/* Enhanced Price Display */}
                <div className="flex flex-col items-center my-6 sm:my-8">
                  <div className="flex items-baseline gap-2">
                    <span className={`font-black text-3xl sm:text-4xl md:text-5xl ${
                      plan.isPopular 
                        ? 'bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent' 
                        : 'text-secondary-900 dark:text-white'
                    }`}>
                      {plan.price}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-secondary-500 dark:text-secondary-400 mt-2 font-medium">
                    {plan.priceSubText}
                  </p>
                </div>
              </div>

              {/* Enhanced Features */}
              <div className="flex flex-col gap-2 w-full flex-1 justify-between">
                <div className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index + 0.4 }}
                      className="flex items-center gap-3 text-xs sm:text-sm group-hover:translate-x-1 transition-transform duration-200"
                    >
                      <div className={`p-1.5 rounded-lg shadow-sm ${
                        plan.isPopular 
                          ? 'bg-primary-500 dark:bg-accent-500' 
                          : 'bg-primary-100 dark:bg-accent-900'
                      }`}>
                        <div className={`w-3 h-3 ${
                          plan.isPopular ? 'text-white' : 'text-primary-600 dark:text-accent-400'
                        }`}>
                          ✓
                        </div>
                      </div>
                      <span className="text-secondary-700 dark:text-secondary-300 font-semibold">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Enhanced CTA Button */}
                <div className="flex justify-center mt-6 sm:mt-8">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-3 rounded-2xl transition-all duration-300 text-sm font-bold min-w-[180px] shadow-xl transform hover:shadow-2xl ${
                      plan.isPopular
                        ? 'bg-gradient-to-r from-primary-500 to-accent-500 dark:from-primary-600 dark:to-accent-600 text-white shadow-primary-500/25 dark:shadow-accent-500/25 hover:shadow-primary-500/40 dark:hover:shadow-accent-500/40'
                        : 'border-3 border-primary-500 dark:border-accent-500 text-primary-600 dark:text-accent-600 hover:bg-primary-500 hover:text-white dark:hover:bg-accent-500 dark:hover:text-white bg-white dark:bg-secondary-800'
                    }`}
                  >
                    {plan.btnText}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default PricingSection;