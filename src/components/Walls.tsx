import { useThree } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import React from 'react';

interface WallsProps {
  thickness?: number; // Толщина стенок (по умолчанию 1)
}

const Walls: React.FC<WallsProps> = ({ thickness = 0 }) => {
  const {
    viewport: { width, height },
  } = useThree();
  // Позиции стенок
  const halfWidth = width / 2;
  const halfHeight = height / 2;

  return (
    <>
      {/* Левая стенка */}
      <RigidBody type='fixed' position={[-halfWidth, 0, 0]} restitution={10}>
        <mesh>
          <boxGeometry args={[thickness, height, thickness]} />
          <meshStandardMaterial color='gray' />
        </mesh>
      </RigidBody>

      {/* Правая стенка */}
      <RigidBody type='fixed' position={[halfWidth, 0, 0]} restitution={1}>
        <mesh>
          <boxGeometry args={[thickness, height, thickness]} />
          <meshStandardMaterial color='gray' />
        </mesh>
      </RigidBody>

      {/* Верхняя стенка */}
      <RigidBody type='fixed' position={[0, halfHeight, 0]} restitution={1}>
        <mesh>
          <boxGeometry args={[width, thickness, thickness]} />
          <meshStandardMaterial color='gray' />
        </mesh>
      </RigidBody>

      {/* Нижняя стенка */}
      <RigidBody type='fixed' position={[0, -halfHeight, 0]} restitution={1}>
        <mesh>
          <boxGeometry args={[width, thickness, thickness]} />
          <meshStandardMaterial color='gray' />
        </mesh>
      </RigidBody>
    </>
  );
};

export default Walls;
