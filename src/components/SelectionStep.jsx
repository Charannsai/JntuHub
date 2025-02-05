import { motion } from 'framer-motion';

function SelectionStep({ active, completed, title, options, value, onChange, disabled }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        rounded-xl p-4 transition-all duration-300
        ${active ? 'bg-white dark:bg-primary-800 ring-2 ring-primary-500 dark:ring-primary-400' : 'bg-primary-50 dark:bg-primary-800/50'}
        ${disabled ? 'opacity-50' : 'opacity-100'}
      `}
    >
      <h3 className="text-lg font-semibold text-primary-900 dark:text-white mb-3">{title}</h3>
      <div className="grid grid-cols-2 gap-2">
        {options.map((option) => (
          <motion.button
            key={option}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => !disabled && onChange(option)}
            className={`
              p-2 rounded-lg font-medium text-sm transition-all duration-300
              ${value === option 
                ? 'bg-primary-900 dark:bg-primary-400 text-white dark:text-primary-900' 
                : 'bg-primary-100 dark:bg-primary-700 text-primary-600 dark:text-primary-300 hover:bg-primary-200 dark:hover:bg-primary-600'}
              ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            {option}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

export default SelectionStep;