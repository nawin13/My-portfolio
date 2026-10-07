import React, { useState, useEffect } from 'react';
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
  const [activeSection, setActiveSection] = useState('about');

  const navLinks = [
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = ['about', 'projects', 'experience', 'skills', 'contact'];
      const scrollY = window.pageYOffset;
      const headerOffset = 110;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop - headerOffset;
          if (scrollY >= top) {
            setActiveSection(id);
            return;
          }
        }
      }
      setActiveSection('about');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler with mobile menu closing and iframe compatibility
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const targetId = href.replace('#', '');
    setActiveSection(targetId);

    const executeScroll = () => {
      if (!targetId || targetId === 'about' || targetId === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const el = document.getElementById(targetId);
      if (el) {
        const navHeight = 72;
        const rect = el.getBoundingClientRect();
        const offsetPosition = rect.top + window.pageYOffset - navHeight;
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth',
        });
      }
    };

    // Execute immediately
    executeScroll();

    // Fallback execute after mobile drawer collapse animation
    setTimeout(executeScroll, 120);

    try {
      window.history.pushState(null, '', href);
    } catch (_) {}
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-colors ${
      darkMode
        ? 'bg-[#060d16]/90 border-[#142d3d]/80 text-white'
        : 'bg-[#f8fafc]/90 border-slate-200/80 text-slate-900'
    }`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Left Zone: Initials Badge & Name (Scrolls to top) */}
          <div className="flex items-center gap-2.5">
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, '#about')}
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
          <nav className="hidden md:flex items-center gap-5 lg:gap-6 text-xs sm:text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`transition-colors py-1 px-1 cursor-pointer relative ${
                    isActive
                      ? 'text-teal-600 dark:text-cyan-400 font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-cyan-400'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-500 dark:bg-cyan-400 rounded-full" />
                  )}
                </a>
              );
            })}
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

      {/* Mobile Animated Dropdown Drawer (cleanly docked, reliable smooth scrolling) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#f8fafc] dark:bg-[#060d16] border-t border-slate-200/80 dark:border-[#142d3d]/80 px-4 py-3 space-y-1 shadow-2xl overflow-hidden"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`block px-3 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    isActive
                      ? 'text-teal-600 dark:text-cyan-400 bg-teal-500/10 dark:bg-cyan-500/10 font-bold'
                      : 'text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-[#0a1a24]'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
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

