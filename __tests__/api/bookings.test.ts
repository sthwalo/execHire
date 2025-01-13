import { prisma } from '@/lib/db';
import { createTestUser, cleanupDatabase } from '../utils/test-utils';
import { createMocks } from 'node-mocks-http';
import { POST, GET } from '@/app/api/bookings/route';
import { NextRequest } from 'next/server';

jest.mock('next-auth/next', () => ({
  getServerSession: jest.fn(() => Promise.resolve({
    user: {
      email: 'test@example.com',
      id: '123',
    }
  }))
}));

describe('Bookings API', () => {
  let user: any;
  let vehicle: any;
  let token: string;

  beforeAll(async () => {
    // Create test user and get token
    const testData = await createTestUser();
    user = testData.user;
    token = testData.token;

    // Create test vehicle
    vehicle = await prisma.vehicle.create({
      data: {
        name: 'Test Vehicle',
        price: '1000',
        pricePerDay: 100,
        image: 'test.jpg',
        images: ['test.jpg'],
        specs: ['Test Spec'],
        category: 'STANDARD',
        available: true
      }
    });
  });

  afterAll(async () => {
    await cleanupDatabase();
  });

  describe('POST /api/bookings', () => {
    it('should create a new booking with valid data', async () => {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() + 1); // Set to tomorrow
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1); // Set to day after tomorrow

      const { req } = createMocks({
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: {
          vehicleId: vehicle.id,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          totalAmount: 100
        }
      });

      const response = await POST(new NextRequest(new Request(req.url || 'http://localhost', {
        method: req.method,
        headers: req.headers as HeadersInit,
        body: JSON.stringify(req.body)
      })));

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.success).toBe(true);
      expect(data.data.vehicleId).toBe(vehicle.id);
    });

    it('should handle invalid JSON in request body', async () => {
      const { req } = createMocks({
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: 'invalid json'
      });

      const response = await POST(new NextRequest(new Request(req.url || 'http://localhost', {
        method: req.method,
        headers: req.headers as HeadersInit,
        body: req.body
      })));

      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.success).toBe(false);
      expect(data.error).toBe('Invalid JSON in request body');
    });

    it('should validate content-type header', async () => {
      const { req } = createMocks({
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'text/plain'
        },
        body: {
          vehicleId: vehicle.id,
          startDate: new Date().toISOString(),
          endDate: new Date().toISOString(),
          totalAmount: 100
        }
      });

      const response = await POST(new NextRequest(new Request(req.url || 'http://localhost', {
        method: req.method,
        headers: req.headers as HeadersInit,
        body: JSON.stringify(req.body)
      })));

      expect(response.status).toBe(415);
      const data = await response.json();
      expect(data.success).toBe(false);
      expect(data.error).toBe('Content-Type must be application/json');
    });

    it('should validate required fields', async () => {
      const { req } = createMocks({
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: {
          // Missing required fields
        }
      });

      const response = await POST(new NextRequest(new Request(req.url || 'http://localhost', {
        method: req.method,
        headers: req.headers as HeadersInit,
        body: JSON.stringify(req.body)
      })));

      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.success).toBe(false);
      expect(data.error).toBe('Missing required fields');
    });

    it('should validate date format', async () => {
      const { req } = createMocks({
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: {
          vehicleId: vehicle.id,
          startDate: 'invalid-date',
          endDate: 'invalid-date',
          totalAmount: 100
        }
      });

      const response = await POST(new NextRequest(new Request(req.url || 'http://localhost', {
        method: req.method,
        headers: req.headers as HeadersInit,
        body: JSON.stringify(req.body)
      })));

      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.success).toBe(false);
      expect(data.error).toBe('Invalid date format');
    });
  });

  describe('GET /api/bookings', () => {
    beforeEach(async () => {
      // Create a test booking
      await prisma.booking.create({
        data: {
          userId: user.id,
          vehicleId: vehicle.id,
          startDate: new Date(),
          endDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
          totalAmount: 100,
          status: 'PENDING'
        }
      });
    });

    it('should return user bookings', async () => {
      const { req } = createMocks({
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const response = await GET(new NextRequest(new Request(req.url || 'http://localhost', {
        method: req.method,
        headers: req.headers as HeadersInit
      })));

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.success).toBe(true);
      expect(Array.isArray(data.data)).toBe(true);
      expect(data.data.length).toBeGreaterThan(0);
    });

    it('should handle unauthorized access', async () => {
      const { req } = createMocks({
        method: 'GET'
      });

      const response = await GET(new NextRequest(new Request(req.url || 'http://localhost', {
        method: req.method,
        headers: req.headers as HeadersInit
      })));

      expect(response.status).toBe(401);
      const data = await response.json();
      expect(data.success).toBe(false);
      expect(data.error).toBe('Unauthorized');
    });
  });
});
