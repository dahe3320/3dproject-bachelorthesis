import React, { useEffect, useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";

const PropsModel = ({ x, z }) => {
    const meshRef = useRef();

    const url = './models/coffee.gltf';
    
    // const modelTexture = useTexture(gltf.scene.children[0].material.map);
    const { scene } = useGLTF(url);

    const clone = useMemo(() => scene.clone(true), [scene]);
  
    useEffect(() => {
      meshRef.current = clone;
      console.log(meshRef.current);
      if (meshRef.current) {
      meshRef.current.position.set(x, 0, z);
      }
      }, [x, z]);
  
      return <primitive object={clone} ref={meshRef} />;
  };

export default PropsModel;