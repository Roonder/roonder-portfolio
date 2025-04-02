"use client"
import { Ref, forwardRef, useRef, useMemo, ReactNode } from "react";
// Hooks
import { useWindowSize } from "@uidotdev/usehooks";
// Components
import { Canvas, useFrame } from "@react-three/fiber";
import { Mesh } from "three"
import { useGLTF } from "@react-three/drei";

interface ModernLaptopModelProps {
    className?: string;
    props?: ReactNode;
}

export const ModernLaptopModel = forwardRef(({
    className,
    ...props
}: ModernLaptopModelProps, ref: Ref<HTMLDivElement>) => {
    const { width } = useWindowSize();
    const memo_scale = useMemo(() => {
        if(width)
            switch(true) {
                case width >= 1280:
                    return 30;
                case width >= 1024:
                    return 25;
                case width >= 768:
                    return 18;
                default:
                    return 25;
            }

        return 25;
    }, [width]);

    return (
        <div ref={ref} {...props} className={`h-[80dvh] w-full ${className}`}>
            <Canvas 
                shadows
                camera={{ position: [1, 0, 8], fov: 30 }}
            >
                <directionalLight intensity={10} position={[-4, 6, -4]} />
                <Model 
                    url="/assets/ubuntu_laptop/scene.gltf" 
                    position={[-1.3, -1, -6.5]}
                    rotation={[Math.PI / 10, Math.PI / 3, 0]}
                    scale={memo_scale}
                />
            </Canvas>
        </div>
    );
});

ModernLaptopModel.displayName = "ModernLaptopModel";

const Model = ({
    url,
    scale,
    position,
    rotation,
    ...props
  }: {
    url: string;
    scale: number;
    position: number[];
    rotation: number[];
    props?: ReactNode;
  }) => {
    const groupRef = useRef<Mesh>(null!);
    const { scene } = useGLTF(url);

    useFrame((state) => {
        if (groupRef.current) {
          groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.25;
          groupRef.current.rotation.set(0, 0, Math.sin(state.clock.elapsedTime) / 10)
        }
    });

    return (
        <group 
            ref={groupRef} 
            {...props} 
        >
            <primitive 
                object={scene} 
                scale={scale}
                position={position}
                rotation={rotation}
            />
        </group>
    )
}