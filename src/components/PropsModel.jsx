import React, { useEffect, useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const PropsModel = ({ x, z, visibility, path }) => {
  console.log(path);
  console.log(visibility);
  if (!visibility) return null;

    // const modelTexture = useTexture(gltf.scene.children[0].material.map);
    const { scene } = useGLTF(path);
    const clone = useMemo(() => scene.clone(true), [scene]);
    useEffect(() => {
      clone.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          if (child.material.map) {
            child.material = new THREE.MeshStandardMaterial({
              map: child.material.map,
              color: 0xffffff,
            });
          }
        }
      });
    }
    , [clone]);
  
      return (
        <primitive object={clone} position={[x, 0, z]} /> 
      );
  };

export default PropsModel;