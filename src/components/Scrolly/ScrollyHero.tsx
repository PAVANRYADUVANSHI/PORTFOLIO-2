import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { personalInfo } from '../../data';

export default function ScrollyHero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const imgRef     = useRef<HTMLImageElement | null>(null);

  const { scrollYProgress } = useScroll({ target: wrapperRef });

  // Load image
  useEffect(() => {
    const img = new Image();
    img.src = '/avatar.jpg';
    img.onload = () => { imgRef.current = img; draw(0); };
  }, []);

  // Resize canvas
  useEffect(() => {
    const resize = () => {
      const c = canvasRef.current;
      if (!c) return;
      c.width  = window.innerWidth;
      c.height = window.innerHeight;
      draw(0);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // Draw canvas
  function draw(p: number) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // bg gradient navy → orange
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, `rgb(${5 + p*30},${5 + p*10},${30 - p*20})`);
    bg.addColorStop(1, `rgb(${20 + p*120},${5 + p*40},${40 - p*30})`);
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // draw photo
    const img = imgRef.current;
    if (img && img.naturalWidth > 0) {
      const scale = Math.max(W / img.naturalWidth, H / img.naturalHeight) * (1 + p * 0.2);
      const iw = img.naturalWidth * scale;
      const ih = img.naturalHeight * scale;
      ctx.save();
      ctx.globalAlpha = Math.max(0, 0.9 - p * 0.6);
      ctx.drawImage(img, (W - iw) / 2, (H - ih) / 2 - p * H * 0.06, iw, ih);
      ctx.restore();
    }

    // blue wash left
    const bw = ctx.createLinearGradient(0, 0, W * 0.6, 0);
    bw.addColorStop(0, `rgba(10,20,120,${0.5 + p * 0.2})`);
    bw.addColorStop(1, 'rgba(10,20,120,0)');
    ctx.fillStyle = bw; ctx.fillRect(0, 0, W, H);

    // orange wash right
    const ow = ctx.createLinearGradient(W, 0, W * 0.4, H);
    ow.addColorStop(0, `rgba(200,80,10,${0.4 + p * 0.1})`);
    ow.addColorStop(1, 'rgba(200,80,10,0)');
    ctx.fillStyle = ow; ctx.fillRect(0, 0, W, H);

    // purple glow mid-scroll
    if (p > 0.2) {
      const pw = ctx.createRadialGradient(W * 0.5, H * 0.5, 0, W * 0.5, H * 0.5, W * 0.5);
      pw.addColorStop(0, `rgba(108,99,255,${(p - 0.2) * 0.25})`);
      pw.addColorStop(1, 'rgba(108,99,255,0)');
      ctx.fillStyle = pw; ctx.fillRect(0, 0, W, H);
    }

    // vignette
    const vig = ctx.createRadialGradient(W/2, H/2, H * 0.25, W/2, H/2, H * 0.9);
    vig.addColorStop(0, 'rgba(0,0,0,0)');
    vig.addColorStop(1, `rgba(0,0,0,${0.55 + p * 0.25})`);
    ctx.fillStyle = vig; ctx.fillRect(0, 0, W, H);
  }

  // Sync scroll → canvas
  useEffect(() => {
    return scrollYProgress.on('change', v => {
      requestAnimationFrame(() => draw(v));
    });
  }, [scrollYProgress]);

  // Parallax text transforms
  const s0opacity = useTransform(scrollYProgress, [0,    0.12, 0.22], [1,    1,    0]);
  const s0y       = useTransform(scrollYProgress, [0,    0.22],        ['0%', '-8%']);
  const s1opacity = useTransform(scrollYProgress, [0.22, 0.35, 0.50], [0,    1,    0]);
  const s1x       = useTransform(scrollYProgress, [0.22, 0.35, 0.50], ['-6%','0%', '6%']);
  const s2opacity = useTransform(scrollYProgress, [0.50, 0.62, 0.78], [0,    1,    0]);
  const s2x       = useTransform(scrollYProgress, [0.50, 0.62, 0.78], ['6%', '0%','-6%']);
  const s3opacity = useTransform(scrollYProgress, [0.78, 0.88, 1.0],  [0,    1,    1]);
  const barWidth  = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const textBase: React.CSSProperties = {
    position: 'absolute', zIndex: 10, pointerEvents: 'none',
    top: '50%', marginTop: '-3.5rem',
  };
  const line1Style: React.CSSProperties = {
    fontFamily: 'var(--font-mono)', fontWeight: 800, lineHeight: 1.1,
    fontSize: 'clamp(1.8rem, 5vw, 5rem)', color: '#fff',
    textShadow: '0 0 40px rgba(108,99,255,0.8), 0 2px 20px rgba(0,0,0,0.9)',
    whiteSpace: 'nowrap',
  };
  const line2Accent: React.CSSProperties = {
    fontFamily: 'var(--font-mono)', fontWeight: 800, lineHeight: 1.1,
    fontSize: 'clamp(1.8rem, 5vw, 5rem)',
    background: 'linear-gradient(135deg,#6c63ff,#00d4ff)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
    whiteSpace: 'nowrap',
  };
  const line2Pink: React.CSSProperties = {
    ...line2Accent,
    background: 'linear-gradient(135deg,#ff6b9d,#6c63ff)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
  };

  return (
    <div ref={wrapperRef} style={{ height: '500vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

        {/* Dark fallback bg */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,#050510,#0d0d2b,#1a0533)' }} />

        {/* Canvas */}
        <canvas ref={canvasRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%' }} />

        {/* Section 0 — Name / Role — center */}
        <motion.div style={{ ...textBase, left:'50%', transform:'translateX(-50%)', textAlign:'center', opacity: s0opacity, y: s0y }}>
          <p style={line1Style}>{personalInfo.name}</p>
          <p style={line2Accent}>{personalInfo.role}</p>
        </motion.div>

        {/* Section 1 — left */}
        <motion.div style={{ ...textBase, left:'8vw', textAlign:'left', opacity: s1opacity, x: s1x }}>
          <p style={line1Style}>I build digital</p>
          <p style={line2Pink}>experiences.</p>
        </motion.div>

        {/* Section 2 — right */}
        <motion.div style={{ ...textBase, right:'8vw', left:'auto', textAlign:'right', opacity: s2opacity, x: s2x }}>
          <p style={line1Style}>Bridging design</p>
          <p style={line2Accent}>and engineering.</p>
        </motion.div>

        {/* Section 3 — scroll CTA */}
        <motion.div style={{ ...textBase, left:'50%', transform:'translateX(-50%)', textAlign:'center', opacity: s3opacity }}>
          <p style={line1Style}>Explore my work</p>
          <p style={{ ...line2Pink, fontSize:'2.5rem' }}>↓</p>
        </motion.div>

        {/* Progress bar */}
        <motion.div style={{
          position:'absolute', bottom:0, left:0, height:'2px',
          background:'linear-gradient(90deg,#6c63ff,#00d4ff)',
          width: barWidth,
        }} />

        {/* Scroll hint on load */}
        <motion.div
          style={{ position:'absolute', bottom:'2rem', left:'50%', transform:'translateX(-50%)',
            fontFamily:'var(--font-mono)', fontSize:'0.75rem', color:'rgba(255,255,255,0.4)',
            letterSpacing:'0.2em', opacity: s0opacity }}
        >
          SCROLL DOWN
        </motion.div>
      </div>
    </div>
  );
}
