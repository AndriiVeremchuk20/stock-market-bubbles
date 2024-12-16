'use client';

import { Physics } from '@react-three/cannon';
import { Canvas } from '@react-three/fiber';
import { StockData } from '~/test-data';
import { Borders } from './Borders';

export const Box = () => {
  return (
    <Canvas orthographic camera={{ position: [0, 0, 100], zoom: 100 }}>
      <Physics>
        <group>
          <Borders />
        </group>
      </Physics>
    </Canvas>
  );
};
