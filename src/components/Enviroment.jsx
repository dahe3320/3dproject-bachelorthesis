import {
    MeshReflectorMaterial,
    ContactShadows,
    OrbitControls,
    useHelper,
    SpotLight,
    Environment,
    PerspectiveCamera,
  } from "@react-three/drei";
// import Diary from "./Diary";
// import Notebook from "./Notebook";
import Scene from "./Scene";
import Background from "./Background";
import Ground from "./Ground";
import React, { Suspense, useRef } from "react";
import { DirectionalLightHelper, PointLightHelper, SpotLightHelper } from "three";
import { Raytracer } from "@react-three/lgl";


const Enviroment = () => {
  const dirLght = useRef();
      useHelper(dirLght, DirectionalLightHelper,'red');
  const lghgh = useRef();
      useHelper(lghgh, PointLightHelper,'red');
  


    return (
        <>
        <OrbitControls target={[0, 0.35, 0]}
        maxPolarAngle={1.45}/>

        <directionalLight ref={dirLght}
        intensity={1.5}
        angle={0.6}
        penumbra={0.5}
        position={[0, 25, 20]}
        castShadow
        shadow-bias={-0.0001}
      />
      <pointLight ref={lghgh}
        color={[0.14, 0.5, 1]}
        intensity={2}
        angle={0.6}
        penumbra={0.5}
        position={[-10, 15, 10]}
        castShadow
        shadow-bias={-0.0001}
      />
       
        <Scene />
        <Background />
        <Ground />
    </>
  )
};

export default Enviroment;

{/* <spotLight ref={dirLght} intensity={2} angle={1} penumbra={1} position={[2, 5, 5]} shadow-mapSize-width={64} shadow-mapSize-height={64} castShadow shadow-bias={-0.001} scale={0.001} /> 

 <PresentationControls
    speed={1.5}
    global
    polar={[-0.1, Math.PI / 4]}
    rotation={[Math.PI / 8, Math.PI / 4, 0]}
> 
 </PresentationControls> */}