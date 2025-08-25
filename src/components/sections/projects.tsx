import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Black Hole Raymarcher",
    description: "A raymarching engine built from scratch in C++ and CUDA, featuring SDF rendering in the Kerr metric.",
    image: "https://raw.githubusercontent.com/justinluo4/cs179/refs/heads/main/image.png",
    hint: "abstract geometric",
    github: "https://github.com/justinluo4/cs179",
    live: "#",
    skills: ["C++", "CUDA", "OpenGL", "GLSL", "Computer Graphics", "Physics"]
  },
  {
    title: "LLM Catan Agent",
    description: "A Catan agent that uses LLMs to make decisions and interact with the game.",
    image: "https://placehold.co/600x400.png",
    hint: "colorful smoke",
    github: "/CS_159_Project.pdf",
    live: "#",
    skills: ["Python", "LLM", "NLP", "Catan", "Game Theory"]
  },
  {
    title: "Rigid Body Simulation",
    description: "A GPU-accelerated analytical rigid body simulation engine using Runge-Kutta methods, allowing for real-time interaction with fixed and spring constraints.",
    image: "https://placehold.co/600x400.png",
    hint: "dynamic cubes",
    github: "https://github.com/justinluo4/physsim2",
    live: null,
    skills: ["C++", "CUDA", "OpenGL", "Physics Simulation", "GPU Acceleration"]
  },
  {
    title: "Personal Website",
    description: "The website you're currently on! Built with Next.js and Tailwind CSS. Background inspired by Shadertoy.",
    image: "https://placehold.co/600x400.png",
    hint: "dynamic cubes",
    github: "https://github.com/justinluo4/justinluo4.github.io",
    live: null,
    skills: ["Next.js", "Tailwind CSS", "GLSL", "WebGL", "React", "TypeScript"]
  },
];

export default function Projects() {
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
            <Card className="flex flex-col transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer border-2">
            <CardHeader>
              <CardTitle className="font-headline">{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
              <div className="flex flex-wrap gap-2 mt-8">
                {project.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardHeader>

            <CardFooter className="flex justify-end">
              <div className="flex items-center justify-center w-8 h-8 rounded bg-background/50">
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardFooter>
          </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
