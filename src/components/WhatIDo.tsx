import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MarqueeLib from 'react-fast-marquee';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Marquee = (MarqueeLib as any).default ?? MarqueeLib;
import { FaReact, FaServer, FaCubes, FaCloud } from 'react-icons/fa';
import { whatIDo, skills } from '../data';

gsap.registerPlugin(ScrollTrigger);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const iconMap: Record<string, React.ElementType<any>> = {
  FaReact,
  FaServer,
  FaCube: FaCubes,
  FaCloud,
};

export default function WhatIDo() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.service-card',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.15, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: '#whatido', start: 'top 70%' }
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="whatido" className="section" ref={ref}>
      <p className="section-label">// what i do</p>
      <h2 className="section-title">My Services</h2>
      <div className="glow-line" />

      <div className="whatido-grid">
        {whatIDo.map((service) => {
          const Icon = (iconMap[service.icon] ?? FaReact) as React.ElementType<Record<string, unknown>>;
          return (
            <div key={service.title} className="service-card">
              <div className="service-icon"><Icon /></div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.description}</p>
            </div>
          );
        })}
      </div>

      <div className="skills-marquee" style={{ marginTop: '4rem' }}>
        <p className="section-label" style={{ marginBottom: '1.5rem' }}>// tech stack</p>
        <Marquee gradient={false} speed={40} pauseOnHover>
          {skills.map(skill => (
            <div key={skill} className="skill-tag">
              <span className="skill-dot" />
              {skill}
            </div>
          ))}
        </Marquee>
        <div style={{ marginTop: '1rem' }}>
          <Marquee gradient={false} speed={30} direction="right" pauseOnHover>
            {[...skills].reverse().map(skill => (
              <div key={skill} className="skill-tag">
                <span className="skill-dot" style={{ background: 'var(--cyan)' }} />
                {skill}
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
