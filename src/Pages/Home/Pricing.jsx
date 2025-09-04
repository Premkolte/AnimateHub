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
    className={`relative flex flex-col p-8 rounded-2xl bg-white dark:bg-secondary-900 
      border border-secondary-200 dark:border-secondary-600
      shadow-lg hover:shadow-xl hover:border-primary-600 dark:hover:border-accent-600 transition-all duration-300
      ${plan.popular ? 'ring-2 ring-primary-500 dark:ring-accent-500' : ''}
      h-full`}
  >
    {plan.popular && (
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
        <div className="bg-primary-500 dark:bg-accent-500 text-white text-xs font-medium px-4 py-1 rounded-full whitespace-nowrap">
          Most Popular
        </div>
      </div>
    )}
    
    <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-2">
      {plan.name}
    </h3>
    
    <p className="text-secondary-600 dark:text-secondary-300 mb-6">
      {plan.description}
    </p>
    
    <div className="mb-8">
      <span className="text-4xl font-bold text-secondary-900 dark:text-white">
        {plan.price}
      </span>
      <span className="text-secondary-500 dark:text-secondary-400 ml-2">
        {plan.period}
      </span>
    </div>
    
    <ul className="space-y-3 mb-8 text-left">
      {plan.features.map((feature, index) => (
        <li key={index} className="flex items-center">
          <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
          <span className="text-secondary-700 dark:text-secondary-300">{feature}</span>
        </li>
      ))}
    </ul>
    
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`mt-auto w-full py-3 px-6 rounded-lg font-medium transition-colors
        ${plan.popular 
          ? 'bg-primary-600 hover:bg-primary-700 text-white' 
          : 'bg-secondary-100 hover:bg-secondary-200 dark:bg-secondary-700 dark:hover:bg-secondary-600 text-gray-900 dark:text-white'}`}
    >
      {plan.cta}
    </motion.button>
  </motion.div>
);

const PricingSection = () => {
  return (
    <section className="w-full py-20 overflow-hidden">
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary-600 dark:text-accent-500">
            Simple, transparent pricing
          </h2>
          <p className="max-w-2xl mx-auto text-secondary-600 dark:text-secondary-300 text-lg">
            Choose the perfect plan for your needs. No hidden fees, no surprises.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto mb-16"
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
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="bg-white dark:bg-secondary-900 p-6 rounded-2xl shadow-lg inline-block border border-secondary-200 dark:border-secondary-600">
            <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
              Need a custom solution?
            </h3>
            <p className="text-secondary-600 dark:text-secondary-300 mb-4">
              We offer custom plans for large teams and enterprises.
            </p>
            <button className="inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors">
              Contact Sales <Zap className="w-4 h-4 ml-2" />
            </button>
          </div>
        </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
