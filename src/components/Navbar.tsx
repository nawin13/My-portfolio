import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, FileText, Menu, X } from 'lucide-react';
import { RESUME_DATA } from '../data/portfolioData';

interface NavbarProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  onToggleDarkMode,
  onOpenResume,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#f8fafc]/90 dark:bg-[#060d16]/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-[#142d3d]/80 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Left Zone: Initials Badge & Name (Replacing code icon) */}
          <div className="flex items-center gap-2.5">
            <a
              href="#"
              className="flex items-center gap-2.5 group cursor-pointer"
              title={RESUME_DATA.personal.name}
              aria-label="Home"
            >
              <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-teal-500/20 via-cyan-500/20 to-emerald-500/20 dark:from-cyan-400/20 dark:via-teal-500/25 dark:to-emerald-400/20 border border-teal-500/50 dark:border-cyan-400/60 text-teal-700 dark:text-cyan-300 font-extrabold text-xs sm:text-sm tracking-wider font-mono shadow-xs group-hover:scale-105 group-hover:border-cyan-400 transition-all">
                PV
              </div>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-cyan-400 transition-colors leading-tight">
                  Putta Vaishnavi
                </span>
                <span className="hidden sm:block text-[10px] font-mono text-teal-600 dark:text-cyan-400/80 leading-tight">
                  Software Engineer • Paris
                </span>
              </div>
            </a>
          </div>

          {/* Center Zone: Clean Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-teal-600 dark:hover:text-cyan-400 transition-colors py-1 px-1"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Zone: Theme Toggle + Resume Button + Mobile Toggle */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenResume}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-[#0c1c28] dark:hover:bg-[#122838] border border-slate-200 dark:border-[#1d3c50] rounded-xl transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-teal-600 dark:text-cyan-400" />
              <span>Resume</span>
            </button>

            {/* Dark / Light Mode Toggle Button */}
            <button
              type="button"
              onClick={onToggleDarkMode}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-[#0c1c28] dark:hover:bg-[#122838] border border-slate-300 dark:border-[#1d3c50] rounded-xl transition-colors cursor-pointer"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-slate-700" />
                  <span>Dark</span>
                </>
              )}
            </button>

            {/* Mobile Hamburger Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-[#122838] transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Animated Dropdown Drawer (cleanly docked, no transparent gaps) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#f8fafc] dark:bg-[#060d16] border-t border-slate-200/80 dark:border-[#142d3d]/80 px-4 py-3 space-y-1 shadow-2xl overflow-hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-[#0a1a24] rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 border-t border-slate-200 dark:border-[#142d3d]">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full py-2.5 text-xs font-bold text-center text-white dark:text-slate-950 bg-gradient-to-r from-teal-500 to-emerald-500 dark:from-cyan-400 dark:to-emerald-400 rounded-xl"
              >
                View Full Resume (PDF)
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
