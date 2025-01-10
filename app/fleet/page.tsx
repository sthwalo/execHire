import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { createWhatsAppLink } from '@/lib/whatsapp';
import Link from 'next/link';

const cars = [
  {
    name: "Lamborghini Urus",
    image: "/images/fleet/urus.avif",
    price: "R18,000/half-day",
    specs: ["Premium SUV", "4.0L V8 Twin-Turbo", "Automatic", "5 Seats", "2hrs: R5,000"]
  },
  {
    name: "BMW i7 740d",
    image: "/images/fleet/i7.jpg", 
    price: "R10,000/half-day",
    specs: ["Luxury Sedan", "Electric/Diesel Hybrid", "Automatic", "5 Seats", "2hrs: R3,000"]
  },
  {
    name: "Mercedes G63",
    image: "/images/fleet/g63.avif",
    price: "R10,000/half-day",
    specs: ["Luxury SUV", "4.0L V8 Biturbo", "Automatic", "5 Seats", "2hrs: R3,000"]
  },
  {
    name: "Maserati Levante",
    image: "/images/fleet/Levante.webp",
    price: "R8,000/half-day",
    specs: ["Luxury SUV", "3.0L V6 Twin-Turbo", "Automatic", "5 Seats", "2hrs: R2,500"]
  },
  {
    name: "Porsche Panamera GTS",
    image: "/images/fleet/panamera.avif",
    price: "R8,000/half-day",
    specs: ["Sport Sedan", "4.0L V8", "PDK Auto", "4 Seats", "2hrs: R2,500"]
  },
  {
    name: "Porsche 718 Boxster GTS",
    image: "/images/fleet/boxster.jpg",
    price: "R8,000/half-day",
    specs: ["Sports Car", "4.0L Flat-6", "PDK Auto", "2 Seats", "2hrs: R2,500"]
  },
  {
    name: "Audi RS5",
    image: "/images/fleet/rs5.jpg",
    price: "R8,000/half-day",
    specs: ["Sport Coupe", "2.9L V6 Twin-Turbo", "Automatic", "4 Seats", "2hrs: R2,500"]
  },
  {
    name: "Mercedes GLE 63s",
    image: "/images/fleet/gle.avif",
    price: "R8,000/half-day",
    specs: ["Performance SUV", "4.0L V8 Biturbo", "Automatic", "5 Seats", "2hrs: R2,500"]
  },
  {
    name: "Mercedes C63 W204",
    image: "/images/fleet/c63.jpg",
    price: "R8,000/half-day",
    specs: ["Sport Sedan", "6.2L V8", "Automatic", "5 Seats", "2hrs: R2,500"]
  },
  {
    name: "Mercedes V-Class 300d",
    image: "/images/fleet/vclass.jpg",
    price: "R8,000/half-day",
    specs: ["Luxury Van", "2.0L Diesel", "Automatic", "7 Seats", "2hrs: R2,500"]
  },
  {
    name: "Ford Mustang GT Convertible",
    image: "/images/fleet/mustang.jpg",
    price: "R8,000/half-day",
    specs: ["Convertible", "5.0L V8", "Automatic", "4 Seats", "2hrs: R2,500"]
  },
  {
    name: "Mercedes CLS 53",
    image: "/images/fleet/cls53.avif",
    price: "R8,000/half-day",
    specs: ["Luxury Coupe", "3.0L Inline-6", "Automatic", "4 Seats", "2hrs: R2,500"]
  },
  {
    name: "Mercedes GLE 400d",
    image: "/images/fleet/gle400.jpg",
    price: "R6,500/half-day",
    specs: ["Luxury SUV", "3.0L Diesel", "Automatic", "5 Seats", "2hrs: R2,000"]
  },
  {
    name: "Mercedes C43",
    image: "/images/fleet/c43.webp",
    price: "R6,500/half-day",
    specs: ["Sport Sedan", "3.0L V6 Biturbo", "Automatic", "5 Seats", "2hrs: R2,000"]
  },
  {
    name: "Mercedes GLE 350d",
    image: "/images/fleet/gle350.avif",
    price: "R6,000/half-day",
    specs: ["Luxury SUV", "3.0L Diesel", "Automatic", "5 Seats", "2hrs: R2,000"]
  },
  {
    name: "Range Rover Sport",
    image: "/images/fleet/roversport.avif",
    price: "R6,000/half-day",
    specs: ["Luxury SUV", "3.0L V6", "Automatic", "5 Seats", "2hrs: R2,000"]
  },
  {
    name: "Mercedes A45",
    image: "/images/fleet/a45.avif",
    price: "R4,500/half-day",
    specs: ["Hot Hatch", "2.0L Turbo", "Automatic", "5 Seats", "2hrs: R2,000"]
  },
  {
    name: "Chevrolet Lumina SS",
    image: "/images/fleet/lumina.jpg",
    price: "R4,500/half-day",
    specs: ["Sport Sedan", "6.0L V8", "Automatic", "5 Seats", "2hrs: R1,500"]
  }
];

export default function Fleet() {
  return (
    <div className="container py-12">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold">Our Luxury Fleet</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Experience luxury and performance with our exclusive collection of premium vehicles
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {cars.map((car, index) => (
          <div key={index} className="group bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={car.image}
                alt={car.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                priority={index < 2}
              />
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">{car.name}</h3>
                <p className="text-sm font-semibold text-primary">Starting from {car.price}</p>
              </div>
              <ul className="text-sm space-y-2">
                {car.specs.map((spec, index) => (
                  <li key={index} className="text-muted-foreground">
                    • {spec}
                  </li>
                ))}
              </ul>
              <a
                href={createWhatsAppLink(car.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-4"
              >
                <Button className="w-full">Book Now</Button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}