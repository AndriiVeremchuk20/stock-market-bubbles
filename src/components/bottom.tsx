import { Edges } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useBox, usePlane } from '@react-three/p2';
import { useMemo } from 'react';
import { Mesh } from 'three';

export const Bottom = () => {
  const { viewport } = useThree();
  const width = useMemo(() => viewport.width, [viewport.width]);

  const [ref] = usePlane(() => ({
    position: [0, -viewport.height / 2], // Adjust position to fit the viewport
		angle: Math.sin(Math.PI),
  }));

  return (
    <mesh ref={ref as React.RefObject<Mesh>}>
      <planeGeometry args={[width, 1]} /> {/* Slightly thicker boundary */}
      <meshStandardMaterial color='red' wireframe/>
    </mesh>
  );
};

export const Top = () => {
  const { viewport } = useThree();
  const width = useMemo(() => viewport.width, [viewport.width]);

  const [ref] = usePlane(() => ({
    position: [0, viewport.height / 2], // Adjust position to fit the viewport
		angle: -Math.PI,
  }));

  return (
    <mesh ref={ref as React.RefObject<Mesh>}>
      <planeGeometry args={[width, 1]} /> {/* Slightly thicker boundary */}
      <meshStandardMaterial color='red' wireframe/>
    </mesh>
  );
};


export const LeftBoundary = () => {
  const { viewport } = useThree();
  const height = useMemo(() => viewport.height, [viewport.height]);

  const [ref] = usePlane(() => ({
    position: [-viewport.width / 2, 0], // Adjust position to fit the viewport
		angle: Math.PI/2,
  }));

  return (
    <mesh ref={ref as React.RefObject<Mesh>}>
      <planeGeometry args={[height, 1]} /> {/* Slightly thicker boundary */}
      <meshStandardMaterial color='green' wireframe/>
    </mesh>
  );
}
// Правая граница
export const RightBoundary = () => {
  const { viewport } = useThree();
  const height = useMemo(() => viewport.height, [viewport.height]);

  const [ref] = usePlane(() => ({
		position: [viewport.width / 2, 0], // Adjust position to fit the viewport
		angle: -Math.PI,
  }));

  return (
    <mesh ref={ref as React.RefObject<Mesh>}>
      <planeGeometry args={[1, height]} /> {/* Slightly thicker boundary */}
      <meshStandardMaterial color={"green"} wireframe/>
    </mesh>
  );
}
