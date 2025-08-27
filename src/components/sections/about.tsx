import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Briefcase, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    role: "Research Internship",
    company: "UCSD Su Lab",
    period: "Summer 2025 - Present",
    description: "Engineering algorithms for task-aware mesh decomposition and grasp detection in Maniskill, a comprehensive RL manipulation training library developed by the Su Lab.",
    courses: null
  },
  {
    role: "Teaching Assistant",
    company: "California Institute of Technology",
    period: "Fall 2024 - Spring 2025",
    description: null,
    courses: [
      {
        name: "ME/CS/EE 129 - Experimental Robotics (Spring 2025)",
        details: "Guiding small groups in creating an automated exploration robot, integrating sensors and implementing interrupt-driven and multi-threaded architectures in the graduate level course."
      },
      {
        name: "CS 12 - Introduction to Prototyping (Winter 2025)", 
        details: "Assisted 50+ students in designing and creating an open-ended project, providing a foundational experience in prototyping."
      },
      {
        name: "ME 8 - Introduction to Robotics (Fall 2024)",
        details: "Led 40+ students in designing a fully autonomous camera & arm system, requiring teaching proficiency in Python and CAD. Responsible for guiding several teams in achieving success in the project-based course."
      }
    ]
  },
  {
    role: "Undergraduate Researcher",
    company: "Caltech Perona Vision Lab",
    period: "2024 - 2025",
    description: "Researched the novel use of Reinforcement Learning (RL) to generate synthetic datasets for point tracking. Presented at CVPR CV4Animals 2025.",
    courses: null
  },
  {
    role: "Research Assistant",
    company: "UCSD Schwartz Center for Computational Neuroscience",
    period: "2022 - 2023",
    description: "Researched the novel use of Reinforcement Learning (RL) to generate synthetic datasets for point tracking.",
    courses: null
  },
];

const awards = [
  "Putnam Top 300, 4x AIME Qualifier, Harvard-MIT Mathematics Tournament 20th place overall",
  "IMC Prosperity 12th Place",
  "USA Computing Olympiad Gold, Cyberpatriot Cybersecurity National Finalist",
  "USA Physics Olympiad Semifinalist",
  "Eagle Scout"
];

const education = [
  {
    degree: "California Institute of Technology",
    school: "Major in Computer Science",
    period: "2023 - 2027",
    details: "GPA: 4.1/4.0",
    image: "/caltech.png"
  },
  {
    degree: "Canyon Crest Academy",
    school: "High School",
    period: "2019 - 2023",
    details: "GPA: 4.6/4.0",
    image: "/cca.png"
  }
];

export default function About() {
  return (
    <section id="about" className="container py-24 sm:py-32">
      <div className="relative text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">About Me</h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          I'm passionate about difficult problems in a wide range of fields, from computer graphics to robotics to quantitative finance.
        </p>
      </div>
      <div className="space-y-16">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 font-headline">
                {/* <Briefcase className="h-5 w-5" /> */}
                Experience
              </CardTitle>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/Justin_Luo_f2025_july.pdf';
                  link.download = 'Justin_Luo_Resume.pdf';
                  link.click();
                }}
              >
                <Download className="h-8 w-8" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {experience.map((exp, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold">{exp.role}</h4>
                    <p className="text-muted-foreground">{exp.company}</p>
                    {/* {exp.description && (
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{exp.description}</p>
                    )} */}
                    {exp.courses && (
                      <ul className="mt-3 space-y-2">
                        {exp.courses.map((course, courseIndex) => (
                          <li key={courseIndex} className="text-sm">
                            <div className="flex items-start gap-2">
                              <span className="text-muted-foreground mt-1.5">•</span>
                              <div>
                                <span className="font-medium">{course.name}</span>
                                {/* <p className="text-muted-foreground mt-1 leading-relaxed">{course.details}</p> */}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground ml-4 flex-shrink-0">{exp.period}</span>
                </div>
              </div>
            ))}
          </CardContent>
          <div className="border-b border-border mt-4 ml-4 mr-4"></div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              {/* <GraduationCap className="h-5 w-5" /> */}
              Education
            </CardTitle>
          </CardHeader>
          <CardContent>
            {education.map((edu, index) => (
              <div key={index} className="space-y-2 mt-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <img src={edu.image} alt={edu.school} className="w-10 h-10" />
                    <h4 className="font-semibold">{edu.degree}</h4>
                    <p className="text-muted-foreground">{edu.school}</p>
                    <p className="text-sm text-muted-foreground mt-1">{edu.details}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{edu.period}</span>
                </div>
              </div>
            ))}
          </CardContent>
          {/* <div className="border-b border-border mt-4"></div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <Trophy className="h-5 w-5" />
              Awards
            </CardTitle>
          </CardHeader>
          <CardContent>
            {awards.map((award, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                      <h4 className="font-semibold">{award}</h4>
                  </div>
                </div>
              </div>
            ))}
          </CardContent> */}

        </Card>
      </div>
    </section>
  );
}
