'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Car, Menu, X, Instagram } from 'lucide-react';

const routes = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Fleet', path: '/fleet' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const socialMediaLinks = [
  {
    href: 'https://www.tiktok.com/@execuhire?_t=ZM-8swb42mNWGU&_r=1',
    label: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
      </svg>
    ),
    ariaLabel: 'Follow us on TikTok'
  },
  {
    href: 'https://www.instagram.com/execuhire',
    label: <Instagram className="h-5 w-5" />,
    ariaLabel: 'Follow us on Instagram'
  }
];

export function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // Handle click outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest('.mobile-nav-content')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center">
          <img src="/images/logo.png" alt="ExecuHire Logo" className="h-20 w-auto" />
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
          <div className="flex items-center gap-6">
            {socialMediaLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
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
          <div className="fixed inset-y-0 right-0 z-40 w-full md:hidden">
            <nav className="mobile-nav-content container pt-20 flex flex-col space-y-4 bg-gray-100 p-6 rounded-lg">
              {routes.map((route) => (
                <Link
                  key={route.path}
                  href={route.path}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-primary p-2',
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
              <div className="flex items-center gap-4 pt-4">
                {socialMediaLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}