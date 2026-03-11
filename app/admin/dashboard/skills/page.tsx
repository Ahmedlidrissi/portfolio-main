'use client';

import { useEffect, useState } from 'react';
import { skillsService, type Skill } from '@/lib/firestore';

const emptySkill: Omit<Skill, 'id'> = { label: '', skills: [], order: 0 };

export default function SkillsPage() {
  const [groups, setGroups] = useState<Skill[]>([]);
  const [editing, setEditing] = useState<(Skill & { isNew?: boolean }) | null>(null);
  const [skillsInput, setSkillsInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsub = skillsService.subscribe(setGroups);
    return unsub;
  }, []);

  const startNew = () => {
    setEditing({ ...emptySkill, id: crypto.randomUUID(), order: groups.length, isNew: true });
    setSkillsInput('');
  };

  const startEdit = (s: Skill) => {
    setEditing({ ...s });
    setSkillsInput(s.skills.join(', '));
  };

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    setError('');
    try {
      const { isNew, id, ...data } = editing as Skill & { isNew?: boolean };
      void isNew;
      await skillsService.upsert(id, { ...data, skills: skillsInput.split(',').map((s) => s.trim()).filter(Boolean) });
      setEditing(null);
    } catch (err) {
      console.error('[skills] save failed:', err);
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--heading)' }}>Skills</h1>
        <button onClick={startNew} className="px-4 py-2 rounded text-sm" style={{ background: 'var(--accent)', color: '#fff' }}>
          + New Group
        </button>
      </div>

      {editing && (
        <div className="mb-8 p-6 rounded-lg space-y-4" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs mb-1 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Group Label</label>
              <input value={editing.label} onChange={(e) => setEditing({ ...editing, label: e.target.value })} className="w-full px-3 py-2 rounded text-sm font-mono outline-none" style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--foreground)' }} />
            </div>
            <div>
              <label className="block text-xs mb-1 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Skills (comma-separated)</label>
              <input value={skillsInput} onChange={(e) => setSkillsInput(e.target.value)} className="w-full px-3 py-2 rounded text-sm font-mono outline-none" style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--foreground)' }} />
            </div>
            <div>
              <label className="block text-xs mb-1 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Order</label>
              <input type="number" value={editing.order} onChange={(e) => setEditing({ ...editing, order: Number(e.target.value) || 0 })} className="w-full px-3 py-2 rounded text-sm font-mono outline-none" style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--foreground)' }} />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={save} disabled={saving} className="px-4 py-2 rounded text-sm disabled:opacity-50" style={{ background: 'var(--accent)', color: '#fff' }}>{saving ? 'Saving...' : 'Save'}</button>
            <button onClick={() => setEditing(null)} className="px-4 py-2 rounded text-sm" style={{ color: 'var(--muted)', border: '1px solid var(--border)' }}>Cancel</button>
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
        </div>
      )}

      <div className="space-y-2">
        {groups.map((g) => (
          <div key={g.id} className="flex items-center justify-between px-4 py-3 rounded-lg" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
            <div>
              <span className="font-bold" style={{ color: 'var(--heading)' }}>{g.label}</span>
              <span className="ml-3 text-xs" style={{ color: 'var(--muted)' }}>{g.skills.join(', ')}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(g)} className="text-xs px-3 py-1 rounded" style={{ color: 'var(--accent)', border: '1px solid var(--border)' }}>Edit</button>
              <button onClick={() => skillsService.remove(g.id)} className="text-xs px-3 py-1 rounded text-red-400 border border-red-500/20">Delete</button>
            </div>
          </div>
        ))}
        {groups.length === 0 && <p className="text-sm" style={{ color: 'var(--muted)' }}>No skill groups yet.</p>}
      </div>
    </div>
  );
}
