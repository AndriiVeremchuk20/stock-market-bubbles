import {usePlane} from "@react-three/p2";

export const Border = () => {
  // Creates the screen borders as planes
  usePlane(() => ({
    position: [0, 8], // top border
    angle: -Math.PI / 2,
  }));
  usePlane(() => ({
    position: [0, -8], // bottom border
    angle: Math.PI / 2,
  }));
  usePlane(() => ({
    position: [-8, 0], // left border
    angle: Math.PI,
  }));
  usePlane(() => ({
    position: [8, 0], // right border
  }));
  return null;
};
