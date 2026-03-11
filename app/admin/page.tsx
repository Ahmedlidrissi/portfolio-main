'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const { signIn, user, loading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.push('/admin/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse font-mono" style={{ color: 'var(--accent)' }}>Loading...</div>
      </div>
    );
  }

  if (user) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await signIn(email, password);
      router.push('/admin/dashboard');
    } catch {
      setError('Authentication failed. Check your credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Terminal-style login */}
        <div className="rounded-lg overflow-hidden shadow-2xl backdrop-blur-md" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
          {/* Header */}
          <div className="px-4 py-3 flex items-center gap-2" style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-xs ml-2" style={{ color: 'var(--muted)' }}>admin-auth</span>
          </div>

          {/* Body */}
          <div className="p-6">
            <div className="mb-6">
              <p style={{ color: 'var(--accent)' }}>$ sudo authenticate --admin</p>
              <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>Enter your credentials to access the dashboard.</p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded text-sm bg-red-500/10 text-red-400 border border-red-500/20">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs mb-2 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded text-sm font-mono outline-none focus:ring-1"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--foreground)', '--tw-ring-color': 'var(--accent)' } as React.CSSProperties}
                  placeholder="admin@example.com"
                />
              </div>
              <div>
                <label className="block text-xs mb-2 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded text-sm font-mono outline-none focus:ring-1"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--foreground)', '--tw-ring-color': 'var(--accent)' } as React.CSSProperties}
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2 rounded text-sm font-mono transition-colors disabled:opacity-50"
                style={{ background: 'var(--accent)', color: '#ffffff' }}
              >
                {submitting ? '> authenticating...' : '> login'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
