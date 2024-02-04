import React from 'react';
import { Plane, useTexture } from '@react-three/drei';

const Background = () => {
    const texture = useTexture('./src/assets/office_plane.jpg');

    return (
        <mesh>
            <Plane args={[20, 10]} position={[0, 2, -1]}>
            <meshBasicMaterial attach="material" map={texture} />
            </Plane>
        </mesh>
    );
};

export default Background;
