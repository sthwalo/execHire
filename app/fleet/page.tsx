'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { fetchVehicles, setSelectedVehicle } from '@/src/store/features/vehicle/vehicleSlice';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
import { addDays } from 'date-fns';
import { useSession } from 'next-auth/react';
import { useToast } from '@/hooks/use-toast';
import type { Vehicle } from '@/src/types';
import { useRouter } from 'next/navigation';
import { DateRange } from 'react-day-picker';

export default function Fleet() {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const { toast } = useToast();
  const router = useRouter();
  const [bookingModal, setBookingModal] = useState(false);
  const [selectedDates, setSelectedDates] = useState<DateRange>({
    from: new Date(),
    to: addDays(new Date(), 1)
  });
  const { vehicles, loading, error, selectedVehicle } = useAppSelector((state) => state.vehicle);

  useEffect(() => {
    dispatch(fetchVehicles());
  }, [dispatch]);

  const handleBookNow = async (vehicle: Vehicle) => {
    if (!session) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to book a vehicle",
        variant: "destructive",
      });
      return;
    }

    dispatch(setSelectedVehicle(vehicle));
    setBookingModal(true);
  };

  const handleBookingSubmit = async () => {
    if (!selectedVehicle || !session?.user?.id) return;

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session.user.id,
          vehicleId: selectedVehicle.id,
          startDate: selectedDates.from,
          endDate: selectedDates.to,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      toast({
        title: "Booking Created",
        description: "Your booking has been created successfully. Please proceed to payment.",
      });

      setBookingModal(false);
      // Redirect to payment page
      router.push(`/payment/${data.id}`);
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: error.message || "Failed to create booking",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="container py-12 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-12">
        <div className="text-center text-red-500">
          Error loading vehicles: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold">Our Luxury Fleet</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Experience luxury and performance with our exclusive collection of premium vehicles
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {vehicles.map((car, index) => (
          <div key={car.id || index} className="group bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={car.image}
                alt={car.name}
                width={800}
                height={450}
                className="object-cover transition-transform group-hover:scale-105"
                priority={index < 2}
                unoptimized
              />
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">{car.name}</h3>
                <p className="text-sm font-semibold text-primary">{car.price}</p>
              </div>
              <ul className="text-sm space-y-2">
                {car.specs.map((spec, index) => (
                  <li key={index} className="text-muted-foreground">
                    • {spec}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className="block mt-4"
                onClick={() => handleBookNow(car)}
              >
                <Button 
                  className="w-full"
                  disabled={!car.available}
                >
                  {car.available ? 'Book Now' : 'Currently Unavailable'}
                </Button>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Video Gallery */}
      <div className="py-16 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Fleet in Action</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
              <video 
                className="w-full h-full object-cover"
                controls
                poster="/images/fleet/a45.avif"
              >
                <source src="/videos/mec.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="p-4 bg-background">
                <h3 className="font-semibold text-lg">Luxury Fleet Showcase</h3>
                <p className="text-muted-foreground text-sm">Experience our premium vehicles in action</p>
              </div>
            </div>
            <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
              <video 
                className="w-full h-full object-cover"
                controls
                poster="/images/fleet/urus.avif"
              >
                <source src="/videos/gia.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="p-4 bg-background">
                <h3 className="font-semibold text-lg">Behind the Wheel</h3>
                <p className="text-muted-foreground text-sm">Take a closer look at our exclusive collection</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={bookingModal} onOpenChange={setBookingModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book {selectedVehicle?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <DatePickerWithRange
              selected={selectedDates}
              onSelect={(range) => range && setSelectedDates(range)}
            />
            <Button 
              onClick={handleBookingSubmit}
              className="w-full"
            >
              Confirm Booking
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}