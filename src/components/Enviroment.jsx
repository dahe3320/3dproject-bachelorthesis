import {
    MeshReflectorMaterial,
    ContactShadows,
    OrbitControls,
    useHelper,
    Stage,
    Environment,
    PerspectiveCamera,
  } from "@react-three/drei";
import Product from "./Product";
import Test from "./Test";
import Background from "./Background";
import Ground from "./Ground";
import React, { Suspense, useRef } from "react";
import { DirectionalLightHelper, PointLightHelper, SpotLightHelper } from "three";
import { Raytracer } from "@react-three/lgl";
import  PropsModel from "./PropsModel";
import { usePropsCustomization } from "../editor/PropsCustomizer";


const Enviroment = () => {
  // const dirLght = useRef();
  //     useHelper(dirLght, DirectionalLightHelper,'red');
  // const lghgh = useRef();
  //     useHelper(lghgh, PointLightHelper,'red');
  const { modelsState } = usePropsCustomization();


    return (
        <>
        <OrbitControls target={[0, 0.35, 0]}
        maxPolarAngle={1.45}/>

        {/* <directionalLight ref={dirLght}
        intensity={1.5}
        angle={0.6}
        penumbra={0.5}
        position={[30, 55, 50]}
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
      /> */}
       <Stage environment="apartment" intensity={0.05} castShadow={true}>
        <Product />
        <Test />
        <Background />
        <Ground />
        {Object.entries(modelsState).map(([modelName, modelState]) => {
          if (modelState.visibility) {
          return <PropsModel key={modelName} {...modelState} />;
        }
        return null;
        })}
        </Stage>
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