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
      price: "R18,000/half-day",
      specs: ["Premium SUV", "4.0L V8 Twin-Turbo", "Automatic", "5 Seats", "2hrs: R5,000"],
      available: true
    },
    {
      name: "BMW i7 740d",
      image: "/images/fleet/i7.jpg",
      price: "R10,000/half-day",
      specs: ["Luxury Sedan", "Electric/Diesel Hybrid", "Automatic", "5 Seats", "2hrs: R3,000"],
      available: true
    },
    {
      name: "Mercedes G63",
      image: "/images/fleet/g63.avif",
      price: "R10,000/half-day",
      specs: ["Luxury SUV", "4.0L V8 Biturbo", "Automatic", "5 Seats", "2hrs: R3,000"],
      available: true
    },
    {
      name: "Maserati Levante",
      image: "/images/fleet/Levante.webp",
      price: "R8,000/half-day",
      specs: ["Luxury SUV", "3.0L V6 Twin-Turbo", "Automatic", "5 Seats", "2hrs: R2,500"],
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
