import { SphereProps, useSphere } from '@react-three/cannon';
import { useThree } from '@react-three/fiber';
import { Mesh } from 'three';

export const Bubble = (props: SphereProps) => {

  const radius = Math.random() * (1-.5) + .5;
  const { viewport } = useThree();
  const [ref, api] = useSphere<Mesh>(() => ({
	mass: radius,
    position: [4 - Math.random() * 8, viewport.height * 3, 0],
	args: [radius],
    ...props,
  }));

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[radius, 10,4]} />
      <meshBasicMaterial toneMapped={false} wireframe vertexColors color={'red'} />
    </mesh>
  );
};
