import React from 'react';
import { motion, type Variants } from 'framer-motion';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1], // polished cubic-bezier easeOut
    },
  },
};

/**
 * Reusable SectionHeader with clean staggered reveal entrance on scroll
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  subtitle,
  icon,
  className = '',
}) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={`space-y-1 ${className}`}
    >
      {eyebrow && (
        <motion.p
          variants={itemVariants}
          className="text-xs font-mono uppercase tracking-wider text-teal-600 dark:text-cyan-400 font-semibold"
        >
          {eyebrow}
        </motion.p>
      )}

      <motion.div variants={itemVariants} className="flex items-center gap-2">
        {icon && <span className="shrink-0">{icon}</span>}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          {title}
        </h2>
      </motion.div>

      {subtitle && (
        <motion.p
          variants={itemVariants}
          className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl pt-0.5"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};
