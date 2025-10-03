import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink } from "lucide-react";
import { usePersonalWebsiteHover } from "@/contexts/PersonalWebsiteHoverContext";

const projects = [
  {
    title: "Black Hole Raymarcher",
    description: "A raymarching engine built from scratch in C++ and CUDA, featuring SDF rendering in the Kerr metric.",
    image: "https://raw.githubusercontent.com/justinluo4/cs179/refs/heads/main/image.png",
    video: "https://raw.githubusercontent.com/justinluo4/cs179/refs/heads/main/cube.mp4",
    hint: "abstract geometric",
    github: "https://github.com/justinluo4/cs179",
    live: "#",
    skills: ["C++", "CUDA", "OpenGL", "GLSL", "Computer Graphics", "Physics"]
  },
  {
    title: "Self-Implemented LLM",
    description: "An implementation of Qwen2-0.5B written in CUDA and C++, with hand-written kernels for matrix multiplication and attention.",
    image: "https://placehold.co/600x400.png",
    video: "llm.mp4",
    hint: "colorful smoke",
    github: "https://github.com/justinluo4/transformer",
    live: "#",
    skills: ["CUDA", "C++", "LLM", "NLP", "GPU Acceleration"]
  },
  {
    title: "Rigid Body Simulation",
    description: "A GPU-accelerated analytical rigid body simulation engine using Runge-Kutta methods, allowing for real-time interaction with fixed and spring constraints.",
    image: "https://placehold.co/600x400.png",
    video: "/physics.mp4",
    hint: "dynamic cubes",
    github: "https://github.com/justinluo4/physsim2",
    live: null,
    skills: ["C++", "OpenGL", "Physics Simulation", "GPU Acceleration"]
  },
  {
    title: "Personal Website",
    description: "The website you're currently on! Built with Next.js and Tailwind CSS. Background inspired by Shadertoy.",
    image: "https://placehold.co/600x400.png",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    hint: "dynamic cubes",
    github: "https://github.com/justinluo4/justinluo4.github.io",
    live: null,
    skills: ["Next.js", "Tailwind CSS", "GLSL", "React", "TypeScript"]
  },
];

export default function Projects() {
  const { setIsHovered } = usePersonalWebsiteHover();

  const handlePersonalWebsiteHover = (isHovered: boolean) => {
    setIsHovered(isHovered);
  };

  return (
    <section id="projects" className="container py-24 sm:py-32">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Projects</h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          A selection of my work in computer graphics and simulation.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {projects.map(project => (
           <Link href={project.github} target="_blank" key={project.title}>
             <Card 
               className="group relative flex flex-col h-full transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer border-2 overflow-hidden"
               onMouseEnter={() => {
                 if (project.title === "Personal Website") {
                   handlePersonalWebsiteHover(true);
                 }
               }}
               onMouseLeave={() => {
                 if (project.title === "Personal Website") {
                   handlePersonalWebsiteHover(false);
                 }
               }}
             >
               {/* Video Background - only show for non-personal website projects */}
               {project.title !== "Personal Website" && (
                 <video
                   className={`absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 ${
                     project.title === "Self-Implemented LLM" ? "object-contain" : "object-cover"
                   }`}
                   autoPlay
                   loop
                   muted
                   playsInline
                 >
                   <source src={project.video} type="video/mp4" />
                 </video>
               )}
               
               {/* Content Overlay */}
               <div className={`relative z-10 flex flex-col h-full transition-colors duration-300 ${
                 project.title === "Personal Website" 
                   ? "bg-background group-hover:bg-transparent" 
                   : "bg-background/80 group-hover:bg-background/20"
               }`}>
                 <CardHeader className="flex-grow">
                   <CardTitle className="font-headline">{project.title}</CardTitle>
                   <CardDescription className="group-hover:opacity-0 transition-opacity duration-300">
                     {project.description}
                   </CardDescription>
                 </CardHeader>

                 <CardFooter className="flex justify-between items-end pt-2">
                   {/* Skills badges on the left */}
                   <div className="flex flex-wrap gap-2 group-hover:opacity-0 transition-opacity duration-300">
                     {project.skills.map((skill) => (
                       <Badge key={skill} variant="secondary" className="text-xs">
                         {skill}
                       </Badge>
                     ))}
                   </div>
                   
                   {/* External link button on the right */}
                   <div className="flex items-center justify-center w-8 h-8 rounded bg-background/50 flex-shrink-0">
                     <ExternalLink className="h-4 w-4 text-muted-foreground" />
                   </div>
                 </CardFooter>
               </div>
             </Card>
           </Link>
         ))}
      </div>
    </section>
  );
}
