import { Link } from 'react-router-dom';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

function Footer() {
  return (
    <footer className="bg-white/50 dark:bg-neutral-900/50 border-t border-neutral-200 dark:border-neutral-800 mt-auto backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-200">JNTUH Hub</h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Your one-stop solution for all JNTUH academic resources
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-neutral-800 dark:text-neutral-200">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors">Home</Link></li>
              <li><Link to="/syllabus" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors">Syllabus</Link></li>
              <li><Link to="/notes" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors">Notes</Link></li>
              <li><Link to="/schedule" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors">Schedule</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-neutral-800 dark:text-neutral-200">Resources</h4>
            <ul className="space-y-2">
              <li><Link to="/schedule" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors">Academic Calendar</Link></li>
              <li><Link to="/notes" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors">Previous Papers</Link></li>
              <li><Link to="/notes" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors">Study Materials</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-neutral-800 dark:text-neutral-200">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
                <FiGithub className="text-xl text-neutral-800 dark:text-neutral-200" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
                <FiLinkedin className="text-xl text-neutral-800 dark:text-neutral-200" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
                <FiMail className="text-xl text-neutral-800 dark:text-neutral-200" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800 text-center text-sm text-neutral-600 dark:text-neutral-400">
          <p>© {new Date().getFullYear()} JNTUH Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;