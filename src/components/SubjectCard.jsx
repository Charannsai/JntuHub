import { motion } from 'framer-motion';
import { FiDownload, FiBookOpen, FiFileText, FiInfo } from 'react-icons/fi';

function SubjectCard({ subject, metadata }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className="group"
    >
      <div className="bg-white dark:bg-zinc-800/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {subject.name}
            </h3>
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30">
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  {subject.code}
                </p>
              </div>
              {metadata && (
                <div className="inline-block px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700/30">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {metadata.regulation} • {metadata.year}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {subject.resources.map((resource) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-zinc-800/30 group-hover:bg-gray-100 dark:group-hover:bg-zinc-800/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                {resource.type === 'notes' ? (
                    <FiBookOpen className="text-blue-600 dark:text-blue-400" />
                  ) : (
                    <FiFileText className="text-blue-600 dark:text-blue-400" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {resource.title}
                  </p>
                  
                </div>
              </div>
              
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-blue-500 dark:bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-500 transition-colors"
              >
                <FiDownload className="text-lg" />
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default SubjectCard;