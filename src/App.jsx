import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function App() {
  const [info, setInfo] = useState(null);

  function Model({ onClick }) {
    const { scene } = useGLTF('/model.glb');
    return <primitive object={scene} onClick={onClick} />;
  }

  return (
    <div className="h-screen bg-black flex flex-col items-center justify-center">
      <Canvas camera={{ position: [0, 2, 5] }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} intensity={1} />
        <Model onClick={() => setInfo({ title: 'Info', text: 'Descripción del modelo' })} />
        <OrbitControls />
      </Canvas>

      {info && (
        <motion.div 
          className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="bg-white p-6 rounded-lg text-black relative">
            <button 
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => setInfo(null)}
            >X</button>
            <h2 className="text-xl font-bold">{info.title}</h2>
            <p>{info.text}</p>
          </div>
        </motion.div>
      )}
      
      <div className="absolute bottom-10 flex gap-4">
        <button className="bg-blue-500 px-4 py-2 rounded text-white">About</button>
        <button className="bg-green-500 px-4 py-2 rounded text-white">Projects</button>
        <button className="bg-purple-500 px-4 py-2 rounded text-white">Contact</button>
      </div>
    </div>
  );
}
