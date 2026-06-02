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

export default function App() {
  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  return (
    <div className="app">
      <Cursor />
      <Navbar />
      <main>
        <ScrollyHero />
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
