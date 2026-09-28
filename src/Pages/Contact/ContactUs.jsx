import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Send,
  MessageCircle,
  Clock,
  Shield,
  Users,
  AlertCircle,
  CheckCircle2,
  X
} from "lucide-react";

// FAQ component with accordion animation
const FAQ = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [openItem, setOpenItem] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const faqElement = document.getElementById('faq-section');
    if (faqElement) {
      observer.observe(faqElement);
    }

    return () => observer.disconnect();
  }, []);

  const toggleItem = (index) => {
    setOpenItem(prevOpenItem => prevOpenItem === index ? null : index);
  };

  const faqData = [
    {
      question: "How long does it take to get a response?",
      answer: "We typically respond within 24 hours during business days. For urgent matters, we often reply much faster, sometimes within just a few hours."
    },
    {
      question: "What information should I include in my message?",
      answer: "Please include details about your project, timeline, budget range, and any specific requirements you have. The more information you provide, the better we can assist you."
    },
    {
      question: "Do you offer free consultations?",
      answer: "Yes! We offer free initial consultations to discuss your project needs and how we can help. This usually includes a 30-minute call to understand your requirements and provide initial recommendations."
    }
  ];

  return (
    <div 
      id="faq-section"
      className={`bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-3xl shadow-2xl p-8 transform transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
      }`}
    >
      <h2 className={`text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center transform transition-all duration-700 delay-200 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div 
            key={index}
            className={`border border-gray-200 dark:border-gray-600 rounded-2xl overflow-hidden transform transition-all duration-700 hover:shadow-lg ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: `${300 + index * 100}ms` }}
          >
            <button
              onClick={() => toggleItem(index)}
              className={`w-full px-6 py-4 text-left flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-300 ${
                openItem === index ? 'bg-blue-50 dark:bg-blue-900/20' : ''
              }`}
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                {item.question}
              </h3>
              <div className={`transform transition-transform duration-300 text-blue-600 dark:text-blue-400 ${
                openItem === index ? 'rotate-180' : 'rotate-0'
              }`}>
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </button>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
              openItem === index 
                ? 'max-h-96 opacity-100' 
                : 'max-h-0 opacity-0'
            }`}>
              <div className="px-6 py-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-600">
                <p className={`text-gray-600 dark:text-gray-300 leading-relaxed transform transition-all duration-300 ${
                  openItem === index 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-2 opacity-0'
                }`}>
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Contact Page Component
const Contact = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Enhanced validation states
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  // Animation states
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleStats, setVisibleStats] = useState([]);

  // Validation rules
  const validationRules = {
    name: {
      required: true,
      minLength: 2,
      maxLength: 50,
      pattern: /^[a-zA-Z\s'-]+$/,
      messages: {
        required: "Name is required",
        minLength: "Name must be at least 2 characters",
        maxLength: "Name cannot exceed 50 characters",
        pattern: "Name can only contain letters, spaces, hyphens, and apostrophes"
      }
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      maxLength: 100,
      messages: {
        required: "Email address is required",
        pattern: "Please enter a valid email address",
        maxLength: "Email cannot exceed 100 characters"
      }
    },
    message: {
      required: true,
      minLength: 10,
      maxLength: 1000,
      messages: {
        required: "Message is required",
        minLength: "Message must be at least 10 characters",
        maxLength: "Message cannot exceed 1000 characters"
      }
    }
  };

  // Initialize animations
  useEffect(() => {
    setIsLoaded(true);
    
    // Stagger stats animation
    const timeouts = [
      setTimeout(() => setVisibleStats(prev => [...prev, 0]), 500),
      setTimeout(() => setVisibleStats(prev => [...prev, 1]), 700),
      setTimeout(() => setVisibleStats(prev => [...prev, 2]), 900),
    ];

    return () => timeouts.forEach(clearTimeout);
  }, []);

  // Validation functions
  const validateField = (fieldName, value) => {
    const rules = validationRules[fieldName];
    if (!rules) return null;

    if (rules.required && (!value || value.trim() === "")) {
      return rules.messages.required;
    }

    if (!value || value.trim() === "") return null;

    if (rules.minLength && value.length < rules.minLength) {
      return rules.messages.minLength;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return rules.messages.maxLength;
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      return rules.messages.pattern;
    }

    return null;
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(validationRules).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    
    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    setIsFormValid(isValid);
    return isValid;
  };

  // Enhanced input change handler
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    
    const newFormData = {
      ...formData,
      [id]: value,
    };
    setFormData(newFormData);

    // Real-time validation for touched fields
    if (touched[id]) {
      const error = validateField(id, value);
      setErrors(prev => ({
        ...prev,
        [id]: error
      }));
    }

    // Update form validity immediately with correct data
    setTimeout(() => {
      const newErrors = {};
      Object.keys(validationRules).forEach(field => {
        const fieldValue = field === id ? value : newFormData[field];
        const error = validateField(field, fieldValue);
        if (error) newErrors[field] = error;
      });
      
      setErrors(newErrors);
      setIsFormValid(Object.keys(newErrors).length === 0);
    }, 0);
  };

  // Handle field blur
  const handleBlur = (e) => {
    const { id } = e.target;
    setTouched(prev => ({
      ...prev,
      [id]: true
    }));

    const error = validateField(id, formData[id]);
    setErrors(prev => ({
      ...prev,
      [id]: error
    }));
  };

  // Enhanced form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = Object.keys(validationRules).reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    // Validate entire form
    if (!validateForm()) {
      setSubmitStatus("validation_error");
      setTimeout(() => setSubmitStatus(null), 5000);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Simulate API call - replace with actual endpoint
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTouched({});
      setErrors({});
      setIsFormValid(false);
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  // Field status helpers
  const getFieldStatus = (fieldName) => {
    if (!touched[fieldName]) return "default";
    if (errors[fieldName]) return "error";
    if (formData[fieldName] && !errors[fieldName]) return "success";
    return "default";
  };

  const getFieldClasses = (fieldName) => {
    const status = getFieldStatus(fieldName);
    const baseClasses = "w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:ring-4 outline-none transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400";
    
    switch (status) {
      case "error":
        return `${baseClasses} bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-600 focus:border-red-500 focus:ring-red-500/20`;
      case "success":
        return `${baseClasses} bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-600 focus:border-green-500 focus:ring-green-500/20`;
      default:
        return `${baseClasses} bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500/20 focus:scale-105`;
    }
  };

  // Scroll to contact form function
  const scrollToContactForm = () => {
    const contactFormElement = document.getElementById('contact-form');
    if (contactFormElement) {
      contactFormElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
  <div className="relative min-h-screen w-full overflow-hidden 
  bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 
  dark:from-gray-950 dark:via-gray-900 dark:to-black">

    {/* Background Glow Effects */}
    <div className="absolute -top-40 -left-40 w-[600px] h-[600px] 
    bg-purple-500/30 rounded-full blur-[160px] animate-pulse"></div>

    <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] 
    bg-pink-500/30 rounded-full blur-[160px] animate-pulse"></div>

    <div className="relative z-10 max-w-7xl mx-auto px-6 py-28">

      {/* Header */}
      <div className="text-center mb-24">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight 
        bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 
        bg-clip-text text-transparent drop-shadow-md">
          Let’s Connect & Create Magic ✨
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-300 mt-6 max-w-2xl mx-auto leading-relaxed">
          We’re excited to hear your ideas. Let’s collaborate and bring them to life beautifully.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-24 items-start">

        {/* LEFT SIDE - FEATURE BOXES */}
        <div className="space-y-10">

          {[{
            icon: Clock,
            title: "24h",
            desc: "Fast & Friendly Response",
            gradient: "from-indigo-500 to-purple-600"
          },{
            icon: Users,
            title: "500+",
            desc: "Happy Clients Worldwide",
            gradient: "from-green-500 to-emerald-600"
          },{
            icon: Shield,
            title: "100%",
            desc: "Secure & Confidential",
            gradient: "from-pink-500 to-orange-500"
          }].map((item, i) => (
            <div key={i}
              className="float-animation group relative p-[2px] rounded-3xl 
              bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400
              hover:scale-[1.05] transition-all duration-500">

              <div className="rounded-3xl bg-white/80 dark:bg-gray-900/80 
              backdrop-blur-2xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)]
              border border-white/50 dark:border-gray-700/50">

                <div className="flex items-center gap-6">

                  <div className={`w-18 h-18 rounded-2xl bg-gradient-to-r ${item.gradient}
                  flex items-center justify-center shadow-xl 
                  group-hover:rotate-6 group-hover:scale-110 transition-all duration-500`}>
                    <item.icon className="text-white w-8 h-8" />
                  </div>

                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-1 text-lg">
                      {item.desc}
                    </p>
                  </div>

                </div>
              </div>
            </div>
          ))}

        </div>

        {/* RIGHT SIDE - FORM */}
        <div className="relative">

          {/* Glow Border */}
          <div className="absolute inset-0 rounded-3xl 
          bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
          blur-xl opacity-30 glow-animation"></div>

          <div className="relative bg-white/90 dark:bg-gray-900/90 
          backdrop-blur-2xl rounded-3xl p-14 shadow-[0_30px_80px_rgba(0,0,0,0.15)]
          border border-white/50 dark:border-gray-700/50">

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white 
            mb-12 text-center tracking-wide">
              Send Us a Message
            </h2>

            <div className="space-y-8">

              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="Your Name"
                className="w-full px-6 py-4 rounded-2xl 
                border border-gray-300 dark:border-gray-600
                bg-white dark:bg-gray-950
                focus:ring-2 focus:ring-purple-500 focus:scale-[1.02]
                transition-all duration-300 shadow-sm"
              />

              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="Your Email"
                className="w-full px-6 py-4 rounded-2xl 
                border border-gray-300 dark:border-gray-600
                bg-white dark:bg-gray-950
                focus:ring-2 focus:ring-blue-500 focus:scale-[1.02]
                transition-all duration-300 shadow-sm"
              />

              <textarea
                id="message"
                rows="5"
                value={formData.message}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="Tell us about your project..."
                className="w-full px-6 py-4 rounded-2xl 
                border border-gray-300 dark:border-gray-600
                bg-white dark:bg-gray-950 resize-none
                focus:ring-2 focus:ring-pink-500 focus:scale-[1.02]
                transition-all duration-300 shadow-sm"
              />

              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !isFormValid}
                className={`w-full py-4 rounded-2xl font-semibold text-white 
                animated-gradient transition-all duration-500 shadow-lg
                ${isSubmitting || !isFormValid
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:scale-105 hover:shadow-2xl"
                }`}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

            </div>

          </div>
        </div>

      </div>

      <div className="mt-32">
        <FAQ />
      </div>

    </div>

    {/* Proper React Style Block */}
    <style>
      {`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .float-animation {
          animation: floatSlow 4s ease-in-out infinite;
        }

        .glow-animation {
          animation: glowPulse 3s ease-in-out infinite;
        }

        .animated-gradient {
          background-size: 200% 200%;
          animation: gradientShift 6s ease infinite;
        }
      `}
    </style>

  </div>
);
};

export default Contact;