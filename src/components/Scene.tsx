'use client';

import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import Bubble from './Bubble';
import Walls from './Walls';
import { TestData } from '~/test-data';
import { OrbitControls } from '@react-three/drei';

export const Box = () => {
  return (
    <>
      <Canvas orthographic camera={{ position: [0, 0, 100], zoom: 100 }}>
        <ambientLight intensity={4} />
        <directionalLight intensity={10} />
        <Physics gravity={[0, 0, 0]} timeStep={1 / 60} interpolate>
          <group>
            <Walls />
            {[...TestData, ...TestData, ...TestData, ...TestData].map(
              (data) => (
                <Bubble data={data} key={data.id} />
              )
            )}
          </group>
        </Physics>
        <OrbitControls />
      </Canvas>
    </>
  );
};
