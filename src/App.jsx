import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import './App.css'
import Enviroment from './components/Enviroment'
import Interface from './components/Interface'
import { CustomizationProvider } from './editor/Customize'
import { Raytracer } from "@react-three/lgl";
import { Environment } from '@react-three/drei';
import PropsModel from './components/PropsModel';
import Props from './components/Props'

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

export default App;
