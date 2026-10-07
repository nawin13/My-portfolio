import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer, Download, Check } from 'lucide-react';
import { RESUME_DATA } from '../data/portfolioData';
import { downloadResumePdf } from '../utils/generateResumePdf';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleDownload = () => {
    downloadResumePdf();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  const handlePrint = () => {
    try {
      window.print();
    } catch {
      downloadResumePdf();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl my-6 bg-white text-slate-900 rounded-xl shadow-2xl border border-slate-300 overflow-hidden z-10"
          >
            {/* Top Control Bar */}
            <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 border-b border-slate-200 bg-slate-50">
              {/* Left Group: Name + Download Button in column aligned to flex-start */}
              <div className="flex flex-col items-start gap-1.5 min-w-0">
                <span className="text-xs font-semibold text-slate-700 truncate">
                  {RESUME_DATA.personal.name} — Official Resume
                </span>

                <div className="flex items-center gap-2">
                  {/* Direct File Download to Device */}
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 active:scale-95 rounded-md transition-all shadow-xs cursor-pointer"
                    title="Download PDF directly to your device"
                  >
                    {downloaded ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
                    <span>{downloaded ? 'Downloaded!' : 'Download PDF'}</span>
                  </button>

                  {/* Print button */}
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white border border-slate-300 rounded-md hover:bg-slate-100 transition-colors cursor-pointer text-slate-700"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print</span>
                  </button>
                </div>
              </div>

              {/* Right End: Close cross icon on right end */}
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer shrink-0 self-start sm:self-center"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Verbatim Document */}
            <div className="p-6 sm:p-10 max-h-[80vh] overflow-y-auto space-y-5 text-slate-900 text-xs sm:text-sm">
              {/* Header */}
              <div className="border-b border-slate-300 pb-3 space-y-1">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  {RESUME_DATA.personal.name}
                </h1>
                <p className="text-xs sm:text-sm font-semibold text-slate-700">
                  {RESUME_DATA.personal.title} | {RESUME_DATA.personal.institution}
                </p>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-600">
                  <span>{RESUME_DATA.personal.email}</span>
                  <span>•</span>
                  <span>{RESUME_DATA.personal.phone}</span>
                  <span>•</span>
                  <span>{RESUME_DATA.personal.location}</span>
                  <span>•</span>
                  <a
                    href={RESUME_DATA.personal.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-teal-700 font-medium hover:underline"
                  >
                    LinkedIn
                  </a>
                  <span>•</span>
                  <a
                    href={RESUME_DATA.personal.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-teal-700 font-medium hover:underline"
                  >
                    GitHub
                  </a>
                </div>
              </div>

              {/* Profile */}
              <div className="space-y-1.5">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5">
                  Professional Profile
                </h2>
                <p className="text-xs text-slate-700 leading-relaxed text-justify">
                  {RESUME_DATA.personal.profile}
                </p>
              </div>

              {/* Education */}
              <div className="space-y-2">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5">
                  Education
                </h2>
                {RESUME_DATA.education.map((edu, idx) => (
                  <div key={idx} className="space-y-1 text-xs">
                    <div className="flex justify-between font-bold">
                      <span>{edu.institution}</span>
                      <span>{edu.period}</span>
                    </div>
                    <div>{edu.degree} • {edu.location}</div>
                    <ul className="list-disc list-inside space-y-0.5 pl-1 text-slate-700">
                      {edu.modules.map((m, i) => (
                        <li key={i}>{m}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Technical Competencies */}
              <div className="space-y-1.5">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5">
                  Technical Competencies
                </h2>
                <div className="space-y-1 text-xs text-slate-700">
                  {RESUME_DATA.competencies.map((comp) => (
                    <div key={comp.category}>
                      <strong>{comp.category}:</strong> {comp.skills.join(', ')}
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div className="space-y-2">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5">
                  Professional Industry Experience
                </h2>
                {RESUME_DATA.experience.map((exp) => (
                  <div key={exp.id} className="space-y-1 text-xs">
                    <div className="flex justify-between font-bold">
                      <span>{exp.role} — {exp.company}</span>
                      <span>{exp.period}</span>
                    </div>
                    <div className="text-slate-600">{exp.location} • {exp.type}</div>
                    <ul className="list-disc list-inside space-y-1 pl-1 text-slate-700">
                      {exp.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                    <div className="pt-0.5 text-slate-600">
                      <strong>Key Technologies:</strong> {exp.keyTechnologies.join(', ')}
                    </div>
                  </div>
                ))}
              </div>

              {/* Projects */}
              <div className="space-y-3">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5">
                  Academic & Featured Projects
                </h2>
                {RESUME_DATA.projects.map((proj) => (
                  <div key={proj.id} className="space-y-1 text-xs">
                    <div className="flex justify-between font-bold">
                      <span>{proj.title}</span>
                      <span>{proj.period}</span>
                    </div>
                    <div className="font-semibold text-slate-700">{proj.subtitle}</div>
                    <p className="text-slate-700 leading-relaxed">{proj.description}</p>
                    <ul className="list-disc list-inside pl-1 text-slate-700">
                      {proj.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                    <div className="text-slate-600">
                      <strong>Stack:</strong> {proj.stack.join(', ')}
                    </div>
                  </div>
                ))}
              </div>

              {/* Languages */}
              <div className="space-y-1">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5">
                  Languages
                </h2>
                <p className="text-xs text-slate-700">
                  English (Fluent (Full Professional Proficiency)) • French (A2 Proficiency (Actively Advancing in Paris))
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
