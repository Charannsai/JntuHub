import { useState } from 'react';
import { motion } from 'framer-motion';
import Calendar from 'react-calendar';
import { format } from 'date-fns';
import 'react-calendar/dist/Calendar.css';

const events = [
  {
    date: '2024-02-15',
    title: 'Mid Semester Exams Begin',
    type: 'exam'
  },
  {
    date: '2024-02-26',
    title: 'University Foundation Day',
    type: 'holiday'
  },
  // Add more events...
];

function Schedule() {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    const dateStr = format(newDate, 'yyyy-MM-dd');
    const dayEvents = events.filter(event => event.date === dateStr);
    setSelectedDate(dayEvents.length > 0 ? { date: dateStr, events: dayEvents } : null);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8 text-center">Academic Calendar</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-[#2D3748] p-6 rounded-xl shadow-sm">
              <Calendar
                onChange={handleDateChange}
                value={date}
                className="w-full border-none"
                tileClassName={({ date }) => {
                  const dateStr = format(date, 'yyyy-MM-dd');
                  const event = events.find(e => e.date === dateStr);
                  if (event) {
                    return event.type === 'exam' ? 'bg-red-100' : 'bg-green-100';
                  }
                }}
              />
            </div>

            {selectedDate && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-6 bg-white dark:bg-[#2D3748] rounded-xl shadow-sm"
              >
                <h3 className="text-xl font-semibold mb-4">
                  Events on {format(new Date(selectedDate.date), 'MMMM d, yyyy')}
                </h3>
                <div className="space-y-4">
                  {selectedDate.events.map((event, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg ${
                        event.type === 'exam'
                          ? 'bg-red-50 dark:bg-red-900/20'
                          : 'bg-green-50 dark:bg-green-900/20'
                      }`}
                    >
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                        Type: {event.type}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          <div>
            <div className="bg-white dark:bg-[#2D3748] p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-6">Upcoming Events</h3>
              <div className="space-y-4">
                {events
                  .filter(event => new Date(event.date) >= new Date())
                  .sort((a, b) => new Date(a.date) - new Date(b.date))
                  .map((event, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-lg ${
                        event.type === 'exam'
                          ? 'bg-red-50 dark:bg-red-900/20'
                          : 'bg-green-50 dark:bg-green-900/20'
                      }`}
                    >
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {format(new Date(event.date), 'MMMM d, yyyy')}
                      </p>
                    </motion.div>
                  ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 p-6 bg-white dark:bg-[#2D3748] rounded-xl shadow-sm"
            >
              <h3 className="text-xl font-semibold mb-4">Legend</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded bg-red-100"></div>
                  <span>Exams</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded bg-green-100"></div>
                  <span>Holidays</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Schedule;