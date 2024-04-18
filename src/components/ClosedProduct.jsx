import React, { useEffect, useRef } from "react";
import { Decal, useGLTF, useTexture, MeshReflectorMaterial } from '@react-three/drei'
import * as THREE from 'three';
import { useModelCustomization } from '../editor/ModelCustomizer';

export const ClosedProduct = React.memo((props) => {
    const rubberRef = useRef();
    const { coverTexture, positionX, positionZ, positionY, rotation, spiralColor, bandColor, bandTexture } = useModelCustomization();
    const { nodes, materials } = useGLTF('./models/product_closed.glb');

    const defaultTexture = useTexture('./src/assets/Illustration-three-lemons.jpg');

    const currentTexture = coverTexture || defaultTexture;

    useEffect(() => {
        materials.Metall.color = new THREE.Color(spiralColor.color);
        materials.Metall.metalness = 1;
        materials.Metall.roughness = 0;
        materials.Metall.needsUpdate = true;
      }, [spiralColor.color]);

      useEffect(() => {
        const material = rubberRef.current;
    
        if (bandTexture) {
          const loader = new THREE.TextureLoader();
          loader.load(bandTexture, (texture) => {
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(1, 1);
            material.color.set(0xffffff);
            material.map = texture;
            material.needsUpdate = true;
          });
        } else {
          material.map = null;
          material.color.set(bandColor.color);
          material.needsUpdate = true;
        }
      }, [bandColor.color, bandTexture]);


  return (
    <group {...props} dispose={null} position={[positionX, positionY, positionZ]}>
        <group scale={0.5} rotation={[rotation.x, rotation.y, rotation.z]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Papiers001.geometry}
        material={nodes.Papiers001.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.plastic_Film002.geometry}
        material={materials['Plastic film.001']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.plastic_Film003.geometry}
        material={materials['Plastic film.001']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BackCover002.geometry}
        material={nodes.BackCover002.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.FrontCover002.geometry}>
        <MeshReflectorMaterial transparent opacity={0}/>
          <Decal
          position={[0, 0, -0.5]}
          rotation={[-7.85, 0, 1.57]}
          scale={[14, 21, 10]}
          >
            <meshStandardMaterial
              map={currentTexture}
              polygonOffset={true}
              castShadow={true}
               /> 
          </Decal>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Spiral002.geometry}
        material={materials.Metall}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder002.geometry}
        material={materials['Metall.001']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder003.geometry}
        material={materials['Material.001']}>
        <meshPhysicalMaterial 
         ref={rubberRef}
         color={bandColor.color}
         map={bandTexture ? new THREE.TextureLoader().load(bandTexture) : null} />
        </mesh>
        </group>
    </group>
  );
});
export default ClosedProduct;

useGLTF.preload('/product_closed.glb')

