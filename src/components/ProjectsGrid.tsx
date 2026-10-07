import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ChevronDown, ChevronUp, ArrowUpRight } from 'lucide-react';
import { RESUME_DATA } from '../data/portfolioData';
import { SectionHeader } from './SectionHeader';

export const ProjectsGrid: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'AI & Systems' | 'Full-Stack & Cloud' | 'Enterprise'>('All');
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  const filterTabs: { key: 'All' | 'AI & Systems' | 'Full-Stack & Cloud' | 'Enterprise'; label: string; mobileLabel: string }[] = [
    { key: 'All', label: 'All Projects', mobileLabel: 'All' },
    { key: 'AI & Systems', label: 'AI & Systems', mobileLabel: 'AI / MCP' },
    { key: 'Full-Stack & Cloud', label: 'Full-Stack & Cloud', mobileLabel: 'Cloud' },
    { key: 'Enterprise', label: 'Enterprise', mobileLabel: 'Enterprise' },
  ];

  const filteredProjects = RESUME_DATA.projects.filter(
    (p) => filter === 'All' || p.category === filter
  );

  const toggleExpand = (id: string) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="projects" className="py-16 md:py-20 border-t border-slate-200 dark:border-[#142d3d]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Section Header with Staggered Entrance */}
        <SectionHeader
          eyebrow="Featured Engineering"
          title="Academic & Featured Projects"
          subtitle="Selected systems across AI agent architectures, cloud microservices, and enterprise modernization."
        />

        {/* 100% Fixed Segmented Control */}
        <div className="w-full">
          <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 dark:bg-[#091622] border border-slate-200 dark:border-[#163548] rounded-xl w-full transition-colors">
            {filterTabs.map((tab) => {
              const isActive = filter === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setFilter(tab.key)}
                  className={`relative py-2 text-xs font-semibold rounded-lg text-center truncate transition-all cursor-pointer ${
                    isActive
                      ? 'text-white dark:text-slate-950 font-bold bg-gradient-to-r from-teal-500 to-emerald-500 dark:from-cyan-400 dark:to-emerald-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-[#0f2433]'
                  }`}
                  title={tab.label}
                >
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.mobileLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Responsive Grid of Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const isExpanded = !!expandedCards[project.id];

              return (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col justify-between p-5 rounded-2xl bg-white/95 dark:bg-[#091722]/85 backdrop-blur-md border border-slate-200 dark:border-[#17384d] hover:border-teal-400 dark:hover:border-cyan-500/50 shadow-xs hover:shadow-md transition-all space-y-4"
                >
                  <div className="space-y-2.5">
                    {/* Title & Period */}
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                        {project.title}
                      </h3>
                      <span className="text-xs font-mono text-teal-600 dark:text-cyan-400/90 whitespace-nowrap">
                        {project.period}
                      </span>
                    </div>

                    {/* Subtitle */}
                    <p className="text-xs font-semibold text-teal-700 dark:text-emerald-400">
                      {project.subtitle}
                    </p>

                    {/* Description with Clean Truncation (Hidden when more) */}
                    <p className={`text-xs text-slate-600 dark:text-slate-300 leading-relaxed ${!isExpanded ? 'line-clamp-2' : ''}`}>
                      {project.description}
                    </p>

                    {/* Expandable Bullets (Hidden when more) */}
                    <div className="space-y-1.5 pt-1">
                      {isExpanded ? (
                        <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-600 dark:text-slate-400 pl-0.5 leading-relaxed">
                          {project.bullets.map((bullet, idx) => (
                            <li key={idx} className="leading-relaxed">
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          • {project.bullets[0]}
                        </p>
                      )}

                      {/* Show More / Show Less Toggle Button */}
                      <button
                        type="button"
                        onClick={() => toggleExpand(project.id)}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-600 dark:text-cyan-400 hover:underline transition-colors pt-1 cursor-pointer"
                      >
                        <span>{isExpanded ? 'Show less' : 'View full details'}</span>
                        {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>

                  {/* Card Footer: Stack Tags + Source Link */}
                  <div className="pt-3 border-t border-slate-100 dark:border-[#122e40] space-y-2.5">
                    <div className="flex flex-wrap gap-1">
                      {project.stack.slice(0, isExpanded ? project.stack.length : 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-[10px] font-mono rounded-md bg-slate-100 dark:bg-[#0e2433] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#1b3d52]"
                        >
                          {tech}
                        </span>
                      ))}
                      {!isExpanded && project.stack.length > 4 && (
                        <span className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-slate-100 dark:bg-[#0a1b26] text-slate-500">
                          +{project.stack.length - 4}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 dark:text-cyan-400 hover:underline transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>Code Repository</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
