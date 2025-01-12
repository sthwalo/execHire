import { prisma } from '@/lib/db';
import { sign } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Role, Category } from '@prisma/client';

export async function cleanupDatabase() {
  await prisma.payment.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.user.deleteMany();
  await prisma.notification.deleteMany();
}

export async function createTestUser(data = {
  email: 'test@example.com',
  password: 'password123',
  name: 'Test User',
  role: 'USER'
}) {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
      role: data.role as Role
    }
  });

  const token = sign({ userId: user.id }, process.env.JWT_SECRET || 'test_secret_key');

  return { user, token };
}

export async function createTestVehicle(data = {
  name: 'Test Vehicle',
  price: '1000',
  pricePerDay: 100,
  image: 'test.jpg',
  images: ['test.jpg'],
  specs: ['Test Spec'],
  category: 'STANDARD'
}) {
  return prisma.vehicle.create({
    data: {
      ...data,
      category: data.category as Category,
      pricePerDay: typeof data.pricePerDay === 'number' ? data.pricePerDay : 100
    }
  });
}

export async function createTestBooking(data: any) {
  return prisma.booking.create({
    data: {
      ...data,
      startDate: data.startDate || new Date(),
      endDate: data.endDate || new Date(Date.now() + 24 * 60 * 60 * 1000),
      totalAmount: data.totalAmount || 100
    }
  });
}

export function mockRequest(method: string, body?: any, token?: string) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  };
}

export function mockResponse() {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}
