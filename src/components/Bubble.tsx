import { RigidBody, RapierRigidBody, BallCollider } from "@react-three/rapier";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {Float} from "@react-three/drei";

interface BubbleProps {
  scale: number;
}

const Bubble: React.FC<BubbleProps> = ({ scale }) => {
  const bubbleRef = useRef<RapierRigidBody>(null);
  const [initialPos] = useState<[number, number, number]>([
    THREE.MathUtils.randFloatSpread(4),
    THREE.MathUtils.randFloatSpread(4),
    0,
  ]);

  const vec = new THREE.Vector3();
/*
  useFrame(() => {
    if (bubbleRef.current) {
      const translation = bubbleRef.current.translation();
      if (translation) {
        bubbleRef.current.applyImpulse(
          vec.copy(translation).negate().multiplyScalar(scale * scale),
          true
        );
      }
    }
  });
*/
  return (
    <RigidBody
      ref={bubbleRef}
      position={initialPos}
      colliders="ball"
	  restitution={0.5}
	  enabledRotations={[false, false, false]}
      enabledTranslations={[true, true, false]} linearDamping={2} angularDamping={1} friction={0.1}
    >
	<Float speed={2}>
	 <BallCollider args={[1.1]} />
      <mesh scale={scale}>
        <circleGeometry args={[1, 64]} />
        <meshStandardMaterial color="red" />
      </mesh>
	</Float>
    </RigidBody>
  );
};

export default Bubble;
