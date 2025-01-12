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
      price: "R18,000",
      pricePerDay: 18000,
      specs: ["Premium SUV", "4.0L V8 Twin-Turbo", "Automatic", "5 Seats", "2hrs: R5,000"],
      description: "Experience luxury and power with our Lamborghini Urus",
      category: Category.LUXURY,
      available: true
    },
    {
      name: "BMW i7 740d",
      image: "/images/fleet/i7.jpg",
      price: "R10,000",
      pricePerDay: 10000,
      specs: ["Luxury Sedan", "Electric/Diesel Hybrid", "Automatic", "5 Seats", "2hrs: R3,000"],
      description: "The perfect blend of luxury and efficiency",
      category: Category.LUXURY,
      available: true
    },
    {
      name: "Mercedes G63",
      image: "/images/fleet/g63.avif",
      price: "R10,000",
      pricePerDay: 10000,
      specs: ["Luxury SUV", "4.0L V8 Biturbo", "Automatic", "5 Seats", "2hrs: R3,000"],
      description: "Iconic luxury SUV with unmatched presence",
      category: Category.LUXURY,
      available: true
    },
    {
      name: "Maserati Levante",
      image: "/images/fleet/levante.webp",
      price: "R8,000",
      pricePerDay: 8000,
      specs: ["Luxury SUV", "3.0L V6 Twin-Turbo", "Automatic", "5 Seats", "2hrs: R2,500"],
      description: "Italian luxury meets SUV versatility",
      category: Category.LUXURY,
      available: true
    },
    {
      name: "Porsche Panamera GTS",
      image: "/images/fleet/panamera.webp",
      price: "R8,000",
      pricePerDay: 8000,
      specs: ["Sports Sedan", "4.0L V8 Twin-Turbo", "Automatic", "4 Seats", "2hrs: R2,500"],
      description: "The perfect blend of luxury and performance",
      category: Category.LUXURY,
      available: true
    },
    {
      name: "Porsche 718 Boxster GTS",
      image: "/images/fleet/boxster.webp",
      price: "R8,000",
      pricePerDay: 8000,
      specs: ["Sports Car", "4.0L Flat-6", "Automatic", "2 Seats", "2hrs: R2,500"],
      description: "Pure driving pleasure in convertible form",
      category: Category.LUXURY,
      available: true
    },
    {
      name: "Audi RS5",
      image: "/images/fleet/rs5.webp",
      price: "R8,000",
      pricePerDay: 8000,
      specs: ["Sports Coupe", "2.9L V6 Twin-Turbo", "Automatic", "4 Seats", "2hrs: R2,500"],
      description: "German engineering meets high performance",
      category: Category.LUXURY,
      available: true
    },
    {
      name: "Mercedes GLE 63s",
      image: "/images/fleet/gle63s.webp",
      price: "R8,000",
      pricePerDay: 8000,
      specs: ["Performance SUV", "4.0L V8 Biturbo", "Automatic", "5 Seats", "2hrs: R2,500"],
      description: "Luxury SUV with sports car performance",
      category: Category.LUXURY,
      available: true
    },
    {
      name: "Mercedes C63 W204",
      image: "/images/fleet/c63.webp",
      price: "R8,000",
      pricePerDay: 8000,
      specs: ["Sports Sedan", "6.2L V8", "Automatic", "5 Seats", "2hrs: R2,500"],
      description: "Classic AMG performance and sound",
      category: Category.LUXURY,
      available: true
    },
    {
      name: "Mercedes V-Class 300d",
      image: "/images/fleet/vclass.webp",
      price: "R8,000",
      pricePerDay: 8000,
      specs: ["Luxury Van", "2.0L Diesel", "Automatic", "7 Seats", "2hrs: R2,500"],
      description: "Ultimate luxury transportation for groups",
      category: Category.LUXURY,
      available: true
    },
    {
      name: "Ford Mustang GT Convertible",
      image: "/images/fleet/mustang.webp",
      price: "R8,000",
      pricePerDay: 8000,
      specs: ["Sports Car", "5.0L V8", "Automatic", "4 Seats", "2hrs: R2,500"],
      description: "American muscle car icon",
      category: Category.LUXURY,
      available: true
    },
    {
      name: "Mercedes CLS 53",
      image: "/images/fleet/cls53.webp",
      price: "R8,000",
      pricePerDay: 8000,
      specs: ["Luxury Coupe", "3.0L I6 Turbo", "Automatic", "4 Seats", "2hrs: R2,500"],
      description: "Elegant four-door coupe with AMG performance",
      category: Category.LUXURY,
      available: true
    },
    {
      name: "Mercedes GLE 400d",
      image: "/images/fleet/gle400d.webp",
      price: "R6,500",
      pricePerDay: 6500,
      specs: ["Luxury SUV", "3.0L Diesel", "Automatic", "5 Seats", "2hrs: R2,000"],
      description: "Refined luxury SUV with excellent efficiency",
      category: Category.STANDARD,
      available: true
    },
    {
      name: "Mercedes C43",
      image: "/images/fleet/c43.webp",
      price: "R6,500",
      pricePerDay: 6500,
      specs: ["Sports Sedan", "3.0L V6 Biturbo", "Automatic", "5 Seats", "2hrs: R2,000"],
      description: "Perfect balance of luxury and performance",
      category: Category.STANDARD,
      available: true
    },
    {
      name: "Mercedes GLE 350d",
      image: "/images/fleet/gle350d.webp",
      price: "R6,000",
      pricePerDay: 6000,
      specs: ["Luxury SUV", "3.0L Diesel", "Automatic", "5 Seats", "2hrs: R2,000"],
      description: "Comfortable and capable luxury SUV",
      category: Category.STANDARD,
      available: true
    },
    {
      name: "Range Rover Sport",
      image: "/images/fleet/rrsport.webp",
      price: "R6,000",
      pricePerDay: 6000,
      specs: ["Luxury SUV", "3.0L V6", "Automatic", "5 Seats", "2hrs: R2,000"],
      description: "The perfect blend of luxury and capability",
      category: Category.STANDARD,
      available: true
    },
    {
      name: "Mercedes A45",
      image: "/images/fleet/a45.webp",
      price: "R4,500",
      pricePerDay: 4500,
      specs: ["Hot Hatch", "2.0L Turbo", "Automatic", "5 Seats", "2hrs: R2,000"],
      description: "Compact size with massive performance",
      category: Category.STANDARD,
      available: true
    },
    {
      name: "Chevrolet Lumina SS",
      image: "/images/fleet/lumina.webp",
      price: "R4,500",
      pricePerDay: 4500,
      specs: ["Sports Sedan", "6.0L V8", "Automatic", "5 Seats", "2hrs: R1,500"],
      description: "Classic V8 muscle car experience",
      category: Category.STANDARD,
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
