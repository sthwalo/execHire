import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-6 py-12">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-xl text-muted-foreground text-center max-w-md">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. Please check the URL or return to the homepage.
      </p>
      <Link href="/">
        <Button className="gap-2">
          <Home className="h-4 w-4" />
          Back to Home
        </Button>
      </Link>
    </div>
  );
}
