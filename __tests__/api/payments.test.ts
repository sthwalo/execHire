import { prisma } from '@/lib/db';
import { createTestUser, createTestVehicle, createTestBooking, cleanupDatabase } from '../utils/test-utils';
import { createMocks } from 'node-mocks-http';
import { POST as CreateIntent } from '@/app/api/payments/create-intent/route';
import { POST as ConfirmPayment } from '@/app/api/payments/confirm/route';
import { GET } from '@/app/api/payments/history/route';

jest.mock('@/lib/stripe', () => ({
  stripe: {
    paymentIntents: {
      create: jest.fn().mockResolvedValue({
        client_secret: 'test_client_secret',
        id: 'test_payment_intent_id'
      }),
      confirm: jest.fn().mockResolvedValue({
        status: 'succeeded'
      })
    }
  }
}));

describe('Payments API', () => {
  let user: any;
  let token: string;
  let vehicle: any;
  let booking: any;

  beforeAll(async () => {
    await cleanupDatabase();

    // Create test data
    const testUser = await createTestUser();
    user = testUser.user;
    token = testUser.token;

    vehicle = await createTestVehicle();
    
    booking = await createTestBooking({
      userId: user.id,
      vehicleId: vehicle.id,
      totalAmount: 200
    });
  });

  afterAll(async () => {
    await cleanupDatabase();
  });

  describe('POST /api/payments/create-intent', () => {
    it('should create a payment intent', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: {
          bookingId: booking.id
        }
      });

      await CreateIntent(req, res);

      expect(res._getStatusCode()).toBe(200);
      const data = JSON.parse(res._getData());
      expect(data.clientSecret).toBeDefined();
    });

    it('should not create intent without authentication', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          bookingId: booking.id
        }
      });

      await CreateIntent(req, res);

      expect(res._getStatusCode()).toBe(401);
    });

    it('should not create intent for non-existent booking', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: {
          bookingId: 'non-existent-id'
        }
      });

      await CreateIntent(req, res);

      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('POST /api/payments/confirm', () => {
    it('should confirm payment and update booking status', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: {
          bookingId: booking.id,
          paymentIntentId: 'test_payment_intent_id'
        }
      });

      await ConfirmPayment(req, res);

      expect(res._getStatusCode()).toBe(200);
      
      // Check if booking status was updated
      const updatedBooking = await prisma.booking.findUnique({
        where: { id: booking.id }
      });
      expect(updatedBooking?.status).toBe('CONFIRMED');

      // Check if payment was recorded
      const payment = await prisma.payment.findFirst({
        where: { bookingId: booking.id }
      });
      expect(payment).toBeDefined();
      expect(payment?.status).toBe('COMPLETED');
    });

    it('should not confirm payment for another user\'s booking', async () => {
      const otherUser = await createTestUser({
        email: 'other@example.com',
        password: 'password123',
        name: 'Other User'
      });

      const { req, res } = createMocks({
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${otherUser.token}`
        },
        body: {
          bookingId: booking.id,
          paymentIntentId: 'test_payment_intent_id'
        }
      });

      await ConfirmPayment(req, res);

      expect(res._getStatusCode()).toBe(403);
    });
  });

  describe('GET /api/payments/history', () => {
    beforeEach(async () => {
      // Create some test payments
      await prisma.payment.createMany({
        data: [
          {
            bookingId: booking.id,
            userId: user.id,
            amount: 200,
            status: 'COMPLETED',
            stripeId: 'test_payment_intent_id'
          },
          {
            bookingId: booking.id,
            userId: user.id,
            amount: 300,
            status: 'COMPLETED',
            stripeId: 'test_payment_intent_id_2'
          }
        ]
      });
    });

    it('should return user payment history', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      await GET(req, res);

      expect(res._getStatusCode()).toBe(200);
      const data = JSON.parse(res._getData());
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBe(2);
      expect(data[0].booking).toBeDefined();
      expect(data[0].booking.vehicle).toBeDefined();
    });

    it('should not return payment history without authentication', async () => {
      const { req, res } = createMocks({
        method: 'GET'
      });

      await GET(req, res);

      expect(res._getStatusCode()).toBe(401);
    });
  });
});
