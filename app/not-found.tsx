'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NotFound() {
  const pathname = usePathname();

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'var(--background)' }}
    >
      <div className="w-full max-w-lg">
        {/* Terminal-style card */}
        <div
          className="rounded-lg overflow-hidden shadow-2xl"
          style={{
            background: 'var(--card)',
            border: '1px solid var(--border)',
            boxShadow: '0 25px 50px -12px var(--shadow-color)',
          }}
        >
          {/* Terminal header */}
          <div
            className="px-4 py-3 flex items-center gap-2"
            style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}
          >
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-xs ml-2 font-mono" style={{ color: 'var(--muted)' }}>
              terminal — 404
            </span>
          </div>

          {/* Terminal body */}
          <div className="p-6 font-mono text-sm leading-relaxed">
            <p style={{ color: 'var(--muted)' }} className="mb-4">
              $ navigate --path &quot;{pathname}&quot;
            </p>
            <p style={{ color: 'var(--accent)' }} className="mb-1">
              ✗ Error: route not found (404)
            </p>
            <p style={{ color: 'var(--foreground)' }} className="mb-6">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>

            <div className="space-y-2" style={{ color: 'var(--muted)' }}>
              <p>Available routes:</p>
              <p className="pl-4">
                <Link
                  href="/"
                  className="transition-colors"
                  style={{ color: 'var(--primary)' }}
                >
                  /
                </Link>{' '}
                → Home
              </p>
              <p className="pl-4">
                <Link
                  href="/profile"
                  className="transition-colors"
                  style={{ color: 'var(--primary)' }}
                >
                  /profile
                </Link>{' '}
                → Full Profile
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              <Link
                href="/"
                className="inline-block px-4 py-2 text-sm rounded transition-colors text-white"
                style={{ background: 'var(--primary)' }}
              >
                ← Go Home
              </Link>
            </div>
          </div>
        </div>

        <p className="text-xs text-center mt-6" style={{ color: 'var(--muted)' }}>
          Engineered with precision. Designed for impact.
        </p>
      </div>
    </main>
  );
}
