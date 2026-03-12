'use client';

import { useEffect, useState } from 'react';
import { projectsService, type Project } from '@/lib/firestore';

const emptyProject: Omit<Project, 'id'> = {
  title: '',
  description: '',
  techStack: [],
  architecture: '',
  healthEndpoint: '',
  span: 'md:col-span-1',
  order: 0,
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<(Project & { isNew?: boolean }) | null>(null);
  const [techInput, setTechInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsub = projectsService.subscribe(setProjects);
    return unsub;
  }, []);

  const startNew = () => {
    setEditing({ ...emptyProject, id: Date.now().toString(), order: projects.length, isNew: true });
    setTechInput('');
  };

  const startEdit = (p: Project) => {
    setEditing({ ...p });
    setTechInput(p.techStack.join(', '));
  };

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    setError('');
    try {
      const { isNew, id, ...data } = editing as Project & { isNew?: boolean };
      void isNew; // used only for UI
      await projectsService.upsert(id, { ...data, techStack: techInput.split(',').map((s) => s.trim()).filter(Boolean) });
      setEditing(null);
    } catch (err) {
      console.error('[projects] save failed:', err);
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    await projectsService.remove(id);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--heading)' }}>Projects</h1>
        <button onClick={startNew} className="px-4 py-2 rounded text-sm" style={{ background: 'var(--accent)', color: '#fff' }}>
          + New Project
        </button>
      </div>

      {/* Editor */}
      {editing && (
        <div className="mb-8 p-6 rounded-lg space-y-4" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Title" value={editing.title} onChange={(v) => setEditing({ ...editing, title: v })} />
            <Field label="Description" value={editing.description} onChange={(v) => setEditing({ ...editing, description: v })} />
            <Field label="Tech Stack (comma-separated)" value={techInput} onChange={setTechInput} />
              <Field label="Architecture Flow (e.g. A -> B -> C)" value={editing.architecture ?? ''} onChange={(v) => setEditing({ ...editing, architecture: v })} />
            <Field label="Health Endpoint" value={editing.healthEndpoint ?? ''} onChange={(v) => setEditing({ ...editing, healthEndpoint: v })} />
            <div>
              <label className="block text-xs mb-1 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Span</label>
              <select
                value={editing.span}
                onChange={(e) => setEditing({ ...editing, span: e.target.value })}
                className="w-full px-3 py-2 rounded text-sm font-mono"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
              >
                <option value="md:col-span-1">1 Column</option>
                <option value="md:col-span-2">2 Columns</option>
              </select>
            </div>
            <Field label="Order" value={String(editing.order)} onChange={(v) => setEditing({ ...editing, order: Number(v) || 0 })} type="number" />
          </div>
          <div className="flex gap-2">
            <button onClick={save} disabled={saving} className="px-4 py-2 rounded text-sm disabled:opacity-50" style={{ background: 'var(--accent)', color: '#fff' }}>
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button onClick={() => setEditing(null)} className="px-4 py-2 rounded text-sm" style={{ color: 'var(--muted)', border: '1px solid var(--border)' }}>
              Cancel
            </button>
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
        </div>
      )}

      {/* List */}
      <div className="space-y-2">
        {projects.map((p) => (
          <div key={p.id} className="flex items-center justify-between px-4 py-3 rounded-lg" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
            <div>
              <span className="font-bold" style={{ color: 'var(--heading)' }}>{p.title}</span>
              <span className="ml-3 text-xs" style={{ color: 'var(--muted)' }}>{p.techStack.join(', ')}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(p)} className="text-xs px-3 py-1 rounded" style={{ color: 'var(--accent)', border: '1px solid var(--border)' }}>Edit</button>
              <button onClick={() => remove(p.id)} className="text-xs px-3 py-1 rounded text-red-400 border border-red-500/20">Delete</button>
            </div>
          </div>
        ))}
        {projects.length === 0 && <p className="text-sm" style={{ color: 'var(--muted)' }}>No projects yet. Click &quot;+ New Project&quot; to add one.</p>}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="block text-xs mb-1 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded text-sm font-mono outline-none"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
      />
    </div>
  );
}
