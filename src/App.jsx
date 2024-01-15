import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from "@react-three/drei";
import './App.css'
import { useControls } from "leva";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

function Studio() {
  const { boxColour, depth } = useControls({
    boxColour: "blue",
    depth: {
      value: 1,
      min: 0,
      max: 5,
      step: 1,
    },
  });
  
  return (
    <mesh>
        <boxGeometry args={[1, 1, depth]} />
        <meshStandardMaterial color={boxColour} />
    </mesh>
  )
}

function Car() {
  const [model, setModel] = useState(null);

  useEffect(() => {
    const loader = new GLTFLoader().setPath('notebook/');
    const textureLoader = new TextureLoader();
    const texture = textureLoader.load('src/assets/mumin.png'); // Replace with the path to your texture
    loader.load(
      'scene.gltf',
      (gltf) => {
        const loadedModel = gltf.scene;
        //console.log(loadedModel);
        
        // Find the object by name
        const notebookCover = loadedModel.getObjectByName('Spiral_Notebook_Spiral_Notebook_Cover_0');
        if (notebookCover) {
          notebookCover.material.map = texture;
          console.log(notebookCover.material.map);
          notebookCover.material.map.repeat.set( 2, 2 );
          notebookCover.material.map.flipY = false;
          notebookCover.material.needsUpdate = true;
        }
        loadedModel.rotation.x = 4;
        setModel(loadedModel);
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );
  }, []); // Empty dependency array ensures this effect runs once on mount

  return model ? <primitive object={model} /> : null;
}

function App() {
  const [count, setCount] = useState(0)
  return (  
      <Canvas>
      <OrbitControls />
      <Stars />
      <ambientLight intensity={2} />
      <pointLight position={[10, 10, 10]} />
      {/* <Studio /> */}
      <Car />
      </Canvas>
  )
}

export default App
