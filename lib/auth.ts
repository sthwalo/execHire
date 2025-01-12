import { NextRequest, NextResponse } from 'next/server';
import { prisma } from './db';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function generateToken(payload: any) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}

export async function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export async function authenticateUser(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return null;
    }

    const payload = await verifyToken(token);
    if (!payload || !payload.sub) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.sub as string },
      select: {
        id: true,
        email: true,
        role: true,
        name: true
      }
    });

    return user;
  } catch (error) {
    return null;
  }
}

export function withAuth(handler: Function, options: { requireAdmin?: boolean } = {}) {
  return async function (request: NextRequest) {
    const user = await authenticateUser(request);

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (options.requireAdmin && user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    return handler(request, user);
  };
}

export function withValidation(schema: any, handler: Function) {
  return async function (request: NextRequest, ...args: any[]) {
    try {
      const body = await request.json();
      await schema.validate(body);
      return handler(request, ...args);
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
  };
}
