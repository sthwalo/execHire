const { PrismaClient, Category } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Delete existing records
  await prisma.booking.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.user.deleteMany();

  // Create vehicles
  const vehicles = [
    {
      name: "Mercedes-AMG C43",
      image: "/images/fleet/c43.avif",
      price: "R8,000/half-day | R2,500/hr",
      specs: ["Sport Sedan", "3.0L Inline-6 Turbo", "Automatic", "5 Seats"],
      available: true,
      pricePerDay: 16000,
      category: Category.LUXURY
    },
    {
      name: "BMW i7 740d",
      image: "/images/fleet/i7.avif",
      price: "R10,000/half-day | R3,000/hr",
      specs: ["Luxury Sedan", "Electric/Diesel Hybrid", "Automatic", "5 Seats"],
      available: true,
      pricePerDay: 20000,
      category: Category.LUXURY
    },
    {
      name: "Mercedes G63",
      image: "/images/fleet/G63.avif",
      price: "R10,000/half-day | R3,000/hr",
      specs: ["Luxury SUV", "4.0L V8 Biturbo", "Automatic", "5 Seats"],
      available: true,
      pricePerDay: 20000,
      category: Category.LUXURY
    },
    {
      name: "Maserati Levante",
      image: "/images/fleet/Levante.avif",
      price: "R8,000/half-day | R2,500/hr",
      specs: ["Luxury SUV", "3.0L V6 Twin-Turbo", "Automatic", "5 Seats"],
      available: true,
      pricePerDay: 16000,
      category: Category.LUXURY
    },
    {
      name: "Mercedes-AMG A45",
      image: "/images/fleet/a45.avif",
      price: "R6,000/half-day | R2,000/hr",
      specs: ["Hot Hatch", "2.0L Turbo", "Automatic", "5 Seats"],
      available: true,
      pricePerDay: 12000,
      category: Category.SPORT
    },
    {
      name: "Mercedes-Benz GLE 400d",
      image: "/images/fleet/gle400.avif",
      price: "R7,000/half-day | R2,200/hr",
      specs: ["Luxury SUV", "3.0L Diesel", "Automatic", "5 Seats"],
      available: true,
      pricePerDay: 14000,
      category: Category.SUV
    },
    {
      name: "Mercedes-Benz GLE 350d",
      image: "/images/fleet/gle350.avif",
      price: "R6,500/half-day | R2,000/hr",
      specs: ["Luxury SUV", "3.0L Diesel", "Automatic", "5 Seats"],
      available: true,
      pricePerDay: 13000,
      category: Category.SUV
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