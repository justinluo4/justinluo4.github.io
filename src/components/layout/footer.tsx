import { Github, Linkedin, Instagram } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
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
          {/* <Button variant="ghost" size="icon" asChild>
            <Link href="https://www.instagram.com/jus.tin.luo/" target="_blank" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </Link>
          </Button> */}
        </div>
      </div>
    </footer>
  );
}
