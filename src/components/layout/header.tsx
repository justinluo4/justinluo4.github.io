"use client"
import Link from 'next/link';
import { Code, FileText, Home, Mail, User, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '#home', label: 'Home', icon: Home },
  { href: '#about', label: 'About', icon: User },
  { href: '#projects', label: 'Projects', icon: Code },
  { href: '#publications', label: 'Publications', icon: FileText },
  // { href: '#contact', label: 'Contact', icon: Mail },
];

interface HeaderProps {
  isAsciiEffectEnabled: boolean;
  onToggleAsciiEffect: () => void;
}

export default function Header({ isAsciiEffectEnabled, onToggleAsciiEffect }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ml-4">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Code className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline sm:inline-block">
            Justin Luo
          </span>
        </Link>
        <nav className="flex items-center gap-4 text-sm lg:gap-6">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="hidden sm:flex items-center gap-1.5 transition-colors hover:text-foreground/80 text-foreground/60"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end">
          <Button variant="ghost" size="icon" onClick={onToggleAsciiEffect}>
            <Terminal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
