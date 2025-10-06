"use client"
import Link from 'next/link';
import Image from 'next/image';
import { Code, FileText, Home, Mail, User, Terminal, Edit } from 'lucide-react';
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
  showShaderEditor: boolean;
  onToggleShaderEditor: () => void;
}

export default function Header({ isAsciiEffectEnabled, onToggleAsciiEffect, showShaderEditor, onToggleShaderEditor }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 w-full items-center pl-4 pr-4">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Image
            src="/favicon.ico"
            alt="Website Icon"
            width={24}
            height={24}
            className="h-6 w-6 invert"
          />
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
        
        <div className="flex flex-1 items-center justify-end gap-2">
          <span className=" sm:inline-block text-foreground/60">
          Know shaders? Try editing here -&gt;
          </span>

          <Button variant="ghost" size="icon" onClick={onToggleShaderEditor}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onToggleAsciiEffect}>
            <Terminal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
