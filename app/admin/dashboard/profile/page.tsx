'use client';

import { useEffect, useState } from 'react';
import { profileService, type Profile, type Certification } from '@/lib/firestore';

const defaultProfile: Profile = {
  id: 'main',
  location: '',
  email: '',
  github: '',
  linkedin: '',
  facebook: '',
  instagram: '',
  twitter: '',
  firstName: '',
  lastName: '',
  phone: '',
  headshot: '',
  hobbies: [],
  certifications: [],
};

export default function ProfileAdminPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [form, setForm] = useState<Profile>(defaultProfile);
  const [hobbiesInput, setHobbiesInput] = useState('');
  const [certInput, setCertInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsub = profileService.subscribe((item) => {
      setProfile(item);
      if (item) {
        setForm(item);
        setHobbiesInput(item.hobbies?.join('\n') || '');
        setCertInput(item.certifications?.map(c => `${c.name}|${c.issuer}|${c.year}`).join('\n') || '');
      }
      setLoaded(true);
    });
    return unsub;
  }, []);

  const save = async () => {
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      const hobbies = hobbiesInput.split('\n').map(s => s.trim()).filter(Boolean);
      const certifications = certInput
        .split('\n')
        .map(s => s.trim())
        .filter(Boolean)
        .map((line, idx) => {
          const parts = line.split('|');
          return {
            id: parts[3] || `cert-${Date.now()}-${idx}`,
            name: parts[0] || '',
            issuer: parts[1] || '',
            year: parts[2] || '',
          };
        })
        .filter(c => c.name);
      await profileService.upsert({ ...form, hobbies, certifications });
      setSuccess('Profile saved successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('[profile] save failed:', err);
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (!loaded) {
    return <div className="animate-pulse" style={{ color: 'var(--muted)' }}>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--heading)' }}>Profile Settings</h1>
      <p className="mb-8 text-sm" style={{ color: 'var(--text-secondary)' }}>
        Manage your public profile information, contact links, and personal details.
      </p>

      <div className="space-y-6">
        {/* Contact & Location */}
        <div className="p-6 rounded-lg space-y-4" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
          <h2 className="font-bold text-lg mb-4" style={{ color: 'var(--heading)' }}>Contact & Location</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs mb-1 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>First Name</label>
              <input
                type="text"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                placeholder="John"
                className="w-full px-3 py-2 rounded text-sm font-mono outline-none"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
              />
            </div>
            <div>
              <label className="block text-xs mb-1 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Last Name</label>
              <input
                type="text"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                placeholder="Doe"
                className="w-full px-3 py-2 rounded text-sm font-mono outline-none"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
              />
            </div>
            <div>
              <label className="block text-xs mb-1 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Phone Number</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
                className="w-full px-3 py-2 rounded text-sm font-mono outline-none"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
              />
            </div>
            <div>
              <label className="block text-xs mb-1 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Location</label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="Casablanca, Morocco"
                className="w-full px-3 py-2 rounded text-sm font-mono outline-none"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
              />
            </div>
            <div>
              <label className="block text-xs mb-1 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="hello@example.com"
                className="w-full px-3 py-2 rounded text-sm font-mono outline-none"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
              />
            </div>
            <div>
              <label className="block text-xs mb-1 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>GitHub URL</label>
              <input
                type="url"
                value={form.github}
                onChange={(e) => setForm({ ...form, github: e.target.value })}
                placeholder="https://github.com/username"
                className="w-full px-3 py-2 rounded text-sm font-mono outline-none"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
              />
            </div>
            <div>
              <label className="block text-xs mb-1 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>LinkedIn URL</label>
              <input
                type="url"
                value={form.linkedin}
                onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                placeholder="https://linkedin.com/in/username"
                className="w-full px-3 py-2 rounded text-sm font-mono outline-none"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
              />
            </div>
            <div>
              <label className="block text-xs mb-1 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Facebook URL</label>
              <input
                type="url"
                value={form.facebook || '' }
                onChange={(e) => setForm({ ...form, facebook: e.target.value })}
                placeholder="https://facebook.com/username"
                className="w-full px-3 py-2 rounded text-sm font-mono outline-none"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
              />
            </div>
            <div>
              <label className="block text-xs mb-1 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Instagram URL</label>
              <input
                type="url"
                value={form.instagram || ''}
                onChange={(e) => setForm({ ...form, instagram: e.target.value })}
                placeholder="https://instagram.com/username"
                className="w-full px-3 py-2 rounded text-sm font-mono outline-none"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
              />
            </div>
            <div>
              <label className="block text-xs mb-1 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Twitter (X) URL</label>
              <input
                type="url"
                value={form.twitter || ''}
                onChange={(e) => setForm({ ...form, twitter: e.target.value })}
                placeholder="https://twitter.com/username"
                className="w-full px-3 py-2 rounded text-sm font-mono outline-none"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs mb-1 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>Headshot URL</label>
              <input
                type="url"
                value={form.headshot || ''}
                onChange={(e) => setForm({ ...form, headshot: e.target.value })}
                placeholder="/headshot.jpg"
                className="w-full px-3 py-2 rounded text-sm font-mono outline-none"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
              />
            </div>
          </div>
        </div>

        {/* Hobbies */}
        <div className="p-6 rounded-lg space-y-4" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
          <h2 className="font-bold text-lg mb-4" style={{ color: 'var(--heading)' }}>Personal Hobbies</h2>
          <p className="text-xs" style={{ color: 'var(--muted)' }}>Enter one hobby per line</p>
          
          <textarea
            value={hobbiesInput}
            onChange={(e) => setHobbiesInput(e.target.value)}
            rows={5}
            placeholder="Gaming&#10;Open Source Hardware&#10;Hiking"
            className="w-full px-3 py-2 rounded text-sm font-mono outline-none resize-y"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
          />
        </div>

        {/* Certifications */}
        <div className="p-6 rounded-lg space-y-4" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
          <h2 className="font-bold text-lg mb-4" style={{ color: 'var(--heading)' }}>Certifications</h2>
          <p className="text-xs" style={{ color: 'var(--muted)' }}>Format: Name | Issuer | Year (one per line)</p>
          
          <textarea
            value={certInput}
            onChange={(e) => setCertInput(e.target.value)}
            rows={5}
            placeholder="AWS Solutions Architect Associate | Amazon Web Services | 2024&#10;Meta Full-Stack Developer Certificate | Meta | 2023"
            className="w-full px-3 py-2 rounded text-sm font-mono outline-none resize-y"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={save}
            disabled={saving}
            className="px-4 py-2 rounded text-sm disabled:opacity-50"
            style={{ background: 'var(--accent)', color: '#fff' }}
          >
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
          
          {error && <p className="text-sm text-red-400">{error}</p>}
          {success && <p className="text-sm text-green-400">{success}</p>}
        </div>

        {/* Preview */}
        {profile && (
          <div className="mt-8 p-6 rounded-lg" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
            <h2 className="font-bold text-lg mb-4" style={{ color: 'var(--heading)' }}>Current Profile Preview</h2>
            <pre className="text-xs font-mono overflow-auto" style={{ color: 'var(--text-secondary)' }}>
              {JSON.stringify(profile, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  ); 
}