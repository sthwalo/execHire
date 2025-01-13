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
      name: "Lamborghini Urus",
      image: "/images/fleet/urus.avif",
      price: "R18,000/half-day | R5,000/hr",
      specs: ["Super SUV", "4.0L V8 Twin-Turbo", "8-Speed Auto", "5 Seats", "650 HP"],
      available: true,
      pricePerDay: 36000,
      category: Category.LUXURY,
      featured: true
    },
    {
      name: "BMW i7 740d",
      image: "/images/fleet/i7.avif",
      price: "R10,000/half-day | R3,000/hr",
      specs: ["Luxury Sedan", "Electric/Diesel Hybrid", "8-Speed Auto", "5 Seats", "Theater Screen"],
      available: true,
      pricePerDay: 20000,
      category: Category.LUXURY,
      featured: true
    },
    {
      name: "Mercedes G63 AMG",
      image: "/images/fleet/G63.avif",
      price: "R10,000/half-day | R3,000/hr",
      specs: ["Luxury SUV", "4.0L V8 Biturbo", "9-Speed Auto", "5 Seats", "577 HP"],
      available: true,
      pricePerDay: 20000,
      category: Category.LUXURY,
      featured: true
    },
    {
      name: "Maserati Levante",
      image: "/images/fleet/levante.avif",
      price: "R8,000/half-day | R2,500/hr",
      specs: ["Luxury SUV", "3.0L V6 Twin-Turbo", "8-Speed Auto", "5 Seats", "Italian Design"],
      available: true,
      pricePerDay: 16000,
      category: Category.LUXURY
    },
    {
      name: "Porsche Panamera GTS",
      image: "/images/fleet/panamera.avif",
      price: "R8,000/half-day | R2,500/hr",
      specs: ["Sport Sedan", "4.0L V8 Twin-Turbo", "8-Speed PDK", "4 Seats", "473 HP"],
      available: true,
      pricePerDay: 16000,
      category: Category.SPORT,
      featured: true
    },
    {
      name: "Porsche 718 Boxster GTS",
      image: "/images/fleet/boxster.avif",
      price: "R8,000/half-day | R2,500/hr",
      specs: ["Sports Car", "4.0L Flat-6", "6-Speed Manual", "2 Seats", "Convertible"],
      available: true,
      pricePerDay: 16000,
      category: Category.SPORT
    },
    {
      name: "Audi RS5",
      image: "/images/fleet/rs5.avif",
      price: "R8,000/half-day | R2,500/hr",
      specs: ["Sport Coupe", "2.9L V6 Twin-Turbo", "8-Speed Auto", "4 Seats", "444 HP"],
      available: true,
      pricePerDay: 16000,
      category: Category.SPORT
    },
    {
      name: "Mercedes-AMG GLE 63S",
      image: "/images/fleet/gle63s.avif",
      price: "R8,000/half-day | R2,500/hr",
      specs: ["Performance SUV", "4.0L V8 Biturbo", "9-Speed Auto", "5 Seats", "603 HP"],
      available: true,
      pricePerDay: 16000,
      category: Category.LUXURY
    },
    {
      name: "Mercedes C63 AMG W204",
      image: "/images/fleet/c63w204.avif",
      price: "R8,000/half-day | R2,500/hr",
      specs: ["Sport Sedan", "6.2L V8", "7-Speed Auto", "5 Seats", "Classic AMG"],
      available: true,
      pricePerDay: 16000,
      category: Category.VINTAGE
    },
    {
      name: "Mercedes V-Class 300d",
      image: "/images/fleet/vclass.avif",
      price: "R8,000/half-day | R2,500/hr",
      specs: ["Luxury Van", "2.0L Diesel", "9-Speed Auto", "7 Seats", "VIP Interior"],
      available: true,
      pricePerDay: 16000,
      category: Category.VAN
    },
    {
      name: "Ford Mustang GT Convertible",
      image: "/images/fleet/mustang.avif",
      price: "R8,000/half-day | R2,500/hr",
      specs: ["Muscle Car", "5.0L V8", "10-Speed Auto", "4 Seats", "Convertible"],
      available: true,
      pricePerDay: 16000,
      category: Category.SPORT
    },
    {
      name: "Mercedes-AMG CLS 53",
      image: "/images/fleet/cls53.avif",
      price: "R8,000/half-day | R2,500/hr",
      specs: ["4-Door Coupe", "3.0L I6 Turbo", "9-Speed Auto", "5 Seats", "Mild Hybrid"],
      available: true,
      pricePerDay: 16000,
      category: Category.LUXURY
    },
    {
      name: "Mercedes-Benz GLE 400d",
      image: "/images/fleet/gle400d.avif",
      price: "R6,500/half-day | R2,000/hr",
      specs: ["Luxury SUV", "3.0L Diesel", "9-Speed Auto", "5 Seats", "Premium Interior"],
      available: true,
      pricePerDay: 13000,
      category: Category.SUV
    },
    {
      name: "Mercedes-AMG C43",
      image: "/images/fleet/c43.avif",
      price: "R6,500/half-day | R2,000/hr",
      specs: ["Sport Sedan", "2.0L I4 Turbo", "9-Speed Auto", "5 Seats", "402 HP"],
      available: true,
      pricePerDay: 13000,
      category: Category.SPORT
    },
    {
      name: "Mercedes-Benz GLE 350d",
      image: "/images/fleet/gle350d.avif",
      price: "R6,000/half-day | R2,000/hr",
      specs: ["Luxury SUV", "2.0L Diesel", "9-Speed Auto", "5 Seats", "Comfort Focus"],
      available: true,
      pricePerDay: 12000,
      category: Category.SUV
    },
    {
      name: "Range Rover Sport",
      image: "/images/fleet/rover.avif",
      price: "R6,000/half-day | R2,000/hr",
      specs: ["Luxury SUV", "3.0L I6 MHEV", "8-Speed Auto", "5 Seats", "Off-Road Capable"],
      available: true,
      pricePerDay: 12000,
      category: Category.SUV
    },
    {
      name: "Mercedes-AMG A45",
      image: "/images/fleet/a45.avif",
      price: "R4,500/half-day | R2,000/hr",
      specs: ["Hot Hatch", "2.0L Turbo", "8-Speed DCT", "5 Seats", "421 HP"],
      available: true,
      pricePerDay: 9000,
      category: Category.SPORT
    },
    {
      name: "Chevrolet Lumina SS",
      image: "/images/fleet/lumina.avif",
      price: "R4,500/half-day | R1,500/hr",
      specs: ["Muscle Car", "6.0L V8", "6-Speed Manual", "5 Seats", "Classic Power"],
      available: true,
      pricePerDay: 9000,
      category: Category.VINTAGE
    }
  ];

  for (const vehicle of vehicles) {
    await prisma.vehicle.create({
      data: vehicle
    });
  }

  // Create admin user
  const bcrypt = require('bcrypt');
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash('admin123', saltRounds);

  await prisma.user.create({
    data: {
      email: 'admin@execuhire.com',
      name: 'Admin',
      password: hashedPassword,
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