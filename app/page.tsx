import { Button } from '@/components/ui/button';
import { Car, Shield, Clock, Award } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center">
        <Image
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80"
          alt="Luxury Car"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="container relative z-10 text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Experience Luxury on Your Terms
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl">
            ExecuHire offers premium car rental services for those who demand excellence.
            Choose from our curated fleet of luxury vehicles.
          </p>
          <Button size="lg" className="text-lg">
            Explore Our Fleet
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: Car,
                title: 'Premium Fleet',
                description: 'Access to the latest luxury vehicles',
              },
              {
                icon: Shield,
                title: 'Fully Insured',
                description: 'Comprehensive coverage for peace of mind',
              },
              {
                icon: Clock,
                title: '24/7 Support',
                description: 'Round-the-clock customer assistance',
              },
              {
                icon: Award,
                title: 'VIP Service',
                description: 'Personalized attention to every detail',
              },
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Vehicles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80',
                name: 'Mercedes-Benz S-Class',
                price: '£350/day',
              },
              {
                image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80',
                name: 'BMW 7 Series',
                price: '£320/day',
              },
              {
                image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80',
                name: 'Porsche Panamera',
                price: '£400/day',
              },
            ].map((car, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg">
                <div className="aspect-[16/9] relative">
                  <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <div className="text-white">
                    <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
                    <p className="text-sm">Starting from {car.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Luxury?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Book your premium vehicle today and elevate your journey with ExecuHire.
          </p>
          <Button variant="secondary" size="lg">
            Book Now
          </Button>
        </div>
      </section>
    </div>
  );
}