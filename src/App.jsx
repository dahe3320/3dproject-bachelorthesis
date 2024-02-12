import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import './App.css'
import Enviroment from './components/Enviroment'
import Interface from './components/Interface'
import { CustomizationProvider } from './editor/Customize'
import { Raytracer } from "@react-three/lgl";
import { Environment } from '@react-three/drei'





// function Studio() {

//   const { boxColour, depth, position } = useControls({
//     boxColour: "orange",
//     depth: {
//       value: 1,
//       min: 0,
//       max: 5,
//       step: 1,
//     },
//     position: {
//       value: [1, 0, 2], // Default position
//     },
//   });
  
//   return (
//     <mesh position={position}>
//         <boxGeometry args={[1, 1, depth]} />
//         <meshStandardMaterial color={boxColour} />
//     </mesh>
//   )
// }




function App() {
  return (
    <CustomizationProvider>
      <div className="App">
      <Suspense fallback={null}>
        <Canvas dpr={[2,4]} id='canvas-container' gl={{ preserveDrawingBuffer: true }}>
        <color args={[0, 0, 0]} attach="background" />
          {/* <fog attach="fog" args={["#130b2a", 10, 20]} />   */}
        <Enviroment /> 
        </Canvas>
        <Interface />
        </Suspense>
      </div>
    </CustomizationProvider>  
  )
}

export default App
