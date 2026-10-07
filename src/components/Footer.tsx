import React from 'react';
import { ArrowUp } from 'lucide-react';
import { RESUME_DATA } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-[#142d3d] bg-white/80 dark:bg-[#070e17] py-10 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div>
            <span className="font-bold text-slate-900 dark:text-white">
              {RESUME_DATA.personal.name}
            </span>{' '}
            • {RESUME_DATA.personal.title}
          </div>

          <div className="flex items-center gap-5">
            <a
              href={RESUME_DATA.personal.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-teal-600 dark:hover:text-cyan-400 transition-colors"
            >
              GitHub
            </a>
            <a
              href={RESUME_DATA.personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-teal-600 dark:hover:text-cyan-400 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${RESUME_DATA.personal.email}`}
              className="hover:text-teal-600 dark:hover:text-cyan-400 transition-colors"
            >
              Email
            </a>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-cyan-400 transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
