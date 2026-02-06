/**
 * Reusable Framer Motion variants for consistent animations
 * Import and use with motion components: <motion.div variants={fadeInUp} />
 */

// Fade animations
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

// Scale animations
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }
  }
};

export const popIn = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
};

// Stagger container for children
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const staggerContainerFast = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

export const staggerContainerSlow = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

// Card hover effects
export const cardHover = {
  rest: { 
    scale: 1,
    y: 0,
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.3, ease: "easeOut" }
  },
  hover: { 
    scale: 1.02,
    y: -8,
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

export const cardHoverGlow = {
  rest: { 
    scale: 1,
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  hover: { 
    scale: 1.03,
    boxShadow: "0 0 30px rgba(59, 130, 246, 0.4), 0 20px 40px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.3 }
  }
};

// Button animations
export const buttonTap = {
  tap: { scale: 0.95 }
};

export const buttonHover = {
  rest: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 }
};

export const buttonBounce = {
  hover: { 
    y: -3,
    transition: { 
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  tap: { y: 0, scale: 0.98 }
};

// Icon animations
export const iconSpin = {
  hover: { 
    rotate: 360,
    transition: { duration: 0.5, ease: "easeInOut" }
  }
};

export const iconBounce = {
  hover: {
    y: [0, -5, 0],
    transition: { duration: 0.4 }
  }
};

export const iconPulse = {
  animate: {
    scale: [1, 1.1, 1],
    transition: { duration: 1.5, repeat: Infinity }
  }
};

// Page transitions
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.3 }
  }
};

export const slidePageLeft = {
  initial: { opacity: 0, x: 100 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  },
  exit: { 
    opacity: 0, 
    x: -100,
    transition: { duration: 0.3 }
  }
};

// List item animations
export const listItem = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { type: "spring", stiffness: 100, damping: 12 }
  }
};

// Floating animation
export const floatingAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Gradient text shimmer (for text that needs background animation)
export const textShimmer = {
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

// Modal/Dialog animations
export const modalOverlay = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

export const modalContent = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 25 }
  },
  exit: { 
    opacity: 0, 
    scale: 0.9, 
    y: 20,
    transition: { duration: 0.2 }
  }
};

// Tooltip animation
export const tooltip = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { duration: 0.2 }
  }
};

// Drawer/Sidebar animations
export const drawerLeft = {
  hidden: { x: "-100%" },
  visible: { 
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 }
  },
  exit: { x: "-100%", transition: { duration: 0.2 } }
};

export const drawerRight = {
  hidden: { x: "100%" },
  visible: { 
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 }
  },
  exit: { x: "100%", transition: { duration: 0.2 } }
};

// Notification animations
export const notification = {
  hidden: { opacity: 0, y: -50, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 20 }
  },
  exit: { 
    opacity: 0, 
    y: -20, 
    scale: 0.9,
    transition: { duration: 0.2 }
  }
};

// Color theme presets for gradients
export const gradientPresets = {
  primary: "from-primary-500 via-primary-600 to-primary-700",
  accent: "from-accent-500 via-accent-600 to-accent-700",
  sunset: "from-orange-500 via-pink-500 to-purple-600",
  ocean: "from-cyan-500 via-blue-500 to-indigo-600",
  forest: "from-green-500 via-emerald-500 to-teal-600",
  fire: "from-yellow-500 via-orange-500 to-red-600",
  aurora: "from-green-400 via-cyan-500 to-blue-600",
  cosmic: "from-purple-600 via-pink-500 to-orange-400",
  midnight: "from-slate-900 via-purple-900 to-slate-800",
  neon: "from-pink-500 via-purple-500 to-cyan-500",
};

// Export all as default object for convenience
export default {
  fadeIn,
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  popIn,
  staggerContainer,
  staggerContainerFast,
  staggerContainerSlow,
  cardHover,
  cardHoverGlow,
  buttonTap,
  buttonHover,
  buttonBounce,
  iconSpin,
  iconBounce,
  iconPulse,
  pageTransition,
  slidePageLeft,
  listItem,
  floatingAnimation,
  textShimmer,
  modalOverlay,
  modalContent,
  tooltip,
  drawerLeft,
  drawerRight,
  notification,
  gradientPresets,
};
