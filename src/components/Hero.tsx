import React, { useState } from 'react';
import { ArrowRight, Mail, ChevronDown, ChevronUp, FileText } from 'lucide-react';
import { RESUME_DATA } from '../data/portfolioData';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const [showFullProfile, setShowFullProfile] = useState(false);

  return (
    <section id="about" className="relative pt-24 sm:pt-28 pb-16 md:pb-24 overflow-hidden scroll-mt-20">
      {/* =========================================================================
          HERO SECTION FUTURISTIC GRID BACKGROUND (Strictly behind all hero content)
          - Subtle thin vertical and horizontal grid lines with dark premium tech aesthetic
          - Slow-moving continuous drift + parallax effect
          - Faded radial edges & gradient masks so it blends naturally into the page
          - Strictly behind all text, badges, buttons (-z-10, pointer-events-none)
          ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
        {/* Animated Moving Grid Container with subtle drift */}
        <div className="absolute -inset-10 animate-grid-drift opacity-60 dark:opacity-75 transition-opacity">
          {/* Desktop Grid (64px x 64px crisp architectural grid blocks) */}
          {/* Light Mode Grid (subtle architectural teal/slate) */}
          <div
            className="hidden sm:block dark:hidden absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(13, 148, 136, 0.22) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(13, 148, 136, 0.22) 1px, transparent 1px)
              `,
              backgroundSize: '64px 64px',
            }}
          />
          {/* Dark Mode Grid (futuristic cyber cyan) */}
          <div
            className="hidden sm:dark:block absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(45, 212, 191, 0.28) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(45, 212, 191, 0.28) 1px, transparent 1px)
              `,
              backgroundSize: '64px 64px',
            }}
          />

          {/* Mobile Grid (52px x 52px matching mobile viewport) */}
          {/* Light Mode Mobile Grid */}
          <div
            className="sm:hidden dark:hidden absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(13, 148, 136, 0.25) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(13, 148, 136, 0.25) 1px, transparent 1px)
              `,
              backgroundSize: '52px 52px',
            }}
          />
          {/* Dark Mode Mobile Grid */}
          <div
            className="sm:hidden hidden dark:block absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(45, 212, 191, 0.32) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(45, 212, 191, 0.32) 1px, transparent 1px)
              `,
              backgroundSize: '52px 52px',
            }}
          />
        </div>

        {/* Soft Radial Atmospheric Glow behind center for visual depth */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[680px] h-[380px] bg-gradient-to-b from-teal-400/12 via-cyan-400/6 to-transparent dark:from-teal-400/18 dark:via-cyan-400/8 blur-[120px] rounded-full" />

        {/* Smooth Vignette / Mask so grid fades gracefully at top, bottom, and edges in both themes */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#f8fafc] via-transparent to-[#f8fafc]/80 dark:from-[#070e17] dark:via-transparent dark:to-[#070e17]/80" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#f8fafc]/50 to-[#f8fafc] dark:via-[#070e17]/40 dark:to-[#070e17]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6 relative z-10">
        {/* Availability Badge - Rock solid without layout jumping */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-teal-50/90 dark:bg-[#0c1f2b]/90 backdrop-blur-md border border-teal-200 dark:border-[#183d50] text-xs text-teal-900 dark:text-slate-300 shadow-xs">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="font-medium">
            Open to internships and junior developer roles in France / Europe
          </span>
        </div>

        {/* Kicker Headline */}
        <div className="space-y-3">
          <p className="text-xs sm:text-sm font-bold tracking-wider uppercase text-teal-600 dark:text-cyan-400 font-mono">
            {RESUME_DATA.personal.name} — SOFTWARE ENGINEER, PARIS
          </p>

          {/* Massive Impact Headline */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12] dark:drop-shadow-[0_4px_16px_rgba(2,8,15,0.95)]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Building reliable fullstack, cloud, and AI-enabled software.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200 leading-relaxed max-w-3xl pt-1 dark:drop-shadow-[0_2px_8px_rgba(2,8,15,0.8)]">
            Master's student at <strong className="text-slate-900 dark:text-white font-semibold">EPITA Paris</strong> with professional experience in backend systems, automation, fullstack development, cloud platforms, and practical AI applications.
          </p>
        </div>

        {/* Primary Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('projects');
              if (el) {
                const navHeight = 72;
                const pos = el.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({ top: Math.max(0, pos), behavior: 'smooth' });
              }
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold text-white dark:text-slate-950 bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-cyan-400 dark:to-emerald-400 hover:brightness-105 active:scale-[0.99] rounded-xl shadow-md transition-all cursor-pointer text-center"
          >
            <span>View Projects</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('contact');
              if (el) {
                const navHeight = 72;
                const pos = el.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({ top: Math.max(0, pos), behavior: 'smooth' });
              }
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-slate-800 dark:text-white bg-white/90 dark:bg-[#0c1a24] hover:bg-slate-100 dark:hover:bg-[#132736] border border-slate-300 dark:border-[#1b374b] rounded-xl transition-all cursor-pointer text-center shadow-xs"
          >
            <Mail className="w-4 h-4 text-teal-600 dark:text-cyan-400" />
            <span>Contact Me</span>
          </a>

          <button
            onClick={onOpenResume}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100/90 dark:bg-[#091520] hover:bg-slate-200 dark:hover:bg-[#0e2130] border border-slate-200 dark:border-[#173347] rounded-xl transition-all cursor-pointer text-center"
          >
            <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Resume (PDF)</span>
          </button>
        </div>

        {/* Expandable Professional Profile */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/95 dark:bg-[#0a1824]/90 backdrop-blur-md border border-slate-200 dark:border-[#18364a] text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
            <span className="uppercase tracking-wider text-teal-600 dark:text-cyan-400">Professional Profile</span>
            <button
              onClick={() => setShowFullProfile(!showFullProfile)}
              className="inline-flex items-center gap-1 text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-cyan-400 cursor-pointer"
            >
              <span>{showFullProfile ? 'Show less' : 'Read more'}</span>
              {showFullProfile ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          <p className={`leading-relaxed ${!showFullProfile ? 'line-clamp-2' : ''}`}>
            {RESUME_DATA.personal.profile}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-[#132c3d]">
            <a href={`mailto:${RESUME_DATA.personal.email}`} className="hover:text-teal-600 dark:hover:text-cyan-400">
              {RESUME_DATA.personal.email}
            </a>
            <span>•</span>
            <a href={`tel:${RESUME_DATA.personal.phone.replace(/\s+/g, '')}`} className="hover:text-teal-600 dark:hover:text-cyan-400">
              {RESUME_DATA.personal.phone}
            </a>
            <span>•</span>
            <span>{RESUME_DATA.personal.location}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
