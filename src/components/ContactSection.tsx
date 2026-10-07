import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check, Github, Linkedin, MessageSquare } from 'lucide-react';
import { RESUME_DATA } from '../data/portfolioData';
import { SectionHeader } from './SectionHeader';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 4500);
  };

  return (
    <section id="contact" className="py-14 md:py-18 border-t border-slate-200 dark:border-[#142d3d]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        <SectionHeader
          eyebrow="Get In Touch"
          title="Contact"
          icon={<MessageSquare className="w-5 h-5 text-teal-600 dark:text-cyan-400" />}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
          {/* Direct Details */}
          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
            <p className="leading-relaxed">
              Open to Software Engineering, Full-Stack, and AI Systems Developer internship roles in France, Europe, or Remote.
            </p>

            <div className="space-y-3 pt-1 text-xs sm:text-sm">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/90 dark:bg-[#091722]/80 border border-slate-200 dark:border-[#17384d] shadow-xs">
                <Mail className="w-4 h-4 text-teal-600 dark:text-cyan-400 shrink-0" />
                <a
                  href={`mailto:${RESUME_DATA.personal.email}`}
                  className="text-slate-900 dark:text-white hover:text-teal-600 dark:hover:text-cyan-400 transition-colors font-medium"
                >
                  {RESUME_DATA.personal.email}
                </a>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/90 dark:bg-[#091722]/80 border border-slate-200 dark:border-[#17384d] shadow-xs">
                <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <a
                  href={`tel:${RESUME_DATA.personal.phone.replace(/\s+/g, '')}`}
                  className="text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium"
                >
                  {RESUME_DATA.personal.phone}
                </a>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/90 dark:bg-[#091722]/80 border border-slate-200 dark:border-[#17384d] shadow-xs">
                <MapPin className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                <span className="text-slate-900 dark:text-white">{RESUME_DATA.personal.location}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={RESUME_DATA.personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-[#091722] border border-slate-200 dark:border-[#17384d] text-slate-700 dark:text-slate-200 hover:text-teal-600 dark:hover:text-cyan-400 transition-colors shadow-xs"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
              <a
                href={RESUME_DATA.personal.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-[#091722] border border-slate-200 dark:border-[#17384d] text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors shadow-xs"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          {/* Contact Message Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-3.5 p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#091722]/90 border border-slate-200 dark:border-[#17384d] shadow-md"
          >
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Your Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-[#07111a] border border-slate-300 dark:border-[#18394e] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-teal-500 dark:focus:border-cyan-400 transition-colors"
                placeholder="Jane Doe"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Your Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-[#07111a] border border-slate-300 dark:border-[#18394e] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-teal-500 dark:focus:border-cyan-400 transition-colors"
                placeholder="jane@company.com"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Message
              </label>
              <textarea
                required
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-[#07111a] border border-slate-300 dark:border-[#18394e] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-teal-500 dark:focus:border-cyan-400 transition-colors resize-none"
                placeholder="Hello Vaishnavi, I came across your profile..."
              />
            </div>

            {sent && (
              <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 font-medium">
                <Check className="w-3.5 h-3.5" />
                <span>Thank you! Your message has been sent.</span>
              </p>
            )}

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 py-3 text-xs font-bold text-white dark:text-slate-950 bg-gradient-to-r from-teal-500 to-emerald-500 dark:from-cyan-400 dark:to-emerald-400 hover:brightness-105 rounded-xl transition-all cursor-pointer shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
