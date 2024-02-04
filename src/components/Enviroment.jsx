import {
    MeshReflectorMaterial,
    Stage,
    ContactShadows,
    OrbitControls,
  } from "@react-three/drei";
// import Diary from "./Diary";
// import Notebook from "./Notebook";
import Scene from "./Scene";
import Background from "./Background";


const Enviroment = () => {
    return (
        <>
        {/* <PresentationControls
            speed={1.5}
            global
            polar={[-0.1, Math.PI / 4]}
            rotation={[Math.PI / 8, Math.PI / 4, 0]}
        > */}
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <directionalLight castShadow position={[0, 10, 0]} />
        <Stage>
            <Scene />
            <Background />
        </Stage> 
        <mesh rotation={[-Math.PI / 2, 0, 0]} position-y={-4}>
          <planeGeometry args={[170, 170]} />
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={2048}
            mixBlur={1}
            mixStrength={40}
            roughness={0.8}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#0d0427"
            metalness={0.2}
          />
        </mesh>
      {/* </PresentationControls> */}
    </>
  )
};

export default Enviroment;