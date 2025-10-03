"use client";
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { usePersonalWebsiteHover } from '@/contexts/PersonalWebsiteHoverContext';
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js';
import vertexShader from '@/shaders/background.vert';
import initialFragmentShader from '@/shaders/background.frag';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

interface WebGLBackgroundProps {
  isAsciiEffectEnabled: boolean;
  showShaderEditor: boolean;
  className?: string;
}

const WebGLBackground: React.FC<WebGLBackgroundProps> = ({ isAsciiEffectEnabled, showShaderEditor, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const effectRef = useRef<AsciiEffect | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const clock = useRef(new THREE.Clock());
  const isAsciiEnabledRef = useRef(isAsciiEffectEnabled);
  const [fragmentShader, setFragmentShader] = React.useState(initialFragmentShader);
  const [shaderError, setShaderError] = React.useState<string | null>(null);
  const pixelRatio = 0.15;
  
  const { isHovered } = usePersonalWebsiteHover();
  const hoverAnimationRef = useRef({ current: 0, target: 0 });

  useEffect(() => {
    isAsciiEnabledRef.current = isAsciiEffectEnabled;
    console.log("isAsciiEffectEnabled", isAsciiEnabledRef.current);
  }, [isAsciiEffectEnabled]);

  useEffect(() => {
    hoverAnimationRef.current.target = isHovered ? 1.0 : 0.0;
  }, [isHovered]);

  const recompileShader = () => {
    if (meshRef.current && rendererRef.current && sceneRef.current && cameraRef.current) {
      try {
        const material = meshRef.current.material as THREE.ShaderMaterial;
        
        // Create new material with updated shader
        const newMaterial = new THREE.ShaderMaterial({
          uniforms: material.uniforms,
          vertexShader,
          fragmentShader,
          transparent: true,
        });

        // Test compilation by trying to render with the new material
        const oldMaterial = meshRef.current.material;
        meshRef.current.material = newMaterial;
        
        // Attempt to render one frame to trigger shader compilation
        rendererRef.current.render(sceneRef.current, cameraRef.current);
        
        // If we get here, compilation was successful
        if (oldMaterial instanceof THREE.Material) {
          oldMaterial.dispose();
        }
        setShaderError(null);
        console.log("Shader recompiled successfully");
        
      } catch (error) {
        // If compilation failed, restore original material and show error
        console.error("Shader compilation error:", error);
        setShaderError(error instanceof Error ? error.message : "Unknown shader compilation error");
        
        // Restore original material if new one failed
        if (meshRef.current) {
          const material = meshRef.current.material as THREE.ShaderMaterial;
          material.fragmentShader = initialFragmentShader;
          material.needsUpdate = true;
        }
      }
    }
  };


  useEffect(() => {
    const container = containerRef.current;
    if (!container || rendererRef.current) return; // Initialize only once

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(pixelRatio);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1);
    cameraRef.current = camera;

    const effect = new AsciiEffect(renderer, ' .-:*+=#%@', { invert: true, resolution: pixelRatio });
    effect.setSize(container.clientWidth, container.clientHeight);
    effect.domElement.style.color = 'grey';
    effect.domElement.style.backgroundColor = 'transparent';
    effectRef.current = effect;

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0.0 },
        iResolution: { value: new THREE.Vector2(container.clientWidth * pixelRatio, container.clientHeight * pixelRatio) },
        iScroll: { value: 0.0 },
        iMouse: { value: new THREE.Vector2(0, 0) },
        iPersonalWebsiteHover: { value: 0.0 },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    meshRef.current = mesh;
    scene.add(mesh);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      material.uniforms.iTime.value = clock.current.getElapsedTime();
      
      // Smooth animation for personal website hover uniform
      const hoverAnim = hoverAnimationRef.current;
      const lerpSpeed = 0.05; // Adjust this value to control animation speed
      hoverAnim.current = THREE.MathUtils.lerp(hoverAnim.current, hoverAnim.target, lerpSpeed);
      console.log("hoverAnim.current", hoverAnim.current);
      material.uniforms.iPersonalWebsiteHover.value = hoverAnim.current;

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        if (isAsciiEnabledRef.current) {
          effectRef.current?.render(sceneRef.current, cameraRef.current);
        } else {
          rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
      }
    };
    animate();

    const handleResize = () => {
      if (rendererRef.current) {
        rendererRef.current.setSize(container.clientWidth, container.clientHeight);
        material.uniforms.iResolution.value.set(container.clientWidth, container.clientHeight);
      }
      if (effectRef.current) {
        effectRef.current.setSize(container.clientWidth, container.clientHeight);
        material.uniforms.iResolution.value.set(container.clientWidth * pixelRatio, container.clientHeight * pixelRatio);
      }
      if (isAsciiEnabledRef.current) {
        material.uniforms.iResolution.value.set(container.clientWidth * pixelRatio, container.clientHeight * pixelRatio);
      }
      else{
        material.uniforms.iResolution.value.set(container.clientWidth, container.clientHeight);
      }
      
    };
    window.addEventListener('resize', handleResize);

    const handleScroll = () => {
      material.uniforms.iScroll.value = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);

    const handleMouseMove = (event: MouseEvent) => {
      material.uniforms.iMouse.value.set(event.clientX, window.innerHeight - event.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const renderer = rendererRef.current;
    const effect = effectRef.current;
    const mesh = meshRef.current;

    if (!container || !renderer || !effect || !mesh || isAsciiEffectEnabled == null) return;

    // Clear previous DOM elements before adding the new one
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    if (isAsciiEffectEnabled) {
      renderer.setPixelRatio(pixelRatio);
      (mesh.material as THREE.ShaderMaterial).uniforms.iResolution.value.set(container.clientWidth * pixelRatio, container.clientHeight * pixelRatio);
      container.appendChild(effect.domElement);
      renderer.setClearColor(0x000000, 1);
    } else {
      const defaultPixelRatio = 1;
      renderer.setPixelRatio(defaultPixelRatio);
      (mesh.material as THREE.ShaderMaterial).uniforms.iResolution.value.set(container.clientWidth * defaultPixelRatio, container.clientHeight * defaultPixelRatio);
      container.appendChild(renderer.domElement);
      
      renderer.setClearColor(0x000000, 0);
    }
  }, [isAsciiEffectEnabled]);

  return (
    <>
      <div 
        ref={containerRef} 
        className={className}
        style={{ 
          position: 'fixed', 
          top: '50%', 
          left: '50%', 
          width: '100%', 
          height: '100%', 
          transform: 'translate(-50%, -50%)', 
          zIndex: -1 
        }} 
      />
      <Collapsible open={showShaderEditor} className="fixed top-20 right-4 z-50 w-[400px]">
        <CollapsibleContent className="mt-2">
            <Textarea
              value={fragmentShader}
              onChange={(e) => setFragmentShader(e.target.value)}
              className="w-full h-96 bg-gray-900 text-white font-mono"
            />
            <Button onClick={recompileShader} className="mt-2" variant="outline">
              Recompile
            </Button>
            {shaderError && (
              <div className="mt-2 p-2 bg-red-800 text-white rounded">
                <p>Compilation Error:</p>
                <pre className="whitespace-pre-wrap">{shaderError}</pre>
              </div>
            )}
        </CollapsibleContent>
      </Collapsible>
    </>
  );
};

export default WebGLBackground;