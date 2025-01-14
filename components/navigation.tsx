'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Car, Menu, X, Instagram, User, LogOut, MessageSquare } from 'lucide-react';
import { useSession, signIn, signOut } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const routes = [
  { name: 'Home', path: '/' },
  { name: 'Fleet', path: '/fleet' },
  { name: 'Services', path: '/services' },
  { name: 'About', path: '/about' },
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
  const { data: session } = useSession();
  const [isSigningOut, setIsSigningOut] = React.useState(false);

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await signOut({ redirect: false });
      window.location.href = '/';
    } catch (error) {
      console.error('Sign out error:', error);
      setIsSigningOut(false);
    }
  };

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
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center space-x-4">
            <a
              href={`https://wa.me/27733366385?text=${encodeURIComponent('Hello, I would like to inquire about booking a vehicle.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:text-[#25D366]"
            >
              <MessageSquare className="h-5 w-5" />
            </a>
            {socialMediaLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:text-primary"
                aria-label={link.ariaLabel}
              >
                {link.label}
              </a>
            ))}
          </div>
          
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="text-muted-foreground">
                  {session.user?.email}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut} disabled={isSigningOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => signIn()}>
              <User className="h-5 w-5" />
            </Button>
          )}
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t mobile-nav-content">
          <div className="container py-4">
            <nav className="flex flex-col space-y-4">
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
              <div className="flex items-center space-x-4 pt-4 border-t">
                <div className="flex items-center space-x-4">
                  <a
                    href={`https://wa.me/27733366385?text=${encodeURIComponent('Hello, I would like to inquire about booking a vehicle.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[#25D366] transition-colors"
                  >
                    <MessageSquare className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.tiktok.com/@execuhire?_t=ZM-8swb42mNWGU&_r=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Follow us on TikTok"
                  >
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
                  </a>
                  <a
                    href="https://www.instagram.com/execuhire"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Follow us on Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                </div>
                {session ? (
                  <Button variant="ghost" className="w-full justify-start" onClick={handleSignOut} disabled={isSigningOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                ) : (
                  <Button variant="ghost" className="w-full justify-start" onClick={() => signIn()}>
                    <User className="mr-2 h-4 w-4" />
                    Sign In
                  </Button>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}