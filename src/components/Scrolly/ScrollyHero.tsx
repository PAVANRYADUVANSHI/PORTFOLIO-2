import { useRef } from 'react';
import ScrollyCanvas from './ScrollyCanvas';
import Overlay from './Overlay';

export default function ScrollyHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <ScrollyCanvas imageSrc="/avatar.jpg" />
      <div style={{ position: 'absolute', inset: 0, top: 0, pointerEvents: 'none' }}>
        <Overlay containerRef={containerRef} />
      </div>
    </div>
  );
}
