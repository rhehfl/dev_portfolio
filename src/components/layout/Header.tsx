"use client";

import Link from "next/link";
import {
  useMotionValueEvent,
  useScroll,
  motion,
  AnimatePresence,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useEscapeKey } from "@/hooks/useEscapeKey";

const navItems = [
  { name: "프로젝트", href: "/#projects" },
  { name: "경험", href: "/#experience" },
  { name: "학력 및 활동", href: "/#credentials" },
];

export default function Header() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  useEscapeKey(() => setIsMenuOpen(false));

  useMotionValueEvent(scrollY, "change", (latest) => {
    const isOverThreshold = latest > 50;
    if (isOverThreshold !== isScrolled) {
      setIsScrolled(isOverThreshold);
    }
  });

  // WCAG 2.1.1: Escape 키로 모바일 메뉴 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  return (
    <>
      <div className="mt-20" />
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
          isScrolled
            ? "bg-background/80 backdrop-blur-md border-b border-border/60 py-3 shadow-sm"
            : "bg-transparent py-4",
        )}
        initial={prefersReducedMotion ? false : { y: -100 }}
        animate={{ y: 0 }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5 }}
      >
        <div className="container mx-auto px-6 md:px-10 flex justify-between items-center">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight hover:opacity-80 transition-opacity text-foreground"
            aria-label="홈으로 이동"
          >
            Gu Doyoon
          </Link>

          {/* WCAG 1.3.1: aria-label로 내비게이션 구분 */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="메인 내비게이션"
          >
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                asChild
                className="text-muted-foreground font-medium transition-colors"
              >
                <Link href={item.href}>{item.name}</Link>
              </Button>
            ))}
            <ThemeToggle className="ml-2" />
          </nav>

          {/* WCAG 4.1.2: aria-expanded로 메뉴 열림/닫힘 상태 표시 */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </Button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-label="모바일 내비게이션 메뉴"
            initial={prefersReducedMotion ? false : { opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? {} : { opacity: 0, y: -20 }}
            transition={
              prefersReducedMotion ? { duration: 0 } : { duration: 0.2 }
            }
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-24 px-6 md:hidden"
          >
            {/* WCAG 1.3.1: aria-label로 모바일 내비게이션 구분 */}
            <nav
              className="flex flex-col space-y-4"
              aria-label="모바일 내비게이션"
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={
                    prefersReducedMotion ? false : { opacity: 0, x: -20 }
                  }
                  animate={{ opacity: 1, x: 0 }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { delay: index * 0.1 }
                  }
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-2xl font-semibold text-foreground py-3 hover:underline decoration-primary decoration-2 underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
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
