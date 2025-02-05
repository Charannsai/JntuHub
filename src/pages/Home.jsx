import { motion } from 'framer-motion';
import { FiSearch, FiBook, FiCalendar, FiFileText } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <motion.section
      role="main"
      aria-label="Main content" 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-[#F8F9FA] to-white dark:from-neutral-900/50 dark:to-neutral-900/50 py-20"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-6"
            aria-level="1"
            role="heading"
          >
            Your One-Stop Solution for JNTUH Resources
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12"
          >
            Access notes, syllabus, and schedules all in one place
          </motion.p>

         

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <Link to="/chat" aria-label="Navigate to JNTUH syllabus section">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-6 rounded-xl bg-white dark:bg-zinc-700/50 shadow-lg hover:shadow-xl transition-all"
              >
                <FiFileText className="text-3xl mb-4 text-blue-500 dark:text-blue-400" />
                <h2 className="text-lg font-semibold mb-2">View Chatbot</h2>
                <p className="text-gray-600 dark:text-gray-400">Access Our 24/7 Jntuh Chat Assistant for queries regarding your learning and academics.</p>
              </motion.div>
            </Link>

            <Link to="/notes" aria-label="Navigate to JNTUH study notes section">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-6 rounded-xl bg-white dark:bg-zinc-700/50 shadow-lg hover:shadow-xl transition-all"
              >
                <FiBook className="text-3xl mb-4 text-blue-500 dark:text-blue-400" />
                <h2 className="text-lg font-semibold mb-2">Browse Notes</h2>
                <p className="text-gray-600 dark:text-gray-400">Find comprehensive study materials</p>
              </motion.div>
            </Link>

            <Link to="/schedule" aria-label="Navigate to JNTUH academic schedule section">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-6 rounded-xl bg-white dark:bg-zinc-700/50 shadow-lg hover:shadow-xl transition-all"
              >
                <FiCalendar className="text-3xl mb-4 text-blue-500 dark:text-blue-400" />
                <h2 className="text-lg font-semibold mb-2">Check Schedule</h2>
                <p className="text-gray-600 dark:text-gray-400">View academic calendar and events</p>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default Home;