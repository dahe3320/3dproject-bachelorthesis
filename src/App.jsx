import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from "@react-three/drei";
import './App.css'
import { useControls } from "leva";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

function Studio() {

  const { boxColour, depth, position } = useControls({
    boxColour: "orange",
    depth: {
      value: 1,
      min: 0,
      max: 5,
      step: 1,
    },
    position: {
      value: [1, 0, 2], // Default position
    },
  });
  
  return (
    <mesh position={position}>
        <boxGeometry args={[1, 1, depth]} />
        <meshStandardMaterial color={boxColour} />
    </mesh>
  )
}


function Module() {
  const [model, setModel] = useState(null);

  useEffect(() => {
    const loader = new GLTFLoader().setPath('notebook/');
    const textureLoader = new TextureLoader();
    const texture = textureLoader.load('src/assets/natureglobe.jpg');
    loader.load(
      'scene.gltf',
      (gltf) => {
        const loadedModel = gltf.scene;
        console.log(loadedModel);
        //Spiral_Notebook_Spiral_Chome_0

        // Find the object by name
        const notebookCover = loadedModel.getObjectByName('Spiral_Notebook_Spiral_Notebook_Cover_0');
        // notebookCover.traverse(node => {

        //   if(node.isMesh) {  
        //     node.material.color.set(0xffffff);
        //     node.material.map = texture;
        //     node.material.map.repeat.set( 2, 2 );
        //     console.log(node);
        //    }
        //   })
        if (notebookCover) {
          notebookCover.material.color.set(0xffffff);
          notebookCover.material.map = texture;
          //console.log(notebookCover.material);
          notebookCover.material.map.repeat.set( 2, 2);
          notebookCover.material.needsUpdate = true;
        }

        const notebookSpiral = loadedModel.getObjectByName('Spiral_Notebook_Spiral_Chome_0');
        if (notebookSpiral) {
            notebookSpiral.material.metalness = 0.4;
            notebookSpiral.material.color.set(0xffa5bb);
        }
        //loadedModel.rotation.x = 4;
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
      <Studio />
      <Module />
      </Canvas>
  )
}

export default App
