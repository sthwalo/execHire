import { Car, Camera, Music, Heart, GraduationCap, Clock } from 'lucide-react';

export default function Services() {
  return (
    <div className="container py-12 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Our Services</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Make your special moments unforgettable with our luxury vehicle experiences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Matric Dance Service */}
        <div className="p-6 border rounded-lg space-y-4 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold">Matric Dance</h2>
          <p className="text-muted-foreground">
            Make your matric dance an unforgettable experience with our luxury vehicles. We offer:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Special matric dance packages</li>
            <li>Professional chauffeur service</li>
            <li>Photo opportunity with the car</li>
            <li>Red carpet arrival experience</li>
            <li>Flexible 2-hour and half-day rates</li>
          </ul>
        </div>

        {/* Wedding Service */}
        <div className="p-6 border rounded-lg space-y-4 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Heart className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold">Wedding Transport</h2>
          <p className="text-muted-foreground">
            Luxury transportation for your special day. Our wedding services include:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Bridal car decoration</li>
            <li>Multiple vehicle options</li>
            <li>Coordinated arrival times</li>
            <li>Professional drivers in formal attire</li>
            <li>Custom wedding packages available</li>
          </ul>
        </div>

        {/* Music Video Production */}
        <div className="p-6 border rounded-lg space-y-4 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Music className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold">Music Videos</h2>
          <p className="text-muted-foreground">
            Elevate your music video production with our luxury fleet:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Multiple vehicle options</li>
            <li>Flexible shooting hours</li>
            <li>Location shooting permits assistance</li>
            <li>Technical vehicle specs available</li>
            <li>Special production rates</li>
          </ul>
        </div>

        {/* Photo Shoots */}
        <div className="p-6 border rounded-lg space-y-4 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Camera className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold">Photo Shoots</h2>
          <p className="text-muted-foreground">
            Perfect for fashion, commercial, and personal photography:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Indoor/outdoor shooting options</li>
            <li>Multiple vehicle combinations</li>
            <li>Flexible booking hours</li>
            <li>Professional coordination</li>
            <li>Brand-friendly environments</li>
          </ul>
        </div>

        {/* Corporate Events */}
        <div className="p-6 border rounded-lg space-y-4 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Car className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold">Corporate Events</h2>
          <p className="text-muted-foreground">
            Impress your clients and executives with our premium fleet:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Airport transfers</li>
            <li>Executive transport</li>
            <li>Road shows</li>
            <li>Corporate functions</li>
            <li>Long-term corporate packages</li>
          </ul>
        </div>

        {/* Special Packages */}
        <div className="p-6 border rounded-lg space-y-4 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Clock className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold">Flexible Durations</h2>
          <p className="text-muted-foreground">
            Choose the duration that suits your needs:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>2-hour rentals</li>
            <li>Half-day packages</li>
            <li>Custom duration options</li>
            <li>Weekend specials</li>
            <li>Extended hire discounts</li>
          </ul>
        </div>
      </div>

      <div className="mt-12 text-center space-y-4 bg-primary/5 p-8 rounded-lg">
        <h2 className="text-2xl font-semibold">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="space-y-2">
            <h3 className="font-semibold">Professional Service</h3>
            <p className="text-muted-foreground">Experienced chauffeurs and dedicated event coordinators</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Luxury Fleet</h3>
            <p className="text-muted-foreground">Wide range of premium vehicles to suit every occasion</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Flexible Packages</h3>
            <p className="text-muted-foreground">Customized solutions for your specific needs</p>
          </div>
        </div>
      </div>
    </div>
  );
}