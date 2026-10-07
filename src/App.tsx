/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { GridBackground } from './components/GridBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { EducationSection } from './components/EducationSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsGrid } from './components/ProjectsGrid';
import { CompetenciesSection } from './components/CompetenciesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return document.documentElement.classList.contains('dark');
    }
    return true;
  });

  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      root.style.backgroundColor = '#070e17';
      root.style.colorScheme = 'dark';
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.style.backgroundColor = '#f8fafc';
      root.style.colorScheme = 'light';
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#070e17] text-slate-900 dark:text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 relative">
      {/* Block-Block Cyber Grid with Ambient Light Glow */}
      <GridBackground />

      {/* Floating Top Navbar Card matching screenshot */}
      <Navbar
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      <main className="relative z-10">
        {/* Hero Section */}
        <Hero onOpenResume={() => setIsResumeOpen(true)} />

        {/* Education Section */}
        <EducationSection />

        {/* Professional Industry Experience */}
        <ExperienceSection />

        {/* Featured Projects with Fixed Segment & Truncation */}
        <ProjectsGrid />

        {/* Technical Competencies */}
        <CompetenciesSection />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Clean Footer */}
      <Footer />

      {/* Digital Full Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
