'use client';

import { Canvas } from '@react-three/fiber';
import { Bubble } from './Bubble';
import { Physics } from '@react-three/p2';
import { type StockData } from '~/test-data';
import { Bottom, LeftBoundary, RightBoundary, Top } from './bottom';
import {Border} from './border';
import {OrbitControls} from '@react-three/drei';

export const Box = ({data}:{data: StockData[]}) => {
  return (
    <Canvas orthographic camera={{ position: [0, 0, 10], zoom: 100 }}>
      <Physics normalIndex={2} gravity={[0, 0]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 0, 10]} />
        <color attach='background' args={['black']} />

          {data.map((d) => (
            <Bubble key={d.id} name={d.name} image={d.image} value={d.value} />
          ))}
					<Bottom/>
					<Top/>

					<LeftBoundary/>
      </Physics>
    </Canvas>
  );
};
