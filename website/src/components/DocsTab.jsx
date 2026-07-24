import React, { useState } from 'react';

export default function DocsTab() {
  const [activeTab, setActiveTab] = useState('clone');

  return (
    <section id="docs" className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">Step-by-Step Documentation</h2>
        <p className="text-2xl sm:text-4xl font-extrabold text-slate-100">Setup & Deployment Guide</p>
        <p className="mt-2 sm:mt-3 text-slate-400 text-xs sm:text-sm px-2">Detailed instructions for running BalancerX via Git Clone, Docker CLI, or Docker Compose.</p>
      </div>

      <div className="flex justify-center mb-6 sm:mb-8 max-w-full">
        <div className="bg-slate-900 p-1 sm:p-1.5 rounded-xl border border-slate-800 flex overflow-x-auto sm:flex-wrap justify-start sm:justify-center gap-1.5 sm:gap-2 max-w-full no-scrollbar px-1">
          <button
            onClick={() => setActiveTab('clone')}
            className={`shrink-0 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${activeTab === 'clone' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
          >
            1. Git Clone
          </button>
          <button
            onClick={() => setActiveTab('docker')}
            className={`shrink-0 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${activeTab === 'docker' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
          >
            2. Docker CLI
          </button>
          <button
            onClick={() => setActiveTab('compose')}
            className={`shrink-0 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${activeTab === 'compose' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
          >
            3. Docker Compose
          </button>
          <button
            onClick={() => setActiveTab('config')}
            className={`shrink-0 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${activeTab === 'config' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
          >
            4. Config Reference
          </button>
        </div>
      </div>

      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-8 max-w-4xl mx-auto overflow-hidden">
        {activeTab === 'clone' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-100">Step-by-Step Setup for Git Clone Users</h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">Run BalancerX directly from the standalone /app directory on your system.</p>
            </div>

            <div className="space-y-4 sm:space-y-5 text-xs sm:text-sm">
              <div className="bg-slate-950 p-3.5 sm:p-4 rounded-xl border border-slate-800 font-mono overflow-x-auto max-w-full">
                <div className="text-slate-400 font-sans font-semibold mb-1.5 text-xs">Step 1: Clone the repository</div>
                <div className="text-cyan-300 font-mono whitespace-nowrap">git clone https://github.com/hii-mansu/balancerx.git</div>
              </div>

              <div className="bg-slate-950 p-3.5 sm:p-4 rounded-xl border border-slate-800 font-mono overflow-x-auto max-w-full">
                <div className="text-slate-400 font-sans font-semibold mb-1.5 text-xs">Step 2: Navigate to the standalone app folder</div>
                <div className="text-cyan-300 font-mono whitespace-nowrap">cd balancerx/app</div>
              </div>

              <div className="bg-slate-950 p-3.5 sm:p-4 rounded-xl border border-slate-800 font-mono overflow-x-auto max-w-full">
                <div className="text-slate-400 font-sans font-semibold mb-1.5 text-xs">Step 3: Install Node.js dependencies</div>
                <div className="text-cyan-300 font-mono whitespace-nowrap">npm install</div>
              </div>

              <div className="bg-slate-950 p-3.5 sm:p-4 rounded-xl border border-slate-800 font-mono overflow-x-auto max-w-full">
                <div className="text-slate-400 font-sans font-semibold mb-1.5 text-xs">Step 4: Create your environment file (.env)</div>
                <div className="text-slate-400 text-xs font-sans mb-2">Copy example template or create .env file and specify your server PORT:</div>
                <div className="text-cyan-300 font-mono mb-2 whitespace-nowrap">cp .env.example .env</div>
                <div className="text-slate-500 text-[11px] font-sans">Content of .env:</div>
                <div className="text-emerald-400 font-mono">PORT=5000</div>
              </div>

              <div className="bg-slate-950 p-3.5 sm:p-4 rounded-xl border border-slate-800 font-mono overflow-x-auto max-w-full">
                <div className="text-slate-400 font-sans font-semibold mb-1.5 text-xs">Step 5: Create your config.yaml file</div>
                <div className="text-slate-400 text-xs font-sans mb-2">Copy example template and set your backend server target URLs and algorithm:</div>
                <div className="text-cyan-300 font-mono mb-2 whitespace-nowrap">cp config.yaml.example config.yaml</div>
                <div className="text-slate-500 text-[11px] font-sans mb-1">Content of config.yaml:</div>
                <div className="text-emerald-400 font-mono text-xs whitespace-pre overflow-x-auto">
{`algorithm: round-robin # Options: round-robin | least-connections

targets:
  - http://localhost:5001
  - http://localhost:5002

healthCheck:
  interval: 5000
  timeout: 5000`}
                </div>
              </div>

              <div className="bg-slate-950 p-3.5 sm:p-4 rounded-xl border border-slate-800 font-mono overflow-x-auto max-w-full">
                <div className="text-slate-400 font-sans font-semibold mb-1.5 text-xs">Step 6: Start BalancerX</div>
                <div className="text-cyan-300 font-mono whitespace-nowrap">npm run dev</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'docker' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-100">Step-by-Step Setup for Docker CLI Users</h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">Run BalancerX inside a Docker container using the prebuilt image from Docker Hub.</p>
            </div>

            <div className="space-y-4 sm:space-y-5 text-xs sm:text-sm">
              <div className="bg-slate-950 p-3.5 sm:p-4 rounded-xl border border-slate-800 font-mono overflow-x-auto max-w-full">
                <div className="text-slate-400 font-sans font-semibold mb-1.5 text-xs">Step 1: Create config.yaml on your local machine</div>
                <div className="text-slate-400 text-xs font-sans mb-2">Create a file named config.yaml in your current working directory:</div>
                <div className="text-emerald-400 font-mono text-xs whitespace-pre overflow-x-auto">
{`algorithm: least-connections # Options: round-robin | least-connections

targets:
  - http://localhost:5001
  - http://localhost:5002

healthCheck:
  interval: 5000
  timeout: 5000`}
                </div>
              </div>

              <div className="bg-slate-950 p-3.5 sm:p-4 rounded-xl border border-slate-800 font-mono overflow-x-auto max-w-full">
                <div className="text-slate-400 font-sans font-semibold mb-1.5 text-xs">Step 2: Run Docker container with volume mount</div>
                <div className="text-slate-400 text-xs font-sans mb-2">Execute docker run command passing PORT environment variable and mounting config.yaml into /app/config.yaml inside the container:</div>
                <div className="text-cyan-300 font-mono text-xs whitespace-pre overflow-x-auto leading-relaxed">
                  docker run -d -p 3000:3000 -e PORT=3000 -v ./config.yaml:/app/config.yaml mansu217/balancerx
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'compose' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-100">Step-by-Step Setup for Docker Compose Users</h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">Manage and orchestrate BalancerX easily with Docker Compose.</p>
            </div>

            <div className="space-y-4 sm:space-y-5 text-xs sm:text-sm">
              <div className="bg-slate-950 p-3.5 sm:p-4 rounded-xl border border-slate-800 font-mono overflow-x-auto max-w-full">
                <div className="text-slate-400 font-sans font-semibold mb-1.5 text-xs">Step 1: Create config.yaml</div>
                <div className="text-emerald-400 font-mono text-xs whitespace-pre overflow-x-auto">
{`algorithm: least-connections

targets:
  - http://localhost:5001
  - http://localhost:5002

healthCheck:
  interval: 5000
  timeout: 5000`}
                </div>
              </div>

              <div className="bg-slate-950 p-3.5 sm:p-4 rounded-xl border border-slate-800 font-mono overflow-x-auto max-w-full">
                <div className="text-slate-400 font-sans font-semibold mb-1.5 text-xs">Step 2: Create docker-compose.yml file</div>
                <div className="text-emerald-400 font-mono text-xs whitespace-pre overflow-x-auto">
{`version: '3.8'

services:
  balancerx:
    image: mansu217/balancerx
    ports:
      - "3000:3000"
    environment:
      - PORT=3000
    volumes:
      - ./config.yaml:/app/config.yaml
    restart: always`}
                </div>
              </div>

              <div className="bg-slate-950 p-3.5 sm:p-4 rounded-xl border border-slate-800 font-mono overflow-x-auto max-w-full">
                <div className="text-slate-400 font-sans font-semibold mb-1.5 text-xs">Step 3: Launch with Docker Compose</div>
                <div className="text-cyan-300 font-mono whitespace-nowrap">docker compose up -d</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'config' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-100">config.yaml Reference & Available Algorithms</h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">Full specification of parameters accepted in config.yaml.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-cyan-400 font-bold mb-1 text-sm sm:text-base">round-robin</div>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Cycles through backend targets in sequential order. Best for server pools with equal computing capacity.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-cyan-400 font-bold mb-1 text-sm sm:text-base">least-connections</div>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Routes traffic to the backend target handling the lowest number of active HTTP connections. Best for variable request durations.
                </p>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs sm:text-sm font-mono overflow-x-auto max-w-full">
              <div className="text-slate-400 font-sans font-semibold mb-3">Field Reference</div>
              <div className="space-y-2 text-xs">
                <div><span className="text-cyan-300 font-bold">algorithm</span>: <span className="text-slate-400 font-sans">Load balancing strategy ("round-robin" or "least-connections")</span></div>
                <div><span className="text-cyan-300 font-bold">targets</span>: <span className="text-slate-400 font-sans">Array of backend server URLs (e.g. ["http://localhost:5001", "http://localhost:5002"])</span></div>
                <div><span className="text-cyan-300 font-bold">healthCheck.interval</span>: <span className="text-slate-400 font-sans">Interval between health check pings in milliseconds (e.g. 5000)</span></div>
                <div><span className="text-cyan-300 font-bold">healthCheck.timeout</span>: <span className="text-slate-400 font-sans">Timeout limit for health check response in milliseconds (e.g. 5000)</span></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
