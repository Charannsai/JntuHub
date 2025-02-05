import { useState } from 'react';
import { motion } from 'framer-motion';
import ChatMessage from './ChatMessage';
import AnimatedPlaceholder from './AnimatedPlaceholder';
import { processUserMessage } from '../../lib/chatUtils';

function MiniChat() {
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your JNTUH assistant. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    
    
    setMessages(prev => [...prev, { isBot: true, isTyping: true }]);

    try {
      const response = await processUserMessage(null, userMessage);
      
      
      setMessages(prev => prev.slice(0, -1));
      setMessages(prev => [...prev, { text: response, isBot: true }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => prev.slice(0, -1));
      setMessages(prev => [...prev, {
        text: "I'm having trouble right now. Please try again later.",
        isBot: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[28rem] sm:h-96">
      <motion.div 
        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ChatMessage 
              message={message.text} 
              isBot={message.isBot} 
              isTyping={message.isTyping}
            />
          </motion.div>
        ))}
      </motion.div>

      <form onSubmit={handleSubmit} className="p-4 border-t dark:border-zinc-700/50">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="w-full px-4 py-2 rounded-xl border dark:border-zinc-700/50 bg-white dark:bg-zinc-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-gray-100 disabled:opacity-50 transition-all duration-200"
              placeholder='Type "How to clear M1'
            />
            
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 text-white rounded-xl hover:opacity-90 transition-all duration-200 disabled:opacity-50 flex items-center gap-2"
            
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              'Send'
            )}
          </motion.button>
        </div>
      </form>
    </div>
  );
}

export default MiniChat;