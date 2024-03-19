import React, { useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { MeshReflectorMaterial, useTexture } from '@react-three/drei';
import { useEnviromentCustomization } from '../editor/EnviromentCustomizer';
import { TextureLoader, RepeatWrapping, MirroredRepeatWrapping, Mesh } from 'three';

const Ground = () => {
    const { groundTxt } = useEnviromentCustomization();
    const [diffuseMap, displacementMap, normalMap, roughnessMap] = useLoader(TextureLoader, [
      groundTxt.diffuse,
      groundTxt.displacement,
      groundTxt.normal,
      groundTxt.roughness,
      ]);
      
      // Applying properties to all textures
      useEffect(() => {
        const textures = [diffuseMap, displacementMap, normalMap, roughnessMap];

        if (textures.some((texture) => !texture)) {
          console.log('Some textures are not loaded yet'); 
          return;
        }
        
        textures.forEach((texture) => {
        texture.needsUpdate = true;
        texture.repeat.set(5, 5);
        texture.offset.set(0, 0);
        texture.wrapS = RepeatWrapping; // Assuming default repeat wrapping for all
        texture.wrapT = RepeatWrapping; // Assuming default repeat wrapping for all
      });
      }, [diffuseMap, displacementMap, normalMap, roughnessMap]); 

    return (
        <mesh position={[0 , 0, -20]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[120, 80]} />
            <MeshReflectorMaterial
            attach="material" 
            map={diffuseMap}
            displacementMap={displacementMap}
            normalMap={normalMap} 
            roughnessMap={roughnessMap}
            dithering={true}
            roughness={0.6}
            blur={[1000, 400]} 
            mixBlur={30} 
            mixStrength={4} 
            mixContrast={1}
            resolution={1024} 
            mirror={0.4} 
            depthScale={0.1} 
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

