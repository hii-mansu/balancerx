import React, { useState, useEffect } from 'react';
import { 
  Server, 
  Cpu, 
  Activity, 
  ShieldCheck, 
  Terminal, 
  Copy, 
  Check, 
  Github, 
  Layers, 
  Zap, 
  RefreshCw, 
  CheckCircle2, 
  ArrowRight, 
  FileCode, 
  BookOpen, 
  ExternalLink, 
  Menu, 
  X,
  Code2,
  Boxes,
  Lock,
  GitBranch,
  Play
} from 'lucide-react';

export default function App() {
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [activeTab, setActiveTab] = useState('clone');
  const [selectedAlgo, setSelectedAlgo] = useState('least-connections');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Real-time Interactive Load Balancer Simulator state
  const [simRunning, setSimRunning] = useState(true);
  const [requestCount, setRequestCount] = useState(1420);
  const [lastRoutedTarget, setLastRoutedTarget] = useState('http://localhost:5001');
  const [rrIndex, setRrIndex] = useState(0);

  const [servers, setServers] = useState([
    { id: 1, url: 'http://localhost:5001', name: 'Backend Alpha', connections: 2, status: 'healthy', reqs: 480 },
    { id: 2, url: 'http://localhost:5002', name: 'Backend Beta', connections: 1, status: 'healthy', reqs: 510 },
    { id: 3, url: 'http://localhost:5003', name: 'Backend Gamma', connections: 4, status: 'healthy', reqs: 430 }
  ]);

  const dockerCommand = "docker run -d -p 3000:3000 -e PORT=3000 -v ./config.yaml:/app/config.yaml hii-mansu/balancerx";
  const cloneCommand = "git clone https://github.com/hii-mansu/balancerx.git && cd balancerx/app && npm install && npm run dev";

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  // Simulation Loop
  useEffect(() => {
    if (!simRunning) return;
    const interval = setInterval(() => {
      setRequestCount(prev => prev + 1);

      setServers(prevServers => {
        const healthyServers = prevServers.filter(s => s.status === 'healthy');
        if (healthyServers.length === 0) return prevServers;

        let targetId;
        if (selectedAlgo === 'round-robin') {
          const target = healthyServers[rrIndex % healthyServers.length];
          targetId = target.id;
          setLastRoutedTarget(target.url);
          setRrIndex(idx => (idx + 1) % healthyServers.length);
        } else {
          // Least Connections
          const sorted = [...healthyServers].sort((a, b) => a.connections - b.connections);
          const target = sorted[0];
          targetId = target.id;
          setLastRoutedTarget(target.url);
        }

        return prevServers.map(s => {
          if (s.id === targetId) {
            return {
              ...s,
              connections: Math.min(15, s.connections + 1),
              reqs: s.reqs + 1
            };
          }
          // Randomly complete connection
          if (Math.random() > 0.4 && s.connections > 0) {
            return { ...s, connections: s.connections - 1 };
          }
          return s;
        });
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [simRunning, selectedAlgo, rrIndex]);

  const toggleServerHealth = (id) => {
    setServers(prev => prev.map(s => s.id === id ? { ...s, status: s.status === 'healthy' ? 'unhealthy' : 'healthy' } : s));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Background Glow Overlay */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute top-1/3 -right-40 w-[30rem] h-[30rem] bg-indigo-600/15 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute -bottom-40 left-1/3 w-[32rem] h-[32rem] bg-blue-600/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-25" />
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">
                BalancerX
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-medium">
                v1.0.0
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-cyan-400 transition-colors">Features</a>
            <a href="#demo" className="hover:text-cyan-400 transition-colors">Live Simulation</a>
            <a href="#architecture" className="hover:text-cyan-400 transition-colors">Architecture</a>
            <a href="#docs" className="hover:text-cyan-400 transition-colors">Documentation</a>
            <a href="#creator" className="hover:text-cyan-400 transition-colors">Creator</a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a 
              href="https://github.com/hii-mansu/balancerx" 
              target="_blank" 
              rel="noreferrer"
              className="px-4 py-2 text-sm font-medium rounded-lg bg-slate-900 border border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-slate-600 transition-all flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a 
              href="#docs" 
              className="px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 transition-all shadow-md shadow-cyan-500/20 flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Get Started</span>
            </a>
          </div>

          {/* Mobile menu trigger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900/95 border-b border-slate-800 px-4 pt-2 pb-6 space-y-3">
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-300 hover:text-cyan-400">Features</a>
            <a href="#demo" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-300 hover:text-cyan-400">Live Simulation</a>
            <a href="#architecture" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-300 hover:text-cyan-400">Architecture</a>
            <a href="#docs" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-300 hover:text-cyan-400">Documentation</a>
            <a href="#creator" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-300 hover:text-cyan-400">Creator</a>
            <div className="pt-2 flex flex-col gap-2">
              <a 
                href="https://github.com/hii-mansu/balancerx" 
                target="_blank" 
                rel="noreferrer"
                className="w-full py-2.5 px-4 text-center rounded-lg bg-slate-800 text-slate-200 border border-slate-700 flex items-center justify-center gap-2"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repository</span>
              </a>
            </div>
          </div>
        )}
      </header>

      <main className="relative z-10">

        {/* Hero Section */}
        <section className="pt-16 pb-20 md:pt-24 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs sm:text-sm font-medium mb-8">
            <Cpu className="w-4 h-4 animate-pulse" />
            <span>Built from scratch with zero framework dependencies (Pure Node.js)</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-100 max-w-4xl mx-auto leading-tight">
            High-Performance HTTP Load Balancer in <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">Pure Node.js</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
            Distribute traffic, maximize uptime, and automate server health checks with zero external framework overhead. Designed for seamless execution via Docker or direct cloning.
          </p>

          {/* Quick Terminal Copy Bar */}
          <div className="mt-10 max-w-2xl mx-auto">
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 shadow-2xl flex items-center justify-between gap-3 text-left font-mono text-xs sm:text-sm text-slate-300 overflow-hidden group hover:border-slate-700 transition-all">
              <div className="flex items-center gap-2 min-w-0 overflow-x-auto scrollbar-none py-1">
                <span className="text-cyan-400 font-bold">$</span>
                <span className="truncate">{dockerCommand}</span>
              </div>
              <button 
                onClick={() => copyToClipboard(dockerCommand)}
                className="shrink-0 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center gap-1.5 text-xs"
              >
                {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCmd ? 'Copied!' : 'Copy Docker Run'}</span>
              </button>
            </div>
            <div className="mt-3 flex items-center justify-center gap-6 text-xs text-slate-500">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Docker Hub Ready</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Standalone Executable</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> MIT Licensed</span>
            </div>
          </div>
        </section>

        {/* Live Interactive Simulator Section */}
        <section id="demo" className="py-16 bg-slate-900/50 border-y border-slate-800/80 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <div className="text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">Live Interactive Demo</div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">Real-Time Load Balancing Simulator</h2>
                <p className="text-slate-400 text-sm mt-1">Watch how BalancerX dynamically routes requests and handles target health changes.</p>
              </div>

              {/* Controls */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center">
                  <button 
                    onClick={() => setSelectedAlgo('least-connections')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${selectedAlgo === 'least-connections' ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20' : 'text-slate-400 hover:text-slate-200'}`}
                  >
                    Least-Connections
                  </button>
                  <button 
                    onClick={() => setSelectedAlgo('round-robin')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${selectedAlgo === 'round-robin' ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20' : 'text-slate-400 hover:text-slate-200'}`}
                  >
                    Round-Robin
                  </button>
                </div>

                <button 
                  onClick={() => setSimRunning(!simRunning)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-all ${simRunning ? 'bg-amber-500/10 border-amber-500/20 text-amber-400 hover:bg-amber-500/20' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20'}`}
                >
                  <Play className={`w-3.5 h-3.5 ${simRunning ? 'animate-spin' : ''}`} />
                  <span>{simRunning ? 'Pause Simulator' : 'Resume Simulator'}</span>
                </button>
              </div>
            </div>

            {/* Visual Simulator Canvas */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* BalancerX Core Node */}
              <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 p-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    Listening on PORT 5000
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                      <Zap className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-100">BalancerX Engine</h3>
                      <p className="text-xs text-slate-400">Algorithm: <span className="text-cyan-400 font-semibold uppercase">{selectedAlgo}</span></p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800/80">
                      <div className="text-xs text-slate-500">Total Processed</div>
                      <div className="text-2xl font-bold text-slate-100 font-mono mt-0.5">{requestCount.toLocaleString()}</div>
                    </div>
                    <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800/80">
                      <div className="text-xs text-slate-500">Active Retries</div>
                      <div className="text-2xl font-bold text-cyan-400 font-mono mt-0.5">AUTO</div>
                    </div>
                  </div>

                  <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 text-xs font-mono">
                    <div className="text-slate-500 mb-1 flex items-center justify-between">
                      <span>Latest Forwarded Request:</span>
                      <span className="text-emerald-400">200 OK</span>
                    </div>
                    <div className="text-cyan-300 truncate">
                      GET /api/v1/resource → <span className="text-white font-bold">{lastRoutedTarget}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-500 flex items-center justify-between">
                  <span>Health Check Interval: 5000ms</span>
                  <span>Safe Retry: Enabled</span>
                </div>
              </div>

              {/* Target Servers List */}
              <div className="lg:col-span-7 space-y-4">
                {servers.map(server => (
                  <div 
                    key={server.id}
                    className={`bg-slate-950 border rounded-2xl p-5 transition-all relative overflow-hidden ${server.status === 'healthy' ? 'border-slate-800 hover:border-slate-700' : 'border-rose-900/40 bg-rose-950/10'}`}
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
                            <span>Active Conns: <strong className="text-cyan-400 font-mono">{server.connections}</strong></span>
                            <span>•</span>
                            <span>Total Requests: <strong className="text-slate-300 font-mono">{server.reqs}</strong></span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${server.status === 'healthy' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}>
                          {server.status === 'healthy' ? 'HEALTHY' : 'UNHEALTHY'}
                        </span>
                        
                        <button 
                          onClick={() => toggleServerHealth(server.id)}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 transition-all"
                        >
                          Toggle Health
                        </button>
                      </div>
                    </div>

                    {/* Progress Bar for Active Load */}
                    <div className="mt-4 bg-slate-900 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ${server.status === 'healthy' ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-rose-500'}`}
                        style={{ width: `${Math.min(100, (server.connections / 15) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* Feature Highlights Grid */}
        <section id="features" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">Core Capabilities</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-100">Engineered for Reliability & Speed</p>
            <p className="mt-3 text-slate-400">Everything you need from a modern HTTP reverse proxy load balancer, built with precision.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <RefreshCw className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">Dual Balancing Algorithms</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Choose between classic <strong>Round-Robin</strong> for uniform worker pools or <strong>Least-Connections</strong> to automatically balance servers under variable heavy workloads.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">Proactive Health Checking</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Periodic automated HTTP pings to target <code className="text-cyan-300">/health</code> endpoints. Unhealthy instances are instantly removed and restored upon recovery.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">Zero Framework Overhead</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Built strictly on native Node.js <code className="text-cyan-300">node:http</code> module. No Express or middleware overhead guarantees ultra-low latency request proxying.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">Automatic Retry Mechanism</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Safe HTTP requests (GET, HEAD, OPTIONS) automatically failover to alternate healthy targets if a target unexpectedly crashes during execution.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Boxes className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">Docker Container Ready</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Containerized with lightweight Alpine Linux base. Easily deployable to Docker Hub or any container runtime with volume-mounted <code className="text-cyan-300">config.yaml</code>.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">Graceful Shutdown</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Handles SIGINT and SIGTERM signals gracefully by pausing new incoming traffic and completing in-flight HTTP transactions before exiting.
              </p>
            </div>

          </div>
        </section>

        {/* Architecture Section */}
        <section id="architecture" className="py-20 bg-slate-900/40 border-t border-slate-800/80 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">Under The Hood</h2>
              <p className="text-3xl sm:text-4xl font-extrabold text-slate-100">Modular Modular Design</p>
              <p className="mt-3 text-slate-400">Clean separation of concerns designed for transparency and maintainability.</p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 md:p-10 shadow-2xl font-mono text-xs sm:text-sm text-slate-300">
              <div className="text-slate-500 mb-4">// BalancerX Component Flow Breakdown</div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <div className="text-cyan-400 font-bold mb-1">1. HTTP Listener</div>
                  <div className="text-slate-400 text-xs font-sans">app.js & server.js</div>
                  <div className="text-slate-500 text-[10px] mt-2">Receives incoming connections on PORT</div>
                </div>

                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <div className="text-teal-400 font-bold mb-1">2. Target Selector</div>
                  <div className="text-slate-400 text-xs font-sans">selectTarget.js</div>
                  <div className="text-slate-500 text-[10px] mt-2">Filters healthy servers & applies algorithm</div>
                </div>

                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <div className="text-indigo-400 font-bold mb-1">3. Reverse Proxy</div>
                  <div className="text-slate-400 text-xs font-sans">proxy.js</div>
                  <div className="text-slate-500 text-[10px] mt-2">Pipes request/response streams cleanly</div>
                </div>

                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <div className="text-emerald-400 font-bold mb-1">4. Health Store</div>
                  <div className="text-slate-400 text-xs font-sans">healthChecker.js</div>
                  <div className="text-slate-500 text-[10px] mt-2">Continuous background status polling</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Documentation Section */}
        <section id="docs" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">Documentation & Setup</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-100">Get Up & Running in Minutes</p>
          </div>

          {/* Tabs header */}
          <div className="flex justify-center mb-8">
            <div className="bg-slate-900 p-1.5 rounded-xl border border-slate-800 inline-flex gap-2">
              <button 
                onClick={() => setActiveTab('clone')}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'clone' ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Git Clone (/app)
              </button>
              <button 
                onClick={() => setActiveTab('docker')}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'docker' ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Docker Hub
              </button>
              <button 
                onClick={() => setActiveTab('yaml')}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'yaml' ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20' : 'text-slate-400 hover:text-slate-200'}`}
              >
                config.yaml Spec
              </button>
            </div>
          </div>

          {/* Tab Contents */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto">
            
            {activeTab === 'clone' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-100">Clone & Run Directly</h3>
                <p className="text-slate-400 text-sm">Perfect for local development or custom deployments from the standalone `/app` folder.</p>

                <div className="space-y-4 text-sm font-mono">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="text-slate-500 text-xs mb-1"># 1. Clone repository</div>
                    <div className="text-cyan-300">git clone https://github.com/hii-mansu/balancerx.git</div>
                    <div className="text-cyan-300">cd balancerx/app</div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="text-slate-500 text-xs mb-1"># 2. Install dependencies & configure env</div>
                    <div className="text-cyan-300">npm install</div>
                    <div className="text-cyan-300">cp .env.example .env</div>
                    <div className="text-cyan-300">cp config.yaml.example config.yaml</div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="text-slate-500 text-xs mb-1"># 3. Start BalancerX</div>
                    <div className="text-cyan-300">npm run dev</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'docker' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-100">Run via Docker Container</h3>
                <p className="text-slate-400 text-sm">Deploy instantly without installing Node.js runtime locally.</p>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-sm font-mono">
                  <div className="text-slate-500 text-xs mb-2"># Execute with custom port and volume-mounted config.yaml</div>
                  <div className="text-cyan-300 whitespace-pre-wrap leading-relaxed">
                    docker run -d \<br />
                    &nbsp;&nbsp;-p 3000:3000 \<br />
                    &nbsp;&nbsp;-e PORT=3000 \<br />
                    &nbsp;&nbsp;-v ./config.yaml:/app/config.yaml \<br />
                    &nbsp;&nbsp;hii-mansu/balancerx
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'yaml' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-100">Sample Configuration Schema</h3>
                <p className="text-slate-400 text-sm">Control load balancing behavior and backend target endpoints via simple YAML.</p>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-sm font-mono text-emerald-300">
                  <pre>{`algorithm: least-connections   # Options: round-robin | least-connections

targets:
  - http://localhost:5001
  - http://localhost:5002
  - http://localhost:5003

healthCheck:
  interval: 5000               # Health check interval in ms
  timeout: 5000                # Health request timeout in ms`}</pre>
                </div>
              </div>
            )}

          </div>
        </section>

        {/* Creator / Author Card */}
        <section id="creator" className="py-20 bg-slate-900/30 border-t border-slate-800/80 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-cyan-500 via-teal-400 to-indigo-500 flex items-center justify-center text-slate-950 font-extrabold text-3xl shrink-0 shadow-xl shadow-cyan-500/20">
              HS
            </div>
            
            <div className="space-y-4 text-center md:text-left">
              <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
                Project Architect & Creator
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-100">Himanshu Singh</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Systems enthusiast who built BalancerX from the ground up to demonstrate low-level networking, custom algorithm routing, stream proxying, and reliable health check management in pure JavaScript.
              </p>
              
              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4">
                <a 
                  href="https://github.com/hii-mansu" 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium flex items-center gap-2 transition-all"
                >
                  <Github className="w-4 h-4" />
                  <span>@hii-mansu on GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-12 bg-slate-950 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-slate-300">BalancerX</span>
            <span>— Open Source HTTP Load Balancer</span>
          </div>
          <div>
            Crafted by <a href="https://github.com/hii-mansu" target="_blank" rel="noreferrer" className="text-slate-300 hover:text-cyan-400 font-medium">Himanshu Singh</a> • MIT License
          </div>
        </div>
      </footer>

    </div>
  );
}
