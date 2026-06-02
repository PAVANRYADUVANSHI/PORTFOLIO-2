import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-image-wrapper',
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.about', start: 'top 75%' } }
      );
      gsap.fromTo('.about-content > *',
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.about', start: 'top 70%' } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="section about" ref={ref}>
      <div className="about-image-wrapper">
        <div className="about-image-frame">
          <img
            src="/avatar.jpg"
            alt="PAVAN R YADAV"
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'top center',
              borderRadius: '14px',
              position: 'relative', zIndex: 1,
            }}
            onError={(e) => {
              const el = e.target as HTMLImageElement;
              el.style.display = 'none';
              el.parentElement!.innerHTML += '<span style="position:relative;z-index:1;font-size:7rem">👨‍💻</span>';
            }}
          />
        </div>
        <div className="about-corner tl" />
        <div className="about-corner br" />
      </div>

      <div className="about-content">
        <p className="section-label">// about me</p>
        <h2 className="section-title">Who I Am</h2>
        <div className="glow-line" />
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '1rem' }}>
          I'm <strong style={{ color: 'var(--text)' }}>PAVAN R YADAV</strong>, a Java Full Stack
          Developer with hands-on experience in React.js, Core Java, Spring Boot, and MySQL. I hold
          a B.E. in Mechanical Engineering from JNNCE Shivamogga and am currently completing a Java
          Full Stack Developer Certification at NIIT (2025–2026).
        </p>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '1rem', marginTop: '1rem' }}>
          I have built production-grade platforms — including a Smart City AI platform, a food
          delivery app with JWT auth and payment gateway, and an autonomous AI developer tool.
          I thrive in Agile teams using Git workflows and REST API testing with Postman.
        </p>
        <div className="about-stats">
          <div className="about-stat">
            <div className="about-stat-num">9+</div>
            <div className="about-stat-label">Projects Shipped</div>
          </div>
          <div className="about-stat">
            <div className="about-stat-num">10+</div>
            <div className="about-stat-label">Technologies</div>
          </div>
          <div className="about-stat">
            <div className="about-stat-num">3+</div>
            <div className="about-stat-label">Certifications</div>
          </div>
        </div>
        <a
          href="/PAVANRYADUVANSHI RESUME 2-6-26.pdf"
          download
          className="btn btn-primary"
          style={{ marginTop: '1.5rem', cursor: 'none' }}
        >
          <span>Download Resume ↓</span>
        </a>
      </div>
    </section>
  );
}
