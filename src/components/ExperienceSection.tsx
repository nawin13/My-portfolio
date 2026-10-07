import React, { useState } from 'react';
import { Briefcase, ChevronDown, ChevronUp } from 'lucide-react';
import { RESUME_DATA } from '../data/portfolioData';
import { SectionHeader } from './SectionHeader';

export const ExperienceSection: React.FC = () => {
  const [showAllBullets, setShowAllBullets] = useState(false);

  return (
    <section id="experience" className="py-14 md:py-18 border-t border-slate-200 dark:border-[#142d3d] scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        <SectionHeader
          eyebrow="Track Record"
          title="Professional Industry Experience"
          icon={<Briefcase className="w-5 h-5 text-teal-600 dark:text-cyan-400" />}
        />

        {RESUME_DATA.experience.map((exp) => (
          <div
            key={exp.id}
            className="p-5 sm:p-6 rounded-2xl bg-white/95 dark:bg-[#091722]/85 backdrop-blur-md border border-slate-200 dark:border-[#17384d] space-y-4 shadow-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {exp.role} — <span className="text-teal-600 dark:text-cyan-400">{exp.company}</span>
                </h3>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {exp.location} • {exp.type}
                </div>
              </div>
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
                {exp.period}
              </span>
            </div>

            {/* Bullets with Truncation (Hidden when more) */}
            <div className="space-y-2">
              <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 pl-0.5 leading-relaxed">
                {(showAllBullets ? exp.bullets : exp.bullets.slice(0, 2)).map((bullet, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {bullet}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => setShowAllBullets(!showAllBullets)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-teal-600 dark:text-cyan-400 hover:underline pt-1 cursor-pointer"
              >
                <span>{showAllBullets ? 'Show less responsibilities' : `Show all ${exp.bullets.length} responsibilities`}</span>
                {showAllBullets ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-[#122e40] text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Key Technologies: </span>
              <span className="font-mono text-[11px] text-teal-700 dark:text-cyan-300/90">{exp.keyTechnologies.join(', ')}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
