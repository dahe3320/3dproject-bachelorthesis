import React from 'react';
import { MeshReflectorMaterial, useTexture } from '@react-three/drei';
import { useCustomization } from '../editor/Customize';
import * as THREE from 'three';

const Ground = () => {
    const { groundTxt } = useCustomization();
    
    const texture = useTexture(groundTxt.src);
    console.log(groundTxt.src);

    return (
        <mesh position={[0 , -4, -5]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[40, 40]} />
            <MeshReflectorMaterial
            attach="material" 
            map={texture}
            side={THREE.DoubleSide}
            dithering={true}
            roughness={0.7}
            blur={[1000, 400]} 
            mixBlur={30} 
            mixStrength={80} 
            mixContrast={1}
            resolution={1024} 
            mirror={0} 
            depthScale={0.01} 
            minDepthThreshold={0.9}
            maxDepthThreshold={1} 
            depthToBlurRatioBias={0.25} 
            debug={0}
            reflectorOffset={0.2} 
            />
        </mesh>
    );
};

export default Ground;

