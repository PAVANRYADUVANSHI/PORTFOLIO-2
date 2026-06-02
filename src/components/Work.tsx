import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaArrowRight, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { projects } from '../data';

gsap.registerPlugin(ScrollTrigger);

export default function Work() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.project-card',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '#work', start: 'top 70%' }
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="work" className="section" ref={ref}>
      <p className="section-label">// featured work</p>
      <h2 className="section-title">Projects</h2>
      <div className="glow-line" />

      <div className="projects-grid">
        {projects.map((project, i) => (
          <div key={project.title} className="project-card">
            <div
              className="project-preview"
              style={{ background: `linear-gradient(135deg, ${project.color}22, ${project.color}55)` }}
            >
              <span style={{ fontSize: '3.5rem' }}>
                {['🏙️','🧠','🍔','🛒','🎂','✅','🚀','🌤️'][i] ?? '💻'}
              </span>
            </div>
            <div className="project-body">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>
              <div className="project-tech">
                {project.tech.map(t => (
                  <span key={t} className="tech-badge">{t}</span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href={project.link} className="project-link" target="_blank" rel="noreferrer">
                  <FaGithub /> GitHub <FaArrowRight />
                </a>
                {'live' in project && (project as any).live && (
                  <a href={(project as any).live} className="project-link" target="_blank" rel="noreferrer"
                    style={{ color: 'var(--pink)' }}>
                    <FaExternalLinkAlt /> Live <FaArrowRight />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
