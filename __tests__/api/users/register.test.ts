import { prisma } from '@/lib/prisma';
import { POST } from '@/app/api/users/register/route';
import { cleanupDatabase } from '../../utils/test-utils';
import bcrypt from 'bcryptjs';

describe('User Registration API', () => {
  beforeEach(async () => {
    await cleanupDatabase();
  });

  afterEach(async () => {
    await cleanupDatabase();
  });

  it('should register a new user successfully', async () => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    };

    const response = await POST(
      new Request('http://localhost/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
    );

    expect(response.status).toBe(201);
    const data = await response.json();
    expect(data.name).toBe(userData.name);
    expect(data.email).toBe(userData.email);
    expect(data.role).toBe('USER');
    expect(data.password).toBeUndefined(); // Password should not be returned

    // Verify password was hashed
    const user = await prisma.user.findUnique({
      where: { email: userData.email },
    });
    expect(user).toBeTruthy();
    const isPasswordValid = await bcrypt.compare(userData.password, user!.password);
    expect(isPasswordValid).toBe(true);
  });

  it('should not allow registration with existing email', async () => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    };

    // Create first user
    await POST(
      new Request('http://localhost/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
    );

    // Try to create second user with same email
    const response = await POST(
      new Request('http://localhost/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
    );

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('Email already exists');
  });

  it('should validate required fields', async () => {
    const response = await POST(
      new Request('http://localhost/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      })
    );

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBeTruthy();
  });

  it('should validate email format', async () => {
    const userData = {
      name: 'Test User',
      email: 'invalid-email',
      password: 'password123',
    };

    const response = await POST(
      new Request('http://localhost/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
    );

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('Invalid email');
  });

  it('should validate password length', async () => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: '123', // Too short
    };

    const response = await POST(
      new Request('http://localhost/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
    );

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toBe('Password must be at least 8 characters');
  });
});
