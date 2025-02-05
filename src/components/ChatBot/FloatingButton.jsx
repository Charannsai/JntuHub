import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX, FiMaximize } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import MiniChat from './MiniChat';

function FloatingButton() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Hide the floating button on the chat page
  if (location.pathname === '/chat') {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-16 right-0 mb-4"
          >
            <div className="bg-white dark:bg-[#1A202C] rounded-2xl shadow-lg w-80 overflow-hidden">
              <div className="p-4 border-b dark:border-gray-700 flex items-center justify-between">
                <h3 className="font-semibold text-[#2D3748] dark:text-[#E2E8F0]">JNTUH Assistant</h3>
                <div className="flex items-center gap-2">
                  <Link 
                    to="/chat"
                    className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <FiMaximize className="text-[#4A5568] dark:text-[#A0AEC0]" />
                  </Link>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <FiX className="text-[#4A5568] dark:text-[#A0AEC0]" />
                  </button>
                </div>
              </div>
              <MiniChat />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-[#2D3748] to-[#4A5568] dark:from-[#E2E8F0] dark:to-[#CBD5E0] text-white dark:text-[#1A202C] p-4 rounded-full shadow-lg"
      >
        {isOpen ? <FiX size={24} /> : <FiMessageSquare size={24} />}
      </motion.button>
    </div>
  );
}

export default FloatingButton;