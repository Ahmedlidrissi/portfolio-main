'use client';

import { useEffect, useState } from 'react';

export function TerminalHero() {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [phase, setPhase] = useState<'command' | 'executing' | 'output'>('command');

  const commandText = '$ npx execute-developer';
  const outputText = `Initializing developer profile...
✓ Loading expertise matrix
✓ Compiling project history
✓ Syncing innovation timeline

Ready to collaborate on next-generation solutions.`;

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (phase === 'command') {
      if (displayText.length < commandText.length) {
        timeout = setTimeout(() => {
          setDisplayText(commandText.slice(0, displayText.length + 1));
        }, 50);
      } else {
        timeout = setTimeout(() => {
          setPhase('executing');
        }, 800);
      }
    } else if (phase === 'executing') {
      timeout = setTimeout(() => {
        setPhase('output');
        setDisplayText('');
      }, 1200);
    } else if (phase === 'output') {
      if (displayText.length < outputText.length) {
        timeout = setTimeout(() => {
          setDisplayText(outputText.slice(0, displayText.length + 1));
        }, 20);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, phase]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-3xl">
        {/* Terminal Container */}
        <div className="bg-slate-900 rounded-lg border border-slate-700 overflow-hidden shadow-2xl">
          {/* Terminal Header */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-4 py-3 flex items-center gap-2 border-b border-slate-700">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-xs text-slate-400 ml-2 font-mono">terminal</span>
          </div>

          {/* Terminal Content */}
          <div className="p-6 font-mono text-sm leading-relaxed">
            {/* Command */}
            {phase !== 'output' && (
              <div className="text-emerald-400 mb-4">
                {displayText}
                {showCursor && <span className="cursor">_</span>}
              </div>
            )}

            {/* Executing State */}
            {phase === 'executing' && (
              <div className="text-blue-400 flex items-center gap-2 mb-4">
                <span className="inline-block w-2 h-2 bg-blue-400 animate-pulse"></span>
                Executing...
              </div>
            )}

            {/* Output */}
            {phase === 'output' && (
              <div className="space-y-1">
                <div className="text-emerald-400">{commandText}</div>
                <div className="text-slate-300 mt-4 whitespace-pre-wrap">
                  {displayText}
                  {displayText.length < outputText.length && showCursor && (
                    <span className="cursor">_</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Hero Description */}
        <div className="mt-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-50 mb-4">
            Full Stack Developer
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Crafting elegant solutions to complex problems. Specializing in cloud-native
            architectures, microservices, and modern web technologies.
          </p>
        </div>
      </div>
    </section>
  );
}
