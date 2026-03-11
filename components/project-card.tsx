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
  const parts = flow.split('→').map(s => s.trim());
  
  return (
    <div className="mt-2 py-4 flex items-center justify-center space-x-2 text-xs font-mono text-blue-400 relative overflow-hidden">
      {parts.map((part, index) => (
        <div key={index} className="flex items-center">
          <div className="px-3 py-1.5 rounded bg-blue-500/10 border border-blue-500/30 flex items-center justify-center relative z-10">
            {part}
          </div>
          {index < parts.length - 1 && (
            <div className="w-8 h-px bg-blue-500/30 relative flex items-center -mx-1 z-0">
              <motion.div 
                className="absolute h-0.5 w-full bg-blue-400/80" 
                style={{ originX: 0 }}
                animate={{ scaleX: [0, 1, 0], x: ['0%', '0%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: index * 0.5 }}
              />
              <div className="absolute right-0 w-2 h-2 border-t border-r border-blue-500/50 transform rotate-45 mr-0.5"></div>
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
      whileHover={{ y: -5, boxShadow: '0 0 20px rgba(16, 185, 129, 0.15)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`group relative bg-gradient-to-br from-slate-950/80 to-slate-900/80 backdrop-blur-md border border-white/10 rounded-lg p-6 hover:border-emerald-500/50 transition-colors overflow-hidden ${className}`}
    >
      {/* Glow highlight effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 opacity-0 group-hover:opacity-100 group-hover:-translate-x-full group-hover:animate-[shimmer_2s_infinite] transition-all duration-700 ease-out z-0 pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-slate-50 group-hover:text-emerald-400 transition-colors">{title}</h3>
            <p className="text-slate-400 text-sm mt-1">{description}</p>
          </div>
        </div>

        {/* Health Status */}
        {healthEndpoint && (
          <div className="mb-4 p-3 bg-slate-900/50 backdrop-blur-sm rounded border border-white/5">
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
              <span className="text-xs font-mono text-slate-300 flex-1">
                System:{' '}
                <span
                  className={
                    health === 'online'
                      ? 'text-emerald-400 font-semibold'
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
          <div className="mb-4 p-4 bg-slate-900/50 backdrop-blur-sm rounded border border-white/5">
            <p className="text-xs text-slate-500 mb-2 font-semibold tracking-wider uppercase">Architecture Flow</p>
            <ArchitectureDiagram flow={architecture} />
          </div>
        )}

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mt-auto pt-2">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs font-mono bg-slate-900/80 text-blue-300 rounded border border-white/5 group-hover:border-emerald-500/30 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
