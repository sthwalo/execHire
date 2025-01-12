'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { setFeaturedVehicles, setSelectedVehicle } from '@/src/store/features/vehicle/vehicleSlice';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { createWhatsAppLink } from '@/lib/whatsapp';
import { useRouter } from 'next/navigation';

export default function FeaturedCars() {
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
            Explore our selection of premium vehicles
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredVehicles.map((vehicle) => (
            <Card key={vehicle.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative h-48">
                  <Image
                    src={vehicle.image}
                    alt={vehicle.name}
                    width={400}
                    height={300}
                    className="object-cover w-full h-full"
                    unoptimized
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">{vehicle.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{vehicle.price}</p>
                <div className="space-y-2 mb-4">
                  {vehicle.specs.map((spec, index) => (
                    <p key={index} className="text-sm text-muted-foreground">
                      {spec}
                    </p>
                  ))}
                </div>
                <Button
                  className="w-full"
                  onClick={() => handleBookNow(vehicle)}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
