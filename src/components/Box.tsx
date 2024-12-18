'use client';

import { Physics } from '@react-three/cannon';
import { Canvas } from '@react-three/fiber';
import { Borders } from './Borders';
import { Bubble } from './Bubble';
import {OrbitControls} from '@react-three/drei';

export const Box = () => {
  return (
    <Canvas orthographic camera={{ position: [0, 0, 100], zoom: 100 }}>
      <ambientLight intensity={0.5} />
  <pointLight position={[100, 100, 100]} /> 
	

  <Physics gravity={[0, -4, 0]}>
        <group position={[0, 0, -10]}>
          <Borders />
          
          <Bubble />
          <Bubble />
          <Bubble />
          <Bubble />
          <Bubble />
          <Bubble />
          <Bubble />
          <Bubble />
          <Bubble />
          <Bubble />
          <Bubble />
          <Bubble />
          <Bubble />
          <Bubble />
          <Bubble />
          <Bubble />
          <Bubble />
          <Bubble />
          <Bubble />
          <Bubble />
          <Bubble />
          <Bubble />
          <Bubble />
          <Bubble />
          <Bubble />
          <Bubble />
          <Bubble />
          <Bubble />
          <Bubble />
          <Bubble />
		  <Bubble />
        </group>
      </Physics>
    </Canvas>
  );
};
