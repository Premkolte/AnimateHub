import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const PageTransition = ({ children }) => {
  const location = useLocation();
  const [direction, setDirection] = useState('forward');
  const [prevPath, setPrevPath] = useState('');

  useEffect(() => {
    if (location.pathname.length > prevPath.length) {
      setDirection('forward');
    } else {
      setDirection('backward');
    }
    setPrevPath(location.pathname);
  }, [location, prevPath]);

  const variants = {
    initial: {
      opacity: 0,
      x: direction === 'forward' ? 20 : -20,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: [0.45, 0, 0.55, 1],
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    },
    exit: {
      opacity: 0,
      x: direction === 'forward' ? -20 : 20,
    }
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;