import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Instagram, ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
 <section id="home" className="relative container flex flex-col md:flex-row items-center justify-center min-h-[calc(100vh-56px)] py-20 gap-12">
      <div className="max-w-3xl text-center md:text-left md:w-1/2">
 <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline text-transparent bg-clip-text bg-gradient-to-r from-primary to-border">
 Hi, I'm Justin
 </h1>
 <p className="mt-4 text-lg md:text-xl text-muted-foreground">
 I'm a third-year student at Caltech majoring in Computer Science. 
 </p>
 <p className="mt-2 max-w-xl md:mx-0 text-muted-foreground">
 I'm currently working with the UCSD Su Lab focusing on the intersection of computer graphics, simulation, and robotics. I recently presented my project, 'Synthetic Data of Animal Models for Point Tracking,' at CVPR 2025.
 </p>
 <div className="mt-8 flex justify-center md:justify-start gap-4">
 <Button asChild size="lg" variant="outline">
 <Link href="#publications">Publications</Link>
 </Button>
 <Button asChild size="lg" variant="outline">
 <Link href="#projects">Projects</Link>
 </Button>
 <Button asChild size="lg" variant="outline">
 <Link href="/Justin_Luo_f2025_july.pdf" download="Justin_Luo_Resume.pdf">My Resume</Link>
 </Button>
 {/* <Button asChild size="lg" variant="outline">
            <Link href="#contact">Get In Touch</Link>
          </Button> */}
 </div>
 <div className="mt-4 flex justify-center md:justify-start items-center gap-4">
 <p className="text-muted-foreground">
 Contact me: jluo2 [at] caltech [dot] edu
 </p>
 <Button variant="ghost" size="icon" asChild>
            <Link href="https://github.com/justinluo4" target="_blank" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://www.linkedin.com/in/justin-luo-471a48219/" target="_blank" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://www.instagram.com/jus.tin.luo/" target="_blank" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </Link>
          </Button>
 {/* Social Icons */}
 </div>
 </div>

      <div className="w-full md:w-1/2 flex justify-center md:justify-end">
 <Image
 src="/placeholder-profile.jpg" // Replace with your actual profile picture path
 alt="Profile Picture"
 width={192} // w-48
 height={192} // h-48
 className="rounded-full object-cover"
 />
 </div>

      {/* Social Icons moved outside the text container to align better with image */}
      <div className="flex justify-center md:justify-start gap-4 mt-4 md:mt-0 w-full md:w-auto">

        </div>

      {/* Scroll Arrow */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <ChevronDown className="h-6 w-6" />
      </div>
    </section>
  );
}
