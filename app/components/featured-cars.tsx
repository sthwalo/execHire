'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { setFeaturedVehicles, setSelectedVehicle } from '@/src/store/features/vehicle/vehicleSlice';
import { useRouter } from 'next/navigation';
import { createWhatsAppLink } from '@/lib/whatsapp';
import { Vehicle } from '@prisma/client';

import { FeaturedCarsSection } from './featured-cars/featured-cars-section';

interface FeaturedCarsProps {
  vehicles: Vehicle[];
}

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

  const handleBookNow = (vehicle: Vehicle) => {
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
    <FeaturedCarsSection vehicles={featuredVehicles || []} />
  );
}
