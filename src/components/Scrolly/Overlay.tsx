import { motion, useScroll, useTransform } from 'framer-motion';
import { personalInfo } from '../../data';

const sections = [
  {
    progress: [0, 0.15, 0.25],
    opacity:  [0,  1,    0],
    x:        ['0%', '0%', '-5%'],
    align: 'center' as const,
    line1: personalInfo.name,
    line2: personalInfo.role,
    accent: true,
  },
  {
    progress: [0.25, 0.35, 0.5],
    opacity:  [0,    1,    0],
    x:        ['-4%', '0%', '4%'],
    align: 'left' as const,
    line1: 'I build digital',
    line2: 'experiences.',
    accent: false,
  },
  {
    progress: [0.5, 0.62, 0.78],
    opacity:  [0,   1,    0],
    x:        ['4%', '0%', '-4%'],
    align: 'right' as const,
    line1: 'Bridging design',
    line2: 'and engineering.',
    accent: false,
  },
  {
    progress: [0.78, 0.88, 1],
    opacity:  [0,    1,   1],
    x:        ['0%', '0%', '0%'],
    align: 'center' as const,
    line1: 'Scroll to explore',
    line2: '↓',
    accent: false,
  },
];

function OverlaySection({ section, scrollYProgress }: {
  section: typeof sections[0];
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  const opacity = useTransform(scrollYProgress, section.progress, section.opacity);
  const x       = useTransform(scrollYProgress, section.progress, section.x);

  const alignStyle: React.CSSProperties =
    section.align === 'left'   ? { textAlign: 'left',   left: '8vw', right: 'auto' } :
    section.align === 'right'  ? { textAlign: 'right',  right: '8vw', left: 'auto' } :
    { textAlign: 'center', left: '50%', transform: 'translateX(-50%)' };

  return (
    <motion.div
      style={{ opacity, x, ...alignStyle, position: 'absolute', top: '50%', marginTop: '-4rem', zIndex: 10, pointerEvents: 'none' }}
    >
      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 'clamp(2rem, 6vw, 5.5rem)',
        fontWeight: 800,
        lineHeight: 1.1,
        color: '#fff',
        textShadow: '0 0 40px rgba(108,99,255,0.8), 0 2px 20px rgba(0,0,0,0.9)',
        letterSpacing: '-0.02em',
        whiteSpace: 'nowrap',
      }}>
        {section.line1}
      </p>
      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: section.line2 === '↓' ? '3rem' : 'clamp(2rem, 6vw, 5.5rem)',
        fontWeight: 800,
        lineHeight: 1.1,
        background: section.accent
          ? 'linear-gradient(135deg, #6c63ff, #00d4ff)'
          : 'linear-gradient(135deg, #ff6b9d, #6c63ff)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}>
        {section.line2}
      </p>
    </motion.div>
  );
}

interface Props {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function Overlay({ containerRef }: Props) {
  const { scrollYProgress } = useScroll({ target: containerRef });

  return (
    <div style={{
      position: 'absolute', inset: 0,
      pointerEvents: 'none', zIndex: 10,
    }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        {sections.map((s, i) => (
          <OverlaySection key={i} section={s} scrollYProgress={scrollYProgress} />
        ))}
        {/* Scroll progress bar */}
        <motion.div style={{
          position: 'absolute', bottom: 0, left: 0,
          height: '2px',
          background: 'linear-gradient(90deg, #6c63ff, #00d4ff)',
          width: useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
        }} />
      </div>
    </div>
  );
}
