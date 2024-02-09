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
import Ground from "./Ground";


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
            <Ground />
        </Stage> 
      {/* </PresentationControls> */}
    </>
  )
};

export default Enviroment;