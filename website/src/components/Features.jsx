import React from 'react';
import { RefreshCw, Activity, Zap, ShieldCheck, Boxes, Lock } from 'lucide-react';

export default function Features() {
  const items = [
    {
      icon: RefreshCw,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      title: 'Dual Load Balancing Algorithms',
      desc: 'Choose between Round-Robin for equal distribution or Least-Connections to route traffic based on active server load.'
    },
    {
      icon: Activity,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      title: 'Proactive Health Monitoring',
      desc: 'Periodic automated HTTP requests to /health endpoints. Unhealthy backend instances are automatically excluded from the pool.'
    },
    {
      icon: Zap,
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
      title: 'Zero Framework Overhead',
      desc: 'Built strictly on top of native node:http module without Express or framework bloat for maximum execution speed.'
    },
    {
      icon: ShieldCheck,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
      title: 'Automatic Failover Retry',
      desc: 'Idempotent HTTP requests (GET, HEAD, OPTIONS) automatically retry on another healthy target if a server fails.'
    },
    {
      icon: Boxes,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      title: 'Docker Container Ready',
      desc: 'Lightweight Alpine Linux based Docker container ready for instant deployment to Docker Hub or any container environment.'
    },
    {
      icon: Lock,
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
      title: 'Graceful Termination',
      desc: 'Captures SIGINT and SIGTERM OS signals to drain active connections before shutting down cleanly.'
    }
  ];

  return (
    <section id="features" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">Core Features</h2>
        <p className="text-3xl sm:text-4xl font-extrabold text-slate-100">Engineered for High Reliability</p>
        <p className="mt-3 text-slate-400">Complete suite of features required from an enterprise-grade HTTP load balancer.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div key={index} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all">
              <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-5 ${item.color}`}>
                <IconComponent className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
