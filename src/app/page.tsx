"use client";
import { useState } from 'react';
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Projects from "@/components/sections/projects";
import Publications from "@/components/sections/publications";
import ContactForm from "@/components/sections/contact-form";
import WebGLBackground from '@/components/WebGLBackground';

export default function Home() {
  const [isAsciiEffectEnabled, setIsAsciiEffectEnabled] = useState(true);
  const [showShaderEditor, setShowShaderEditor] = useState(false);

  const handleToggleAsciiEffect = () => {
    setIsAsciiEffectEnabled(!isAsciiEffectEnabled);
  };

  const handleToggleShaderEditor = () => {
    setShowShaderEditor(!showShaderEditor);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <WebGLBackground isAsciiEffectEnabled={isAsciiEffectEnabled} showShaderEditor={showShaderEditor} />
      <Header 
        isAsciiEffectEnabled={isAsciiEffectEnabled} 
        onToggleAsciiEffect={handleToggleAsciiEffect}
        showShaderEditor={showShaderEditor}
        onToggleShaderEditor={handleToggleShaderEditor}
      />
      <main className="flex-grow">
        <Hero />
        {/* <About /> */}
        <Projects />
        <Publications />
        {/* <ContactForm /> */}
      </main>
      <Footer />
    </div>
  );
}
