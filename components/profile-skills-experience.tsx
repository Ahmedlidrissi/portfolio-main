'use client';

import { motion } from 'framer-motion';
import { useFirestoreSkills, useFirestoreExperience, useFirestoreBio } from '@/lib/use-firestore';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const staticSkillCategories = [
  {
    label: 'Backend',
    skills: ['Spring Boot', 'Laravel', 'Symfony', 'Express.js'],
  },
  {
    label: 'Frontend',
    skills: ['Next.js 15', 'React', 'Tailwind CSS', 'Inertia.js'],
  },
  {
    label: 'Database & Infra',
    skills: ['MySQL', 'MongoDB', 'Docker', 'Hetzner VPS'],
  },
  {
    label: 'Concepts',
    skills: ['RESTful APIs', 'System Design', 'AI Orchestration'],
  },
];

const staticExperience = {
  role: 'Software Engineer',
  company: 'Province of Settat',
  period: '2023 – Present',
  location: 'Remote',
  bullets: [
    'Architected digitized public service workflows, transitioning legacy paper systems to secure web platforms.',
    'Engineered robust backend services (Spring Boot / Laravel) ensuring strict data integrity.',
    'Accelerated development cycles using AI workflows, maintaining manual control over database indexing and security.',
  ],
};

const staticBio = `Software Developer with a strong foundation in enterprise-grade backend architectures and relational data modeling. I bridge the gap between traditional enterprise reliability and modern rapid delivery by utilizing AI-assisted coding paradigms to write clean, testable, and strictly typed code.`;

export function ProfileSkillsExperience() {
  const firestoreSkills = useFirestoreSkills();
  const firestoreExperience = useFirestoreExperience();
  const firestoreBio = useFirestoreBio();

  const skillCategories = firestoreSkills ?? staticSkillCategories;
  const experience = firestoreExperience?.[0] ?? staticExperience;
  const bioText = firestoreBio?.summary ?? staticBio;
  return (
    <section className="py-20 px-4" style={{ background: 'var(--background)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold mb-2" style={{ color: 'var(--heading)' }}>
            Profile, Skills & Experience
          </h2>
          <div className="h-1 w-20 rounded" style={{ background: 'var(--primary)' }}></div>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:grid-rows-2"
        >
          {/* Card 1: Professional Summary (2 columns) */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 backdrop-blur-md rounded-xl p-6 transition-colors duration-300"
            style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
          >
            <div className="mb-4">
              <h3 className="font-mono text-sm mb-4" style={{ color: 'var(--accent)' }}>
                &gt; whoami
              </h3>
              <div className="w-12 h-0.5 rounded" style={{ background: 'var(--accent)' }}></div>
            </div>

            <p className="leading-relaxed text-base" style={{ color: 'var(--foreground)' }}>
              {bioText}
            </p>

            <div className="mt-6 pt-6" style={{ borderTop: '1px solid var(--border)' }}>
              <p className="text-sm font-mono flex items-center gap-2" style={{ color: 'var(--muted)' }}>
                Status: 
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span style={{ color: 'var(--accent)' }}>Online</span>
              </p>
            </div>
          </motion.div>

          {/* Card 2: Work Experience (1 column, tall) */}
          <motion.div
            variants={itemVariants}
            className="md:row-span-2 backdrop-blur-md rounded-xl p-6 transition-colors duration-300"
            style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
          >
            <h3 className="font-bold text-lg mb-6" style={{ color: 'var(--heading)' }}>Experience</h3>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold" style={{ color: 'var(--foreground)' }}>
                  {experience.role}
                </h4>
                <p className="text-sm font-mono mt-1" style={{ color: 'var(--primary)' }}>
                  {experience.company}
                </p>
                <p className="text-xs font-mono mt-2" style={{ color: 'var(--muted)' }}>
                  {experience.period} | {experience.location}
                </p>
              </div>

              <div className="pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                <ul className="space-y-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {experience.bullets.map((bullet, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="flex-shrink-0" style={{ color: 'var(--accent)' }}>→</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Tech Stack & Skills (Full width) */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-3 backdrop-blur-md rounded-xl p-6 transition-colors duration-300"
            style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
          >
            <h3 className="font-bold text-lg mb-6" style={{ color: 'var(--heading)' }}>
              System Architecture & Stack
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {skillCategories.map((category) => (
                <div key={category.label}>
                  <h4 className="font-semibold text-sm mb-4 font-mono" style={{ color: 'var(--accent)' }}>
                    {category.label}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="backdrop-blur-sm px-3 py-1 rounded-md font-mono text-xs transition-colors duration-200"
                        style={{ background: 'var(--badge-bg)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
