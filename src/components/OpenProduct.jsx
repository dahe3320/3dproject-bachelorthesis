import React, { useEffect, useRef } from 'react'
import { Decal, MeshReflectorMaterial, useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three';
import { useModelCustomization } from '../editor/ModelCustomizer';

export const OpenProduct = React.memo((props) => {
    const { leftPageTxt, rightPageTxt, positionX, positionZ, positionY, rotation, spiralColor, frameColor } = useModelCustomization();
    const { nodes, materials } = useGLTF('./models/product_open.glb');

    const leftDefaultPage = useTexture('./src/assets/leftPage.png');
    const rightDefaultPage = useTexture('./src/assets/rightPage.png');

    const currentLeftPageTxt = leftPageTxt || leftDefaultPage;
    const currentRightPageTxt = rightPageTxt || rightDefaultPage;

    useEffect(() => {
        materials['Metall.004'].color = new THREE.Color(spiralColor.color);
        materials['Metall.004'].roughness = 0.4;
        materials['Metall.004'].needsUpdate = true;
    }, [spiralColor.color]);

  return (
    <group {...props} dispose={null} position={[positionX, positionY, positionZ]}>
      <group scale={0.5} rotation={[rotation.x, rotation.y, rotation.z]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.FrontCover001.geometry}
        material={nodes.FrontCover001.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Paper.geometry}>
        <MeshReflectorMaterial color={frameColor.color}/>
          <Decal 
            position={[0, 0, -7.3]}
            rotation={[-7.85, 0, 1.57]}
            scale={[12, 18.5, 10]}
            >
              <meshStandardMaterial 
                map={currentRightPageTxt} 
                polygonOffset={true}
                polygonOffsetFactor={-1} 
                castShadow={true} 
              />
          </Decal>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BackCover001.geometry}
        material={nodes.BackCover001.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        material={materials['Metall.004']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Spiral.geometry}
        material={materials['Metall.004']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Paper001.geometry}>
        <MeshReflectorMaterial color={frameColor.color} />
          <Decal 
            position={[0, 0, 7.3]}
            rotation={[-7.85, 0, 1.57]}
            scale={[12, 18.5, 10]}
            >
              <meshStandardMaterial 
                map={currentLeftPageTxt} 
                polygonOffset={true} 
                polygonOffsetFactor={-1} 
                castShadow={true} 
              />
          </Decal>
     </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BezierCurve002.geometry}
        material={nodes.BezierCurve002.material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.PlasticFilm315.geometry}
        material={materials['Plastic film.003']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.PlasticFilm001.geometry}
        material={materials['Plastic film.003']}
      />
      </group>
    </group>
  )
});

export default OpenProduct;

useGLTF.preload('/product_open.glb')