"use client";

import { ContactShadows, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

type ProductViewer3DProps = {
  productSlug: string;
  className?: string;
};

function LaptopModel() {
  return (
    <group position={[0, -0.1, 0]}>
      <mesh castShadow receiveShadow position={[0, -0.28, 0]}>
        <boxGeometry args={[2.1, 0.12, 1.35]} />
        <meshStandardMaterial color="#d1d5db" metalness={0.72} roughness={0.3} />
      </mesh>

      <group position={[0, 0.38, -0.62]} rotation={[-0.38, 0, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.1, 1.22, 0.08]} />
          <meshStandardMaterial color="#111827" metalness={0.32} roughness={0.42} />
        </mesh>
        <mesh position={[0, 0, 0.048]}>
          <planeGeometry args={[1.9, 1]} />
          <meshStandardMaterial color="#ef4444" emissive="#b91c1c" emissiveIntensity={0.18} />
        </mesh>
      </group>
    </group>
  );
}

function SpeakerModel() {
  return (
    <group>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.62, 0.62, 1.8, 48]} />
        <meshStandardMaterial color="#1f2937" metalness={0.4} roughness={0.45} />
      </mesh>
      <mesh position={[0, 0.45, 0.62]} castShadow>
        <torusGeometry args={[0.22, 0.04, 16, 48]} />
        <meshStandardMaterial color="#ef4444" metalness={0.52} roughness={0.35} />
      </mesh>
      <mesh position={[0, -0.28, 0.62]} castShadow>
        <torusGeometry args={[0.3, 0.05, 16, 48]} />
        <meshStandardMaterial color="#9ca3af" metalness={0.6} roughness={0.32} />
      </mesh>
    </group>
  );
}

function CoffeeMachineModel() {
  return (
    <group>
      <mesh castShadow receiveShadow position={[0, -0.18, 0]}>
        <boxGeometry args={[1.3, 1.35, 1]} />
        <meshStandardMaterial color="#e5e7eb" metalness={0.34} roughness={0.5} />
      </mesh>
      <mesh castShadow position={[0, 0.22, 0.54]}>
        <cylinderGeometry args={[0.16, 0.16, 0.52, 28]} />
        <meshStandardMaterial color="#111827" metalness={0.5} roughness={0.38} />
      </mesh>
      <mesh position={[0, -0.67, 0.05]} receiveShadow>
        <boxGeometry args={[0.7, 0.08, 0.4]} />
        <meshStandardMaterial color="#dc2626" metalness={0.25} roughness={0.5} />
      </mesh>
    </group>
  );
}

function OfficeChairModel() {
  return (
    <group>
      <mesh castShadow receiveShadow position={[0, 0.22, 0]}>
        <boxGeometry args={[1.3, 0.24, 1.2]} />
        <meshStandardMaterial color="#991b1b" metalness={0.2} roughness={0.68} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.84, -0.42]}>
        <boxGeometry args={[1.26, 1.28, 0.2]} />
        <meshStandardMaterial color="#7f1d1d" metalness={0.2} roughness={0.65} />
      </mesh>
      <mesh castShadow position={[0, -0.32, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 0.8, 20]} />
        <meshStandardMaterial color="#4b5563" metalness={0.62} roughness={0.32} />
      </mesh>
      <mesh castShadow position={[0, -0.73, 0]}>
        <cylinderGeometry args={[0.42, 0.22, 0.1, 20]} />
        <meshStandardMaterial color="#111827" metalness={0.58} roughness={0.3} />
      </mesh>
    </group>
  );
}

