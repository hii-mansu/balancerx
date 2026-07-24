import React, { useState, useEffect } from 'react';
import { Zap, Server, Play, Pause, RefreshCw } from 'lucide-react';

export default function Simulator() {
  const [running, setRunning] = useState(true);
  const [algorithm, setAlgorithm] = useState('least-connections');
  const [requestCount, setRequestCount] = useState(1280);
  const [lastRouted, setLastRouted] = useState('http://localhost:5001');
  const [rrIndex, setRrIndex] = useState(0);

  const [servers, setServers] = useState([
    { id: 1, url: 'http://localhost:5001', name: 'Backend Alpha', connections: 2, status: 'healthy', totalReqs: 430 },
    { id: 2, url: 'http://localhost:5002', name: 'Backend Beta', connections: 1, status: 'healthy', totalReqs: 460 },
    { id: 3, url: 'http://localhost:5003', name: 'Backend Gamma', connections: 3, status: 'healthy', totalReqs: 390 }
  ]);

  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => {
      setRequestCount(prev => prev + 1);

      setServers(prevList => {
        const healthyList = prevList.filter(s => s.status === 'healthy');
        if (healthyList.length === 0) return prevList;

        let targetId;
        if (algorithm === 'round-robin') {
          const target = healthyList[rrIndex % healthyList.length];
          targetId = target.id;
          setLastRouted(target.url);
          setRrIndex(idx => (idx + 1) % healthyList.length);
        } else {
          const sorted = [...healthyList].sort((a, b) => a.connections - b.connections);
          const target = sorted[0];
          targetId = target.id;
          setLastRouted(target.url);
        }

        return prevList.map(item => {
          if (item.id === targetId) {
            return {
              ...item,
              connections: Math.min(12, item.connections + 1),
              totalReqs: item.totalReqs + 1
            };
          }
          if (Math.random() > 0.4 && item.connections > 0) {
            return { ...item, connections: item.connections - 1 };
          }
          return item;
        });
      });
    }, 1200);

    return () => clearInterval(timer);
  }, [running, algorithm, rrIndex]);

  const toggleHealth = (id) => {
    setServers(prev => prev.map(s => s.id === id ? { ...s, status: s.status === 'healthy' ? 'unhealthy' : 'healthy' } : s));
  };

  return (
    <section id="demo" className="py-16 bg-slate-900/50 border-y border-slate-800/80 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">Live Interactive Demo</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">Real-Time Load Balancing Simulator</h2>
            <p className="text-slate-400 text-sm mt-1">Simulate request forwarding and target health state changes live.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center">
              <button
                onClick={() => setAlgorithm('least-connections')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${algorithm === 'least-connections' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Least-Connections
              </button>
              <button
                onClick={() => setAlgorithm('round-robin')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${algorithm === 'round-robin' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Round-Robin
              </button>
            </div>

            <button
              onClick={() => setRunning(!running)}
              className="px-3.5 py-2 rounded-xl text-xs font-medium border flex items-center gap-1.5 bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800"
            >
              {running ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{running ? 'Pause' : 'Resume'}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-100">BalancerX Engine</h3>
                  <p className="text-xs text-slate-400">Strategy: <span className="text-cyan-400 font-semibold uppercase">{algorithm}</span></p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-500">Processed Requests</div>
                  <div className="text-2xl font-bold text-slate-100 font-mono mt-0.5">{requestCount}</div>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-500">Port Listening</div>
                  <div className="text-2xl font-bold text-cyan-400 font-mono mt-0.5">5000</div>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs font-mono">
                <div className="text-slate-500 mb-1 flex items-center justify-between">
                  <span>Last Forwarded Request:</span>
                  <span className="text-emerald-400">200 OK</span>
                </div>
                <div className="text-cyan-300 truncate">
                  GET /api/data → <span className="text-white font-bold">{lastRouted}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-500 flex items-center justify-between">
              <span>Health Check: 5000ms</span>
              <span>Status: Active</span>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            {servers.map(server => (
              <div
                key={server.id}
                className={`bg-slate-950 border rounded-2xl p-5 ${server.status === 'healthy' ? 'border-slate-800' : 'border-rose-900/50 bg-rose-950/10'}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${server.status === 'healthy' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                      <Server className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-slate-100">{server.name}</h4>
                        <span className="text-xs font-mono text-slate-400">({server.url})</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                        <span>Connections: <strong className="text-cyan-400 font-mono">{server.connections}</strong></span>
                        <span>Total Reqs: <strong className="text-slate-300 font-mono">{server.totalReqs}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${server.status === 'healthy' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}>
                      {server.status === 'healthy' ? 'HEALTHY' : 'UNHEALTHY'}
                    </span>
                    <button
                      onClick={() => toggleHealth(server.id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 transition-all"
                    >
                      Toggle
                    </button>
                  </div>
                </div>

                <div className="mt-4 bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${server.status === 'healthy' ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-rose-500'}`}
                    style={{ width: `${Math.min(100, (server.connections / 12) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
