import { Vehicle } from '@prisma/client';
import { FeaturedCars } from './index';

interface FeaturedCarsSectionProps {
  vehicles: Vehicle[];
}

export function FeaturedCarsSection({ vehicles }: FeaturedCarsSectionProps) {
  return (
    <section className="w-full py-20 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Featured Vehicles
        </h2>
        {vehicles.length > 0 ? (
          <FeaturedCars vehicles={vehicles} />
        ) : (
          <div className="text-center text-gray-500">
            <p className="text-lg">No featured vehicles available at the moment.</p>
            <p className="mt-2">Please check back later or explore our full fleet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
