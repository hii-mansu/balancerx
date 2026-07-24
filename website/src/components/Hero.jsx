import React, { useState } from 'react';
import { Cpu, Copy, Check, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const cmd = "docker run -d -p 3000:3000 -e PORT=3000 -v ./config.yaml:/app/config.yaml mansu217/balancerx";

  const handleCopy = () => {
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="pt-16 pb-20 md:pt-24 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs sm:text-sm font-medium mb-8">
        <Cpu className="w-4 h-4" />
        <span>Built from scratch with zero framework dependencies in Pure Node.js</span>
      </div>

      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-100 max-w-4xl mx-auto leading-tight">
        High-Performance HTTP Load Balancer in <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">Pure Node.js</span>
      </h1>

      <p className="mt-6 text-base sm:text-xl text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
        Distribute traffic, maximize uptime, and automate health checks with zero external framework overhead. Run seamlessly via Docker or direct cloning.
      </p>

      <div className="mt-10 max-w-2xl mx-auto">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 shadow-2xl flex items-center justify-between gap-3 text-left font-mono text-xs sm:text-sm text-slate-300 overflow-hidden">
          <div className="flex items-center gap-2 min-w-0 overflow-x-auto py-1">
            <span className="text-cyan-400 font-bold">$</span>
            <span className="truncate">{cmd}</span>
          </div>
          <button
            onClick={handleCopy}
            className="shrink-0 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center gap-1.5 text-xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Docker Hub Ready</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Standalone Executable</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> MIT Licensed</span>
        </div>
      </div>
    </section>
  );
}
