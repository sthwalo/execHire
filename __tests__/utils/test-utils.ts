import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { Role, Category } from '@prisma/client';
import { NextRequest } from 'next/server';
import { Headers } from 'next/dist/compiled/@edge-runtime/primitives';

export async function cleanupDatabase() {
  try {
    // Delete in correct order to handle foreign key constraints
    const tables = [
      'notification',
      'review',
      'payment',
      'booking',
      'vehicle',
      'user'
    ];

    for (const table of tables) {
      try {
        await prisma[table].deleteMany();
      } catch (error: any) {
        // Ignore error if table doesn't exist
        if (!error.message.includes('does not exist')) {
          throw error;
        }
      }
    }
  } catch (error) {
    console.error('Error cleaning up database:', error);
    throw error;
  }
}

export async function createTestUser(userRole: Role = Role.USER) {
  const hashedPassword = await hash('password123', 10);
  const user = await prisma.user.create({
    data: {
      email: `test${Date.now()}@example.com`,
      name: 'Test User',
      password: hashedPassword,
      role: userRole,
    },
  });

  const token = sign(
    { 
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.NEXTAUTH_SECRET || 'test-secret',
    { expiresIn: '1h' }
  );

  return { user, token };
}

export async function createTestVehicle(overrides: any = {}) {
  const defaultData = {
    name: `Test Vehicle ${Date.now()}`,
    price: '1000',
    image: 'test.jpg',
    images: ['test.jpg'],
    specs: ['spec1', 'spec2'],
    category: Category.STANDARD,
    description: 'Test description',
    pricePerDay: 100,
    available: true,
    featured: false
  };

  const vehicle = await prisma.vehicle.create({
    data: {
      ...defaultData,
      ...overrides
    }
  });

  return vehicle;
}

export async function createTestBooking(userId: string, vehicleId: string) {
  const booking = await prisma.booking.create({
    data: {
      userId,
      vehicleId,
      startDate: new Date(),
      endDate: new Date(Date.now() + 86400000), // +1 day
      totalAmount: 100
    }
  });

  return booking;
}

export function createMocks(options: any = {}) {
  const req = {
    headers: new Headers(options.headers || {}),
    method: options.method || 'GET',
    url: options.url || 'http://localhost',
    query: options.query || {},
    body: options.body || null,
    json: async () => options.body || {},
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    headers: new Headers(),
  };

  return { req: req as unknown as NextRequest, res };
}
