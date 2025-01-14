import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { FeaturedCarsSection } from "./components/featured-cars/featured-cars-section";
import { $Enums } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export default async function Home() {
  let featuredVehicles: { 
    id: string; 
    name: string; 
    image: string; 
    images: string[]; 
    price: string; 
    pricePerDay: Decimal; 
    pricePerHour: Decimal; 
    specs: string[]; 
    description: string | null; 
    category: $Enums.Category; 
    available: boolean; 
    featured: boolean; 
    createdAt: Date; 
    updatedAt: Date; 
  }[] = [];
  
  try {
    // Get vehicles marked as featured based on specific criteria
    featuredVehicles = await prisma.vehicle.findMany({
      where: {
        OR: [
          { name: { contains: 'Lamborghini' } },
          { name: { contains: 'BMW' } },
          { name: { contains: 'Mercedes' } },
          { name: { contains: 'Porsche' } }
        ]
      },
      orderBy: {
        pricePerDay: 'desc'
      },
      take: 4,
      select: {
        id: true,
        name: true,
        image: true,
        images: true,
        price: true,
        pricePerDay: true,
        pricePerHour: true,
        specs: true,
        description: true,
        category: true,
        available: true,
        featured: true,
        createdAt: true,
        updatedAt: true
      }
    });

    console.log('Fetched vehicles:', featuredVehicles);
  } catch (error) {
    console.error('Error fetching featured vehicles:', error);
    // Initialize with empty array to prevent runtime errors
    featuredVehicles = [];
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* Hero Section */}
      <section className="w-full h-[90vh] relative flex items-center justify-center">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/mec.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Luxury & Performance Car Hire
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Experience the extraordinary with ExecuHire
          </p>
          <Link href="/fleet">
            <Button size="lg" className="text-lg">
              View Our Fleet
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Vehicles */}
      <FeaturedCarsSection vehicles={featuredVehicles} />

      {/* Fleet in Action Video Section */}
      <section className="w-full py-20 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Fleet in Action
          </h2>
          <div className="relative aspect-video w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-xl">
            <video
              controls
              className="w-full h-full object-cover"
              poster="/images/fleet/urus.avif"
            >
              <source src="/videos/mec.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="text-center mt-8">
            <Link href="/fleet">
              <Button size="lg" className="text-lg">
                Explore Full Fleet
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="w-full py-20 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose ExecuHire
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-xl font-semibold mb-3">Premium Fleet</h3>
              <p className="text-gray-600">
                Curated selection of luxury and performance vehicles
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-3">Secure Booking</h3>
              <p className="text-gray-600">
                Simple and secure online booking process
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">👨‍✈️</div>
              <h3 className="text-xl font-semibold mb-3">Professional Service</h3>
              <p className="text-gray-600">
                Dedicated team ensuring a premium experience
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}