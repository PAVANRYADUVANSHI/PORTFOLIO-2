import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { FaGithub, FaLinkedin, FaInstagram, FaArrowRight } from 'react-icons/fa';
import { personalInfo } from '../data';
import HeroScene from './Character/HeroScene';

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.8 });
      tl.fromTo('.hero-greeting', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
        .fromTo('.hero-name', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.3')
        .fromTo('.hero-role', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4')
        .fromTo('.hero-bio', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.3')
        .fromTo('.hero-actions', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.3')
        .fromTo('.hero-socials', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.3')
        .fromTo('.hero-canvas', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }, '-=0.8');
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" className="hero section" ref={ref}>
      <div className="hero-content">
        <p className="hero-greeting">// Hello World, I'm</p>
        <h1 className="hero-name">
          {personalInfo.name.split(' ')[0]}
          <span className="highlight">{' '}{personalInfo.name.split(' ').slice(1).join(' ')}</span>
        </h1>
        <p className="hero-role">
          <strong>{personalInfo.role}</strong> based in {personalInfo.location}
        </p>
        <p className="hero-bio">{personalInfo.bio}</p>
        <div className="hero-actions">
          <a href="#work" className="btn btn-primary">
            <span>View My Work</span>
            <FaArrowRight />
          </a>
          <a href="#contact" className="btn">
            <span>Get In Touch</span>
          </a>
        </div>
        <div className="hero-socials">
          <a href={personalInfo.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          {personalInfo.instagram && (
            <a href={personalInfo.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
          )}
        </div>
      </div>
      <div className="hero-canvas">
        <HeroScene />
      </div>
    </section>
  );
}
