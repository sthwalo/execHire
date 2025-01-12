import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { sendBookingConfirmation } from '@/lib/email';

export async function GET(request: NextRequest, res: any) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');

    const bookings = await prisma.booking.findMany({
      where: {
        userId: userId || undefined,
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

    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Failed to fetch bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    // Get user from session
    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 400 }
      );
    }

    // Validate dates
    const startDate = new Date(body.startDate);
    const endDate = new Date(body.endDate);
    const now = new Date();

    if (startDate < now) {
      return NextResponse.json(
        { error: 'Start date cannot be in the past' },
        { status: 400 }
      );
    }

    if (endDate <= startDate) {
      return NextResponse.json(
        { error: 'End date must be after start date' },
        { status: 400 }
      );
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
      return NextResponse.json(
        { error: 'Vehicle not found' },
        { status: 400 }
      );
    }

    if (!vehicle.available) {
      return NextResponse.json(
        { error: 'Vehicle is not available for booking' },
        { status: 400 }
      );
    }

    if (vehicle.bookings.length > 0) {
      return NextResponse.json(
        { error: 'Vehicle is already booked for these dates' },
        { status: 400 }
      );
    }

    // Calculate total amount based on price per day
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const totalAmount = vehicle.pricePerDay * days;

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        vehicleId: body.vehicleId,
        startDate,
        endDate,
        totalAmount,
        status: 'PENDING',
      },
      include: {
        vehicle: true,
        user: true,
      },
    });

    // Create payment record
    await prisma.payment.create({
      data: {
        bookingId: booking.id,
        userId: user.id,
        amount: totalAmount,
        status: 'PENDING',
      },
    });

    // Send confirmation email
    await sendBookingConfirmation({
      customerName: user.name || 'Valued Customer',
      customerEmail: user.email,
      vehicleName: vehicle.name,
      startDate: body.startDate,
      endDate: body.endDate,
      totalAmount,
      bookingId: booking.id,
    });

    // Create notification
    await prisma.notification.create({
      data: {
        userId: user.id,
        message: `Your booking for ${vehicle.name} has been confirmed. Booking ID: ${booking.id}`,
      },
    });

    return NextResponse.json(booking);
  } catch (error) {
    console.error('Failed to create booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    
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

    return NextResponse.json(booking);
  } catch (error) {
    console.error('Failed to update booking:', error);
    return NextResponse.json(
      { error: 'Failed to update booking' },
      { status: 500 }
    );
  }
}
