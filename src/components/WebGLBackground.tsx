"use client";
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js';
import vertexShader from '@/shaders/background.vert';
import fragmentShader from '@/shaders/background.frag';

interface WebGLBackgroundProps {
  isAsciiEffectEnabled: boolean;
}

const WebGLBackground: React.FC<WebGLBackgroundProps> = ({ isAsciiEffectEnabled }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const effectRef = useRef<AsciiEffect | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const clock = useRef(new THREE.Clock());
  const isAsciiEnabledRef = useRef(isAsciiEffectEnabled);

  useEffect(() => {
    isAsciiEnabledRef.current = isAsciiEffectEnabled;
  }, [isAsciiEffectEnabled]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Initialize renderer, scene, camera, and mesh only once
    if (!rendererRef.current) {
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      rendererRef.current = renderer;

      const scene = new THREE.Scene();
      sceneRef.current = scene;

      const camera = new THREE.OrthographicCamera(
        -1,
        1,
        1,
        -1,
         -1, 
         1,
      );
      cameraRef.current = camera;

      const geometry = new THREE.PlaneGeometry(2, 2);
      const material = new THREE.ShaderMaterial({
        uniforms: { 
          iTime: { value: 0.0 },
          iResolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
          iScroll: { value: 0.0 },
          iMouse: { value: new THREE.Vector2(0, 0) }
        },
        vertexShader,
        fragmentShader,
        transparent: true,
      });
      const mesh = new THREE.Mesh(geometry, material);
      meshRef.current = mesh;
      scene.add(mesh);

      const handleResize = () => {
        if (container && rendererRef.current && cameraRef.current) {
          rendererRef.current.setSize(container.clientWidth, container.clientHeight);
          if (meshRef.current) {
            (meshRef.current.material as THREE.ShaderMaterial).uniforms.iResolution.value.set(container.clientWidth, container.clientHeight);
          }
          if (effectRef.current) {
            effectRef.current.setSize(container.clientWidth, container.clientHeight);
          }
        }
      };
      window.addEventListener('resize', handleResize);

      const handleScroll = () => {
        if (meshRef.current) {
          (meshRef.current.material as THREE.ShaderMaterial).uniforms.iScroll.value = window.scrollY;
        }
      };
      window.addEventListener('scroll', handleScroll);

      const handleMouseMove = (event: MouseEvent) => {
        if (meshRef.current) {
          (meshRef.current.material as THREE.ShaderMaterial).uniforms.iMouse.value.set(event.clientX, window.innerHeight - event.clientY);
        }
      };
      window.addEventListener('mousemove', handleMouseMove);
    }

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (meshRef.current) {
        (meshRef.current.material as THREE.ShaderMaterial).uniforms.iTime.value = clock.current.getElapsedTime();
      }
      
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        if (effectRef.current && isAsciiEnabledRef.current) {
          effectRef.current.render(sceneRef.current, cameraRef.current);
        } else {
          rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const renderer = rendererRef.current;
    if (!container || !renderer) return;
    
    // Clear previous DOM elements
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  
    if (isAsciiEnabledRef.current) {

      renderer.setClearColor( 0x000000, 1 ); 
      if (!effectRef.current) {
        effectRef.current = new AsciiEffect(renderer, 'Wwli:,. ', { invert: false, resolution: 0.15});
      }
      const effect = effectRef.current;
      effect.setSize(container.clientWidth, container.clientHeight);
      effect.domElement.style.color = 'grey';
      effect.domElement.style.backgroundColor = 'transparent';
      
      container.appendChild(effect.domElement);
    } else {
      renderer.setClearColor( 0x000000, 0 );
      //container.appendChild(renderer.domElement);
    }
  
    return () => {
      // Cleanup DOM on effect toggle
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, [isAsciiEffectEnabled]);

  return <div ref={containerRef} style={{ position: 'fixed', top: '50%', left: '50%', width: '100%', height: '100%', transform: 'translate(-50%, -50%)', zIndex: -1 }} />;
};

export default WebGLBackground;