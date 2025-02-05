import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiBook, FiMenu, FiX, FiMessageSquare, FiHelpCircle, FiHome } from 'react-icons/fi';
import { useState, useEffect, useRef } from 'react';
import AdDisplay from './AdDisplay';

function Navbar({ darkMode, setDarkMode }) {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navLinks = [
    { path: '/', label: 'Home', icon: <FiHome className="text-xl" /> },
    { path: '/notes', label: 'Notes', icon: <FiBook className="text-xl" /> },
    { path: '/chat', label: 'ChatBot', icon: <FiMessageSquare className="text-xl" /> },
    { path: '/schedule', label: 'Schedule', icon: <FiBook className="text-xl" /> },
    { path: '/help', label: 'Help Center', icon: <FiHelpCircle className="text-xl" /> }
  ];

  return (
    <>
      {/* Mobile & Desktop Navbar */}
      <motion.nav 
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { y: -100 },
          visible: { y: 0 }
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md shadow-lg' : 'bg-white dark:bg-neutral-900'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
    
            <Link to="/" className="flex items-center space-x-3">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-neutral-800 to-neutral-700 dark:from-neutral-700 dark:to-neutral-600 p-2.5 rounded-lg"
              >
                <FiBook className="text-white text-xl" />
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-neutral-800 to-neutral-700 dark:from-neutral-200 dark:to-neutral-100 bg-clip-text text-transparent">
                JNTUH Hub
              </span>
            </Link>

            <div className="hidden lg:flex items-center space-x-8">
              <div className="flex items-center space-x-1">
                {navLinks.map((link) => (
                  <Link 
                    key={link.path}
                    to={link.path}
                    className={`relative group px-4 py-2 rounded-lg transition-colors ${
                      location.pathname === link.path 
                        ? 'text-neutral-800 dark:text-neutral-200' 
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {link.icon}
                      <span>{link.label}</span>
                    </span>
                    {location.pathname === link.path && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 rounded-lg -z-10"
                        transition={{ type: "spring", bounce: 0.2 }}
                      />
                    )}
                  </Link>
                ))}
              </div>

        
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                aria-label="Toggle theme"
              >
                {darkMode ? (
                  <FiSun className="text-xl text-neutral-200" />
                ) : (
                  <FiMoon className="text-xl text-neutral-800" />
                )}
              </motion.button>
            </div>

            <div className="flex items-center gap-4 lg:hidden">
       
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                aria-label="Toggle theme"
              >
                {darkMode ? (
                  <FiSun className="text-xl text-neutral-200" />
                ) : (
                  <FiMoon className="text-xl text-neutral-800" />
                )}
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <FiX className="text-2xl text-neutral-800 dark:text-neutral-200" />
                ) : (
                  <FiMenu className="text-2xl text-neutral-800 dark:text-neutral-200" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-64 bg-white dark:bg-neutral-900 shadow-xl z-50 lg:hidden"
          >
            <div className="absolute top-4 right-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                aria-label="Close menu"
              >
                <FiX className="text-2xl text-neutral-800 dark:text-neutral-200" />
              </motion.button>
            </div>

            <div className="px-4">
              <AdDisplay />
            </div>
         
            <div className="flex flex-col p-4 mt-20">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === link.path
                      ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200'
                      : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;