import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Delete existing records
  await prisma.booking.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.user.deleteMany();

  // Create vehicles
  const vehicles = [
    {
      name: "Lamborghini Urus",
      image: "/images/fleet/urus.avif",
      price: "R18,000/half-day | R5,000/hr",
      specs: ["Premium SUV", "4.0L V8 Twin-Turbo", "Automatic", "5 Seats"],
      available: true
    },
    {
      name: "BMW i7 740d",
      image: "/images/fleet/i7.avif",
      price: "R10,000/half-day | R3,000/hr",
      specs: ["Luxury Sedan", "Electric/Diesel Hybrid", "Automatic", "5 Seats"],
      available: true
    },
    {
      name: "Mercedes G63",
      image: "/images/fleet/g63.avif",
      price: "R10,000/half-day | R3,000/hr",
      specs: ["Luxury SUV", "4.0L V8 Biturbo", "Automatic", "5 Seats"],
      available: true
    },
    {
      name: "Maserati Levante",
      image: "/images/fleet/Levante.avif",
      price: "R8,000/half-day | R2,500/hr",
      specs: ["Luxury SUV", "3.0L V6 Twin-Turbo", "Automatic", "5 Seats"],
      available: true
    },
    {
      name: "Range Rover P530 First Edition",
      image: "/images/fleet/p530.avif",
      price: "R8,000/half-day | R2,500/hr",
      specs: ["Luxury SUV", "4.4L V8 Twin-Turbo", "Automatic", "5 Seats"],
      available: true
    }
  ];

  for (const vehicle of vehicles) {
    await prisma.vehicle.create({
      data: vehicle
    });
  }

  // Create admin user
  await prisma.user.create({
    data: {
      email: 'admin@execuhire.com',
      name: 'Admin User',
      password: 'admin123', // In production, this should be hashed
      role: 'ADMIN'
    }
  });

  console.log('Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });