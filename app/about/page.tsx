import { Car, Shield, Award, Heart, Users, Target, Star } from 'lucide-react';
import Image from 'next/image';

export default function About() {
  return (
    <div className="container py-12 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">About ExecuHire</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Transforming transportation into extraordinary experiences for life's most cherished moments
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
            At ExecuHire, we specialize in providing luxury vehicle experiences for life's most memorable moments. 
            From matric dances to weddings, music video productions to corporate events, we ensure each occasion is elevated 
            with our premium fleet and exceptional service.
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <p className="text-muted-foreground">
            Our mission is to transform transportation into an extraordinary experience by offering premium vehicles 
            for life's most cherished milestones and essential needs. We are committed to providing exceptional service 
            that reflects style, comfort, and reliability, ensuring every journey becomes a memorable part of our clients' stories.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          {
            icon: Target,
            title: "Deliver Excellence",
            description: "Providing top-tier vehicles and outstanding customer service for all occasions"
          },
          {
            icon: Star,
            title: "Create Memories",
            description: "Enhancing special events with stylish and luxurious transportation options"
          },
          {
            icon: Shield,
            title: "Ensure Reliability",
            description: "Building trust through punctuality, safety, and professionalism"
          },
          {
            icon: Users,
            title: "Expand Reach",
            description: "Becoming the go-to service for milestone events and airport shuttles"
          }
        ].map((feature, index) => (
          <div key={index} className="p-6 border rounded-lg text-center space-y-4 hover:shadow-lg transition-all">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <feature.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-primary/5 p-8 rounded-lg">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold">Our Commitment</h2>
          <p className="text-muted-foreground">
            As a dynamic start-up in the luxury car hire industry, we are dedicated to making every journey special. 
            Whether it's a matric dance, wedding, graduation, or airport transfer, our commitment to quality and 
            convenience ensures a memorable and seamless experience. Available 7 days a week, we're here to make 
            your special moments truly unforgettable.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            <div className="space-y-2">
              <h3 className="font-semibold">Premium Fleet</h3>
              <p className="text-sm text-muted-foreground">Carefully selected luxury vehicles for every occasion</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Professional Service</h3>
              <p className="text-sm text-muted-foreground">Experienced chauffeurs and dedicated support team</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Tailored Solutions</h3>
              <p className="text-sm text-muted-foreground">Customized packages for your specific needs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}