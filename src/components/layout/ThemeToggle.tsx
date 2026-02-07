'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/common/ThemeProvider';
import { useIsMounted } from '@modern-kit/react';

type ThemeToggleProps = {
  className?: string;
  showLabel?: boolean;
};

export default function ThemeToggle({
  className,
  showLabel = false,
}: ThemeToggleProps) {
  const { theme, toggleTheme, isReady } = useTheme();
  const mounted = useIsMounted();

  if (!mounted || !isReady) {
    return <div className={cn('h-9 w-9', className)} aria-hidden />;
  }

  const isDark = theme === 'dark';
  const label = isDark ? '라이트 모드' : '다크 모드';

  if (showLabel) {
    return (
      <Button
        type="button"
        variant="ghost"
        className={cn('justify-start gap-3 text-base', className)}
        onClick={toggleTheme}
        aria-label={label}
      >
        <span className="relative inline-flex h-5 w-5">
          <Sun
            className={cn(
              'h-5 w-5 transition-all',
              isDark ? 'scale-0 opacity-0' : 'scale-100 opacity-100',
            )}
            aria-hidden
          />
          <Moon
            className={cn(
              'absolute h-5 w-5 transition-all',
              isDark ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
            )}
            aria-hidden
          />
        </span>
        <span className="font-medium">{isDark ? 'Light' : 'Dark'} mode</span>
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn('relative h-9 w-9', className)}
      onClick={toggleTheme}
      aria-label={label}
    >
      <Sun
        className={cn(
          'h-[1.1rem] w-[1.1rem] transition-all',
          isDark ? 'scale-0 opacity-0' : 'scale-100 opacity-100',
        )}
        aria-hidden
      />
      <Moon
        className={cn(
          'absolute h-[1.1rem] w-[1.1rem] transition-all',
          isDark ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
        )}
        aria-hidden
      />
      <span className="sr-only">{label}</span>
    </Button>
  );
}
