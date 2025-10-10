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
      <div className="relative flex flex-col items-center justify-center overflow-hidden w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
          {/* Background Pattern */}
          <div
              className={`absolute inset-0 transition-opacity duration-1000 ${isLoaded ? "opacity-10" : "opacity-0"}`}
          >
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]"></div>
          </div>

          {/* Wrapper Container */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 py-16">
              {/* Header Section */}
              <div className="text-center mb-16">
                  <div
                      onClick={scrollToContactForm}
                      className={`inline-flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md px-6 py-3 rounded-full border border-gray-200 dark:border-gray-700 shadow-lg mb-8 cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-500 transform ${
                          isLoaded
                              ? "translate-y-0 opacity-100 scale-100"
                              : "translate-y-8 opacity-0 scale-95"
                      }`}
                  >
                      <MessageCircle className="w-6 h-6 text-blue-600 animate-pulse" />
                      <span className="text-gray-900 dark:text-gray-300 font-medium">
                          Let's Connect
                      </span>
                  </div>

                  <h1
                      className={`text-black dark:text-white text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent transform transition-all duration-700 delay-200 hover:scale-75 ${
                          isLoaded
                              ? "translate-y-0 opacity-100"
                              : "translate-y-8 opacity-0"
                      }`}
                  >
                      Get In Touch
                      
                  </h1>

                  <p
                      className={`text-base text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed transform transition-all duration-700 delay-400 ${
                          isLoaded
                              ? "translate-y-0 opacity-100"
                              : "translate-y-8 opacity-0"
                      }`}
                  >
                      Ready to bring your ideas to life? We'd love to hear about
                      your project and discuss how we can help you succeed.
                  </p>
              </div>

              {/* Contact Stats & Form Section */}
              <div className="flex flex-col lg:flex-row gap-12">
                  {/* Contact Stats */}
                  <div className="w-full lg:w-1/3 grid grid-cols-1 gap-8 mb-8 lg:mb-0">
                      {/* Response Time */}
                      <div
                          className={`text-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 group transform ${
                              visibleStats.includes(0)
                                  ? "translate-x-0 opacity-100"
                                  : "-translate-x-16 opacity-0"
                          }`}
                      >
                          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-400 dark:from-purple-600 dark:to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 hover:rotate-12 transition-all duration-300">
                              <Clock className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                              24h
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300">
                              Response Time
                          </p>
                      </div>

                      {/* Happy Clients */}
                      <div
                          className={`text-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 group transform ${
                              visibleStats.includes(1)
                                  ? "translate-x-0 opacity-100"
                                  : "-translate-x-16 opacity-0"
                          }`}
                      >
                          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-400 dark:from-green-600 dark:to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 hover:rotate-12 transition-all duration-300">
                              <Users className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                              500+
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300">
                              Happy Clients
                          </p>
                      </div>

                      {/* Secure */}
                      <div
                          className={`text-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 group transform ${
                              visibleStats.includes(2)
                                  ? "translate-x-0 opacity-100"
                                  : "-translate-x-16 opacity-0"
                          }`}
                      >
                          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-400 dark:from-orange-600 dark:to-red-600 rounded-2xl flex items-center hover:rotate-12 justify-center mx-auto mb-4 transition-all duration-300">
                              <Shield className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                              100%
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300">
                              Secure
                          </p>
                      </div>
                  </div>

                  {/* Contact Form */}
                  <div
                      className={`flex-1 transform transition-all duration-700 delay-300 ${
                          isLoaded
                              ? "translate-x-0 opacity-100"
                              : "translate-x-16 opacity-0"
                      }`}
                      id="contact-form"
                  >
                      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-3xl shadow-2xl p-8 md:p-12 hover:-translate-y-2 transition-all duration-300">
                          {/* Form Header */}
                          <div
                              className={`text-center mb-10 transform transition-all duration-500 delay-500 ${
                                  isLoaded
                                      ? "translate-y-0 opacity-100"
                                      : "translate-y-4 opacity-0"
                              }`}
                          >
                              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                  Send us a message
                              </h2>
                              <p className="text-base text-gray-600 dark:text-gray-300 mb-6">
                                  Got any questions, suggestions, or feedback?
                                  We'd love to hear from you!
                              </p>
                              <p className="text-base text-gray-600 dark:text-gray-300">
                                  Reach out to us via email at{" "}
                                  <a
                                      href="mailto:contact@animatehub.com"
                                      className="text-blue-600 dark:text-blue-400 hover:underline font-semibold transition-all duration-300 hover:scale-105 inline-block"
                                  >
                                      contact@animatehub.com
                                  </a>{" "}
                                  or fill out the form below:
                              </p>
                          </div>

                          {/* Status Messages */}
                          {submitStatus === "success" && (
                              <div className="mb-8 p-4 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-xl flex items-center gap-3">
                                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                                  <p className="text-green-800 dark:text-green-200 font-medium">
                                      Thank you! Your message has been sent successfully.
                                  </p>
                              </div>
                          )}

                          {submitStatus === "error" && (
                              <div className="mb-8 p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-xl flex items-center gap-3">
                                  <X className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                                  <p className="text-red-800 dark:text-red-200 font-medium">
                                      Failed to send message. Please try again later.
                                  </p>
                              </div>
                          )}

                          {submitStatus === "validation_error" && (
                              <div className="mb-8 p-4 bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 rounded-xl flex items-center gap-3">
                                  <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
                                  <p className="text-yellow-800 dark:text-yellow-200 font-medium">
                                      Please fix the errors below before submitting.
                                  </p>
                              </div>
                          )}

                          {/* Form Fields */}
                          <div className="space-y-8">
                              {/* Name & Email Fields */}
                              <div
                                  className={`grid grid-cols-1 md:grid-cols-2 gap-6 transform transition-all duration-500 delay-700 ${
                                      isLoaded
                                          ? "translate-y-0 opacity-100"
                                          : "translate-y-4 opacity-0"
                                  }`}
                              >
                                  {/* Name */}
                                  <div className="space-y-2">
                                      <label
                                          htmlFor="name"
                                          className="text-sm font-semibold text-gray-700 dark:text-gray-300 block"
                                      >
                                          Your Name *
                                      </label>
                                      <div className="relative group">
                                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                                              <User className={`w-5 h-5 transition-colors duration-200 ${
                                                getFieldStatus("name") === "error" 
                                                  ? "text-red-500" 
                                                  : getFieldStatus("name") === "success"
                                                  ? "text-green-500"
                                                  : "text-gray-400 group-focus-within:text-blue-600"
                                              }`} />
                                          </div>
                                          <input
                                              type="text"
                                              id="name"
                                              value={formData.name}
                                              onChange={handleInputChange}
                                              onBlur={handleBlur}
                                              placeholder="Enter your full name"
                                              className={getFieldClasses("name")}
                                              aria-describedby={errors.name ? "name-error" : undefined}
                                              aria-invalid={!!errors.name}
                                          />
                                          {getFieldStatus("name") === "success" && (
                                            <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                                            </div>
                                          )}
                                      </div>
                                      {errors.name && (
                                        <p id="name-error" className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2 mt-2">
                                          <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                          {errors.name}
                                        </p>
                                      )}
                                      <div className="text-xs text-gray-500 dark:text-gray-400">
                                        {formData.name.length}/50 characters
                                      </div>
                                  </div>

                                  {/* Email */}
                                  <div className="space-y-2">
                                      <label
                                          htmlFor="email"
                                          className="text-sm font-semibold text-gray-700 dark:text-gray-300 block"
                                      >
                                          Your Email *
                                      </label>
                                      <div className="relative group">
                                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                                              <Mail className={`w-5 h-5 transition-colors duration-200 ${
                                                getFieldStatus("email") === "error" 
                                                  ? "text-red-500" 
                                                  : getFieldStatus("email") === "success"
                                                  ? "text-green-500"
                                                  : "text-gray-400 group-focus-within:text-blue-600"
                                              }`} />
                                          </div>
                                          <input
                                              type="email"
                                              id="email"
                                              placeholder="Enter your email address"
                                              value={formData.email}
                                              onChange={handleInputChange}
                                              onBlur={handleBlur}
                                              className={getFieldClasses("email")}
                                              aria-describedby={errors.email ? "email-error" : undefined}
                                              aria-invalid={!!errors.email}
                                          />
                                          {getFieldStatus("email") === "success" && (
                                            <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                                            </div>
                                          )}
                                      </div>
                                      {errors.email && (
                                        <p id="email-error" className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2 mt-2">
                                          <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                          {errors.email}
                                        </p>
                                      )}
                                      <div className="text-xs text-gray-500 dark:text-gray-400">
                                        {formData.email.length}/100 characters
                                      </div>
                                  </div>
                              </div>

                              {/* Message Field */}
                              <div
                                  className={`space-y-2 transform transition-all duration-500 delay-800 ${
                                      isLoaded
                                          ? "translate-y-0 opacity-100"
                                          : "translate-y-4 opacity-0"
                                  }`}
                              >
                                  <label
                                      htmlFor="message"
                                      className="text-sm font-semibold text-gray-700 dark:text-gray-300 block"
                                  >
                                      Your Message *
                                  </label>
                                  <div className="relative">
                                      <textarea
                                          id="message"
                                          placeholder="Tell us about your project, questions, or how we can help you..."
                                          rows="6"
                                          value={formData.message}
                                          onChange={handleInputChange}
                                          onBlur={handleBlur}
                                          className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-4 outline-none transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none ${
                                            getFieldStatus("message") === "error" 
                                              ? "bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-600 focus:border-red-500 focus:ring-red-500/20"
                                              : getFieldStatus("message") === "success"
                                              ? "bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-600 focus:border-green-500 focus:ring-green-500/20"
                                              : "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500/20 focus:scale-105"
                                          }`}
                                          aria-describedby={errors.message ? "message-error" : undefined}
                                          aria-invalid={!!errors.message}
                                      />
                                      {getFieldStatus("message") === "success" && (
                                        <div className="absolute top-4 right-4">
                                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                                        </div>
                                      )}
                                  </div>
                                  {errors.message && (
                                    <p id="message-error" className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2 mt-2">
                                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                      {errors.message}
                                    </p>
                                  )}
                                  <div className="text-xs text-gray-500 dark:text-gray-400 flex justify-between">
                                    <span>{formData.message.length}/1000 characters</span>
                                    <span className={formData.message.length >= 10 ? "text-green-600 dark:text-green-400" : ""}>
                                      {formData.message.length >= 10 ? "✓" : ""} Minimum 10 characters
                                    </span>
                                  </div>
                              </div>

                              {/* Submit Button */}
                              <div
                                  className={`text-center pt-4 transform transition-all duration-500 delay-900 ${
                                      isLoaded
                                          ? "translate-y-0 opacity-100"
                                          : "translate-y-4 opacity-0"
                                  }`}
                              >
                                  <button
                                      type="button"
                                      onClick={handleSubmit}
                                      disabled={isSubmitting || !isFormValid}
                                      className={`flex justify-center items-center gap-3 w-full px-8 py-4 font-semibold rounded-full shadow-lg transform transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 ${
                                        isSubmitting || !isFormValid
                                          ? "bg-gray-400 dark:bg-gray-600 text-gray-200 cursor-not-allowed"
                                          : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover:shadow-xl hover:scale-105"
                                      }`}
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
                                  </button>
                                  
                                  {!isFormValid && Object.keys(touched).length > 0 && (
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                      Please fill out all required fields correctly
                                    </p>
                                  )}
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              {/* FAQ Section */}
              <div className="mt-20">
                  <FAQ />
              </div>
          </div>

          {/* Custom CSS for animations */}
          <style jsx>{`
              @keyframes fade-in {
                  from {
                      opacity: 0;
                      transform: translateY(10px);
                  }
                  to {
                      opacity: 1;
                      transform: translateY(0);
                  }
              }

              @keyframes float {
                  0%,
                  100% {
                      transform: translateY(0px);
                  }
                  50% {
                      transform: translateY(-10px);
                  }
              }

              @keyframes glow {
                  0%,
                  100% {
                      box-shadow: 0 0 5px rgba(59, 130, 246, 0.3);
                  }
                  50% {
                      box-shadow: 0 0 20px rgba(59, 130, 246, 0.6);
                  }
              }

              .animate-fade-in {
                  animation: fade-in 0.5s ease-out;
              }

              .animate-float {
                  animation: float 3s ease-in-out infinite;
              }

              .animate-glow {
                  animation: glow 2s ease-in-out infinite;
              }

              /* Smooth scrolling for the whole page */
              html {
                  scroll-behavior: smooth;
              }

              /* Custom focus styles */
              input:focus,
              textarea:focus {
                  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
              }

              /* Custom gradient text */
              .bg-clip-text {
                  -webkit-background-clip: text;
                  background-clip: text;
              }

              /* Custom hover animations */
              .group:hover .animate-pulse {
                  animation-duration: 0.5s;
              }
          `}</style>
      </div>
  );
};

export default Contact;