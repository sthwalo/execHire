import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { withAuth } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  return withAuth(async (request: NextRequest, user: any) => {
    try {
      const currentUser = await prisma.user.findUnique({
        where: { id: user.id },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          bookings: {
            include: {
              vehicle: true,
              payment: true
            },
            orderBy: {
              createdAt: 'desc'
            }
          },
          reviews: {
            include: {
              vehicle: true
            },
            orderBy: {
              createdAt: 'desc'
            }
          },
          notifications: {
            orderBy: {
              createdAt: 'desc'
            }
          }
        }
      });

      if (!currentUser) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(currentUser);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      return NextResponse.json(
        { error: 'Failed to fetch user profile' },
        { status: 500 }
      );
    }
  })(request);
}
