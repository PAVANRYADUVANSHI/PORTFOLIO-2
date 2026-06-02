import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { personalInfo } from '../data';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#whatido' },
  { label: 'Career', href: '#career' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.fromTo(ref.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.5 }
    );
  }, []);

  const initials = personalInfo.name.split(' ').map(n => n[0]).join('').slice(0, 2);

  return (
    <nav ref={ref} className="navbar">
      <div className="navbar-logo">
        {initials}<span>.</span>
      </div>
      <ul className="navbar-links">
        {links.map(l => (
          <li key={l.href}>
            <a href={l.href}>{l.label}</a>
          </li>
        ))}
      </ul>
      <a href={personalInfo.resume} className="btn navbar-cta" target="_blank" rel="noreferrer">
        <span>Resume</span>
      </a>
    </nav>
  );
}
