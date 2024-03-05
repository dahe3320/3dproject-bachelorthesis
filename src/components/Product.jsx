import React, { useRef } from "react";
import { Decal, useGLTF, useTexture, Text } from '@react-three/drei'
import * as THREE from 'three';
import { useModelCustomization } from '../editor/ModelCustomizer';

function Product(props) {
  const { coverTexture, positionX, positionZ, spiralColor, bandColor, textValue, textColor } = useModelCustomization();  
  const { nodes, materials } = useGLTF("./models/product.glb");

      // Use a default texture initially
      const defaultTexture = useTexture('./src/assets/moomin-9groke.jpg');

      // If coverTexture is not set, use the default texture
      const currentTexture = coverTexture || defaultTexture;
  
    //coverTexture.repeat.set(2,2);
    //coverTexture.wrapS = coverTexture.wrapT = THREE.RepeatWrapping;
    
  return (
    <group {...props} dispose={null} position={[positionX, 0, positionZ]}>
        <group scale={0.5}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BezierCurve003.geometry}>
            <meshBasicMaterial color={bandColor.color} />
        </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.PlasticFilm003.geometry}
        material={materials["Plastic film.001"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder003.geometry}
        material={materials.Metall}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BackCover001.geometry}
        material={materials["Material.001"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.FrontCover002.geometry}>
            <meshBasicMaterial transparent opacity={0}/>
            <Decal
            position={[0, -0.03, 0]}
            rotation={[1.57, 0, 0]}
            scale={[0.25, 0.31, 0.1]}
            >
            <Text 
            position={[0, -0.01, 0]} // adjust these values
            rotation={[1.57, 0, 0]} // adjust these values
            scale={[0.01, 0.01, 0.05]} // adjust these values
            >
              {textValue}
              <meshBasicMaterial color={new THREE.Color(textColor)} />
            </Text>  
              <meshBasicMaterial 
                map={currentTexture}
                polygonOffset
                polygonOffsetFactor={1} /> 
            </Decal>
        </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Papers006.geometry}
        material={nodes.Papers006.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Spiral.geometry}>
            <meshBasicMaterial color={spiralColor.color} />
        </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder002.geometry}
        material={materials.Metall}
      />
      </group>
    </group>
  );
}
export default Product;

useGLTF.preload("/product.glb");