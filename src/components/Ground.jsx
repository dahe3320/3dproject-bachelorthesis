import React from 'react';
import { Plane, useTexture } from '@react-three/drei';
import { useCustomization } from '../editor/Customize';

const Ground = () => {
    const { groundTxt } = useCustomization();
    
    const texture = useTexture(groundTxt.src);
    console.log(texture);

    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} scale-x={-1}>  
            <Plane args={[20, 20]} />
            <meshBasicMaterial
            attach="material"
            map={texture}
            />
        </mesh>
    );
};

export default Ground;

