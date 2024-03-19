import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { SRGBColorSpace } from 'three'
import './App.css'
import { Enviroment } from './components/Enviroment'
import Interface from './components/Interface'
import { ModelProvider } from './editor/ModelCustomizer'
import { EnviromentProvider } from './editor/EnviromentCustomizer'
import { PropsProvider } from './editor/PropsCustomizer'
import { Raytracer } from "@react-three/lgl";
import { Sky } from '@react-three/drei';


function App() {
  return (
    <ModelProvider>
    <EnviromentProvider>
    <PropsProvider>
      <div className="App">
      <Suspense fallback={null}>
        <Canvas shadows camera={{ position: [0, 15, 25], fov: 45 }} dpr={[1,2]} id='canvas-container' gl={{ preserveDrawingBuffer: true, outputColorSpace: SRGBColorSpace }}>
          <Sky sunPosition={[100, 10, 100]} inclination={0.6} azimuth={0.25} />
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
