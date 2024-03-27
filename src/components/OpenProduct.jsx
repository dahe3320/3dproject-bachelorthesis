
import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three';
import { useModelCustomization } from '../editor/ModelCustomizer';

export const OpenProduct = React.memo((props) => {
  const { positionX, positionZ, positionY, rotation, spiralColor, bandColor } = useModelCustomization();
  const { nodes, materials } = useGLTF('./models/product_open.glb');

  useEffect(() => {
    materials.Metall.color = new THREE.Color(spiralColor.color);
  }, [spiralColor.color]);
  return (
    <group {...props} dispose={null} position={[positionX, positionY, positionZ]}>
      <group scale={0.5} rotation={[rotation.x, rotation.y, rotation.z]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.FrontCover.geometry}
        material={nodes.FrontCover.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Paper.geometry}
        material={materials['Material.008']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BackCover.geometry}
        material={nodes.BackCover.material}
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
      geometry={nodes.Spiral.geometry} 
      material={materials.Metall} 
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Paper001.geometry}
        material={materials['Material.007']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BezierCurve.geometry}
        material={nodes.BezierCurve.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.PlasticFilm315.geometry}
        material={materials['Plastic film.005']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.PlasticFilm001.geometry}
        material={materials['Plastic film.005']}
      />
      </group>
    </group>
  )
});
export default OpenProduct;

useGLTF.preload('/product_open.glb')

