import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
// import Syllabus from './pages/Syllabus';
import Notes from './pages/Notes';
import Schedule from './pages/Schedule';
import Chat from './pages/Chat';
import Help from './pages/Help';
import FloatingButton from './components/ChatBot/FloatingButton';
import { Helmet } from 'react-helmet-async';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-900 dark:text-zinc-400 transition-colors duration-300">
        <Helmet>
          <title>JNTUH Hub - Your Academic Resource Center</title>
          <meta name="description" content="Access JNTUH study materials, syllabus, notes, and academic schedules all in one place. Stay updated with the latest academic resources." />
          <meta name="keywords" content="JNTUH, engineering notes, syllabus, academic schedule, study materials" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta property="og:title" content="JNTUH Hub - Academic Resources" />
          <meta property="og:description" content="Your one-stop solution for all JNTUH academic resources." />
          <link rel="canonical" href="https://your-domain.com" />
        </Helmet>
        
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        
        <main className="flex-grow">
          <div className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/syllabus" element={<Syllabus />} /> */}
              <Route path="/notes" element={<Notes />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/help" element={<Help />} />
            </Routes>
          </div>
        </main>

        <Footer />
        <FloatingButton />
      </div>
    </Router>
  );
}

export default App;