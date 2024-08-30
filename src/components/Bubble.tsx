import { Circle, Edges, Image, Text } from '@react-three/drei';
import { ThreeEvent, useFrame } from '@react-three/fiber';
import { useCircle } from '@react-three/p2';
import { useState } from 'react';
import { Mesh } from 'three';

export const Bubble = ({
  name,
  image,
  value,
}: {
  name: string;
  image: string;
  value: number;
}) => {
  const [isDraving, setIsDraving] = useState<boolean>(false);
  const [ref, api] = useCircle(() => ({
    mass: 0,
		position: [Math.random() * 5 - 3, Math.random() * 10 - 5], // Random starting position
    restitution: 1, // Bounciness factor, adjust for more or less bounce
		type: "Dynamic"
  }));

  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    if (!ref.current || !isDraving) return;

    api.position.set(event.point.x, event.point.y);
  };

  useFrame(() => {
    if (!ref.current) return;
    const scaleValue = isDraving ? 1.2 : 1;
    ref.current.scale.set(scaleValue, scaleValue, scaleValue);
  });

  return (
    <mesh
      ref={ref as React.RefObject<Mesh>}
      onPointerUp={(e) => {
        e.stopPropagation();
        setIsDraving(false);
      }}
      onPointerDown={(e) => {
        // click
        e.stopPropagation();
        setIsDraving(true);
        const { x, y } = e.point;
        api.position.set(x, y);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setIsDraving(true);
      }}
      onPointerLeave={(e) => {
        e.stopPropagation();
        setIsDraving(false);
      }}
      onPointerMove={handlePointerMove}
    >
      <circleGeometry args={[1, 30]} />
      <meshStandardMaterial color={'blue'} wireframe />
			{/*<Image
          url={image}
          scale={[1, 1]} // Adjust the scale to match the circle
          position={[0, 0, 0.1]} // Slightly offset on the Z-axis to avoid z-fighting
        />
      {/*<Text anchorY={'middle'}>{name}</Text>*/}
    </mesh>
  );
};
