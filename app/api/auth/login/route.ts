import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { generateToken, withValidation } from '@/lib/auth';
import { loginSchema } from '@/lib/validation';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  return withValidation(loginSchema, async (request: NextRequest) => {
    try {
      const body = await request.json();

      const user = await prisma.user.findUnique({
        where: { email: body.email },
      });

      if (!user) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        );
      }

      const isValidPassword = await bcrypt.compare(body.password, user.password);

      if (!isValidPassword) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        );
      }

      const token = await generateToken({ sub: user.id });

      const { password, ...userWithoutPassword } = user;

      return NextResponse.json({
        user: userWithoutPassword,
        token
      });
    } catch (error) {
      console.error('Login failed:', error);
      return NextResponse.json(
        { error: 'Login failed' },
        { status: 500 }
      );
    }
  })(request);
}
