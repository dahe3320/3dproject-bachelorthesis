import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from "@react-three/drei";
import './App.css'
import { useControls } from "leva";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


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

function Car () {
  const loader = new GLTFLoader();


  loader.load(
    '../assets/car.gltf',

    function ( gltf ) {

      scene.add( gltf.scene );

      gltf.animations; // Array<THREE.AnimationClip>
      gltf.scene; // THREE.Group
      gltf.scenes; // Array<THREE.Group>
      gltf.cameras; // Array<THREE.Camera>
      gltf.asset; // Object
  
    },
    function ( xhr ) {
      console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
    
  )
}

/*
function MyComponent() {
  const { name, aNumber } = useControls({ name: 'World', aNumber: 0 })

  return (
    <div>
      Hey {name}, hello! {aNumber}
    </div>
  )
} */


function App() {
  const [count, setCount] = useState(0)
  return (  
      <Canvas>
      <OrbitControls />
      <Stars />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Studio />
      <Car />
      </Canvas>
  )
}

export default App
