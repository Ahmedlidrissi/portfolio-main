'use client';

import { useEffect, useState } from 'react';
import { experienceService, type Experience } from '@/lib/firestore';

const emptyExp: Omit<Experience, 'id'> = { role: '', company: '', period: '', location: '', bullets: [], order: 0 };

export default function ExperiencePage() {
  const [items, setItems] = useState<Experience[]>([]);
  const [editing, setEditing] = useState<(Experience & { isNew?: boolean }) | null>(null);
  const [bulletsInput, setBulletsInput] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsub = experienceService.subscribe(setItems);
    return unsub;
  }, []);

  const startNew = () => {
    setEditing({ ...emptyExp, id: crypto.randomUUID(), order: items.length, isNew: true });
    setBulletsInput('');
  };

  const startEdit = (e: Experience) => {
    setEditing({ ...e });
    setBulletsInput(e.bullets.join('\n'));
  };

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    const { isNew, id, ...data } = editing as Experience & { isNew?: boolean };
    void isNew;
    await experienceService.upsert(id, { ...data, bullets: bulletsInput.split('\n').map((s) => s.trim()).filter(Boolean) });
    setEditing(null);
    setSaving(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--heading)' }}>Experience</h1>
        <button onClick={startNew} className="px-4 py-2 rounded text-sm" style={{ background: 'var(--accent)', color: '#fff' }}>
          + New Entry
        </button>
      </div>

      {editing && (
        <div className="mb-8 p-6 rounded-lg space-y-4" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Role / Title" value={editing.role} onChange={(v) => setEditing({ ...editing, role: v })} />
            <InputField label="Company" value={editing.company} onChange={(v) => setEditing({ ...editing, company: v })} />
            <InputField label="Period (e.g. 2023 – Present)" value={editing.period} onChange={(v) => setEditing({ ...editing, period: v })} />
            <InputField label="Location" value={editing.location} onChange={(v) => setEditing({ ...editing, location: v })} />
            <div className="md:col-span-2">
              <label className="block text-xs mb-1 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Bullet Points (one per line)</label>
              <textarea
                value={bulletsInput}
                onChange={(e) => setBulletsInput(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 rounded text-sm font-mono outline-none resize-y"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
              />
            </div>
            <InputField label="Order" value={String(editing.order)} onChange={(v) => setEditing({ ...editing, order: Number(v) || 0 })} type="number" />
          </div>
          <div className="flex gap-2">
            <button onClick={save} disabled={saving} className="px-4 py-2 rounded text-sm disabled:opacity-50" style={{ background: 'var(--accent)', color: '#fff' }}>{saving ? 'Saving...' : 'Save'}</button>
            <button onClick={() => setEditing(null)} className="px-4 py-2 rounded text-sm" style={{ color: 'var(--muted)', border: '1px solid var(--border)' }}>Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {items.map((exp) => (
          <div key={exp.id} className="flex items-center justify-between px-4 py-3 rounded-lg" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
            <div>
              <span className="font-bold" style={{ color: 'var(--heading)' }}>{exp.role}</span>
              <span className="ml-2 text-xs" style={{ color: 'var(--muted)' }}>@ {exp.company} · {exp.period}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(exp)} className="text-xs px-3 py-1 rounded" style={{ color: 'var(--accent)', border: '1px solid var(--border)' }}>Edit</button>
              <button onClick={() => experienceService.remove(exp.id)} className="text-xs px-3 py-1 rounded text-red-400 border border-red-500/20">Delete</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-sm" style={{ color: 'var(--muted)' }}>No experience entries yet.</p>}
      </div>
    </div>
  );
}

function InputField({ label, value, onChange, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="block text-xs mb-1 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-3 py-2 rounded text-sm font-mono outline-none" style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--foreground)' }} />
    </div>
  );
}
