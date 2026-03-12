'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useFirestoreSkills, useFirestoreExperience, useFirestoreBio, useFirestoreProfile } from '@/lib/use-firestore';
import type { Certification, Profile } from '@/lib/firestore';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
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

// Static data when Firestore is unavailable
const staticExperiences = [
  {
    id: '1',
    role: 'Senior Full-Stack Engineer',
    company: 'Province of Settat',
    period: '2023 – Present',
    location: 'Remote',
    bullets: [
      'Architected digitized public service workflows, transitioning legacy paper systems to secure web platforms.',
      'Engineered robust backend services (Spring Boot / Laravel) ensuring strict data integrity.',
      'Accelerated development cycles using AI workflows, maintaining manual control over database indexing and security.',
      'Implemented CI/CD pipelines reducing deployment time by 60%.',
      'Mentored junior developers on clean code practices and TDD methodologies.',
    ],
  },
  {
    id: '2',
    role: 'Full-Stack Developer',
    company: 'Tech Solutions Agency',
    period: '2021 – 2023',
    location: 'Casablanca, Morocco',
    bullets: [
      'Built 15+ client websites using modern frameworks (Next.js, React).',
      'Designed RESTful APIs serving 50k+ daily requests with 99.9% uptime.',
      'Integrated payment gateways (Stripe, PayPal) and third-party APIs.',
      'Optimized database queries reducing load times by 40%.',
    ],
  },
  {
    id: '3',
    role: 'Junior Developer',
    company: 'Startup Incubator',
    period: '2019 – 2021',
    location: 'Casablanca, Morocco',
    bullets: [
      'Developed MVP for 5 startups in e-commerce and logistics.',
      'Collaborated with design teams to implement responsive UIs.',
      'Learned agile methodologies and version control best practices.',
    ],
  },
];

const staticBio = {
  title: 'Youssef El Amri',
  subtitle: 'Senior Full-Stack Engineer & Creative Developer',
  summary: `My journey into software engineering began with a fascination for how systems work under the hood. What started as curiosity about code evolved into a deep passion for building robust, scalable architectures that solve real-world problems.

Over the years, I've developed a unique approach to engineering: combining the reliability of enterprise-grade patterns with the agility of modern development practices. I believe in using AI as a powerful assistant—not a replacement—maintaining human oversight over critical decisions like database design, security, and system architecture.

My expertise spans the full development lifecycle, from conceptualization to deployment. I've architected solutions for government institutions, startups, and enterprise clients, always prioritizing maintainability, performance, and user experience.

When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or mentoring the next generation of developers. I believe in code that's not just functional, but elegant—where every line serves a purpose.`,
};

const staticProfile: Partial<Profile> = {
  location: 'Casablanca, Morocco',
  email: 'hello@elamri.dev',
  github: 'https://github.com/youssefelamri',
  linkedin: 'https://linkedin.com/in/youssefelamri',
  headshot: '/headshot.jpg',
  hobbies: ['Gaming', 'Open Source Hardware', 'Hiking', 'Reading Tech Blogs', 'Building Custom Keyboards'],
};

// Default certifications - used when Firestore is unavailable
const defaultCertifications = [
  { id: '1', name: 'AWS Solutions Architect Associate', issuer: 'Amazon Web Services', year: '2024' },
  { id: '2', name: 'Meta Full-Stack Developer Certificate', issuer: 'Meta', year: '2023' },
  { id: '3', name: 'Google Cloud Professional Data Engineer', issuer: 'Google', year: '2023' },
  { id: '4', name: 'Advanced React Patterns', issuer: 'Frontend Masters', year: '2022' },
  { id: '5', name: 'System Design Fundamentals', issuer: 'Exponent', year: '2022' },
];

// Get certifications from profile - fallback to default if not set
const getCertifications = (profile: Partial<Profile>) => {
  if (profile.certifications && profile.certifications.length > 0) {
    return profile.certifications;
  }
  return defaultCertifications;
};

// CRT filter component for headshot
function CRTImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-40 h-40 rounded-xl overflow-hidden" style={{ border: '2px solid var(--border)' }}>
      <div className="absolute inset-0 scanline-crt z-10 pointer-events-none" />
      <Image
        src={src}
        alt={alt}
        fill
        sizes="160px"
        priority
        className="object-cover"
        onError={(e) => {
          // Fallback to a placeholder if image fails
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
        }}
      />
    </div>
  );
}

