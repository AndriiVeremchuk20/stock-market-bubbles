'use client';

import { useThree } from '@react-three/fiber';
import { usePlane } from '@react-three/p2';
import { useMemo } from 'react';
import { Mesh } from 'three';

type BoundaryProps = {
  size: [number, number];
  position: [number, number];
};

export const Boundary = ({ position, size }: BoundaryProps) => {
  const { viewport } = useThree();
  const width = useMemo(() => viewport.width, [viewport.width]);
  const [ref] = usePlane(() => ({
    mass: 0,
    position,
    type: 'Static',
    restitution: 1,
  }));

  return (
    <mesh ref={ref as React.RefObject<Mesh>}>
      <planeGeometry args={[width, 0.01]} />
      <meshStandardMaterial color='red' wireframe />
    </mesh>
  );
};
