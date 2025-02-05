import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDownload, FiChevronDown } from 'react-icons/fi';

const syllabusData = {
  CSE: {
    '1st Sem': [
      {
        code: 'CSE101',
        name: 'Introduction to Programming',
        objectives: [
          'Understanding basic programming concepts',
          'Learning problem-solving techniques'
        ],
        outcomes: [
          'Ability to write basic programs',
          'Understanding of algorithmic thinking'
        ],
        topics: [
          'Variables and Data Types',
          'Control Structures',
          'Functions and Arrays'
        ]
      },
      // Add more subjects...
    ]
  }
  // Add more departments...
};

function Syllabus() {
  const [department, setDepartment] = useState('');
  const [semester, setSemester] = useState('');
  const [expandedSubject, setExpandedSubject] = useState(null);

  const departments = Object.keys(syllabusData);
  const semesters = department ? ['1st Sem', '2nd Sem'] : [];

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8 text-center">Course Syllabus</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div>
            <label className="block text-sm font-medium mb-2">Department</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full p-3 rounded-lg bg-white dark:bg-[#2D3748] border border-gray-200 dark:border-gray-700"
            >
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Semester</label>
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              disabled={!department}
              className="w-full p-3 rounded-lg bg-white dark:bg-[#2D3748] border border-gray-200 dark:border-gray-700 disabled:opacity-50"
            >
              <option value="">Select Semester</option>
              {semesters.map(sem => (
                <option key={sem} value={sem}>{sem}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-6">
          {department && semester && syllabusData[department][semester].map((subject, index) => (
            <motion.div
              key={subject.code}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-[#2D3748] rounded-xl shadow-sm overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{subject.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{subject.code}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                      <FiDownload className="text-xl" />
                    </button>
                    <button
                      onClick={() => setExpandedSubject(expandedSubject === index ? null : index)}
                      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      <FiChevronDown
                        className={`text-xl transform transition-transform ${
                          expandedSubject === index ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedSubject === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3">Course Objectives</h4>
                          <ul className="space-y-2">
                            {subject.objectives.map((objective, i) => (
                              <li key={i} className="text-gray-600 dark:text-gray-400">
                                • {objective}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-3">Learning Outcomes</h4>
                          <ul className="space-y-2">
                            {subject.outcomes.map((outcome, i) => (
                              <li key={i} className="text-gray-600 dark:text-gray-400">
                                • {outcome}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="mt-6">
                        <h4 className="font-semibold mb-3">Topics Covered</h4>
                        <ul className="space-y-2">
                          {subject.topics.map((topic, i) => (
                            <li key={i} className="text-gray-600 dark:text-gray-400">
                              • {topic}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Syllabus;