import React from 'react';
import { Plane, useTexture } from '@react-three/drei';
import { useCustomization } from '../editor/Customize';

const Background = () => {
    const { backgroundImage } = useCustomization();
    
    const texture = useTexture(backgroundImage.src);

    return (
        <mesh>
            <Plane args={[20, 10]} position={[0, 2, -1]}>
            <meshBasicMaterial attach="material" map={texture} />
            </Plane>
        </mesh>
    );
};

export default Background;
