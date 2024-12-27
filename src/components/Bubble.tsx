import { RigidBody, RapierRigidBody, BallCollider } from '@react-three/rapier';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { Float, Image, Text } from '@react-three/drei';
import { StockData } from '~/test-data';

interface BubbleProps {
  data: StockData;
}

const Bubble: React.FC<BubbleProps> = ({ data }) => {
  const scale = 1;

  const bubbleRef = useRef<RapierRigidBody>(null);
  const [initialPos] = useState<[number, number, number]>([
    THREE.MathUtils.randFloatSpread(4),
    THREE.MathUtils.randFloatSpread(4),
    0,
  ]);

  const [isPointing, setIsPointing] = useState<boolean>(false);

  const handlePointerEnter = () => {
    setIsPointing(true);
  };

  const handlePointerLeave = () => {
    setIsPointing(false);
  };

  return (
    <RigidBody
      ref={bubbleRef}
      position={initialPos}
      colliders={false}
      enabledRotations={[false, false, false]}
      enabledTranslations={[true, true, false]}
      linearDamping={1}
      angularDamping={1}
      friction={0.1}
      scale={isPointing ? scale + 0.1 : scale}
    >
      <Float speed={4}>
        <BallCollider args={[1.1]} />
        <mesh
          scale={scale}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
        >
          <circleGeometry args={[1, 64]} />
          <meshBasicMaterial transparent={true} />
          <meshStandardMaterial transparent={true} color={data.value > 0 ? "green":"red"}/>
          <Text
            letterSpacing={-0.05}
            position={[0, -0.2, 0.01]}
            fontSize={0.425}
            material-toneMapped={false}
          >
            {data.value}
          </Text>
        </mesh>
        <mesh scale={0.95} position={[0, 0, 0.01]}>
          <ringGeometry args={[0.9, 1, 64]} />
          <meshStandardMaterial color={'rink'} />
        </mesh>
        <Image
          position={[0, 0.45, 0.01]}
          scale={0.7}
          transparent
          toneMapped={false}
          url={data.image}
        />
      </Float>
    </RigidBody>
  );
};

export default Bubble;
