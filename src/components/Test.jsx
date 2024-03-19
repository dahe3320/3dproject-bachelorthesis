/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useRef } from "react";
import { Decal, useGLTF, useTexture, Text, MeshReflectorMaterial } from '@react-three/drei'
import * as THREE from 'three';
import { useModelCustomization } from '../editor/ModelCustomizer';

export const Test = React.memo((props) => {
  const { coverTexture, positionX, positionZ, positionY, rotation, spiralColor, bandColor } = useModelCustomization();
  const { nodes, materials } = useGLTF("./models/product-testing2.glb");
  // Use a default texture initially
  const defaultTexture = useTexture('./src/assets/Illustration-three-lemons.jpg');

  // If coverTexture is not set, use the default texture
  const currentTexture = coverTexture || defaultTexture;

  // Kan fixas till bandColor också om jag implementerar en tyg-aktig texture i blender och sedan ändrar färgen på den
  useEffect(() => {
    materials.Metall.color = new THREE.Color(spiralColor.color);
  }, [spiralColor.color]);

  return (
    <group {...props} dispose={null} position={[positionX, positionY, positionZ]}>
        <group scale={0.5} rotation={[rotation.x, rotation.y, rotation.z]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Paper.geometry}
        material={nodes.Paper.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        material={materials.Metall}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rubberband.geometry}>
           <meshPhysicalMaterial color={bandColor.color} />
        </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Spiral.geometry} 
        material={materials.Metall}

        />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane.geometry}>
          <MeshReflectorMaterial transparent opacity={0}/>
            <Decal
            position={[0, 0, -0.5]}
            rotation={[-7.85, 0, 1.57]}
            scale={[14, 21, 10]}
            >
              <MeshReflectorMaterial
                map={currentTexture}
                polygonOffset={true}
                castShadow={true}
                 /> 
            </Decal>
        </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane_1.geometry}
        material={nodes.Plane_1.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane050.geometry}
        material={nodes.Plane050.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane050_1.geometry}
        material={nodes.Plane050_1.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane006.geometry}
        material={materials["Plastic film.001"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane006_1.geometry}
        material={materials["Plastic film.001"]}
      />
      </group>
    </group>
  );
});
export default Test;

useGLTF.preload("./models/product-testing2.glb");