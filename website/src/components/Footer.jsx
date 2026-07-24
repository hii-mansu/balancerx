import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 py-12 bg-slate-950 text-slate-500 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <img
            src="/himanshu.jpg"
            alt="Himanshu Singh"
            className="w-6 h-6 rounded-lg object-cover border border-cyan-500/40"
          />
          <span className="font-bold text-slate-300">BalancerX</span>
          <span>Open Source HTTP Load Balancer</span>
        </div>
        <div>
          Created by <a href="https://github.com/hii-mansu" target="_blank" rel="noreferrer" className="text-slate-300 hover:text-cyan-400 font-medium">Himanshu Singh</a> • MIT License
        </div>
      </div>
    </footer>
  );
}
