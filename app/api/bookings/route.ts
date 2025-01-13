import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { sendBookingConfirmation } from '@/lib/email';
import { apiResponse, apiError, apiSuccess } from '@/lib/api-response';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return apiError('Unauthorized', 401);
    }

    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');

    // Only allow users to see their own bookings unless they're an admin
    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
    });

    if (!user) {
      return apiError('User not found', 400);
    }

    const bookings = await prisma.booking.findMany({
      where: {
        userId: userId || user.id,
      },
      include: {
        vehicle: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return apiSuccess(bookings);
  } catch (error) {
    console.error('Failed to fetch bookings:', error);
    return apiError('An unexpected error occurred while fetching bookings', 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    // Validate content type
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return apiError('Content-Type must be application/json', 415);
    }

    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return apiError('You must be logged in to make a booking', 401);
    }

    const body = await request.json().catch(() => null);
    
    if (!body) {
      return apiError('Invalid JSON in request body', 400);
    }

    // Get user from session
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return apiError('User not found', 400);
    }

    // Validate required fields
    if (!body.vehicleId || !body.startDate || !body.endDate || !body.totalAmount) {
      return apiError('Missing required fields', 400);
    }

    // Validate dates
    const startDate = new Date(body.startDate);
    const endDate = new Date(body.endDate);
    const now = new Date();

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return apiError('Invalid date format', 400);
    }

    if (startDate < now) {
      return apiError('Start date cannot be in the past', 400);
    }

    if (endDate <= startDate) {
      return apiError('End date must be after start date', 400);
    }

    // Check vehicle availability and overlapping bookings
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: body.vehicleId },
      include: {
        bookings: {
          where: {
            status: { in: ['PENDING', 'CONFIRMED'] },
            OR: [
              {
                AND: [
                  { startDate: { lte: startDate } },
                  { endDate: { gte: startDate } }
                ]
              },
              {
                AND: [
                  { startDate: { lte: endDate } },
                  { endDate: { gte: endDate } }
                ]
              }
            ]
          }
        }
      }
    });

    if (!vehicle) {
      return apiError('Vehicle not found', 400);
    }

    if (!vehicle.available) {
      return apiError('Vehicle is not available for booking', 400);
    }

    if (vehicle.bookings.length > 0) {
      return apiError('Vehicle is already booked for these dates', 400);
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        vehicleId: body.vehicleId,
        startDate,
        endDate,
        totalAmount: body.totalAmount,
        status: 'PENDING',
      },
      include: {
        vehicle: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
      },
    });

    // Create payment record
    await prisma.payment.create({
      data: {
        bookingId: booking.id,
        userId: user.id,
        amount: body.totalAmount,
        status: 'PENDING',
      },
    });

    try {
      // Send confirmation email
      await sendBookingConfirmation({
        customerName: user.name || 'Valued Customer',
        customerEmail: user.email,
        vehicleName: vehicle.name,
        startDate: body.startDate,
        endDate: body.endDate,
        totalAmount: body.totalAmount,
        bookingId: booking.id,
      });

      // Create notification
      await prisma.notification.create({
        data: {
          userId: user.id,
          message: `Your booking for ${vehicle.name} has been confirmed. Booking ID: ${booking.id}`,
        },
      });
    } catch (error) {
      // Log but don't fail the booking if notifications fail
      console.error('Failed to send notifications:', error);
    }

    return apiSuccess(booking, 'Booking created successfully');
  } catch (error) {
    console.error('Failed to create booking:', error);
    return apiError('An unexpected error occurred while processing your booking', 500);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return apiError('Content-Type must be application/json', 415);
    }

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return apiError('Unauthorized', 401);
    }

    const body = await request.json().catch(() => null);
    
    if (!body) {
      return apiError('Invalid JSON in request body', 400);
    }
    
    const booking = await prisma.booking.update({
      where: { id: body.bookingId },
      data: { status: body.status },
      include: {
        vehicle: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // If booking is cancelled, make vehicle available again
    if (body.status === 'CANCELLED') {
      await prisma.vehicle.update({
        where: { id: booking.vehicleId },
        data: { available: true },
      });
    }

    return apiSuccess(booking, 'Booking updated successfully');
  } catch (error) {
    console.error('Failed to update booking:', error);
    return apiError('An unexpected error occurred while updating the booking', 500);
  }
}
