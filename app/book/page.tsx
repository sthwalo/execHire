'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { BookingForm } from '@/app/components/booking-form';

export default function BookPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/login?callbackUrl=/book');
    }
  }, [session, router]);

  if (!session) {
    return null;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Book Your Executive Vehicle</h1>
          <p className="text-muted-foreground">
            Choose from our premium fleet of luxury vehicles and select your preferred dates.
          </p>
        </div>
        
        <div className="bg-card rounded-lg shadow-lg">
          <BookingForm />
        </div>

        <div className="mt-8 space-y-4 text-sm text-muted-foreground">
          <h3 className="font-semibold text-foreground">Booking Information:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>All bookings include a professional chauffeur</li>
            <li>Complimentary airport pickup and drop-off available</li>
            <li>24/7 customer support</li>
            <li>Free cancellation up to 48 hours before pickup</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
