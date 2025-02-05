import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX } from 'react-icons/fi';
import Select from 'react-select';
import SubjectCard from '../components/SubjectCard';
import { notesData } from '../data/notes';

const regulations = ['R16', 'R18', 'R22'].map(reg => ({ value: reg, label: reg }));
const branches = ['CSE', 'ECE', 'EEE', 'ME', 'CE', 'CyberSecurity', 'Data Science', 'AIML']
  .map(branch => ({ value: branch, label: branch }));
const years = ['1st Year', '2nd Year', '3rd Year', '4th Year']
  .map(year => ({ value: year, label: year }));
const semesters = ['1st Semester', '2nd Semester']
  .map(sem => ({ value: sem, label: sem }));

const customSelectStyles = {
  control: (base, state) => ({
    ...base,
    background: 'var(--select-bg, white)',
    borderColor: state.isFocused ? '#4A5568' : '#E2E8F0',
    boxShadow: state.isFocused ? '0 0 0 2px #4A5568' : null,
    '&:hover': {
      borderColor: '#4A5568'
    },
    padding: '0.5rem',
    borderRadius: '0.75rem'
  }),
  option: (base, state) => ({
    ...base,
    background: state.isSelected ? '#4A5568' : state.isFocused ? '#E2E8F0' : 'transparent',
    color: state.isSelected ? 'white' : '#2D3748',
    '&:hover': {
      background: state.isSelected ? '#4A5568' : '#E2E8F0'
    }
  }),
  menu: base => ({
    ...base,
    borderRadius: '0.75rem',
    overflow: 'hidden'
  })
};

function Notes() {
  const [regulation, setRegulation] = useState(null);
  const [branch, setBranch] = useState(null);
  const [year, setYear] = useState(null);
  const [semester, setSemester] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (regulation?.value && branch?.value && year?.value && semester?.value) {
      const filteredSubjects = notesData[regulation.value]?.[branch.value]?.[year.value]?.[semester.value] || [];
      setSubjects(filteredSubjects);
    }
  }, [regulation, branch, year, semester]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setIsLoading(true);

    // Simulate loading state
    setTimeout(() => {
      if (query) {
        setIsSearching(true);
        const results = [];
        
        // Search through all data
        Object.entries(notesData).forEach(([regKey, regData]) => {
          Object.entries(regData).forEach(([branchKey, branchData]) => {
            Object.entries(branchData).forEach(([yearKey, yearData]) => {
              Object.entries(yearData).forEach(([semKey, subjects]) => {
                subjects.forEach(subject => {
                  if (
                    subject.name.toLowerCase().includes(query) ||
                    subject.code.toLowerCase().includes(query) ||
                    subject.resources.some(resource => 
                      resource.title.toLowerCase().includes(query)
                    )
                  ) {
                    results.push({
                      ...subject,
                      regulation: regKey,
                      branch: branchKey,
                      year: yearKey,
                      semester: semKey
                    });
                  }
                });
              });
            });
          });
        });
        
        setSearchResults(results);
      } else {
        setIsSearching(false);
        setSearchResults([]);
      }
      setIsLoading(false);
    }, 300); // Add a small delay for loading animation
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
    setSearchResults([]);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8 text-center">Course Notes</h1>

        {/* Enhanced Search Bar */}
        <div className="relative mb-12">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <FiSearch className={`text-gray-400 text-xl transition-all ${isLoading ? 'animate-pulse' : ''}`} />
          </div>
          <input
            type="text"
            placeholder="Search by subject name, code, or content..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-12 pr-12 py-4 rounded-xl bg-white dark:bg-zinc-800/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none text-lg transition-all"
          />
          {searchQuery && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={clearSearch}
              className="absolute right-4 top-4 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-700/50"
            >
              <FiX className="text-gray-400 text-xl" />
            </motion.button>
          )}
        </div>

        {/* Selection Dropdowns */}
        {!isSearching && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 mb-12"
          >
            <div className="flex items-center justify-center mb-8">
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
              <span className="px-4 text-lg font-medium text-gray-500 dark:text-gray-400">OR</span>
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Regulation</label>
                <Select
                  value={regulation}
                  onChange={(value) => {
                    setRegulation(value);
                    setBranch(null);
                    setYear(null);
                    setSemester(null);
                  }}
                  options={regulations}
                  styles={customSelectStyles}
                  placeholder="Select Regulation"
                  isSearchable={false}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Branch</label>
                <Select
                  value={branch}
                  onChange={(value) => {
                    setBranch(value);
                    setYear(null);
                    setSemester(null);
                  }}
                  options={branches}
                  styles={customSelectStyles}
                  placeholder="Select Branch"
                  isDisabled={!regulation}
                  isSearchable={false}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Year</label>
                <Select
                  value={year}
                  onChange={(value) => {
                    setYear(value);
                    setSemester(null);
                  }}
                  options={years}
                  styles={customSelectStyles}
                  placeholder="Select Year"
                  isDisabled={!branch}
                  isSearchable={false}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Semester</label>
                <Select
                  value={semester}
                  onChange={setSemester}
                  options={semesters}
                  styles={customSelectStyles}
                  placeholder="Select Semester"
                  isDisabled={!year}
                  isSearchable={false}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Results */}
        <AnimatePresence mode="wait">
          <motion.div
            key={isSearching ? 'search' : 'filter'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {isSearching ? (
              searchResults.length > 0 ? (
                searchResults.map((subject, index) => (
                  <motion.div
                    key={subject.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <SubjectCard 
                      subject={subject}
                      metadata={{
                        regulation: subject.regulation,
                        branch: subject.branch,
                        year: subject.year,
                        semester: subject.semester
                      }}
                    />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-2 text-center py-12"
                >
                  <p className="text-xl text-gray-600 dark:text-gray-400">
                    No results found for "{searchQuery}"
                  </p>
                </motion.div>
              )
            ) : subjects.length > 0 ? (
              subjects.map((subject, index) => (
                <motion.div
                  key={subject.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <SubjectCard subject={subject} />
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-2 text-center py-12"
              >
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  {regulation ? "No subjects found for the selected filters" : "Select filters or search to view subjects"}
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default Notes;