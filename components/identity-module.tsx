'use client';

import Image from 'next/image';
import { useState } from 'react';
import { User } from 'lucide-react';

interface IdentityModuleProps {
  profileData?: {
    headshot?: string;
    location?: string;
    email?: string;
    github?: string;
    linkedin?: string;
    title?: string;
    subtitle?: string;
  };
}

export function IdentityModule({ profileData }: IdentityModuleProps) {
  const [imgError, setImgError] = useState(false);
  
  // Get the headshot URL from profile data
  const headshotUrl = profileData?.headshot || '/me.png';
  
  // Use the provided title/subtitle or fallbacks
  const title = profileData?.title || 'Your Name';
  const subtitle = profileData?.subtitle || 'Your Role';
  const location = profileData?.location || 'Location';
  const email = profileData?.email || 'email@example.com';
  const github = profileData?.github || 'https://github.com';
  const linkedin = profileData?.linkedin || 'https://linkedin.com';

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-sm px-2 py-1 rounded" style={{ background: 'var(--accent)', color: '#fff' }}>
          00
        </span>
        <h2 className="text-2xl font-bold" style={{ color: 'var(--heading)' }}>
          Identity Module
        </h2>
      </div>
      
      <div 
        className="backdrop-blur-md rounded-xl p-6 border border-white/10"
        style={{ background: 'var(--card)' }}
      >
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Headshot with CRT filter */}
          <div 
            className="relative w-40 h-40 rounded-xl overflow-hidden flex-shrink-0" 
            style={{ border: '2px solid var(--border)' }}
          >
            {/* Scanline CRT effect overlay */}
            <div 
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 3px)',
                mixBlendMode: 'overlay',
              }}
            />
            
            {!imgError ? (
              <Image
                src={headshotUrl}
                alt={`${title} - Profile`}
                fill
                sizes="160px"
                priority
                unoptimized={true}
                className="object-cover"
                onError={() => setImgError(true)}
                onLoad={() => setImgError(false)}
              />
            ) : (
              <div 
                className="w-full h-full flex items-center justify-center"
                style={{ background: 'var(--surface)' }}
              >
                <User className="w-16 h-16" style={{ color: 'var(--muted)' }} />
              </div>
            )}
          </div>
          
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="font-mono text-sm" style={{ color: 'var(--accent)' }}>
                &gt; whoami --detailed
              </h3>
            </div>
            
            <div>
              <h4 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
                {title}
              </h4>
              <p className="font-mono text-sm mt-1" style={{ color: 'var(--primary)' }}>
                {subtitle}
              </p>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-base">📍</span>
              <span style={{ color: 'var(--text-secondary)' }}>{location}</span>
            </div>

            {/* Interactive Contact Links */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a 
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-mono transition-all duration-200 hover:scale-105"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
              >
                <span>✉️</span>
                <span style={{ color: 'var(--accent)' }}>Email</span>
              </a>
              <a 
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-mono transition-all duration-200 hover:scale-105"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
              >
                <span>🐙</span>
                <span style={{ color: 'var(--foreground)' }}>GitHub</span>
              </a>
              <a 
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-mono transition-all duration-200 hover:scale-105"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
              >
                <span>💼</span>
                <span style={{ color: 'var(--foreground)' }}>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}