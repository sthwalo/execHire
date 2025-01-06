import Image from 'next/image';
import { Button } from '@/components/ui/button';

const cars = [
  {
    name: "Mercedes-Benz S-Class",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80",
    price: "£350/day",
    specs: ["4.0L V8 Biturbo", "Automatic", "5 Seats", "Leather Interior"]
  },
  {
    name: "BMW 7 Series",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80",
    price: "£320/day",
    specs: ["3.0L Inline-6", "Automatic", "5 Seats", "Premium Sound System"]
  },
  {
    name: "Porsche Panamera",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80",
    price: "£400/day",
    specs: ["4.0L V8", "PDK Auto", "4 Seats", "Sport Chrono Package"]
  }
];

export default function Fleet() {
  return (
    <div className="container py-16">
      <h1 className="text-4xl font-bold mb-8">Our Fleet</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cars.map((car, index) => (
          <div key={index} className="border rounded-lg overflow-hidden">
            <div className="relative h-48">
              <Image
                src={car.image}
                alt={car.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{car.name}</h2>
              <p className="text-lg font-medium text-primary mb-4">{car.price}</p>
              <ul className="space-y-2 mb-6">
                {car.specs.map((spec, i) => (
                  <li key={i} className="text-sm text-muted-foreground">
                    • {spec}
                  </li>
                ))}
              </ul>
              <Button className="w-full">Book Now</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}