function BlenderModel() {
  return (
    <group>
      <mesh castShadow receiveShadow position={[0, -0.58, 0]}>
        <cylinderGeometry args={[0.48, 0.6, 0.8, 28]} />
        <meshStandardMaterial color="#f3f4f6" metalness={0.33} roughness={0.45} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.42, 0.32, 1.25, 24]} />
        <meshStandardMaterial color="#dbeafe" transparent opacity={0.86} metalness={0.1} roughness={0.12} />
      </mesh>
      <mesh castShadow position={[0, 0.98, 0]}>
        <cylinderGeometry args={[0.23, 0.23, 0.24, 24]} />
        <meshStandardMaterial color="#111827" metalness={0.46} roughness={0.28} />
      </mesh>
    </group>
  );
}

function TreadmillModel() {
  return (
    <group>
      <mesh castShadow receiveShadow position={[0, -0.68, 0]}>
        <boxGeometry args={[2.6, 0.24, 1.1]} />
        <meshStandardMaterial color="#111827" metalness={0.5} roughness={0.35} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, -0.48, 0]}>
        <boxGeometry args={[2.1, 0.06, 0.82]} />
        <meshStandardMaterial color="#dc2626" metalness={0.18} roughness={0.58} />
      </mesh>
      <mesh castShadow position={[-0.86, 0.16, -0.38]} rotation={[0, 0, -0.34]}>
        <cylinderGeometry args={[0.06, 0.06, 1.48, 18]} />
        <meshStandardMaterial color="#4b5563" metalness={0.65} roughness={0.31} />
      </mesh>
      <mesh castShadow position={[0.86, 0.16, -0.38]} rotation={[0, 0, 0.34]}>
        <cylinderGeometry args={[0.06, 0.06, 1.48, 18]} />
        <meshStandardMaterial color="#4b5563" metalness={0.65} roughness={0.31} />
      </mesh>
      <mesh castShadow position={[0, 0.86, -0.56]}>
        <boxGeometry args={[1.18, 0.24, 0.16]} />
        <meshStandardMaterial color="#111827" metalness={0.42} roughness={0.38} />
      </mesh>
    </group>
  );
}

function DefaultModel() {
  return (
    <mesh castShadow receiveShadow>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color="#ef4444" metalness={0.34} roughness={0.4} />
    </mesh>
  );
}

function ModelBySlug({ productSlug }: ProductViewer3DProps) {
  if (productSlug === "atlas-pro-laptop") {
    return <LaptopModel />;
  }

  if (productSlug === "nova-ses-sistemi") {
    return <SpeakerModel />;
  }

  if (productSlug === "vera-kahve-makinesi") {
    return <CoffeeMachineModel />;
  }

  if (productSlug === "modo-ofis-koltugu") {
    return <OfficeChairModel />;
  }

  if (productSlug === "aero-blender-set") {
    return <BlenderModel />;
  }

  if (productSlug === "stride-kosu-bandi") {
    return <TreadmillModel />;
  }

  return <DefaultModel />;
}

export function ProductViewer3D({ productSlug, className }: ProductViewer3DProps) {
  return (
    <div
      className={[
        "w-full bg-[radial-gradient(circle_at_top,_#fff7f8,_#ffe4e6,_#fff1f2)]",
        className ?? "h-[360px]",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Canvas camera={{ position: [2.8, 1.8, 3.2], fov: 45 }} shadows>
        <color attach="background" args={["#fff7f8"]} />
        <ambientLight intensity={0.72} />
        <directionalLight position={[4.5, 4.5, 3]} intensity={1.3} castShadow />
        <directionalLight position={[-3, 2.8, -2]} intensity={0.5} />

        <group position={[0, -0.02, 0]}>
          <ModelBySlug productSlug={productSlug} />
        </group>

        <ContactShadows
          position={[0, -1.2, 0]}
          opacity={0.45}
          scale={8}
          blur={2.4}
          far={3.2}
          color="#7f1d1d"
        />

        <OrbitControls
          enablePan={false}
          minDistance={1.7}
          maxDistance={5.5}
          maxPolarAngle={Math.PI / 1.9}
          minPolarAngle={Math.PI / 5}
          autoRotate
          autoRotateSpeed={1.1}
        />
      </Canvas>
    </div>
  );
}
