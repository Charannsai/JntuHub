import { useState } from 'react';

function FilterButton({ icon, label, options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full group"
      >
        <div className="flex flex-col items-center">
          <div className={`
            w-full aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 p-4
            ${value 
              ? 'bg-gradient-to-br from-primary-600 to-primary-700 dark:from-primary-700 dark:to-primary-800' 
              : 'bg-white dark:bg-secondary-800'}
            shadow-glass dark:shadow-glass-dark hover:shadow-glass-hover transition-all duration-300
            group-hover:scale-105 transform
          `}>
            <div className={`text-2xl ${value ? 'text-white' : 'text-primary-600 dark:text-primary-400'}`}>
              {icon}
            </div>
            <span className={`text-lg font-medium ${value ? 'text-white' : 'text-primary-700 dark:text-primary-300'}`}>
              {value || label}
            </span>
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-20 mt-2 w-full">
          <div className="rounded-xl overflow-hidden shadow-glass dark:shadow-glass-dark backdrop-blur-lg">
            <div className="bg-white/90 dark:bg-secondary-800/90 py-1">
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className={`
                    block w-full px-4 py-3 text-left text-sm transition-colors duration-200
                    ${value === option 
                      ? 'bg-primary-500 text-white' 
                      : 'text-primary-700 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-secondary-700'}
                  `}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterButton;