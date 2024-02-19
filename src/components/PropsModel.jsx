import React, { useEffect, useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";

const PropsModel = ({ x, z, visibility }) => {
  if (!visibility) return null;

    //const meshRef = useRef();

    const url = './models/coffee_mug__kaffeetasse.glb';
    
    // const modelTexture = useTexture(gltf.scene.children[0].material.map);
    const { scene } = useGLTF(url);

    const clone = useMemo(() => scene.clone(true), [scene]);
  

    useEffect(() => {
      clone.scale.set(0.05, 0.05, 0.05);
    });
    // useEffect(() => {
    //   meshRef.current = clone;
    //   console.log(meshRef.current);
    //   if (meshRef.current) {
    //   meshRef.current.position.set(x, 0, z);
    //   }
    //   }, [x, z]);
  
      return (
        <primitive object={clone} position={[x, 0, z]} /> 
      );
  };

export default PropsModel;