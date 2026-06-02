import { FaGithub, FaLinkedin, FaInstagram, FaHeart } from 'react-icons/fa';
import { personalInfo } from '../data';

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer-copy">
        Designed & Built by <span>{personalInfo.name}</span> — with <FaHeart style={{ display: 'inline', color: 'var(--pink)', verticalAlign: 'middle' }} /> & ☕
      </p>
      <div className="footer-socials">
        <a href={personalInfo.github} target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
        <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
        {personalInfo.instagram && (
          <a href={personalInfo.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
        )}
      </div>
    </footer>
  );
}
