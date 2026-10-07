import React from 'react';
import { Cpu, Languages } from 'lucide-react';
import { RESUME_DATA } from '../data/portfolioData';
import { SectionHeader } from './SectionHeader';

export const CompetenciesSection: React.FC = () => {
  return (
    <section id="skills" className="py-14 md:py-18 border-t border-slate-200 dark:border-[#142d3d]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        <SectionHeader
          eyebrow="Capabilities"
          title="Technical Competencies"
          icon={<Cpu className="w-5 h-5 text-teal-600 dark:text-cyan-400" />}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {RESUME_DATA.competencies.map((comp) => (
            <div
              key={comp.category}
              className="p-4 sm:p-5 rounded-2xl bg-white/95 dark:bg-[#091722]/85 backdrop-blur-md border border-slate-200 dark:border-[#17384d] space-y-2.5 shadow-xs"
            >
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white tracking-wide flex items-center justify-between">
                <span>{comp.category}</span>
                <span className="text-[10px] font-mono text-teal-600 dark:text-cyan-400/80">({comp.skills.length})</span>
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {comp.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 text-xs font-mono rounded-md bg-slate-100 dark:bg-[#0e2433] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-[#1b3d52]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Spoken Languages */}
        <div className="pt-4 border-t border-slate-200 dark:border-[#122e40]">
          <div className="flex items-center gap-2 mb-3">
            <Languages className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Spoken Languages
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            {RESUME_DATA.languages.map((lang) => (
              <div
                key={lang.name}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-[#17384d] bg-white/90 dark:bg-[#091722]/90 flex items-center justify-between shadow-xs"
              >
                <span className="font-semibold text-slate-900 dark:text-white">
                  {lang.name}
                </span>
                <span className="text-teal-600 dark:text-cyan-400 text-xs font-medium">
                  {lang.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
