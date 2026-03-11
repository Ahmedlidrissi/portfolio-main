'use client';

import { useEffect, useState } from 'react';
import { projectsService, skillsService, experienceService, bioService, type Project, type Skill, type Experience, type Bio } from '@/lib/firestore';

export default function DashboardPage() {
  const [stats, setStats] = useState({ projects: 0, skills: 0, experience: 0, hasBio: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubs: (() => void)[] = [];

    unsubs.push(
      projectsService.subscribe((items: Project[]) => setStats((s) => ({ ...s, projects: items.length }))),
      skillsService.subscribe((items: Skill[]) => setStats((s) => ({ ...s, skills: items.length }))),
      experienceService.subscribe((items: Experience[]) => setStats((s) => ({ ...s, experience: items.length }))),
      bioService.subscribe((item: Bio | null) => setStats((s) => ({ ...s, hasBio: !!item }))),
    );

    setLoading(false);
    return () => unsubs.forEach((u) => u());
  }, []);

  const cards = [
    { label: 'Projects', value: stats.projects, href: '/admin/dashboard/projects' },
    { label: 'Skill Groups', value: stats.skills, href: '/admin/dashboard/skills' },
    { label: 'Experience', value: stats.experience, href: '/admin/dashboard/experience' },
    { label: 'Bio', value: stats.hasBio ? 'Configured' : 'Not set', href: '/admin/dashboard/bio' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--heading)' }}>Dashboard</h1>
      <p className="mb-8 text-sm" style={{ color: 'var(--text-secondary)' }}>Manage your portfolio content in real-time.</p>

      {loading ? (
        <div className="animate-pulse" style={{ color: 'var(--muted)' }}>Fetching stats...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card) => (
            <a
              key={card.label}
              href={card.href}
              className="p-6 rounded-lg transition-colors"
              style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
            >
              <p className="text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--muted)' }}>{card.label}</p>
              <p className="text-3xl font-bold" style={{ color: 'var(--accent)' }}>{card.value}</p>
            </a>
          ))}
        </div>
      )}

      {/* Quick info */}
      <div className="mt-12 p-4 rounded-lg text-sm" style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
        <p style={{ color: 'var(--accent)' }}>$ info</p>
        <p className="mt-2">Changes made here are synced to the live portfolio in real-time via Firestore listeners. No redeploy needed.</p>
      </div>
    </div>
  );
}
