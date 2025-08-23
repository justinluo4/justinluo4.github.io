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
  const pixelRatio = 0.15;

  useEffect(() => {
    isAsciiEnabledRef.current = isAsciiEffectEnabled;
    console.log("isAsciiEffectEnabled", isAsciiEnabledRef.current);
  }, [isAsciiEffectEnabled]);

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

    const effect = new AsciiEffect(renderer, ' .-:=+*#%@', { invert: true, resolution: pixelRatio });
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
      renderer.setPixelRatio(1);
      (mesh.material as THREE.ShaderMaterial).uniforms.iResolution.value.set(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);
      
      renderer.setClearColor(0x000000, 0);
    }
  }, [isAsciiEffectEnabled]);

  return <div ref={containerRef} style={{ position: 'fixed', top: '50%', left: '50%', width: '100%', height: '100%', transform: 'translate(-50%, -50%)', zIndex: -1 }} />;
};

export default WebGLBackground;