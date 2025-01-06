import Image from 'next/image';

export default function About() {
  return (
    <div className="container py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About ExecuHire</h1>
        
        <div className="relative h-64 mb-8 rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1562519819-016930ada31c?auto=format&fit=crop&q=80"
            alt="Luxury Cars"
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-6 text-lg">
          <p>
            ExecuHire is London's premier luxury car hire service, offering an exclusive fleet
            of high-end vehicles for discerning clients who demand the very best in automotive excellence.
          </p>
          
          <p>
            Founded in 2015, we have built our reputation on providing impeccable service,
            maintaining a meticulously curated fleet of vehicles, and ensuring every client
            experience exceeds expectations.
          </p>

          <p>
            Our team of automotive enthusiasts and luxury service specialists work
            tirelessly to maintain the highest standards of service in the industry,
            making every rental a memorable experience.
          </p>
        </div>
      </div>
    </div>
  );
}