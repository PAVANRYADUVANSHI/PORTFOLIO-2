import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Stars, OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

function FloatingSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.15;
    }
  });
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.4, 4]} />
        <MeshDistortMaterial
          color="#6c63ff"
          emissive="#6c63ff"
          emissiveIntensity={0.4}
          distort={0.35}
          speed={2}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

function FloatingRing({ position, rotation, color }: {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.z = clock.getElapsedTime() * 0.4;
  });
  return (
    <mesh ref={ref} position={position} rotation={rotation}>
      <torusGeometry args={[0.8, 0.04, 16, 100]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
    </mesh>
  );
}

function ParticleField() {
  const count = 200;
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return g;
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.05;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.025} color="#00d4ff" transparent opacity={0.6} />
    </points>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#6c63ff" />
      <pointLight position={[-5, -5, 5]} intensity={1.5} color="#00d4ff" />
      <pointLight position={[0, 0, -5]} intensity={1} color="#ff6b9d" />

      <Stars radius={50} depth={50} count={1000} factor={2} fade speed={0.5} />
      <ParticleField />
      <FloatingSphere />
      <FloatingRing position={[0, 0, 0]} rotation={[Math.PI / 3, 0, 0]} color="#6c63ff" />
      <FloatingRing position={[0, 0, 0]} rotation={[Math.PI / 6, Math.PI / 4, 0]} color="#00d4ff" />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI * 0.6}
        minPolarAngle={Math.PI * 0.4}
      />

      <EffectComposer>
        <Bloom intensity={1.2} luminanceThreshold={0.3} luminanceSmoothing={0.9} />
      </EffectComposer>
    </Canvas>
  );
}
