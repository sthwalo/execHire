import { prisma } from '@/lib/db';
import { cleanupDatabase } from '../utils/test-utils';
import { createMocks } from 'node-mocks-http';
import { POST } from '@/app/api/users/register/route';
import { POST as LoginPOST } from '@/app/api/users/login/route';
import { GET } from '@/app/api/users/me/route';
import bcrypt from 'bcryptjs';

describe('Users API', () => {
  beforeEach(async () => {
    await cleanupDatabase();
  });

  describe('POST /api/users/register', () => {
    it('should create a new user', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          email: 'test@example.com',
          password: 'password123',
          name: 'Test User'
        }
      });

      await POST(req, res);
      expect(res._getStatusCode()).toBe(201);
      const data = JSON.parse(res._getData());
      expect(data.user.email).toBe('test@example.com');
      expect(data).toHaveProperty('token');
    });

    it('should not create user with existing email', async () => {
      // Create a user first
      await prisma.user.create({
        data: {
          email: 'test@example.com',
          password: await bcrypt.hash('password123', 10),
          name: 'Test User'
        }
      });

      const { req, res } = createMocks({
        method: 'POST',
        body: {
          email: 'test@example.com',
          password: 'password123',
          name: 'Test User'
        }
      });

      await POST(req, res);
      expect(res._getStatusCode()).toBe(400);
    });

    it('should validate required fields', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          email: 'test@example.com'
          // Missing password and name
        }
      });

      await POST(req, res);
      expect(res._getStatusCode()).toBe(400);
    });
  });

  describe('POST /api/users/login', () => {
    beforeEach(async () => {
      await prisma.user.create({
        data: {
          email: 'test@example.com',
          password: await bcrypt.hash('password123', 10),
          name: 'Test User'
        }
      });
    });

    it('should login with valid credentials', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          email: 'test@example.com',
          password: 'password123'
        }
      });

      await LoginPOST(req, res);
      expect(res._getStatusCode()).toBe(200);
      const data = JSON.parse(res._getData());
      expect(data).toHaveProperty('token');
      expect(data.user.email).toBe('test@example.com');
    });

    it('should not login with invalid password', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          email: 'test@example.com',
          password: 'wrongpassword'
        }
      });

      await LoginPOST(req, res);
      expect(res._getStatusCode()).toBe(401);
    });

    it('should not login with non-existent email', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          email: 'nonexistent@example.com',
          password: 'password123'
        }
      });

      await LoginPOST(req, res);
      expect(res._getStatusCode()).toBe(401);
    });
  });

  describe('GET /api/users/me', () => {
    let token: string;

    beforeEach(async () => {
      // Create a user and get token
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          email: 'test@example.com',
          password: 'password123',
          name: 'Test User'
        }
      });

      await POST(req, res);
      const data = JSON.parse(res._getData());
      token = data.token;
    });

    it('should return user profile with valid token', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      await GET(req, res);
      expect(res._getStatusCode()).toBe(200);
      const data = JSON.parse(res._getData());
      expect(data.email).toBe('test@example.com');
    });

    it('should not return profile without token', async () => {
      const { req, res } = createMocks({
        method: 'GET'
      });

      await GET(req, res);
      expect(res._getStatusCode()).toBe(401);
    });

    it('should not return profile with invalid token', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        headers: {
          'Authorization': 'Bearer invalid_token'
        }
      });

      await GET(req, res);
      expect(res._getStatusCode()).toBe(401);
    });
  });
});
