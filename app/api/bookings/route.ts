import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
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
    const body = await request.json();
    
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: body.userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 400 }
      );
    }

    // Check vehicle availability
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: body.vehicleId },
    });

    if (!vehicle || !vehicle.available) {
      return NextResponse.json(
        { error: 'Vehicle not available' },
        { status: 400 }
      );
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        userId: body.userId,
        vehicleId: body.vehicleId,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        status: 'PENDING',
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
    });

    // Update vehicle availability
    await prisma.vehicle.update({
      where: { id: body.vehicleId },
      data: { available: false },
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
