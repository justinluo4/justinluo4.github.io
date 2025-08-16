import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "../ui/button";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

const publications = [
  {
    title: "Synthetic Data of Animal Models for Point Tracking",
    authors: "Justin Luo, Rogério Guimarães, Pietro Perona, Neehar Kondapaneni, Markus Marks",
    journal: "CVPR @ Nashville CV4Animals Workshop, 2025",
    abstract: "This paper introduces a new method for generating synthetic video data for animal point tracking. Our approach uses reinforcement learning to animate a 3D animal model, which is then rendered in diverse environments. We demonstrate our technique's effectiveness by using the generated data to improve a state-of-the-art tracker for tracking points on mice.",
    link: "https://github.com/damaggu/animal_pointodyssey",
    image: "/samples.png"
  },
  {
    title: "ICA's bug: How ghost ICs emerge from effective rank deficiency caused by EEG electrode interpolation and incorrect re-referencing",
    authors: "Hyeonseok Kim, Justin Luo, Shannon Chu, Cedric Cannard, Sven Hoffmann, Makoto Miyakoshi",
    journal: "Frontiers in Signal Processing, 2023",
    abstract: "This paper analyzes the performance and reliability of the Independent Component Analysis (ICA) algorithm. Our research focuses on its application in processing electroencephalography (EEG) signals. We demonstrate the algorithm's durability and effectiveness in complex signal analysis tasks.",
    link: "https://doi.org/10.3389/frsip.2023.1064138"
  }
];

export default function Publications() {
  return (
    <section id="publications" className="container py-24 sm:py-32">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Publications</h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          My contributions to academia.
        </p>
      </div>
      <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto">
        {publications.map((pub, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left hover:no-underline">
              <div className="flex items-center w-full">
                {pub.image && (
 <Image
 src={pub.image}
 alt={`Thumbnail for ${pub.title}`}
 width={96}
 height={96} // h-24, or h-auto if aspect ratio needs preserving
 className="mr-4 object-cover w-24 h-24" // Adjusted height to w-24/h-24 for consistent sizing
 />
                )}
                <div className="flex-grow">
                  <h3 className="font-bold text-lg">{pub.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{pub.authors}</p>
                  <p className="text-sm text-primary font-medium mt-1">{pub.journal}</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4">
              <p className="text-muted-foreground">{pub.abstract}</p>
              <Button asChild variant="link" className="p-0 h-auto">
                <Link href={pub.link} target="_blank">
                  Learn More <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
