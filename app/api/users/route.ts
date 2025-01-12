import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { generateToken, withAuth, withValidation } from '@/lib/auth';
import { loginSchema, registerSchema } from '@/lib/validation';
import bcrypt from 'bcryptjs';

export async function GET(request: NextRequest) {
  return withAuth(async (request: NextRequest, user: any) => {
    try {
      const searchParams = request.nextUrl.searchParams;
      const email = searchParams.get('email');

      const users = await prisma.user.findMany({
        where: {
          email: email || undefined,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return NextResponse.json(users);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      return NextResponse.json(
        { error: 'Failed to fetch users' },
        { status: 500 }
      );
    }
  })(request);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    try {
      await registerSchema.validate(body);
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    // Check if user with email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(body.password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
        role: 'USER',
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    // Generate JWT token
    const token = await generateToken({ sub: user.id });

    return NextResponse.json({ user, token }, { status: 201 });
  } catch (error) {
    console.error('Failed to create user:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  return withAuth(async (request: NextRequest, currentUser: any) => {
    try {
      const body = await request.json();

      // Only allow users to update their own profile unless they're an admin
      if (body.id !== currentUser.id && currentUser.role !== 'ADMIN') {
        return NextResponse.json(
          { error: 'Forbidden' },
          { status: 403 }
        );
      }

      // If updating email, check if it's already taken
      if (body.email) {
        const existingUser = await prisma.user.findFirst({
          where: {
            email: body.email,
            NOT: {
              id: body.id
            }
          }
        });

        if (existingUser) {
          return NextResponse.json(
            { error: 'Email already exists' },
            { status: 400 }
          );
        }
      }

      // If updating password, hash it
      let updateData = { ...body };
      if (body.password) {
        updateData.password = await bcrypt.hash(body.password, 10);
      }

      const user = await prisma.user.update({
        where: { id: body.id },
        data: updateData,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      });

      return NextResponse.json(user);
    } catch (error) {
      console.error('Failed to update user:', error);
      return NextResponse.json(
        { error: 'Failed to update user' },
        { status: 500 }
      );
    }
  })(request);
}

export async function DELETE(request: NextRequest) {
  return withAuth(async (request: NextRequest, currentUser: any) => {
    try {
      const searchParams = request.nextUrl.searchParams;
      const userId = searchParams.get('id');

      if (!userId) {
        return NextResponse.json(
          { error: 'User ID is required' },
          { status: 400 }
        );
      }

      // Only allow users to delete their own account unless they're an admin
      if (userId !== currentUser.id && currentUser.role !== 'ADMIN') {
        return NextResponse.json(
          { error: 'Forbidden' },
          { status: 403 }
        );
      }

      await prisma.user.delete({
        where: { id: userId },
      });

      return NextResponse.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Failed to delete user:', error);
      return NextResponse.json(
        { error: 'Failed to delete user' },
        { status: 500 }
      );
    }
  })(request);
}
