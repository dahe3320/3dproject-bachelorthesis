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
        texture.repeat.set(5, 5);
        texture.offset.set(0, 0);
        texture.wrapS = RepeatWrapping; // Assuming default repeat wrapping for all
        texture.wrapT = RepeatWrapping; // Assuming default repeat wrapping for all
      });
      }, [diffuseMap, displacementMap, normalMap, roughnessMap]);

      
    
      // Adjust wrapS and wrapT for specific textures if needed, for example:
      // textures[4].wrapS = textures[4].wrapT = MirroredRepeatWrapping; // For normalMap if it's the fifth texture in the array
    
      //const [aoMap, armMap, diffuseMap, displacementMap, normalMap, roughnessMap] = textures;
    
    
    // const [aoMap, armMap, diffuseMap, displacementMap, normalMap, roughnessMap ] = useTexture([
    //     groundTxt.ao,
    //     groundTxt.arm,
    //     groundTxt.diffuse,
    //     groundTxt.displacement,
    //     groundTxt.normal,
    //     groundTxt.roughness,
    // ]);

    // aoMap.repeat.set(8, 8);
    // armMap.repeat.set(8, 8);
    // diffuseMap.repeat.set(8, 8);
    // displacementMap.repeat.set(8, 8);
    // normalMap.repeat.set(8, 8);
    // roughnessMap.repeat.set(8, 8);
    // aoMap.wrapS = aoMap.wrapT = THREE.RepeatWrapping;
    // armMap.wrapS = armMap.wrapT = THREE.RepeatWrapping;
    // diffuseMap.wrapS = diffuseMap.wrapT = THREE.RepeatWrapping;
    // displacementMap.wrapS = displacementMap.wrapT = THREE.RepeatWrapping;
    // normalMap.wrapS = normalMap.wrapT = THREE.MirroredRepeatWrapping;
    // roughnessMap.wrapS = roughnessMap.wrapT = THREE.MirroredRepeatWrapping;

    

    return (
        <mesh position={[0 , -4, -5]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[80, 80]} />
            <MeshReflectorMaterial
            attach="material" 
            map={diffuseMap}
            displacementMap={displacementMap}
            normalMap={normalMap} 
            roughnessMap={roughnessMap}
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

