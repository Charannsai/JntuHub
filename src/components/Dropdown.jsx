import { motion } from 'framer-motion';

function Dropdown({ label, options, value, onChange, disabled }) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-1">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`
          w-full px-4 py-2.5 rounded-lg
          bg-white dark:bg-primary-800
          border border-primary-200 dark:border-primary-700
          text-primary-900 dark:text-white
          focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-300
        `}
      >
        <option value="">{`Select ${label}`}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;