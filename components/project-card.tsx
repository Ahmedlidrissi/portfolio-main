'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  architecture?: string;
  healthEndpoint?: string;
  className?: string;
}

// Simple Architecture diagram using SVG
function ArchitectureDiagram({ flow }: { flow: string }) {
  // Support both the unicode arrow and standard hyphen-greater-than syntax
  const parts = flow.split(/→|->/).map(s => s.trim());
  
  return (
    <div className="mt-2 py-4 flex items-center justify-center space-x-2 text-xs font-mono relative overflow-hidden" style={{ color: 'var(--primary)' }}>
      {parts.map((part, index) => (
        <div key={index} className="flex items-center">
          <div className="px-3 py-1.5 rounded flex items-center justify-center relative z-10" style={{ background: 'color-mix(in srgb, var(--primary) 10%, transparent)', border: '1px solid color-mix(in srgb, var(--primary) 30%, transparent)' }}>
            {part}
          </div>
          {index < parts.length - 1 && (
            <div className="w-8 h-px relative flex items-center -mx-1 z-0" style={{ background: 'color-mix(in srgb, var(--primary) 30%, transparent)' }}>
              <motion.div 
                className="absolute h-0.5 w-full" 
                style={{ originX: 0, background: 'color-mix(in srgb, var(--primary) 80%, transparent)' }}
                animate={{ scaleX: [0, 1, 0], x: ['0%', '0%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: index * 0.5 }}
              />
              <div className="absolute right-0 w-2 h-2 transform rotate-45 mr-0.5" style={{ borderTop: '1px solid color-mix(in srgb, var(--primary) 50%, transparent)', borderRight: '1px solid color-mix(in srgb, var(--primary) 50%, transparent)' }}></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function ProjectCard({
  title,
  description,
  techStack,
  architecture,
  healthEndpoint,
  className = '',
}: ProjectCardProps) {
  const [health, setHealth] = useState<'online' | 'offline' | 'loading'>('loading');
  const [latency, setLatency] = useState(0);

  useEffect(() => {
    if (!healthEndpoint) return;

    const checkHealth = async () => {
      try {
        const start = performance.now();
        const response = await fetch(healthEndpoint, { method: 'HEAD' });
        const end = performance.now();

        if (response.ok) {
          setHealth('online');
          setLatency(Math.round(end - start));
        } else {
          setHealth('offline');
        }
      } catch {
        setHealth('offline');
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, [healthEndpoint]);

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 0 20px color-mix(in srgb, var(--accent) 15%, transparent)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`group relative backdrop-blur-md rounded-lg p-6 transition-colors overflow-hidden ${className}`}
      style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
    >
      {/* Glow highlight effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:-translate-x-full group-hover:animate-[shimmer_2s_infinite] transition-all duration-700 ease-out z-0 pointer-events-none" style={{ background: 'linear-gradient(to right, transparent, color-mix(in srgb, var(--accent) 10%, transparent), transparent)' }} />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold transition-colors" style={{ color: 'var(--heading)' }}>{title}</h3>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{description}</p>
          </div>
        </div>

        {/* Health Status */}
        {healthEndpoint && (
          <div className="mb-4 p-3 backdrop-blur-sm rounded" style={{ background: 'var(--badge-bg)', border: '1px solid var(--border)' }}>
            <div className="flex items-center gap-2">
              {health === 'online' ? (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              ) : (
                <div
                  className={`w-2 h-2 rounded-full ${
                    health === 'offline' ? 'bg-red-500' : 'bg-slate-500'
                  }`}
                />
              )}
              <span className="text-xs font-mono flex-1" style={{ color: 'var(--foreground)' }}>
                System:{' '}
                <span
                  style={{ color: health === 'online' ? 'var(--accent)' : health === 'offline' ? '#ef4444' : 'var(--muted)' }}
                  className={health === 'online' ? 'font-semibold' : ''}
                >
                  {health === 'online' ? `Online - ${latency}ms latency` : 'Offline'}
                </span>
              </span>
            </div>
          </div>
        )}

        {/* Architecture Diagram */}
        {architecture && (
          <div className="mb-4 p-4 backdrop-blur-sm rounded" style={{ background: 'var(--badge-bg)', border: '1px solid var(--border)' }}>
            <p className="text-xs mb-2 font-semibold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>Architecture Flow</p>
            <ArchitectureDiagram flow={architecture} />
          </div>
        )}

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mt-auto pt-2">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs font-mono rounded transition-colors"
              style={{ background: 'var(--badge-bg)', border: '1px solid var(--border)', color: 'var(--primary)' }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
