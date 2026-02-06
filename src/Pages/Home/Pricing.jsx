import React from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, Zap, Crown, ArrowRight } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
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
      damping: 15,
    },
  },
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
      "Email Integration",
    ],
    cta: "Get Started",
    popular: false,
    icon: Sparkles,
    gradient: "from-cyan-500 via-blue-500 to-indigo-500",
    glowColor: "group-hover:shadow-[0_0_50px_rgba(59,130,246,0.3)]",
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
      "Custom Integrations",
    ],
    cta: "Start Free Trial",
    popular: true,
    icon: Zap,
    gradient: "from-purple-500 via-pink-500 to-rose-500",
    glowColor: "group-hover:shadow-[0_0_60px_rgba(168,85,247,0.4)]",
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
      "Advanced Security",
    ],
    cta: "Contact Sales",
    popular: false,
    icon: Crown,
    gradient: "from-amber-500 via-orange-500 to-red-500",
    glowColor: "group-hover:shadow-[0_0_50px_rgba(245,158,11,0.3)]",
  },
];

const PricingCard = ({ plan, variants, idx }) => {
  const IconComponent = plan.icon;
  
  return (
    <motion.div
      variants={variants}
      className={`group relative flex flex-col items-center backdrop-blur-xl border-2 p-6 sm:p-8 pt-14 sm:pt-16 rounded-3xl w-full max-w-sm min-h-[450px] sm:min-h-[480px] transition-all duration-500 ease-out overflow-hidden cursor-pointer
        ${plan.popular
          ? 'bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 dark:from-slate-900 dark:via-purple-900/30 dark:to-slate-900 border-transparent z-20 scale-105 xl:scale-110'
          : 'bg-white/90 dark:bg-secondary-800/90 border-secondary-200/50 dark:border-secondary-700/50'
        } ${plan.glowColor}`}
      style={{ zIndex: plan.popular ? 2 : 1 }}
      whileHover={{
        y: plan.popular ? -10 : -15,
        transition: { type: "spring", stiffness: 400, damping: 20 },
      }}
    >
      {/* Animated gradient border for popular */}
      {plan.popular && (
        <div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 bg-[length:200%_auto] animate-gradient">
          <div className="w-full h-full rounded-3xl bg-slate-900" />
        </div>
      )}
      
      {/* Gradient border on hover for non-popular */}
      {!plan.popular && (
        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${plan.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[2px]`}>
          <div className="w-full h-full bg-white dark:bg-secondary-800 rounded-3xl" />
        </div>
      )}

      {/* Popular Badge */}
      {plan.popular && (
        <motion.div 
          className="absolute -top-1 left-1/2 -translate-x-1/2 z-[60]"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-xl flex items-center gap-2">
            <Sparkles size={16} className="animate-pulse" />
            MOST POPULAR
          </div>
        </motion.div>
      )}

      {/* Floating particles for popular */}
      {plan.popular && (
        <>
          <div className="absolute top-10 right-8 w-2 h-2 rounded-full bg-pink-400 animate-float opacity-60" />
          <div className="absolute top-1/3 left-6 w-1.5 h-1.5 rounded-full bg-purple-400 animate-float animation-delay-300 opacity-60" />
          <div className="absolute bottom-20 right-10 w-1 h-1 rounded-full bg-rose-400 animate-float animation-delay-500 opacity-60" />
        </>
      )}

      <div className="w-full flex-1 relative z-10">
        {/* Icon */}
        <motion.div 
          className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-br ${plan.gradient}`}
          whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          <IconComponent size={28} className="text-white" />
          {/* Icon glow */}
          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${plan.gradient} blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-300`} />
        </motion.div>

        <h3 className={`text-xl sm:text-2xl font-bold mb-2 text-center ${plan.popular ? 'text-white' : 'text-secondary-900 dark:text-white'}`}>
          {plan.name}
        </h3>
        <p className={`text-sm sm:text-base mb-4 sm:mb-6 text-center ${plan.popular ? 'text-gray-300' : 'text-secondary-600 dark:text-secondary-300'}`}>
          {plan.description}
        </p>
        
        {/* Price */}
        <div className="mb-6 sm:mb-8 flex items-baseline justify-center gap-2">
          <span className={`text-4xl sm:text-5xl font-bold bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
            {plan.price}
          </span>
          <span className={`text-sm sm:text-base ${plan.popular ? 'text-gray-400' : 'text-secondary-500 dark:text-secondary-400'}`}>
            {plan.period}
          </span>
        </div>
        
        {/* Features */}
        <ul className="space-y-3 mb-6 sm:mb-8 text-left">
          {plan.features.map((feature, index) => (
            <motion.li 
              key={index} 
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${plan.gradient} flex items-center justify-center flex-shrink-0`}>
                <Check className="w-3 h-3 text-white" />
              </div>
              <span className={`text-sm sm:text-base ${plan.popular ? 'text-gray-300' : 'text-secondary-700 dark:text-secondary-300'}`}>
                {feature}
              </span>
            </motion.li>
          ))}
        </ul>
        
        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className={`group/btn relative mt-auto w-full py-3 sm:py-4 px-4 sm:px-6 rounded-xl text-sm sm:text-base font-semibold overflow-hidden transition-all duration-300
            ${plan.popular
              ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white shadow-lg shadow-purple-500/30'
              : `bg-gradient-to-r ${plan.gradient} text-white shadow-lg`
            }`}
        >
          {/* Shine effect */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
          <span className="relative z-10 flex items-center justify-center gap-2">
            {plan.cta}
            <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
};

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
                  damping: 12,
                },
              },
            }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 mb-6"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">Simple Pricing</span>
            </motion.div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 dark:from-purple-400 dark:via-pink-400 dark:to-rose-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                Pricing Plans
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-secondary-600 dark:text-secondary-300 max-w-2xl mx-auto font-medium px-4">
              Choose the perfect plan for your needs. Scale your business with confidence.
            </p>
          </motion.div>
          <div className="flex flex-wrap xl:flex-nowrap xl:flex-row justify-center items-stretch gap-4 sm:gap-3 xl:gap-6 mt-12 max-w-7xl mx-auto">
            {plans.map((plan, idx) => (
              <PricingCard key={plan.name} plan={plan} variants={item} idx={idx} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
