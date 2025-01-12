import { prisma } from '@/lib/db';
import { createTestUser, cleanupDatabase } from '../utils/test-utils';
import { createMocks } from 'node-mocks-http';
import { GET, POST, PUT } from '@/app/api/vehicles/route';

describe('Vehicles API', () => {
  let adminUser: any;
  let regularUser: any;
  let adminToken: string;
  let userToken: string;

  beforeAll(async () => {
    await cleanupDatabase();

    // Create admin user
    const adminData = await createTestUser({
      email: 'admin@example.com',
      password: 'admin123',
      name: 'Admin User',
      role: 'ADMIN'
    });
    adminUser = adminData.user;
    adminToken = adminData.token;

    // Create regular user
    const userData = await createTestUser();
    regularUser = userData.user;
    userToken = userData.token;

    // Create test vehicles
    await prisma.vehicle.create({
      data: {
        name: 'Standard Car',
        price: '1000',
        pricePerDay: 100,
        image: 'standard.jpg',
        images: ['standard.jpg'],
        specs: ['Standard Spec'],
        category: 'STANDARD'
      }
    });

    await prisma.vehicle.create({
      data: {
        name: 'Luxury Car',
        price: '2000',
        pricePerDay: 200,
        image: 'luxury.jpg',
        images: ['luxury.jpg'],
        specs: ['Luxury Spec'],
        category: 'LUXURY'
      }
    });
  });

  afterAll(async () => {
    await cleanupDatabase();
  });

  describe('GET /api/vehicles', () => {
    it('should return all vehicles', async () => {
      const { req, res } = createMocks({
        method: 'GET'
      });

      await GET(req, res);
      expect(res._getStatusCode()).toBe(200);
      const vehicles = JSON.parse(res._getData());
      expect(Array.isArray(vehicles)).toBeTruthy();
      expect(vehicles.length).toBe(2);
    });

    it('should filter vehicles by category', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        query: {
          category: 'LUXURY'
        }
      });

      await GET(req, res);
      expect(res._getStatusCode()).toBe(200);
      const vehicles = JSON.parse(res._getData());
      expect(vehicles.length).toBe(1);
      expect(vehicles[0].category).toBe('LUXURY');
    });

    it('should filter vehicles by price range', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        query: {
          minPrice: '1500',
          maxPrice: '2500'
        }
      });

      await GET(req, res);
      expect(res._getStatusCode()).toBe(200);
      const vehicles = JSON.parse(res._getData());
      expect(vehicles.length).toBe(1);
      expect(vehicles[0].price).toBe('2000');
    });
  });

  describe('POST /api/vehicles', () => {
    it('should allow admin to create a vehicle', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${adminToken}`
        },
        body: {
          name: 'New Vehicle',
          price: '1500',
          pricePerDay: 150,
          image: 'new.jpg',
          images: ['new.jpg'],
          specs: ['New Spec'],
          category: 'SPORT'
        }
      });

      await POST(req, res);
      expect(res._getStatusCode()).toBe(201);
      const vehicle = JSON.parse(res._getData());
      expect(vehicle.name).toBe('New Vehicle');
    });

    it('should not allow regular user to create a vehicle', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}`
        },
        body: {
          name: 'New Vehicle',
          price: '1500',
          pricePerDay: 150,
          image: 'new.jpg',
          images: ['new.jpg'],
          specs: ['New Spec'],
          category: 'SPORT'
        }
      });

      await POST(req, res);
      expect(res._getStatusCode()).toBe(403);
    });
  });

  describe('PUT /api/vehicles/:id', () => {
    let vehicleId: string;

    beforeAll(async () => {
      const vehicle = await prisma.vehicle.create({
        data: {
          name: 'Update Test Vehicle',
          price: '1000',
          pricePerDay: 100,
          image: 'test.jpg',
          images: ['test.jpg'],
          specs: ['Test Spec'],
          category: 'STANDARD'
        }
      });
      vehicleId = vehicle.id;
    });

    it('should allow admin to update a vehicle', async () => {
      const { req, res } = createMocks({
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${adminToken}`
        },
        query: {
          id: vehicleId
        },
        body: {
          name: 'Updated Vehicle',
          price: '1200'
        }
      });

      await PUT(req, res);
      expect(res._getStatusCode()).toBe(200);
      const vehicle = JSON.parse(res._getData());
      expect(vehicle.name).toBe('Updated Vehicle');
      expect(vehicle.price).toBe('1200');
    });

    it('should not allow regular user to update a vehicle', async () => {
      const { req, res } = createMocks({
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${userToken}`
        },
        query: {
          id: vehicleId
        },
        body: {
          name: 'Updated Vehicle',
          price: '1200'
        }
      });

      await PUT(req, res);
      expect(res._getStatusCode()).toBe(403);
    });
  });
});
