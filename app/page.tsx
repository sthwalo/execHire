'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/src/store/hooks';
import { fetchVehicles } from '@/src/store/features/vehicle/vehicleSlice';
import FeaturedCars from './components/featured-cars';
import { Button } from '@/components/ui/button';
import { Car, Shield, Clock, Award } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { createWhatsAppLink } from '@/lib/whatsapp';

export default function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchVehicles());
  }, [dispatch]);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center">
        <Image
          src="/images/hero.jpg"
          alt="Luxury car"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="container relative z-10 text-white">
          <h1 className="text-5xl font-bold mb-6">
            Experience Luxury <br />
            On Your Terms
          </h1>
          <p className="text-xl mb-8 max-w-2xl">
            Discover our exclusive fleet of premium vehicles available for rent.
            From sports cars to luxury SUVs, we have the perfect vehicle for your needs.
          </p>
          <Link href="/fleet">
            <Button size="lg" className="gap-2">
              <Car className="w-5 h-5" />
              View Our Fleet
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Premium Insurance</h3>
              <p className="text-muted-foreground">
                Comprehensive coverage for peace of mind during your rental period
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Flexible Rental</h3>
              <p className="text-muted-foreground">
                Choose from hourly, daily, or weekly rental options
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Car className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Latest Models</h3>
              <p className="text-muted-foreground">
                Access to the newest and most prestigious vehicles
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Premium Service</h3>
              <p className="text-muted-foreground">
                24/7 support and concierge services for our clients
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Vehicles</h2>
          <FeaturedCars />
          <div className="text-center mt-8">
            <Link href="/fleet">
              <Button size="lg" variant="outline" className="gap-2">
                View All Vehicles
                <Car className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Luxury?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Contact us now to book your dream vehicle
          </p>
          <Link href="/contact">
            <Button size="lg">Contact Us</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}