import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaBriefcase, FaGraduationCap, FaCode } from 'react-icons/fa';
import { career } from '../data';

gsap.registerPlugin(ScrollTrigger);

const icons = [<FaCode />, <FaGraduationCap />, <FaBriefcase />];

export default function Career() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.timeline-item',
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1, stagger: 0.2, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: '#career', start: 'top 70%' }
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="career" className="section" ref={ref}>
      <p className="section-label">// experience & education</p>
      <h2 className="section-title">My Journey</h2>
      <div className="glow-line" />

      <div className="timeline">
        {career.map((item, i) => (
          <div key={i} className="timeline-item">
            <div className="timeline-dot">{icons[i] ?? <FaBriefcase />}</div>
            <div className="timeline-content">
              <span className="timeline-period">{item.period}</span>
              <h3 className="timeline-role">{item.role}</h3>
              <div className="timeline-company">{item.company}</div>
              <p className="timeline-summary">{item.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
