import React, { useEffect, useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export const PropsModel = ({ x, z, visibility, path }) => {
  if (!visibility) return null;

    // const modelTexture = useTexture(gltf.scene.children[0].material.map);
    const { scene } = useGLTF(path);
    const clone = useMemo(() => scene.clone(true), [scene]);
    useEffect(() => {
      clone.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
    , [clone]);
  
      return (
        <primitive object={clone} position={[x, 10, z]} scale={[10, 10, 10]}/> 
      );
  };
