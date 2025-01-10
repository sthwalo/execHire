import { Button } from '@/components/ui/button';
import { Car, Shield, Clock, Award } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { createWhatsAppLink } from '@/lib/whatsapp';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center">
        <Image
          src="/images/fleet/urus.avif"
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
          <Link href="/fleet">
            <Button size="lg" className="text-lg">
              Explore Our Fleet
            </Button>
          </Link>
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
                image: '/images/fleet/urus.avif',
                name: 'Lamborghini Urus',
                price: 'R18,000/half-day',
                shortDesc: 'Premium SUV, 4.0L V8 Twin-Turbo',
                specs: ['Premium SUV', '4.0L V8 Twin-Turbo', 'Automatic', '5 Seats', '2hrs: R5,000']
              },
              {
                image: '/images/fleet/i7.jpg',
                name: 'BMW i7 740d',
                price: 'R10,000/half-day',
                shortDesc: 'Luxury Sedan, Electric/Diesel Hybrid',
                specs: ['Luxury Sedan', 'Electric/Diesel Hybrid', 'Automatic', '5 Seats', '2hrs: R3,000']
              },
              {
                image: '/images/fleet/g63.avif',
                name: 'Mercedes G63',
                price: 'R10,000/half-day',
                shortDesc: 'Luxury SUV, 4.0L V8 Biturbo',
                specs: ['Luxury SUV', '4.0L V8 Biturbo', 'Automatic', '5 Seats', '2hrs: R3,000']
              },
            ].map((car, index) => (
              <div key={index} className="group bg-card rounded-lg overflow-hidden border shadow-sm">
                <div className="aspect-[16/9] relative">
                  <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    priority={index === 0}
                  />
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
                    <p className="text-muted-foreground">{car.shortDesc}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold text-lg">{car.price}</p>
                    <ul className="space-y-1">
                      {car.specs.map((spec, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground">
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <a
                    href={createWhatsAppLink(car.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full"
                  >
                    <Button className="w-full">Book Now</Button>
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/fleet">
              <Button size="lg" variant="outline" className="gap-2">
                <Car className="w-4 h-4" />
                View All Vehicles
              </Button>
            </Link>
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
          <Link href="/contact">
            <Button variant="secondary" size="lg">
              Book Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}