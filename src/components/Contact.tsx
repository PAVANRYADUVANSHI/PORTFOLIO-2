import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaEnvelope, FaGithub, FaLinkedin, FaInstagram, FaPaperPlane } from 'react-icons/fa';
import { personalInfo } from '../data';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-grid > *',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.2, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '#contact', start: 'top 70%' }
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="section" ref={ref}>
      <p className="section-label">// contact</p>
      <h2 className="section-title">Get In Touch</h2>
      <div className="glow-line" />

      <div className="contact-grid">
        <div>
          <h3 className="contact-info-title">Let's work together</h3>
          <p className="contact-info-text">
            Have a project in mind, or just want to say hi? My inbox is always open.
            I'll try my best to get back to you!
          </p>
          <div className="contact-links">
            <a href={`mailto:${personalInfo.email}`} className="contact-link">
              <span className="contact-link-icon"><FaEnvelope /></span>
              {personalInfo.email}
            </a>
            <a href={personalInfo.github} className="contact-link" target="_blank" rel="noreferrer">
              <span className="contact-link-icon"><FaGithub /></span>
              GitHub
            </a>
            <a href={personalInfo.linkedin} className="contact-link" target="_blank" rel="noreferrer">
              <span className="contact-link-icon"><FaLinkedin /></span>
              LinkedIn
            </a>
            {personalInfo.instagram && (
              <a href={personalInfo.instagram} className="contact-link" target="_blank" rel="noreferrer">
                <span className="contact-link-icon"><FaInstagram /></span>
                Instagram
              </a>
            )}
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">NAME</label>
            <input type="text" className="form-input" placeholder="Your name" required />
          </div>
          <div className="form-group">
            <label className="form-label">EMAIL</label>
            <input type="email" className="form-input" placeholder="your@email.com" required />
          </div>
          <div className="form-group">
            <label className="form-label">MESSAGE</label>
            <textarea className="form-textarea" placeholder="Tell me about your project..." required />
          </div>
          <button type="submit" className="btn btn-primary form-submit">
            <span>{sent ? '✓ Message Sent!' : 'Send Message'}</span>
            {!sent && <FaPaperPlane />}
          </button>
        </form>
      </div>
    </section>
  );
}
