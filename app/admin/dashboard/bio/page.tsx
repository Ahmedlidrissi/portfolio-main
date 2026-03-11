'use client';

import { useEffect, useState } from 'react';
import { bioService, type Bio } from '@/lib/firestore';

export default function BioPage() {
  const [bio, setBio] = useState<Bio | null>(null);
  const [form, setForm] = useState({ title: '', subtitle: '', summary: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsub = bioService.subscribe((item) => {
      setBio(item);
      setForm((prev) =>
        prev.title === '' && prev.subtitle === '' && prev.summary === '' && item
          ? { title: item.title, subtitle: item.subtitle, summary: item.summary }
          : prev
      );
      setLoaded(true);
    });
    return unsub;
  }, []);

  const save = async () => {
    setSaving(true);
    setError('');
    try {
      await bioService.upsert(form);
    } catch (err) {
      console.error('[bio] save failed:', err);
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--heading)' }}>Bio</h1>
      <p className="mb-8 text-sm" style={{ color: 'var(--text-secondary)' }}>
        Update your portfolio headline, subtitle, and summary.
      </p>

      {!loaded ? (
        <div className="animate-pulse" style={{ color: 'var(--muted)' }}>Loading...</div>
      ) : (
        <div className="p-6 rounded-lg space-y-4" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
          <div>
            <label className="block text-xs mb-1 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Title / Name</label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-3 py-2 rounded text-sm font-mono outline-none"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
            />
          </div>
          <div>
            <label className="block text-xs mb-1 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Subtitle / Role</label>
            <input
              value={form.subtitle}
              onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
              className="w-full px-3 py-2 rounded text-sm font-mono outline-none"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
            />
          </div>
          <div>
            <label className="block text-xs mb-1 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Summary</label>
            <textarea
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
              rows={5}
              className="w-full px-3 py-2 rounded text-sm font-mono outline-none resize-y"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
            />
          </div>

          <button
            onClick={save}
            disabled={saving}
            className="px-4 py-2 rounded text-sm disabled:opacity-50"
            style={{ background: 'var(--accent)', color: '#fff' }}
          >
            {saving ? 'Saving...' : 'Save Bio'}
          </button>

          {error && <p className="text-sm text-red-400 mt-2">{error}</p>}

          {bio && (
            <p className="text-xs mt-2" style={{ color: 'var(--muted)' }}>
              Current: &quot;{bio.title}&quot; — {bio.subtitle}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
