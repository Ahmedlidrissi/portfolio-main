'use client';

import { AuthProvider } from '@/lib/auth-context';
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeToggle } from '@/components/theme-toggle';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ThemeToggle />
        <div className="min-h-screen font-mono" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
          {children}
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}
