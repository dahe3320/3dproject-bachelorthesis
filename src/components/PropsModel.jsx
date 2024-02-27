import React, { useEffect, useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const PropsModel = ({ x, z, visibility, path }) => {
  console.log(path);
  if (!visibility) return null;

    // const modelTexture = useTexture(gltf.scene.children[0].material.map);
    const { scene } = useGLTF(path);
    const clone = useMemo(() => scene.clone(true), [scene]);
    console.log(clone);
  

    useEffect(() => {
      clone.scale.set(3, 3, 3);
    });
  
      return (
        <primitive object={clone} position={[x, 0, z]} /> 
      );
  };

export default PropsModel;