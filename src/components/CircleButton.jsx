import { useState } from 'react';

function CircleButton({ label, options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full"
      >
        <div className="flex flex-col items-center">
          <div className={`
            w-24 h-24 rounded-full flex items-center justify-center mb-2
            ${value ? 'bg-primary-light dark:bg-primary-dark text-white' : 'bg-secondary-light dark:bg-secondary-dark text-gray-700 dark:text-gray-300'}
            shadow-circle hover:opacity-90 transition-all duration-200
          `}>
            <span className="text-xl font-semibold">
              {value || label[0]}
            </span>
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </span>
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-48 rounded-lg shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`
                  block w-full px-4 py-2 text-sm text-left
                  ${value === option 
                    ? 'bg-primary-light dark:bg-primary-dark text-white' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}
                `}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CircleButton;