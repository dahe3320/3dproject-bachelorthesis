import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import './App.css'
import Enviroment from './components/enviroment'
import Interface from './components/Interface'
import { CustomizationProvider } from './editor/Customize'





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
        <Canvas dpr={[2,4]} id='canvas-container' gl={{ preserveDrawingBuffer: true }}>
          <color attach="background" args={["#130b2a"]} />
          <fog attach="fog" args={["#130b2a", 10, 20]} /> 
          <Enviroment />
        </Canvas>
        <Interface />
      </div>
    </CustomizationProvider>  
  )
}

export default App
