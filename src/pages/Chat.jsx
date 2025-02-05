import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiCpu } from 'react-icons/fi';
import ChatMessage from '../components/ChatBot/ChatMessage';
import AnimatedPlaceholder from '../components/ChatBot/AnimatedPlaceholder';
import { processUserMessage } from '../lib/chatUtils';

function Chat() {
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your JNTUH assistant. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col h-screen">
        {/* Header */}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
        >
          <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
           
            <div>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">JNTUH Assistant</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Ask me anything about JNTUH</p>
            </div>
          </div>
        </motion.div>

        {/* Chat Container */}
        <div className="flex-1 overflow-hidden bg-gray-50 dark:bg-gray-900">
          <div className="h-full overflow-y-auto">
            <div className="max-w-3xl mx-auto px-4">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`py-6 `}
                  >
                    <div className="max-w-3xl mx-auto flex gap-4">
                      
                      <div className="flex-1 space-y-2">
                        <ChatMessage
                          message={message.text}
                          isBot={message.isBot}
                          isTyping={message.isTyping}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        {/* Input Form */}
        <div className="sticky bottom-0 bg-gradient-to-t from-gray-50 to-gray-50/0 dark:from-gray-900 dark:to-gray-900/0 pt-6">
          <div className="max-w-3xl mx-auto px-4 pb-6">
            <form onSubmit={handleSubmit} className="relative">
              <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg bg-white dark:bg-gray-800">
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                      }
                    }}
                    disabled={isLoading}
                    rows={1}
                    className="w-full px-4 py-3 focus:outline-none bg-transparent text-gray-900 dark:text-white resize-none"
                    
                  />
                </motion.div>
                <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-700/50">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Press Enter to send
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={isLoading}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center gap-2 text-sm font-medium disabled:opacity-50 disabled:hover:bg-blue-600"
                  >
                    <FiSend className={`text-sm transition-transform duration-200 ${isLoading ? 'translate-x-1' : ''}`} />
                  </motion.button>
                </div>
              </div>
              {!input && <AnimatedPlaceholder />}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;