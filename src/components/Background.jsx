import React, { useState, useEffect } from 'react';
import { MeshReflectorMaterial, useTexture } from '@react-three/drei';
import { useEnviromentCustomization } from '../editor/EnviromentCustomizer';
import { TextureLoader } from 'three';

const Background = () => {
    const { backgroundImage } = useEnviromentCustomization();
    const [texture, setTexture] = useState();
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loader = new TextureLoader();
    loader.load(
      backgroundImage.src,
      // onLoad callback
      (loadedTexture) => {
        setTexture(loadedTexture);
        setLoading(false);
      },
      // onProgress callback
      undefined,
      // onError callback
      (error) => {
        console.error('Texture loading error:', error);
        setLoading(false);
      }
    );
  }, [backgroundImage.src]); // Empty dependency array means this effect runs once on mount

  if (loading) {
    return null;
  }
  
    

    // const texture = useTexture({
    //     diffuseMap: backgroundImage.diffuse,
    //     displacementMap: backgroundImage.disp,
    //     roughnessMap: backgroundImage.roughness, 
    // });
    
    return (
        <mesh position={[0, 20, -30]}>
            <planeGeometry args={[80, 40]} />
            <meshStandardMaterial  attach='material' map={texture} />
        </mesh>
    );
};

export default Background;
