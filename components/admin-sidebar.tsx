'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: '~' },
  { href: '/admin/dashboard/profile', label: 'Profile', icon: '*' },
  { href: '/admin/dashboard/bio', label: 'Bio', icon: '$' },
  { href: '/admin/dashboard/experience', label: 'Experience', icon: '@' },
  { href: '/admin/dashboard/skills', label: 'Skills', icon: '#' },
  { href: '/admin/dashboard/projects', label: 'Projects', icon: '>' },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { signOut, user } = useAuth();

  return (
    <aside
      className="w-64 min-h-screen p-4 flex flex-col"
      style={{ background: 'var(--surface)', borderRight: '1px solid var(--border)' }}
    >
      {/* Header */}
      <div className="mb-8">
        <Link href="/" className="text-xs uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
          ← Portfolio
        </Link>
        <h2 className="text-lg font-bold mt-2" style={{ color: 'var(--heading)' }}>Admin Panel</h2>
        <p className="text-xs truncate mt-1" style={{ color: 'var(--muted)' }}>{user?.email}</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors"
              style={{
                background: isActive ? 'var(--accent)' : 'transparent',
                color: isActive ? '#ffffff' : 'var(--text-secondary)',
              }}
            >
              <span className="opacity-60">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Sign out */}
      <button
        onClick={() => signOut()}
        className="mt-auto px-3 py-2 rounded text-sm text-left transition-colors cursor-pointer hover:'var(--accent)'"
        style={{ color: 'var(--muted)' }}
      >
        &gt; sign out
      </button>
    </aside>
  );
}