export default function ProfilePage() {
  const firestoreSkills = useFirestoreSkills();
  const firestoreExperience = useFirestoreExperience();
  const firestoreBio = useFirestoreBio();
  const firestoreProfile = useFirestoreProfile();

  const skillCategories = firestoreSkills ?? staticSkillCategories;
  const experiences = firestoreExperience?.length ? firestoreExperience : staticExperiences;
  const bio = firestoreBio ?? staticBio;
  const profile = firestoreProfile ?? staticProfile;
  const certifications = getCertifications(profile);

  return (
    <div className="min-h-screen py-12 px-4" style={{ background: 'var(--background)' }}>
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-sm font-mono px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
            style={{ 
              background: 'var(--surface)', 
              border: '1px solid var(--border)',
              color: 'var(--foreground)'
            }}
          >
            <span style={{ color: 'var(--accent)' }}>cd</span> ..
            <span style={{ color: 'var(--muted)' }}>/ back-to-home</span>
          </Link>
        </motion.div>

        {/* Document Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--heading)' }}>
            Technical Manifest
          </h1>
          <div className="flex items-center gap-4 text-sm font-mono" style={{ color: 'var(--muted)' }}>
            <span>root@portfolio:~/profile</span>
            <span style={{ color: 'var(--primary)' }}>$</span>
            <span>cat README.md</span>
          </div>
          <div className="h-px mt-6" style={{ background: 'var(--border)' }}></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {/* Identity Module - Profile Header with Headshot & Contact */}
          <motion.section variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-sm px-2 py-1 rounded" style={{ background: 'var(--accent)', color: '#fff' }}>
                00
              </span>
              <h2 className="text-2xl font-bold" style={{ color: 'var(--heading)' }}>
                Identity Module
              </h2>
            </div>
            
            <div 
              className="backdrop-blur-md rounded-xl p-6 border border-white/10"
              style={{ background: 'var(--card)' }}
            >
              <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Headshot with CRT filter */}
                <CRTImage src={profile.headshot || '/placeholder-avatar.png'} alt={bio.title} />
                
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="font-mono text-sm" style={{ color: 'var(--accent)' }}>
                      &gt; whoami --detailed
                    </h3>
                  </div>
                  
                  <div>
                    <h4 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
                      {bio.title}
                    </h4>
                    <p className="font-mono text-sm mt-1" style={{ color: 'var(--primary)' }}>
                      {bio.subtitle}
                    </p>
                  </div>

                  {/* fullName */}
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-base">👤</span>
                    <span style={{ color: 'var(--text-secondary)' }}>{profile.firstName} {profile.lastName}</span>
                  </div>
                  {/* Phone */}
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-base">📞</span>
                    <span style={{ color: 'var(--text-secondary)' }}>{profile.phone}</span>
                  </div>
                  {/* Location */}
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-base">📍</span>
                    <span style={{ color: 'var(--text-secondary)' }}>{profile.location}</span>
                  </div>
                  {/* Interactive Contact Links */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    <a 
                      href={`mailto:${profile.email}`}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-mono transition-all duration-200 hover:scale-105"
                      style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
                    >
                      <span>✉️</span>
                      <span style={{ color: 'var(--accent)' }}>Email</span>
                    </a>
                    <a 
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-mono transition-all duration-200 hover:scale-105"
                      style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
                    >
                      <span>🐙</span>
                      <span style={{ color: 'var(--foreground)' }}>GitHub</span>
                    </a>
                    <a 
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-mono transition-all duration-200 hover:scale-105"
                      style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
                    >
                      <span>💼</span>
                      <span style={{ color: 'var(--foreground)' }}>LinkedIn</span>
                    </a>
                    <a 
                      href={profile.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-mono transition-all duration-200 hover:scale-105"
                      style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
                    >
                      <span>📸</span>
                      <span style={{ color: 'var(--foreground)' }}>Instagram</span>
                    </a>
                    <a 
                      href={profile.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-mono transition-all duration-200 hover:scale-105"
                      style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
                    >
                      <span>👥</span>
                      <span style={{ color: 'var(--foreground)' }}>Facebook</span>
                    </a>
                    <a 
                      href={profile.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-mono transition-all duration-200 hover:scale-105"
                      style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
                    >
                      <span>𝕏</span>
                      <span style={{ color: 'var(--foreground)' }}>Twitter</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Expanded Bio Section */}
          <motion.section variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-sm px-2 py-1 rounded" style={{ background: 'var(--accent)', color: '#fff' }}>
                01
              </span>
              <h2 className="text-2xl font-bold" style={{ color: 'var(--heading)' }}>
                About Me
              </h2>
            </div>
            
            <div 
              className="backdrop-blur-md rounded-xl p-6 border border-white/10"
              style={{ background: 'var(--card)' }}
            >
              <div className="mb-4">
                <h3 className="font-mono text-sm" style={{ color: 'var(--accent)' }}>
                  &gt; cat bio.txt
                </h3>
              </div>
              
              <div className="space-y-4">
                <div className="prose prose-invert max-w-none">
                  {bio.summary.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="leading-relaxed text-sm md:text-base" style={{ color: 'var(--text-secondary)' }}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* Personal Logs (Hobbies) - JSON Style */}
          <motion.section variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-sm px-2 py-1 rounded" style={{ background: 'var(--primary)', color: '#fff' }}>
                01.5
              </span>
              <h2 className="text-2xl font-bold" style={{ color: 'var(--heading)' }}>
                Personal Logs
              </h2>
            </div>
            
            <div 
              className="backdrop-blur-md rounded-xl p-6 border border-white/10 font-mono text-sm"
              style={{ background: 'var(--card)' }}
            >
              <div className="mb-4">
                <h3 className="font-mono text-sm" style={{ color: 'var(--accent)' }}>
                  &gt; cat hobbies.json
                </h3>
              </div>
              
              <pre style={{ color: 'var(--text-secondary)' }}>{JSON.stringify({ hobbies: profile.hobbies }, null, 2)}</pre>
            </div>
          </motion.section>

          {/* Full Experience History */}
          <motion.section variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-sm px-2 py-1 rounded" style={{ background: 'var(--accent)', color: '#fff' }}>
                02
              </span>
              <h2 className="text-2xl font-bold" style={{ color: 'var(--heading)' }}>
                Experience History
              </h2>
            </div>

            <div className="space-y-6">
              {experiences.map((exp, idx) => (
                <motion.div
                  key={exp.id || idx}
                  variants={itemVariants}
                  className="backdrop-blur-md rounded-xl p-6 border border-white/10"
                  style={{ background: 'var(--card)' }}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-bold text-lg" style={{ color: 'var(--foreground)' }}>
                        {exp.role}
                      </h3>
                      <p className="font-mono text-sm mt-1" style={{ color: 'var(--primary)' }}>
                        {exp.company}
                      </p>
                    </div>
                    <div className="text-sm font-mono" style={{ color: 'var(--muted)' }}>
                      <span>{exp.period}</span>
                      <span className="mx-2">|</span>
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  <div className="pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                    <ul className="space-y-3">
                      {exp.bullets.map((bullet, bulletIdx) => (
                        <li key={bulletIdx} className="flex gap-3 text-sm">
                          <span className="flex-shrink-0 mt-1" style={{ color: 'var(--accent)' }}>▸</span>
                          <span style={{ color: 'var(--text-secondary)' }}>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Tech Stack */}
          <motion.section variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-sm px-2 py-1 rounded" style={{ background: 'var(--accent)', color: '#fff' }}>
                03
              </span>
              <h2 className="text-2xl font-bold" style={{ color: 'var(--heading)' }}>
                Technical Arsenal
              </h2>
            </div>

            <div 
              className="backdrop-blur-md rounded-xl p-6 border border-white/10"
              style={{ background: 'var(--card)' }}
            >
              <div className="mb-4">
                <h3 className="font-mono text-sm" style={{ color: 'var(--accent)' }}>
                  &gt; ls -la /tech-stack/
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skillCategories.map((category) => (
                  <div key={category.label} className="space-y-3">
                    <h4 className="font-semibold text-sm font-mono" style={{ color: 'var(--accent)' }}>
                      {category.label}/
                    </h4>
                    <div className="flex flex-wrap gap-2 ml-4">
                      {category.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 rounded-md font-mono text-xs border border-white/10"
                          style={{ background: 'var(--surface)', color: 'var(--foreground)' }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Certifications & Education */}
          <motion.section variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-sm px-2 py-1 rounded" style={{ background: 'var(--accent)', color: '#fff' }}>
                04
              </span>
              <h2 className="text-2xl font-bold" style={{ color: 'var(--heading)' }}>
                Certifications & Education
              </h2>
            </div>

            <div 
              className="backdrop-blur-md rounded-xl p-6 border border-white/10"
              style={{ background: 'var(--card)' }}
            >
              <div className="mb-4">
                <h3 className="font-mono text-sm" style={{ color: 'var(--accent)' }}>
                  &gt; cat credentials.json
                </h3>
              </div>

              <ul className="space-y-4">
                {certifications.map((cert: Certification) => (
                  <li key={cert.id || cert.name} className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid var(--border)' }}>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm" style={{ color: 'var(--primary)' }}>✓</span>
                      <span style={{ color: 'var(--foreground)' }}>{cert.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-mono" style={{ color: 'var(--text-secondary)' }}>{cert.issuer}</p>
                      <p className="text-xs font-mono" style={{ color: 'var(--muted)' }}>{cert.year}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.section>

          {/* Footer Navigation */}
          <motion.div variants={itemVariants} className="pt-8">
            <div className="h-px mb-8" style={{ background: 'var(--border)' }}></div>
            <div className="flex justify-between items-center text-sm font-mono" style={{ color: 'var(--muted)' }}>
              <span>root@portfolio:~/profile $</span>
              <span style={{ color: 'var(--accent)' }}>echo &apos;End of file&apos;</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}