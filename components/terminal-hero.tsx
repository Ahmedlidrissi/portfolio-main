'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

function ScanlineOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden rounded-lg">
      <div 
        className="absolute inset-0 opacity-[0.15]"
        style={{
          background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
          backgroundSize: "100% 4px, 3px 100%"
        }}
      />
    </div>
  );
}

export function TerminalHero() {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [phase, setPhase] = useState<'command' | 'executing' | 'output' | 'interactive'>('command');
  const [isVisible, setIsVisible] = useState(true);
  const [history, setHistory] = useState<string[]>([]);
  const [input, setInput] = useState('');
  
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const commandText = '$ npx execute-developer';
  const initialOutput = `Initializing developer profile...
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
      if (displayText.length < initialOutput.length) {
        timeout = setTimeout(() => {
          setDisplayText(initialOutput.slice(0, displayText.length + 1));
        }, 20);
      } else {
        timeout = setTimeout(() => {
          setPhase('interactive');
        }, 500);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, phase, initialOutput]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (phase === 'interactive') {
      inputRef.current?.focus();
    }
  }, [phase]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      const newHistory = [...history, `$ ${input}`];
      
      switch (cmd) {
        case 'help':
          newHistory.push('Available commands:', '  help     - Show this message', '  clear    - Clear terminal output', '  projects - Scroll to projects section', '  exit     - Close terminal');
          break;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        case 'projects':
          newHistory.push('Scrolling to projects...');
          document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
          break;
        case 'exit':
          setIsVisible(false);
          return;
        case '':
          break;
        default:
          newHistory.push(`Command not found: ${input}. Type 'help' for available commands.`);
      }
      
      setHistory(newHistory);
      setInput('');
    }
  };

  if (!isVisible) return <div className="min-h-screen py-20 flex flex-col items-center justify-center">
    <button 
      onClick={() => setIsVisible(true)} 
      className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-md text-emerald-400 font-mono hover:bg-slate-700 transition"
    >
      &gt; restart_terminal
    </button>
  </div>;

  return (
    <section 
      ref={containerRef}
      className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden"
    >
      <div className="w-full max-w-3xl flex flex-col items-center relative z-10">
        {/* Terminal Container */}
        <motion.div 
          drag 
          dragConstraints={containerRef}
          dragElastic={0.1}
          whileHover={{ scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="w-full relative shadow-2xl shadow-blue-500/10 cursor-move"
        >
          <div className="relative bg-gradient-to-br from-slate-950/80 to-slate-900/80 backdrop-blur-md rounded-lg border border-white/10 overflow-hidden shadow-2xl">
            <ScanlineOverlay />
            
            {/* Terminal Header */}
            <div className="bg-slate-900/50 px-4 py-3 flex items-center gap-2 border-b border-white/5 relative z-20">
              <div className="flex gap-2">
                <button onClick={() => setIsVisible(false)} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition" />
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-xs text-slate-400 ml-2 font-mono" suppressHydrationWarning>terminal - guest@{typeof navigator !== 'undefined' ? (navigator.userAgent.includes('Win') ? 'Windows' : navigator.userAgent.includes('Mac') ? 'macOS' : 'Linux') : 'unknown'}</span>
            </div>

            {/* Terminal Content */}
            <div className="p-6 font-mono text-sm leading-relaxed relative z-20 min-h-[320px] max-h-[500px] overflow-y-auto" onClick={() => inputRef.current?.focus()}>
              <div className="text-slate-500 mb-4" suppressHydrationWarning>
                Last login: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()} on ttys001
              </div>

              {/* Command */}
              {phase !== 'output' && phase !== 'interactive' && (
                <div className="text-emerald-400 mb-4 flex items-center">
                  <span>{displayText}</span>
                  {showCursor && <span className="w-2 h-4 bg-emerald-400 inline-block ml-1 animate-pulse"></span>}
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
              {(phase === 'output' || phase === 'interactive') && (
                <div className="space-y-1">
                  <div className="text-emerald-400">{commandText}</div>
                  <div className="text-slate-300 mt-4 whitespace-pre-wrap">
                    {phase === 'output' ? displayText : initialOutput}
                    {phase === 'output' && displayText.length < initialOutput.length && showCursor && (
                      <span className="w-2 h-4 bg-slate-300 inline-block ml-1"></span>
                    )}
                  </div>
                </div>
              )}

              {/* History */}
              {history.length > 0 && (
                <div className="mt-4 space-y-1">
                  {history.map((line, i) => (
                    <div key={i} className={line.startsWith('$') ? 'text-emerald-400' : 'text-slate-300'}>
                      {line}
                    </div>
                  ))}
                </div>
              )}

              {/* Interactive Input */}
              {phase === 'interactive' && (
                <div className="mt-4 flex items-center text-emerald-400">
                  <span className="mr-2">$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleCommand}
                    className="bg-transparent border-none outline-none flex-1 text-emerald-400 font-mono caret-emerald-400 focus:ring-0"
                    autoFocus
                    spellCheck={false}
                  />
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Hero Description */}
        <div className="mt-12 text-center relative z-10 pointer-events-none">
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
