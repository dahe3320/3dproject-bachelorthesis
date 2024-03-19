import React, { useState, useEffect } from 'react';
import { MeshReflectorMaterial, useTexture, Html } from '@react-three/drei';
import { useEnviromentCustomization } from '../editor/EnviromentCustomizer';
import { TextureLoader } from 'three';
import { Spinner } from 'react-bootstrap';

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
    return (
      <Html center>
        <Spinner animation="border" />
      </Html>
    )
  }
    
    return (
      <group>
        <mesh castShadow receiveShadow position={[0, 40, -60]}>
            <boxGeometry args={[120, 80]} />
            <meshBasicMaterial
            attach='material' map={texture} />
        </mesh>
        <mesh castShadow receiveShadow position={[60, 40, -20]} rotation={[0, Math.PI / 2, 0]}>
            <boxGeometry args={[80, 80]} />
            <meshStandardMaterial
            attach='material' map={texture} />
        </mesh>
        <mesh castShadow receiveShadow position={[-60, 40, -20]} rotation={[0, -Math.PI / 2, 0]}>
            <boxGeometry args={[80, 80]} />
            <meshStandardMaterial
            attach='material' map={texture} />
        </mesh>
        {/* <mesh castShadow receiveShadow position={[0, 80, -20]} rotation={[Math.PI / 2, 0, 0]}>
          <boxGeometry args={[120, 80, 1]} />
          <meshStandardMaterial />
        </mesh> */}
        </group>
    );
};

export default Background;
