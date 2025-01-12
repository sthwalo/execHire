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
          reviews: {
            select: {
              id: true,
              rating: true,
              comment: true,
              vehicle: {
                select: {
                  id: true,
                  name: true,
                  description: true,
                  price: true,
                  pricePerDay: true,
                  images: true,
                  specs: true,
                  category: true,
                  available: true,
                  createdAt: true,
                  updatedAt: true
                }
              },
              createdAt: true,
              updatedAt: true
            }
          },
          bookings: {
            select: {
              id: true,
              vehicle: {
                select: {
                  id: true,
                  name: true,
                  description: true,
                  price: true,
                  pricePerDay: true,
                  images: true,
                  specs: true,
                  category: true,
                  available: true,
                  reviews: true,
                  createdAt: true,
                  updatedAt: true
                }
              },
              payment: {
                select: {
                  id: true,
                  amount: true,
                  status: true,
                  createdAt: true,
                  updatedAt: true,
                }
              },
              createdAt: true,
              updatedAt: true,
            },
            orderBy: {
              createdAt: 'desc'
            }
          },
          notifications: {
            select: {
              id: true,
              message: true,
              read: true,
              createdAt: true,
              updatedAt: true,
            },
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
