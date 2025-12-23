'use client';

import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

type NavButtonProps = {
  href: string;
  children: React.ReactNode;
};

export function NavButton({ href, children }: NavButtonProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Button
      asChild
      variant={isActive ? 'secondary' : 'ghost'}
      className={cn('px-3', isActive && 'font-semibold')}
    >
      <a href={href}>{children}</a>
    </Button>
  );
}

export function NavGroup({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col sticky top-0 dark:bg-gray-900 bg-white/80 backdrop-blur-md">
      <nav className="flex items-center gap-2 p-4">{children}</nav>
      <Separator />
    </div>
  );
}
