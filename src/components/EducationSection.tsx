import React from 'react';
import { GraduationCap } from 'lucide-react';
import { RESUME_DATA } from '../data/portfolioData';
import { SectionHeader } from './SectionHeader';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-14 md:py-18 border-t border-slate-200 dark:border-[#142d3d]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        <SectionHeader
          eyebrow="Academic Foundation"
          title="Education"
          icon={<GraduationCap className="w-5 h-5 text-teal-600 dark:text-cyan-400" />}
        />

        {RESUME_DATA.education.map((edu, idx) => (
          <div
            key={idx}
            className="p-5 sm:p-6 rounded-2xl bg-white/95 dark:bg-[#091722]/85 backdrop-blur-md border border-slate-200 dark:border-[#17384d] space-y-3 shadow-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {edu.institution}
              </h3>
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
                {edu.period}
              </span>
            </div>

            <div className="text-sm font-semibold text-teal-600 dark:text-cyan-400">
              {edu.degree} • {edu.location}
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-[#122e40] space-y-1.5">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                Specialized Coursework & Thesis:
              </span>
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 dark:text-slate-300 pl-0.5 leading-relaxed">
                {edu.modules.map((mod, i) => (
                  <li key={i}>{mod}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
