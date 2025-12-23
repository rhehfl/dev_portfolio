'use client';

import Link from 'next/link';
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
      <Link href={href}>{children}</Link>
    </Button>
  );
}

export function NavGroup({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className="flex items-center gap-2">{children}</nav>
      <Separator></Separator>
    </>
  );
}
