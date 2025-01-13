'use client';

import { Vehicle } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface FeaturedCarsProps {
  vehicles: Vehicle[];
}

// Client component for vehicle cards
function FeaturedCarCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="relative aspect-[16/9] overflow-hidden rounded-t-lg">
          <Image
            src={vehicle.image}
            alt={vehicle.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-black/70 text-white">
              {vehicle.category}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2">{vehicle.name}</h3>
        <div className="space-y-2">
          {vehicle.specs.map((spec, index) => (
            <div key={index} className="text-sm text-gray-600 flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full" />
              {spec}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/fleet?vehicle=${vehicle.id}`} className="w-full">
          <Button className="w-full">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

// Client component for the grid
export function FeaturedCars({ vehicles }: FeaturedCarsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {vehicles.map((vehicle) => (
        <FeaturedCarCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
}
