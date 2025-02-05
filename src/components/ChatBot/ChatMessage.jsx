import { motion } from 'framer-motion';
import { FiUser, FiCpu } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';

function ChatMessage({ message, isBot, isTyping }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={`flex items-start gap-3 ${isBot ? '' : 'flex-row-reverse'} max-w-full`}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isBot ? 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-zinc-700 dark:to-zinc-800 dark:to-blue-600' 
                : 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-zinc-700 dark:to-zinc-800'
        }`}
      >
        {isBot ? (
          <FiCpu className="text-gray-600 dark:text-gray-300" />
        ) : (
          <FiUser className="text-gray-600 dark:text-gray-300" />
        )}
      </motion.div>
      
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-2 ${
          isBot 
            ? 'bg-gray-200 dark:bg-gray-700 shadow-sm prose dark:prose-invert prose-sm max-w-none' 
            : 'bg-gray-400 dark:bg-gray-500 text-white'
        }`}
      >
        {isBot ? (
          isTyping ? (
            <div className="flex space-x-2 h-6 items-center">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-2 h-2 bg-zinc-800/50 dark:bg-zinc-800/50 rounded-full"
              />
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                className="w-2 h-2 bg-zinc-800/50 dark:bg-zinc-800/50 rounded-full"
              />
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                className="w-2 h-2 bg-zinc-800/50 dark:bg-zinc-800/50 rounded-full"
              />
            </div>
          ) : (
            <div className="markdown-content text-sm sm:text-base">
              <ReactMarkdown>{message}</ReactMarkdown>
            </div>
          )
        ) : (
          <p className="text-sm sm:text-base">{message}</p>
        )}
      </motion.div>
    </motion.div>
  );
}

export default ChatMessage;