import { Car, Camera, Music, Heart, GraduationCap, Clock } from 'lucide-react';
import Image from 'next/image';

export default function Services() {
  const services = [
    {
      title: "Matric Dance",
      icon: GraduationCap,
      description: "Make your matric dance an unforgettable experience with our luxury vehicles. We offer:",
      features: [
        "Special matric dance packages",
        "Professional chauffeur service",
        "Photo opportunity with the car",
        "Red carpet arrival experience",
        "Flexible 2-hour and half-day rates"
      ],
      image: "/images/services/matric.avif"
    },
    {
      title: "Wedding Transport",
      icon: Heart,
      description: "Luxury transportation for your special day. Our wedding services include:",
      features: [
        "Bridal car decoration",
        "Multiple vehicle options",
        "Coordinated arrival times",
        "Professional drivers in formal attire",
        "Custom wedding packages available"
      ],
      image: "/images/services/wedding.avif"
    },
    {
      title: "Music Videos",
      icon: Music,
      description: "Elevate your music video production with our luxury fleet:",
      features: [
        "Multiple vehicle options",
        "Flexible shooting hours",
        "Location shooting permits assistance",
        "Technical vehicle specs available",
        "Special production rates"
      ],
      image: "/images/services/music.avif"
    },
    {
      title: "Photo Shoots",
      icon: Camera,
      description: "Perfect for fashion, commercial, and personal photography:",
      features: [
        "Indoor/outdoor shooting options",
        "Multiple vehicle combinations",
        "Flexible booking hours",
        "Professional coordination",
        "Brand-friendly environments"
      ],
      image: "/images/services/photoshoot.avif"
    },
    {
      title: "Corporate Events",
      icon: Car,
      description: "Impress your clients and executives with our premium fleet:",
      features: [
        "Airport transfers",
        "Executive transport",
        "Road shows",
        "Corporate functions",
        "Long-term corporate packages"
      ],
      image: "/images/services/corporate.avif"
    },
    {
      title: "Flexible Durations",
      icon: Clock,
      description: "Choose the duration that suits your needs:",
      features: [
        "2-hour rentals",
        "Half-day packages",
        "Custom duration options",
        "Weekend specials",
        "Extended hire discounts"
      ],
      image: "/images/services/duration.avif"
    }
  ];

  return (
    <div className="container py-12 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Our Services</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Make your special moments unforgettable with our luxury vehicle experiences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div key={index} className="group relative overflow-hidden rounded-lg border hover:shadow-lg transition-all duration-300">
            <div className="absolute inset-0 z-0">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105 opacity-10"
              />
            </div>
            <div className="relative z-10 p-6 space-y-4 bg-white/80 backdrop-blur-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold">{service.title}</h2>
              <p className="text-muted-foreground">
                {service.description}
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
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