import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <img
            src="/himanshu.jpg"
            alt="Himanshu Singh"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl object-cover border border-cyan-500/40 shadow-lg shadow-cyan-500/20 shrink-0"
          />
          <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent truncate">
            BalancerX
          </span>
          <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-medium shrink-0">
            v1.0.0
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#features" className="hover:text-cyan-400 transition-colors">Features</a>
          <a href="#architecture" className="hover:text-cyan-400 transition-colors">Architecture</a>
          <a href="#docs" className="hover:text-cyan-400 transition-colors">Documentation</a>
          <a href="#creator" className="hover:text-cyan-400 transition-colors">Creator</a>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com/hii-mansu/balancerx"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 text-sm font-medium rounded-lg bg-slate-900 border border-slate-700 text-slate-200 hover:bg-slate-800 transition-all flex items-center gap-2"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <span>GitHub</span>
          </a>
          <a
            href="#docs"
            className="px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 transition-all shadow-md shadow-cyan-500/20"
          >
            Get Started
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation menu"
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 focus:outline-none"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-lg border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <a href="#features" onClick={() => setOpen(false)} className="block py-2 text-slate-200 hover:text-cyan-400 font-medium text-sm border-b border-slate-800/50">Features</a>
          <a href="#architecture" onClick={() => setOpen(false)} className="block py-2 text-slate-200 hover:text-cyan-400 font-medium text-sm border-b border-slate-800/50">Architecture</a>
          <a href="#docs" onClick={() => setOpen(false)} className="block py-2 text-slate-200 hover:text-cyan-400 font-medium text-sm border-b border-slate-800/50">Documentation</a>
          <a href="#creator" onClick={() => setOpen(false)} className="block py-2 text-slate-200 hover:text-cyan-400 font-medium text-sm border-b border-slate-800/50">Creator</a>
          <div className="pt-2 flex flex-col gap-2">
            <a
              href="https://github.com/hii-mansu/balancerx"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 px-4 text-center rounded-lg bg-slate-800 text-slate-200 border border-slate-700 flex items-center justify-center gap-2 text-sm font-medium"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span>GitHub Repository</span>
            </a>
            <a
              href="#docs"
              onClick={() => setOpen(false)}
              className="w-full py-2.5 px-4 text-center rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium shadow-md"
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

