import React from 'react';
import { MeshReflectorMaterial, useTexture } from '@react-three/drei';
import { useCustomization } from '../editor/Customize';
import * as THREE from 'three';

const Background = () => {
    const { backgroundImage } = useCustomization();
    
    const texture = useTexture(backgroundImage.src);

    return (
        <mesh position={[0, 4, -5]} rotateX={5}>
            <planeGeometry args={[80, 40]} />
            <MeshReflectorMaterial attach='material' map={texture} side={THREE.DoubleSide} />
        </mesh>
    );
};

export default Background;
