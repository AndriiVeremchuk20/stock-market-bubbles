'use client';

import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import Bubble from './Bubble';
import Walls from './Walls';

export const Box = () => {
  

	return (
    <>
      <Canvas orthographic camera={{ position: [0, 0, 100], zoom: 100 }}>
	<ambientLight/>	
	  <directionalLight intensity={100}/>
	  <Physics gravity={[0, 0, 0]} timeStep={1 / 60} interpolate>
        
		<Walls/>

		<Bubble scale={0.4} />
		<Bubble scale={0.4} />
		<Bubble scale={0.4} />
		<Bubble scale={0.4} />
		<Bubble scale={0.4} />
		<Bubble scale={0.4} />
		<Bubble scale={0.4} />
		<Bubble scale={0.4} />
		<Bubble scale={0.4} />
		<Bubble scale={0.4} />
		<Bubble scale={0.4} />
		<Bubble scale={0.4} />
          <Bubble scale={0.9} />
          <Bubble scale={0.9} />
          <Bubble scale={0.9} />
          <Bubble scale={0.9} />
          <Bubble scale={0.9} />
          <Bubble scale={0.9} />
          <Bubble scale={0.9} />
          <Bubble scale={0.9} />
          <Bubble scale={0.9} />
          <Bubble scale={0.9} />
          <Bubble scale={0.9} />
          <Bubble scale={0.9} />
          <Bubble scale={1} />
          <Bubble scale={1.5} />
          <Bubble scale={1.2} />
          <Bubble scale={1.1} />
         <Bubble scale={0.4} />
          <Bubble scale={0.9} />
          <Bubble scale={1} />
          <Bubble scale={1.5} />
          <Bubble scale={1.3} />
          <Bubble scale={1.1} />
 <Bubble scale={0.4} />
          <Bubble scale={0.9} />
          <Bubble scale={1} />
          <Bubble scale={1.5} />
          <Bubble scale={1.3} />
          <Bubble scale={1.1} />
         <Bubble scale={0.4} />
          <Bubble scale={0.9} />
          <Bubble scale={1} />
          <Bubble scale={1.2} />
          <Bubble scale={1.4} />
          <Bubble scale={1.3} />
		  </Physics>
      </Canvas>
    </>
  );
};
