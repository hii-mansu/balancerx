import React from 'react';

export default function Architecture() {
  const steps = [
    { title: '1. HTTP Listener', file: 'app.js & server.js', detail: 'Accepts incoming HTTP requests on specified PORT' },
    { title: '2. Target Selector', file: 'selectTarget.js', detail: 'Evaluates healthy targets using active algorithm' },
    { title: '3. Reverse Proxy', file: 'proxy.js', detail: 'Streams request and response data asynchronously' },
    { title: '4. Health Monitor', file: 'healthChecker.js', detail: 'Continuously polls /health endpoints in background' }
  ];

  return (
    <section id="architecture" className="py-20 bg-slate-900/40 border-t border-slate-800/80 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">System Architecture</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-100">Clean & Modular Architecture</p>
          <p className="mt-3 text-slate-400">Strict separation of core modules for readability and performance.</p>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 md:p-10 shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step, idx) => (
              <div key={idx} className="bg-slate-900 p-5 rounded-xl border border-slate-800 text-center">
                <div className="text-cyan-400 font-bold mb-1 text-sm">{step.title}</div>
                <div className="text-slate-300 text-xs font-mono mb-2">{step.file}</div>
                <div className="text-slate-500 text-xs leading-normal">{step.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
