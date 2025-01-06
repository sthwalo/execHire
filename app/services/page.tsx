import { Shield, Star, Clock, Headphones } from 'lucide-react';

export default function Services() {
  return (
    <div className="container py-16">
      <h1 className="text-4xl font-bold mb-8">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          {
            icon: Star,
            title: "Premium Car Rental",
            description: "Access our fleet of luxury vehicles for any occasion."
          },
          {
            icon: Clock,
            title: "Flexible Duration",
            description: "Rent from a single day to extended periods."
          },
          {
            icon: Shield,
            title: "Full Insurance",
            description: "Comprehensive coverage for worry-free travel."
          },
          {
            icon: Headphones,
            title: "24/7 Support",
            description: "Round-the-clock assistance whenever you need it."
          }
        ].map((service, index) => (
          <div key={index} className="p-6 border rounded-lg">
            <service.icon className="w-12 h-12 text-primary mb-4" />
            <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
            <p className="text-muted-foreground">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}