'use client';

import { useEffect, useState } from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  architecture?: string;
  healthEndpoint?: string;
  className?: string;
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
    <div
      className={`bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-blue-500 transition-colors ${className}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-slate-50">{title}</h3>
          <p className="text-slate-400 text-sm mt-1">{description}</p>
        </div>
      </div>

      {/* Health Status */}
      {healthEndpoint && (
        <div className="mb-4 p-3 bg-slate-900 rounded border border-slate-700">
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                health === 'online'
                  ? 'bg-emerald-400 pulse-dot'
                  : health === 'offline'
                    ? 'bg-red-500'
                    : 'bg-slate-500'
              }`}
            ></div>
            <span className="text-xs font-mono text-slate-300">
              System:{' '}
              <span
                className={
                  health === 'online'
                    ? 'text-emerald-400'
                    : health === 'offline'
                      ? 'text-red-400'
                      : 'text-slate-400'
                }
              >
                {health === 'online' ? `Online - ${latency}ms latency` : 'Offline'}
              </span>
            </span>
          </div>
        </div>
      )}

      {/* Architecture Diagram */}
      {architecture && (
        <div className="mb-4 p-3 bg-slate-900 rounded border border-slate-700">
          <p className="text-xs text-slate-400 mb-2">Architecture</p>
          <div className="text-xs font-mono text-blue-400 whitespace-pre-wrap">
            {architecture}
          </div>
        </div>
      )}

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2">
        {techStack.map((tech) => (
          <span
            key={tech}
            className="px-2 py-1 text-xs font-mono bg-slate-700 text-blue-300 rounded border border-slate-600 hover:border-blue-500 transition-colors"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
