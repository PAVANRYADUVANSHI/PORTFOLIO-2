import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

interface Props {
  imageSrc: string;
}

export default function ScrollyCanvas({ imageSrc }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const imgRef       = useRef<HTMLImageElement | null>(null);
  const [ready, setReady] = useState(false);
  const progressRef  = useRef(0);
  const rafRef       = useRef(0);

  const { scrollYProgress } = useScroll({ target: containerRef });
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Load image
  useEffect(() => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => { imgRef.current = img; setReady(true); };
  }, [imageSrc]);

  // Resize canvas
  useEffect(() => {
    const resize = () => {
      const c = canvasRef.current; if (!c) return;
      c.width  = window.innerWidth;
      c.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // Draw frame based on scroll progress
  const drawFrame = (p: number) => {
    const canvas = canvasRef.current;
    const img    = imgRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // --- Background gradient that shifts with scroll ---
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    const t = p;
    // navy → warm orange transition
    const r1 = Math.round(5  + t * 30);
    const g1 = Math.round(5  + t * 10);
    const b1 = Math.round(30 - t * 20);
    const r2 = Math.round(20 + t * 120);
    const g2 = Math.round(5  + t * 40);
    const b2 = Math.round(40 - t * 30);
    bg.addColorStop(0, `rgb(${r1},${g1},${b1})`);
    bg.addColorStop(1, `rgb(${r2},${g2},${b2})`);
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // --- Draw photo with zoom + pan effect ---
    const baseScale = Math.max(W / img.naturalWidth, H / img.naturalHeight);
    const zoom = baseScale * (1 + p * 0.25); // subtle zoom in as scroll progresses
    const iw = img.naturalWidth  * zoom;
    const ih = img.naturalHeight * zoom;
    const ix = (W - iw) / 2;
    const iy = (H - ih) / 2 - p * H * 0.08; // subtle upward pan

    // Cinematic vignette clip — fade edges
    ctx.save();
    ctx.globalAlpha = 0.92 - p * 0.3; // fade photo out as we scroll
    ctx.drawImage(img, ix, iy, iw, ih);
    ctx.restore();

    // --- Dual tone color wash ---
    // Blue shadow on left
    const blueWash = ctx.createLinearGradient(0, 0, W * 0.55, 0);
    blueWash.addColorStop(0, `rgba(10, 20, 120, ${0.45 + p * 0.2})`);
    blueWash.addColorStop(1, 'rgba(10,20,120,0)');
    ctx.fillStyle = blueWash;
    ctx.fillRect(0, 0, W, H);

    // Orange highlight on right
    const orangeWash = ctx.createLinearGradient(W, H * 0.3, W * 0.4, H);
    orangeWash.addColorStop(0, `rgba(200, 80, 10, ${0.35 + p * 0.15})`);
    orangeWash.addColorStop(1, 'rgba(200,80,10,0)');
    ctx.fillStyle = orangeWash;
    ctx.fillRect(0, 0, W, H);

    // Purple neon accent mid-scroll
    if (p > 0.3) {
      const purpleWash = ctx.createRadialGradient(W * 0.5, H * 0.4, 0, W * 0.5, H * 0.4, W * 0.6);
      purpleWash.addColorStop(0, `rgba(108,99,255,${(p - 0.3) * 0.3})`);
      purpleWash.addColorStop(1, 'rgba(108,99,255,0)');
      ctx.fillStyle = purpleWash;
      ctx.fillRect(0, 0, W, H);
    }

    // --- Vignette overlay ---
    const vig = ctx.createRadialGradient(W/2, H/2, H*0.3, W/2, H/2, H*0.85);
    vig.addColorStop(0, 'rgba(0,0,0,0)');
    vig.addColorStop(1, `rgba(0,0,0,${0.6 + p * 0.2})`);
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, W, H);

    // --- Film grain (subtle) ---
    const grain = ctx.createImageData(W, H);
    for (let i = 0; i < grain.data.length; i += 4) {
      const v = (Math.random() - 0.5) * 18;
      grain.data[i]   = 128 + v;
      grain.data[i+1] = 128 + v;
      grain.data[i+2] = 128 + v;
      grain.data[i+3] = 12;
    }
    ctx.putImageData(grain, 0, 0);
  };

  useMotionValueEvent(progress, 'change', v => {
    progressRef.current = v;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => drawFrame(v));
  });

  // Draw initial frame when image loads
  useEffect(() => {
    if (ready) drawFrame(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  return (
    <div ref={containerRef} style={{ height: '500vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        {/* Dark fallback while image loads */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, #050510, #0d0d2b, #1a0533)',
        }} />
        <canvas
          ref={canvasRef}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
}
