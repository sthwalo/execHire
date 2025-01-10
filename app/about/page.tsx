import Image from 'next/image';
import { Shield, Award, Heart, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="container py-12 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Delivering exceptional luxury vehicle experiences for your special moments
        </p>
      </div>
      
      <div className="relative h-64 rounded-lg overflow-hidden">
        <Image
          src="/images/fleet/urus.avif"
          alt="Luxury Cars"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Our Story</h2>
          <p className="text-muted-foreground">
            At Global Hope Consortium, we specialize in providing luxury vehicle experiences for life's most memorable moments. 
            From matric dances to weddings, music video productions to corporate events, we ensure each occasion is elevated 
            with our premium fleet and exceptional service.
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <p className="text-muted-foreground">
            We are committed to delivering more than just luxury vehicles – we create unforgettable experiences. Our mission 
            is to make every special moment extraordinary with our carefully curated fleet and personalized service that 
            exceeds expectations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          {
            icon: Shield,
            title: "Premium Service",
            description: "Professional chauffeurs and dedicated support for every booking"
          },
          {
            icon: Award,
            title: "Luxury Fleet",
            description: "Carefully selected premium vehicles for every occasion"
          },
          {
            icon: Heart,
            title: "Special Events",
            description: "Specialized packages for matric dances, weddings, and more"
          },
          {
            icon: Users,
            title: "Client Focus",
            description: "Personalized attention to meet your specific needs"
          }
        ].map((feature, index) => (
          <div key={index} className="p-6 border rounded-lg text-center space-y-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <feature.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-primary/5 p-8 rounded-lg">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold">Our Commitment</h2>
          <p className="text-muted-foreground">
            We understand that each event is unique and deserves special attention. From matric dances that mark important 
            milestones to weddings that celebrate love, our team is dedicated to ensuring your experience with us is nothing 
            short of exceptional. Available 7 days a week, we're here to make your special moments truly unforgettable.
          </p>
        </div>
      </div>
    </div>
  );
}