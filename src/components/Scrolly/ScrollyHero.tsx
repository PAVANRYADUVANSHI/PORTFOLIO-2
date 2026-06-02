import { useRef } from 'react';
import ScrollyCanvas from './ScrollyCanvas';
import Overlay from './Overlay';

interface Props {
  frames?: string[];
}

export default function ScrollyHero({ frames = [] }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <ScrollyCanvas frames={frames} totalFrames={Math.max(frames.length, 1)} />
      <div style={{ position: 'absolute', inset: 0, top: 0, pointerEvents: 'none' }}>
        <Overlay containerRef={containerRef} />
      </div>
    </div>
  );
}
