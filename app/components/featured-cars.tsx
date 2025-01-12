'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { setFeaturedVehicles, setSelectedVehicle } from '@/src/store/features/vehicle/vehicleSlice';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { createWhatsAppLink } from '@/lib/whatsapp';
import { useRouter } from 'next/navigation';

export function FeaturedCars() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { vehicles, featuredVehicles, loading, error } = useAppSelector((state) => state.vehicle);

  useEffect(() => {
    // Select top 4 vehicles for featured section
    const featured = vehicles
      .filter(vehicle => vehicle.available)
      .slice(0, 4);
    dispatch(setFeaturedVehicles(featured));
  }, [dispatch, vehicles]);

  const handleBookNow = (vehicle: any) => {
    dispatch(setSelectedVehicle(vehicle));
    router.push('/booking');
  };

  if (loading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-4 text-center text-red-500">
        Error loading vehicles: {error}
      </div>
    );
  }

  return (
    <section className="w-full py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Featured Vehicles</h2>
          <p className="text-muted-foreground mt-2">
            Experience luxury with our handpicked selection of premium vehicles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredVehicles.map((vehicle) => (
            <Card key={vehicle.name} className="group overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={vehicle.image}
                    alt={vehicle.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{vehicle.name}</h3>
                  <p className="text-sm font-semibold text-primary">{vehicle.price}</p>
                </div>
                <ul className="text-sm space-y-2">
                  {vehicle.specs.map((spec, index) => (
                    <li key={index} className="text-muted-foreground">
                      • {spec}
                    </li>
                  ))}
                </ul>
                <a
                  href={createWhatsAppLink(vehicle.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-4"
                  onClick={() => handleBookNow(vehicle)}
                >
                  <Button className="w-full">Book Now</Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
