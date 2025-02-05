import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiSend } from 'react-icons/fi';

const faqs = [
  {
    question: "How do I access study materials?",
    answer: "You can access study materials by navigating to the Notes section. Select your regulation, branch, year, and semester to find relevant study materials."
  },
  {
    question: "How can I check my exam schedule?",
    answer: "Visit the Schedule section to view the academic calendar, which includes exam dates, holidays, and other important events."
  },
  {
    question: "Where can I find the syllabus for my course?",
    answer: "Currently we are developing this feature, Kindly we request for your patience, will get the syllabus section soon"
  },
  {
    question: "How do I use the ChatBot?",
    answer: "The ChatBot is available 24/7 to answer your questions. Simply type your query in the chat box and get instant responses about JNTUH-related topics."
  },
  {
    question: "Are the study materials up to date?",
    answer: "Yes, we regularly update our study materials to align with the latest JNTUH curriculum and guidelines."
  }
];

function Help() {
  const [openFaq, setOpenFaq] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSubmitted(true);
    setIsSubmitting(false);
    setFeedback('');
  };

  return (
    <div className="container mx-auto px-4 py-12 mt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8 text-center">Help Center</h1>

        {/* FAQs Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-zinc-800/50 rounded-xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between"
                >
                  <span className="font-medium">{faq.question}</span>
                  <motion.span
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiChevronDown className="text-xl" />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-6 pb-4"
                    >
                      <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white dark:bg-zinc-800/50 rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Send us your suggestions</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Your feedback or suggestions..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border dark:border-zinc-700 bg-white dark:bg-zinc-800/50 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                disabled={isSubmitting || submitted}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={!feedback || isSubmitting || submitted}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 text-white rounded-xl hover:opacity-90 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : submitted ? (
                'Thank you for your feedback!'
              ) : (
                <>
                  <FiSend />
                  <span>Send Feedback</span>
                </>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default Help;