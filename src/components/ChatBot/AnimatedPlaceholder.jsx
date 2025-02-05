import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const placeholders = [
  "Get help with your syllabus...",
  "Know how to clear backlogs...",
  "Find study resources..."
];

function AnimatedPlaceholder() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let currentText = placeholders[currentIndex];
    let currentChar = 0;
    setIsTyping(true);

    const typeInterval = setInterval(() => {
      if (currentChar < currentText.length) {
        setDisplayText(currentText.substring(0, currentChar + 1));
        currentChar++;
      } else {
        setIsTyping(false);
        setTimeout(() => {
          const fadeOutTimeout = setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % placeholders.length);
            setDisplayText('');
          }, 700);
          return () => clearTimeout(fadeOutTimeout);
        }, 2000);
      }
    }, 40);

    return () => clearInterval(typeInterval);
  }, [currentIndex]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={currentIndex}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 0.6, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.2 }}
        className="absolute left-4 top-4 blur-none -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none whitespace-nowrap text-sm sm:text-base"
      >
        {displayText}
        {isTyping && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            className="ml-0.5"
          >
            |
          </motion.span>
        )}
      </motion.span>
    </AnimatePresence>
  );
}

export default AnimatedPlaceholder;