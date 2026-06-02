import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

interface Props {
  frames: string[];       // array of image src URLs
  totalFrames: number;
}

export default function ScrollyCanvas({ frames, totalFrames }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const images       = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded]   = useState(false);
  const [frameIdx, setFrameIdx] = useState(0);

  const { scrollYProgress } = useScroll({ target: containerRef });
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, totalFrames - 1]);

  // preload all frames
  useEffect(() => {
    if (frames.length === 0) { setLoaded(true); return; }
    let count = 0;
    images.current = frames.map(src => {
      const img = new Image();
      img.src = src;
      img.onload = () => { count++; if (count === frames.length) setLoaded(true); };
      img.onerror = () => { count++; if (count === frames.length) setLoaded(true); };
      return img;
    });
  }, [frames]);

  // draw frame on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = images.current[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const { width, height } = canvas;
    const scale = Math.max(width / img.naturalWidth, height / img.naturalHeight);
    const x = (width  - img.naturalWidth  * scale) / 2;
    const y = (height - img.naturalHeight * scale) / 2;
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);
  }, [frameIdx, loaded]);

  useMotionValueEvent(frameIndex, 'change', v => {
    setFrameIdx(Math.round(Math.max(0, Math.min(totalFrames - 1, v))));
  });

  // resize canvas to fill viewport
  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <div ref={containerRef} style={{ height: '500vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        {/* Fallback animated gradient shown when no frames provided */}
        <div className="scrolly-gradient-bg" />
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            opacity: loaded && frames.length > 0 ? 1 : 0,
            transition: 'opacity 0.5s',
          }}
        />
      </div>
    </div>
  );
}
