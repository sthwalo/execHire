import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container mx-auto py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-gray-600">
        The page you are looking for might have been removed or is temporarily unavailable.
      </p>
      <a href="/" className="text-blue-500 hover:underline mt-4 inline-block">
        Return to Homepage
      </a>
    </div>
  );
}
