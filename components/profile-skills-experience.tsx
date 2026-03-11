'use client';

import { motion } from 'framer-motion';

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

const skillCategories = [
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

export function ProfileSkillsExperience() {
  return (
    <section className="bg-slate-950 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold text-slate-50 mb-2">
            Profile, Skills & Experience
          </h2>
          <div className="h-1 w-20 bg-blue-500 rounded"></div>
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
            className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors duration-300"
          >
            <div className="mb-4">
              <h3 className="font-mono text-blue-500 text-sm mb-4">
                &gt; whoami
              </h3>
              <div className="w-12 h-0.5 bg-blue-500 rounded"></div>
            </div>

            <p className="text-slate-200 leading-relaxed text-base">
              Software Developer with a strong foundation in enterprise-grade
              backend architectures and relational data modeling. I bridge the
              gap between traditional enterprise reliability and modern rapid
              delivery by utilizing AI-assisted coding paradigms to write clean,
              testable, and strictly typed code.
            </p>

            <div className="mt-6 pt-6 border-t border-slate-800">
              <p className="text-slate-400 text-sm font-mono">
                Status: <span className="text-emerald-500">● Online</span>
              </p>
            </div>
          </motion.div>

          {/* Card 2: Work Experience (1 column, tall) */}
          <motion.div
            variants={itemVariants}
            className="md:row-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors duration-300"
          >
            <h3 className="text-slate-50 font-bold text-lg mb-6">Experience</h3>

            <div className="space-y-4">
              <div>
                <h4 className="text-slate-200 font-semibold">
                  Software Engineer
                </h4>
                <p className="text-blue-500 text-sm font-mono mt-1">
                  Province of Settat
                </p>
                <p className="text-slate-500 text-xs font-mono mt-2">
                  2023 – Present | Remote
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <ul className="space-y-3 text-slate-400 text-sm">
                  <li className="flex gap-3">
                    <span className="text-emerald-500 flex-shrink-0">→</span>
                    <span>
                      Architected digitized public service workflows, transitioning
                      legacy paper systems to secure web platforms.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-emerald-500 flex-shrink-0">→</span>
                    <span>
                      Engineered robust backend services (Spring Boot / Laravel)
                      ensuring strict data integrity.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-emerald-500 flex-shrink-0">→</span>
                    <span>
                      Accelerated development cycles using AI workflows, maintaining
                      manual control over database indexing and security.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Tech Stack & Skills (Full width) */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-3 bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors duration-300"
          >
            <h3 className="text-slate-50 font-bold text-lg mb-6">
              System Architecture & Stack
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {skillCategories.map((category) => (
                <div key={category.label}>
                  <h4 className="text-slate-200 font-semibold text-sm mb-4 font-mono text-blue-500">
                    {category.label}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-slate-950 border border-slate-700 text-slate-300 px-3 py-1 rounded-md font-mono text-xs hover:border-slate-600 transition-colors duration-200"
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
