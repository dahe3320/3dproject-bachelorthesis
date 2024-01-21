import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import './App.css'
// import { useControls } from "leva";



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
  const [count, setCount] = useState(0)
  return (  
      <Canvas dpr={[1,2]}>
        <color attach="background" args={["#404040"]} />
        <fog attach="fog" args={["#213547", 10, 20]} />
      <ambientLight intensity={2} />
      <pointLight position={[10, 10, 10]} />
      </Canvas>
  )
}

export default App
