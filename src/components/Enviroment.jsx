import {
    MeshReflectorMaterial,
    ContactShadows,
    OrbitControls,
    useHelper,
    Stage,
    Environment,
    Lightformer,
    AccumulativeShadows,
    RandomizedLight
  } from "@react-three/drei";
import Test from "./Test";
import Background from "./Background";
import Ground from "./Ground";
import Table from "./Table";
import React, { Suspense, useRef } from "react";
import { DirectionalLightHelper, PointLightHelper, SpotLightHelper } from "three";
import  { PropsModel } from "./PropsModel";
import { usePropsCustomization } from "../editor/PropsCustomizer";


export const Enviroment = () => {
  const { modelsState } = usePropsCustomization();


    return (
        <>
        <OrbitControls target={[0, 15, -20]} enableZoom={true} enablePan={true} enableRotate={true} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 3} maxAzimuthAngle={Math.PI / 2} minAzimuthAngle={-Math.PI / 2} enableDamping dampingFactor={0.2} rotateSpeed={0.3} zoomSpeed={0.3} panSpeed={0.3} />

        
        {/* <directionalLight
        maxDistance={50} minDistance={20}
        intensity={1.5}
        angle={0.6}
        penumbra={0.5}
        position={[30, 55, 50]}
        castShadow
        shadow-bias={-0.0001}
      />
      <pointLight
        color={[0.14, 0.5, 1]}
        intensity={2}
        angle={1}
        penumbra={0.5}
        position={[-10, 15, 10]}
        castShadow
        shadow-bias={-0.0001}
      /> */}

      {/* <Stage contactShadow shadows adjustCamera environment='warehouse' intensity={0.1} environmentIntensity={0.5}> */}
      <directionalLight position={[15, 10, 20]} castShadow intensity={1.5} shadow-mapSize={2048} shadow-bias={-0.001}>
      </directionalLight>
      <directionalLight position={[-8, 20, 20]} castShadow intensity={2} shadow-mapSize={2048} shadow-bias={-0.001}>
        <orthographicCamera attach="shadow-camera" args={[15.5, -15.5, -15.5, 20.5, 0.5, 80]} />
      </directionalLight>
      {/* <Environment preset="apartment" blur={0.5}/> */}

        <Test />
        <Background />
        <Ground />
        <Table />
        {Object.entries(modelsState).map(([modelName, modelState]) => {
          if (modelState.visibility) {
          return <PropsModel key={modelName} {...modelState} />;
        }
        return null;
        })}
    </>
  )
};

