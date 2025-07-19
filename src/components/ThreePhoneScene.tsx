import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Box, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function FloatingPhone() {
  const phoneRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (phoneRef.current) {
      phoneRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      phoneRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
    }
    if (sphereRef.current) {
      sphereRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      sphereRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <>
      {/* Background spheres for ambient effect */}
      <Sphere ref={sphereRef} args={[1.5, 32, 32]} position={[-3, 0, -2]}>
        <MeshDistortMaterial
          color="#FF6B35"
          opacity={0.3}
          transparent
          distort={0.3}
          speed={2}
        />
      </Sphere>
      
      <Sphere args={[1, 32, 32]} position={[3, 1, -1]}>
        <MeshDistortMaterial
          color="#00A8CC"
          opacity={0.2}
          transparent
          distort={0.4}
          speed={1.5}
        />
      </Sphere>

      {/* Phone mockup */}
      <group ref={phoneRef} position={[0, 0, 0]}>
        {/* Phone body */}
        <Box args={[2, 4, 0.2]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#1a1a1a" />
        </Box>
        
        {/* Screen */}
        <Box args={[1.8, 3.6, 0.21]} position={[0, 0, 0.01]}>
          <meshStandardMaterial color="#000" />
        </Box>
        
        {/* Screen content simulation */}
        <Box args={[1.6, 1, 0.22]} position={[0, 1, 0.02]}>
          <meshStandardMaterial color="#FF6B35" />
        </Box>
        
        <Box args={[1.6, 0.8, 0.22]} position={[0, -0.2, 0.02]}>
          <meshStandardMaterial color="#00A8CC" />
        </Box>
        
        <Box args={[1.6, 0.6, 0.22]} position={[0, -1.2, 0.02]}>
          <meshStandardMaterial color="#2ECC71" />
        </Box>

        {/* Play button */}
        <Sphere args={[0.3, 16, 16]} position={[0, 0.5, 0.23]}>
          <meshStandardMaterial color="#fff" opacity={0.9} transparent />
        </Sphere>
        
        {/* Play triangle */}
        <mesh position={[0.05, 0.5, 0.3]}>
          <coneGeometry args={[0.1, 0.2, 3]} />
          <meshStandardMaterial color="#FF6B35" />
        </mesh>
      </group>

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#FF6B35" />
    </>
  );
}

export const ThreePhoneScene = () => {
  return (
    <div className="w-full h-96 md:h-[500px]">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <FloatingPhone />
      </Canvas>
    </div>
  );
};