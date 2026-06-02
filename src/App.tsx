import './index.css';
import './App.css';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Analytics } from '@vercel/analytics/react';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import ScrollyHero from './components/Scrolly/ScrollyHero';
import About from './components/About';
import WhatIDo from './components/WhatIDo';
import Career from './components/Career';
import GlassProjects from './components/Scrolly/GlassProjects';
import Contact from './components/Contact';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

// ─── DROP YOUR SEQUENCE FRAMES HERE ────────────────────────────────────────
// If you have frames from Google Whisk → ezgif, import them like:
//   import f001 from './assets/sequence/frame_001.webp';
//   const FRAMES = [f001, f002, ...];
// For now, leave empty — the animated gradient fallback will show.
const FRAMES: string[] = [];
// ────────────────────────────────────────────────────────────────────────────

export default function App() {
  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  return (
    <div className="app">
      <Cursor />
      <Navbar />
      <main>
        <ScrollyHero frames={FRAMES} />
        <About />
        <WhatIDo />
        <Career />
        <GlassProjects />
        <Contact />
      </main>
      <Footer />
      <Analytics />
    </div>
  );
}
