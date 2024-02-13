import React from 'react';
import { MeshReflectorMaterial, useTexture } from '@react-three/drei';
import { useCustomization } from '../editor/Customize';

const Background = () => {
    const { backgroundImage } = useCustomization();
    
    const texture = useTexture(backgroundImage.src);

    return (
        <mesh position={[0, 5, -5]}>
            <planeGeometry args={[80, 40]} />
            <MeshReflectorMaterial attach='material' map={texture} />
        </mesh>
    );
};

export default Background;
