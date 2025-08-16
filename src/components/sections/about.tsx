import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Briefcase } from "lucide-react";

const skills = [

{
  area: "Software",
  subskills: ["Python", "C++", "C", "Java", "Matlab", "OCaml", "Git", "PyTorch", "TensorFlow", "MuJoCo", "ROS",]

},
{
  area: "Systems",
  subskills: ["Linux & Windows", "Kubernetes", "Docker"]

},
{
  area: "Robotics",
  subskills: ["Linux & Windows", "Kubernetes", "Docker"]

},
{
  area: "Graphics",
  subskills: ["CUDA", "GLSL", "OpenGL", "Blender", "cuBLAS"]
}
];

const experience = [
  {
 role: "Teaching Assistant1",
    company: "California Institute of Technology (ME/CS/EE 129 - Experimental Robotics, Spring 2025)",
    period: "Spring 2025",
    description: "Guiding small groups in creating an automated exploration robot, integrating sensors and implementing interrupt-driven and multi-threaded architectures in the graduate level course."
  },
  {
 role: "Teaching Assistant2",
    company: "California Institute of Technology (CS 12 - Introduction to Prototyping, Winter 2025)",
    period: "Winter 2025",
    description: "Assisted 50+ students in designing and creating an open-ended project, providing a foundational experience in prototyping."
  },
  {
 role: "Teaching Assistant3",
    company: "California Institute of Technology (ME 8 - Introduction to Robotics, Fall 2024)",
    period: "Fall 2024",
    description: "Led 40+ students in designing a fully autonomous camera & arm system, requiring teaching proficiency in Python and CAD. Responsible for guiding several teams in achieving success in the project-based course."
  }
];

const awards = [
  "Putnam Top 300, 4x AIME Qualifier, Harvard-MIT Mathematics Tournament 20th place overall",
  "IMC Prosperity 12th Place",
  "USA Computing Olympiad Gold, Cyberpatriot Cybersecurity National Finalist",
  "USA Physics Olympiad Semifinalist",
  "Eagle Scout"
];

const researchExperience = [
  {
    role: "Research Internship",
 company: "UCSD Su Lab",
    period: "Summer 2025",
    description: "Engineering algorithms for task-aware mesh decomposition and grasp detection on objects for a RL manipulation environment. Contributing to Maniskill, a comprehensive RL manipulation training library developed by the Su Lab."
  }
];

export default function About() {
  return (
    <section id="about" className="container py-24 sm:py-32">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">About Me</h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          A brief overview of my background, skills, and professional journey in computer graphics.
        </p>
      </div>
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <h3 className="text-2xl font-bold font-headline mb-4">Who I Am</h3>
          <p className="text-muted-foreground leading-relaxed">
            I am a dedicated and curious computer science student with a deep-seated passion for computer graphics, real-time rendering, and physics-based simulation. From the intricate dance of light and shadow to the complex algorithms that breathe life into virtual worlds, I am constantly driven to explore, learn, and create. My goal is to contribute to innovative projects that merge artistry with cutting-edge technology.
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Skills</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {skills.map(skill => (
              
              
              
              skill.subskills.map(subskill => (
              <Badge key={subskill} variant="secondary">{subskill}</Badge>
            ))))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
