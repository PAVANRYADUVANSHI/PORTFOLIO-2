import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { projects } from '../../data';

const emojis = ['🏙️','🧠','🍔','🛒','🎂','✅','🚀','🌤️'];

export default function GlassProjects() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="work" className="section" ref={ref}>
      <p className="section-label">// featured work</p>
      <h2 className="section-title">Projects</h2>
      <div className="glow-line" />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '1.5rem',
        marginTop: '3rem',
      }}>
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              background: 'rgba(15, 15, 42, 0.6)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: `1px solid rgba(108, 99, 255, 0.15)`,
              borderRadius: '16px',
              overflow: 'hidden',
              transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
              cursor: 'default',
            }}
            whileHover={{
              scale: 1.02,
              borderColor: project.color,
              boxShadow: `0 0 40px ${project.color}33, 0 20px 60px rgba(0,0,0,0.4)`,
            }}
          >
            {/* Top color bar */}
            <div style={{
              height: '3px',
              background: `linear-gradient(90deg, ${project.color}, transparent)`,
            }} />

            {/* Preview banner */}
            <div style={{
              height: '160px',
              background: `radial-gradient(ellipse at 30% 50%, ${project.color}22, transparent 70%), 
                           linear-gradient(135deg, ${project.color}11, rgba(0,0,0,0.3))`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '4rem', position: 'relative', overflow: 'hidden',
            }}>
              <span style={{ filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.3))' }}>
                {emojis[i] ?? '💻'}
              </span>
              {/* Shimmer line */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%)',
              }} />
            </div>

            <div style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.6rem' }}>
                {project.title}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                {project.description}
              </p>

              {/* Tech badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                {project.tech.map(t => (
                  <span key={t} style={{
                    padding: '0.2rem 0.65rem',
                    background: `${project.color}18`,
                    border: `1px solid ${project.color}44`,
                    borderRadius: '100px',
                    fontSize: '0.7rem',
                    fontFamily: 'var(--font-mono)',
                    color: project.color,
                  }}>{t}</span>
                ))}
              </div>

              {/* Links */}
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a href={project.link} target="_blank" rel="noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', transition: 'color 0.2s', cursor: 'none' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--cyan)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                >
                  <FaGithub /> GitHub
                </a>
                {'live' in project && (project as { live?: string }).live && (
                  <a href={(project as { live?: string }).live} target="_blank" rel="noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', transition: 'color 0.2s', cursor: 'none' }}
                    onMouseEnter={e => (e.currentTarget.style.color = project.color)}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
