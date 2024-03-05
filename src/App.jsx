import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import './App.css'
import Enviroment from './components/Enviroment'
import Interface from './components/Interface'
import { ModelProvider } from './editor/ModelCustomizer'
import { EnviromentProvider } from './editor/EnviromentCustomizer'
import { PropsProvider } from './editor/PropsCustomizer'
import { Raytracer } from "@react-three/lgl";
import { Environment } from '@react-three/drei';


function App() {
  return (
    <ModelProvider>
    <EnviromentProvider>
    <PropsProvider>
      <div className="App">
      <Suspense fallback={null}>
        <Canvas dpr={[2,4]} id='canvas-container' gl={{ preserveDrawingBuffer: true }}>
        <color args={[0, 0, 0]} attach="background" />
        <Enviroment />
        </Canvas>
        <Interface />
        </Suspense>
      </div>
    </PropsProvider>
    </EnviromentProvider>
    </ModelProvider>
  )
}

export default App;
