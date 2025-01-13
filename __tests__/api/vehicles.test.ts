import { prisma } from '@/lib/prisma';
import { cleanupDatabase, createTestUser, createTestVehicle } from '../utils/test-utils';
import { Category, Role } from '@prisma/client';
import { GET, POST, PUT } from '@/app/api/vehicles/route';
import { NextRequest } from 'next/server';

describe('Vehicles API', () => {
  let adminUser: any;
  let regularUser: any;
  let adminToken: string;
  let userToken: string;

  beforeEach(async () => {
    await cleanupDatabase();

    // Create admin user
    const adminData = await createTestUser(Role.ADMIN);
    adminUser = adminData.user;
    adminToken = adminData.token;

    // Create regular user
    const userData = await createTestUser(Role.USER);
    regularUser = userData.user;
    userToken = userData.token;
  });

  afterEach(async () => {
    await cleanupDatabase();
  });

  describe('GET /api/vehicles', () => {
    it('should return all vehicles', async () => {
      // Create test vehicles
      await createTestVehicle();
      await createTestVehicle({ name: 'Test Vehicle 2', price: '2000' });

      const response = await GET(new Request('http://localhost/api/vehicles'));
      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data.length).toBe(2);
    });

    it('should filter vehicles by category', async () => {
      // Create test vehicles with different categories
      await createTestVehicle({ category: Category.STANDARD });
      await createTestVehicle({ category: Category.PREMIUM });

      const response = await GET(
        new Request('http://localhost/api/vehicles?category=PREMIUM')
      );
      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data.length).toBe(1);
      expect(data[0].category).toBe(Category.PREMIUM);
    });

    it('should filter vehicles by price range', async () => {
      // Create test vehicles with different prices
      await createTestVehicle({ price: '500' });
      await createTestVehicle({ price: '3000' });

      const response = await GET(
        new Request('http://localhost/api/vehicles?minPrice=1000&maxPrice=4000')
      );
      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data.length).toBe(1);
      expect(data[0].price).toBe('3000');
    });
  });

  describe('POST /api/vehicles', () => {
    const vehicleData = {
      name: 'New Vehicle',
      price: '1500',
      image: 'new.jpg',
      images: ['new.jpg'],
      specs: ['spec1', 'spec2'],
      category: Category.STANDARD,
      description: 'New description',
      pricePerDay: 150
    };

    it('should allow admin to create a vehicle', async () => {
      const response = await POST(
        new Request('http://localhost/api/vehicles', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer header.${Buffer.from(
              JSON.stringify({ role: 'ADMIN', id: adminUser.id })
            ).toString('base64')}.signature`
          },
          body: JSON.stringify(vehicleData)
        })
      );

      expect(response.status).toBe(201);
      const vehicle = await response.json();
      expect(vehicle.name).toBe('New Vehicle');
    });

    it('should not allow regular user to create a vehicle', async () => {
      const response = await POST(
        new Request('http://localhost/api/vehicles', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer header.${Buffer.from(
              JSON.stringify({ role: 'USER', id: regularUser.id })
            ).toString('base64')}.signature`
          },
          body: JSON.stringify(vehicleData)
        })
      );

      expect(response.status).toBe(403);
    });
  });

  describe('PUT /api/vehicles/:id', () => {
    let vehicleId: string;

    beforeEach(async () => {
      const vehicle = await createTestVehicle();
      vehicleId = vehicle.id;
    });

    it('should allow admin to update a vehicle', async () => {
      const updateData = {
        name: 'Updated Vehicle',
        price: '2000',
        image: 'updated.jpg',
        images: ['updated.jpg'],
        specs: ['spec3', 'spec4'],
        category: Category.PREMIUM,
        description: 'Updated description',
        pricePerDay: 200
      };

      const response = await PUT(
        new Request(`http://localhost/api/vehicles/${vehicleId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer header.${Buffer.from(
              JSON.stringify({ role: 'ADMIN', id: adminUser.id })
            ).toString('base64')}.signature`
          },
          body: JSON.stringify(updateData)
        })
      );

      expect(response.status).toBe(200);
      const vehicle = await response.json();
      expect(vehicle.name).toBe('Updated Vehicle');
    });

    it('should not allow regular user to update a vehicle', async () => {
      const updateData = {
        name: 'Updated Vehicle',
        price: '2000',
        image: 'updated.jpg',
        images: ['updated.jpg'],
        specs: ['spec3', 'spec4'],
        category: Category.PREMIUM,
        description: 'Updated description',
        pricePerDay: 200
      };

      const response = await PUT(
        new Request(`http://localhost/api/vehicles/${vehicleId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer header.${Buffer.from(
              JSON.stringify({ role: 'USER', id: regularUser.id })
            ).toString('base64')}.signature`
          },
          body: JSON.stringify(updateData)
        })
      );

      expect(response.status).toBe(403);
    });
  });
});
