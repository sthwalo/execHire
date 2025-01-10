'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Car, Menu, X } from 'lucide-react';

const routes = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Fleet', path: '/fleet' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Car className="h-6 w-6" />
          <span className="text-xl font-bold">ExecuHire</span>
        </Link>

        <nav className="hidden md:flex space-x-6">
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                pathname === route.path ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {route.name}
            </Link>
          ))}
          <Link href="/contact">
            <Button>Book Now</Button>
          </Link>
        </nav>

        <Button
          variant="ghost"
          className="relative z-50 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>

        {isMenuOpen && (
          <div className="fixed inset-0 z-40 bg-background md:hidden">
            <nav className="container pt-20 flex flex-col space-y-4">
              {routes.map((route) => (
                <Link
                  key={route.path}
                  href={route.path}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-primary',
                    pathname === route.path ? 'text-primary' : 'text-muted-foreground'
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {route.name}
                </Link>
              ))}
              <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full">Book Now</Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}