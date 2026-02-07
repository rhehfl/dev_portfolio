'use client';

import Link from 'next/link';
import {
  useMotionValueEvent,
  useScroll,
  motion,
  AnimatePresence,
} from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import ThemeToggle from '@/components/layout/ThemeToggle';

const navItems = [
  { name: 'Blog', href: '/blog' },
  { name: 'Intro', href: '/#intro' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Experience', href: '/#experience' },
  { name: 'Credentials', href: '/#credentials' },
];

export default function Header() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const isOverThreshold = latest > 50;
    if (isOverThreshold !== isScrolled) {
      setIsScrolled(isOverThreshold);
    }
  });

  return (
    <>
      <div className="mt-24" />
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
          isScrolled
            ? 'bg-background/80 backdrop-blur-md border-b border-border/60 py-3 shadow-sm'
            : 'bg-transparent py-5',
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-6 md:px-10 flex justify-between items-center">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity text-foreground"
          >
            Gu Doyoon
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                asChild
                className="text-muted-foreground hover:text-primary font-medium transition-colors"
              >
                <Link href={item.href}>{item.name}</Link>
              </Button>
            ))}
            <ThemeToggle className="ml-2" />
          </nav>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-24 px-6 md:hidden"
          >
            <nav className="flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-2xl font-semibold text-foreground py-3 hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                  <Separator className="bg-border/60" />
                </motion.div>
              ))}
            </nav>
            <ThemeToggle className="mt-8 w-full justify-start" showLabel />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
