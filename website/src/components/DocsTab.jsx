import React, { useState } from 'react';

export default function DocsTab() {
  const [activeTab, setActiveTab] = useState('clone');

  return (
    <section id="docs" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">Step-by-Step Documentation</h2>
        <p className="text-3xl sm:text-4xl font-extrabold text-slate-100">Setup & Deployment Guide</p>
        <p className="mt-3 text-slate-400 text-sm">Detailed instructions for running BalancerX via Git Clone, Docker CLI, or Docker Compose.</p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="bg-slate-900 p-1.5 rounded-xl border border-slate-800 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setActiveTab('clone')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${activeTab === 'clone' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
          >
            1. Git Clone (/app)
          </button>
          <button
            onClick={() => setActiveTab('docker')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${activeTab === 'docker' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
          >
            2. Docker CLI
          </button>
          <button
            onClick={() => setActiveTab('compose')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${activeTab === 'compose' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
          >
            3. Docker Compose
          </button>
          <button
            onClick={() => setActiveTab('config')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${activeTab === 'config' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
          >
            4. config.yaml & Algorithms
          </button>
        </div>
      </div>

      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto">
        {activeTab === 'clone' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-100">Step-by-Step Setup for Git Clone Users</h3>
              <p className="text-slate-400 text-sm mt-1">Run BalancerX directly from the standalone /app directory on your system.</p>
            </div>

            <div className="space-y-5 text-sm">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono">
                <div className="text-slate-400 font-sans font-semibold mb-2">Step 1: Clone the repository</div>
                <div className="text-cyan-300">git clone https://github.com/hii-mansu/balancerx.git</div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono">
                <div className="text-slate-400 font-sans font-semibold mb-2">Step 2: Navigate to the standalone app folder</div>
                <div className="text-cyan-300">cd balancerx/app</div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono">
                <div className="text-slate-400 font-sans font-semibold mb-2">Step 3: Install Node.js dependencies</div>
                <div className="text-cyan-300">npm install</div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono">
                <div className="text-slate-400 font-sans font-semibold mb-2">Step 4: Create your environment file (.env)</div>
                <div className="text-slate-400 text-xs font-sans mb-2">Copy example template or create .env file and specify your server PORT:</div>
                <div className="text-cyan-300 mb-2">cp .env.example .env</div>
                <div className="text-slate-500 text-xs font-sans">Content of .env:</div>
                <div className="text-emerald-400">PORT=5000</div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono">
                <div className="text-slate-400 font-sans font-semibold mb-2">Step 5: Create your config.yaml file</div>
                <div className="text-slate-400 text-xs font-sans mb-2">Copy example template and set your backend server target URLs and algorithm:</div>
                <div className="text-cyan-300 mb-2">cp config.yaml.example config.yaml</div>
                <div className="text-slate-500 text-xs font-sans mb-1">Content of config.yaml:</div>
                <div className="text-emerald-400 whitespace-pre">
{`algorithm: round-robin # Options: round-robin | least-connections

targets:
  - http://localhost:5001
  - http://localhost:5002

healthCheck:
  interval: 5000
  timeout: 5000`}
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono">
                <div className="text-slate-400 font-sans font-semibold mb-2">Step 6: Start BalancerX</div>
                <div className="text-cyan-300">npm run dev</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'docker' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-100">Step-by-Step Setup for Docker CLI Users</h3>
              <p className="text-slate-400 text-sm mt-1">Run BalancerX inside a Docker container using the prebuilt image from Docker Hub.</p>
            </div>

            <div className="space-y-5 text-sm">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono">
                <div className="text-slate-400 font-sans font-semibold mb-2">Step 1: Create config.yaml on your local machine</div>
                <div className="text-slate-400 text-xs font-sans mb-2">Create a file named config.yaml in your current working directory:</div>
                <div className="text-emerald-400 whitespace-pre">
{`algorithm: least-connections # Options: round-robin | least-connections

targets:
  - http://localhost:5001
  - http://localhost:5002

healthCheck:
  interval: 5000
  timeout: 5000`}
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono">
                <div className="text-slate-400 font-sans font-semibold mb-2">Step 2: Run Docker container with volume mount</div>
                <div className="text-slate-400 text-xs font-sans mb-2">Execute docker run command passing PORT environment variable and mounting config.yaml into /app/config.yaml inside the container:</div>
                <div className="text-cyan-300 whitespace-pre-wrap leading-relaxed">
                  docker run -d \<br />
                  &nbsp;&nbsp;-p 3000:3000 \<br />
                  &nbsp;&nbsp;-e PORT=3000 \<br />
                  &nbsp;&nbsp;-v ./config.yaml:/app/config.yaml \<br />
                  &nbsp;&nbsp;mansu217/balancerx
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'compose' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-100">Step-by-Step Setup for Docker Compose Users</h3>
              <p className="text-slate-400 text-sm mt-1">Manage and orchestrate BalancerX easily with Docker Compose.</p>
            </div>

            <div className="space-y-5 text-sm">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono">
                <div className="text-slate-400 font-sans font-semibold mb-2">Step 1: Create config.yaml</div>
                <div className="text-emerald-400 whitespace-pre">
{`algorithm: least-connections

targets:
  - http://localhost:5001
  - http://localhost:5002

healthCheck:
  interval: 5000
  timeout: 5000`}
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono">
                <div className="text-slate-400 font-sans font-semibold mb-2">Step 2: Create docker-compose.yml file</div>
                <div className="text-emerald-400 whitespace-pre">
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

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono">
                <div className="text-slate-400 font-sans font-semibold mb-2">Step 3: Launch with Docker Compose</div>
                <div className="text-cyan-300">docker compose up -d</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'config' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-100">config.yaml Reference & Available Algorithms</h3>
              <p className="text-slate-400 text-sm mt-1">Full specification of parameters accepted in config.yaml.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-cyan-400 font-bold mb-1">round-robin</div>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Cycles through backend targets in sequential order. Best for server pools with equal computing capacity.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-cyan-400 font-bold mb-1">least-connections</div>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Routes traffic to the backend target handling the lowest number of active HTTP connections. Best for variable request durations.
                </p>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-sm font-mono">
              <div className="text-slate-400 font-sans font-semibold mb-3">Field Reference</div>
              <div className="space-y-2 text-xs">
                <div><span className="text-cyan-300">algorithm</span>: <span className="text-slate-400">Load balancing strategy ("round-robin" or "least-connections")</span></div>
                <div><span className="text-cyan-300">targets</span>: <span className="text-slate-400">Array of backend server URLs (e.g. ["http://localhost:5001", "http://localhost:5002"])</span></div>
                <div><span className="text-cyan-300">healthCheck.interval</span>: <span className="text-slate-400">Interval between health check pings in milliseconds (e.g. 5000)</span></div>
                <div><span className="text-cyan-300">healthCheck.timeout</span>: <span className="text-slate-400">Timeout limit for health check response in milliseconds (e.g. 5000)</span></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
