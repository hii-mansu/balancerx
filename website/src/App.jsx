import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Simulator from './components/Simulator';
import Features from './components/Features';
import Architecture from './components/Architecture';
import DocsTab from './components/DocsTab';
import Creator from './components/Creator';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar />
      <main>
        <Hero />
        <Simulator />
        <Features />
        <Architecture />
        <DocsTab />
        <Creator />
      </main>
      <Footer />
    </div>
  );
}
