import React, { useEffect, useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const PropsModel = ({ x, z, visibility }) => {
  if (!visibility) return null;

    //const meshRef = useRef();

    
    
    // const modelTexture = useTexture(gltf.scene.children[0].material.map);
    const { scene } = useGLTF('./models/scene.gltf');
    const clone = useMemo(() => scene.clone(true), [scene]);
    console.log(clone);
  

    useEffect(() => {
      clone.scale.set(3, 3, 3);
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