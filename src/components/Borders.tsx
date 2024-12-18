import { PlaneProps, usePlane } from '@react-three/cannon';
import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { Mesh } from 'three';

const Plane = (props: PlaneProps) => {
  const { position, rotation } = props;
  const [ref, api] = usePlane<Mesh>(() => ({ ...props }));

  useEffect(() => {
    if (position) api.position.set(...position);
    if (rotation) api.rotation.set(...rotation);
  }, [api, position, rotation]);

  return (
    <mesh ref={ref}>
      <planeGeometry />
      <meshStandardMaterial color={"none"}/>
    </mesh>
  );
};

export const Borders = () => {
  const { viewport } = useThree();
  return (
    <>
    <Plane position={[0, -viewport.height / 2, 0]} rotation={[-Math.PI / 2, 0, 0]} />
      <Plane position={[-viewport.width / 2, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
      <Plane position={[viewport.width / 2 , 0, 0]} rotation={[0, -Math.PI / 2, 0]} />

	  <Plane position={[0, 0, 1]} rotation={[0, -Math.PI, 0]} />
      <Plane position={[0, 0, -1]} rotation={[0, 0, 0]} />
    </>
  );
};
