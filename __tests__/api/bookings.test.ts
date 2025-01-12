import { prisma } from '@/lib/db';
import { createTestUser, cleanupDatabase } from '../utils/test-utils';
import { createMocks } from 'node-mocks-http';
import { POST, GET } from '@/app/api/bookings/route';

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
        category: 'STANDARD'
      }
    });
  });

  afterAll(async () => {
    await cleanupDatabase();
  });

  describe('POST /api/bookings', () => {
    it('should create a new booking', async () => {
      const startDate = new Date();
      const endDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

      const { req, res } = createMocks({
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: {
          vehicleId: vehicle.id,
          startDate,
          endDate,
          totalAmount: 100
        }
      });

      await POST(req, res);

      expect(res._getStatusCode()).toBe(201);
      const booking = JSON.parse(res._getData());
      expect(booking.vehicleId).toBe(vehicle.id);
      expect(booking.userId).toBe(user.id);
    });

    it('should return 400 for invalid dates', async () => {
      const startDate = new Date();
      const endDate = new Date(Date.now() - 24 * 60 * 60 * 1000); // End date before start date

      const { req, res } = createMocks({
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: {
          vehicleId: vehicle.id,
          startDate,
          endDate,
          totalAmount: 100
        }
      });

      await POST(req, res);
      expect(res._getStatusCode()).toBe(400);
    });

    it('should return 401 without authentication', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          vehicleId: vehicle.id,
          startDate: new Date(),
          endDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
          totalAmount: 100
        }
      });

      await POST(req, res);
      expect(res._getStatusCode()).toBe(401);
    });
  });

  describe('GET /api/bookings', () => {
    it('should return user bookings', async () => {
      // Create a test booking first
      await prisma.booking.create({
        data: {
          userId: user.id,
          vehicleId: vehicle.id,
          startDate: new Date(),
          endDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
          totalAmount: 100
        }
      });

      const { req, res } = createMocks({
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      await GET(req, res);
      expect(res._getStatusCode()).toBe(200);
      const bookings = JSON.parse(res._getData());
      expect(Array.isArray(bookings)).toBeTruthy();
      expect(bookings.length).toBeGreaterThan(0);
      expect(bookings[0].userId).toBe(user.id);
    });
  });
});
