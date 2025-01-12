import { prisma } from '../db';
import { Prisma } from '@prisma/client';
import { BookingStatus, PaymentStatus } from '@prisma/client';

// Vehicle Operations
export async function getVehicles(filters?: {
  available?: boolean;
  category?: string;
  priceRange?: { min: number; max: number };
}) {
  const where: Prisma.VehicleWhereInput = {};
  
  if (filters?.available !== undefined) {
    where.available = filters.available;
  }
  
  if (filters?.category) {
    where.category = filters.category;
  }
  
  if (filters?.priceRange) {
    where.pricePerDay = {
      gte: new Prisma.Decimal(filters.priceRange.min),
      lte: new Prisma.Decimal(filters.priceRange.max),
    };
  }
  
  return prisma.vehicle.findMany({
    where,
    include: {
      reviews: true,
      bookings: {
        where: {
          status: {
            in: ['CONFIRMED', 'PENDING']
          }
        }
      }
    }
  });
}

// Booking Operations
export async function createBooking(data: {
  userId: string;
  vehicleId: string;
  startDate: Date;
  endDate: Date;
  totalAmount: number;
}) {
  return prisma.$transaction(async (tx) => {
    // Check vehicle availability
    const vehicle = await tx.vehicle.findUnique({
      where: { id: data.vehicleId },
      include: {
        bookings: {
          where: {
            OR: [
              {
                AND: [
                  { startDate: { lte: data.startDate } },
                  { endDate: { gte: data.startDate } }
                ]
              },
              {
                AND: [
                  { startDate: { lte: data.endDate } },
                  { endDate: { gte: data.endDate } }
                ]
              }
            ],
            status: {
              in: ['CONFIRMED', 'PENDING']
            }
          }
        }
      }
    });

    if (!vehicle || !vehicle.available) {
      throw new Error('Vehicle not available');
    }

    if (vehicle.bookings.length > 0) {
      throw new Error('Vehicle already booked for these dates');
    }

    // Create booking
    const booking = await tx.booking.create({
      data: {
        userId: data.userId,
        vehicleId: data.vehicleId,
        startDate: data.startDate,
        endDate: data.endDate,
        totalAmount: new Prisma.Decimal(data.totalAmount),
        status: BookingStatus.PENDING
      }
    });

    // Create notification
    await tx.notification.create({
      data: {
        userId: data.userId,
        bookingId: booking.id,
        type: 'BOOKING_CREATED',
        message: `Booking created for ${vehicle.name}`
      }
    });

    return booking;
  });
}

// Payment Operations
export async function processPayment(data: {
  bookingId: string;
  userId: string;
  amount: number;
  stripeId: string;
}) {
  return prisma.$transaction(async (tx) => {
    const payment = await tx.payment.create({
      data: {
        bookingId: data.bookingId,
        userId: data.userId,
        amount: new Prisma.Decimal(data.amount),
        status: PaymentStatus.COMPLETED,
        stripeId: data.stripeId
      }
    });

    // Update booking status
    await tx.booking.update({
      where: { id: data.bookingId },
      data: { status: BookingStatus.CONFIRMED }
    });

    // Create notification
    await tx.notification.create({
      data: {
        userId: data.userId,
        bookingId: data.bookingId,
        type: 'PAYMENT_RECEIVED',
        message: `Payment received for booking #${data.bookingId}`
      }
    });

    return payment;
  });
}

// Review Operations
export async function createReview(data: {
  vehicleId: string;
  rating: number;
  comment?: string;
}) {
  return prisma.review.create({
    data: {
      vehicleId: data.vehicleId,
      rating: data.rating,
      comment: data.comment
    }
  });
}

// Notification Operations
export async function getUserNotifications(userId: string) {
  return prisma.notification.findMany({
    where: {
      userId,
      read: false
    },
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      booking: {
        include: {
          vehicle: true
        }
      }
    }
  });
}

export async function markNotificationAsRead(id: string) {
  return prisma.notification.update({
    where: { id },
    data: { read: true }
  });
}

// Analytics Operations
export async function getBookingAnalytics(startDate: Date, endDate: Date) {
  const [bookings, totalRevenue, averageRating] = await Promise.all([
    prisma.booking.count({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate
        }
      }
    }),
    prisma.payment.aggregate({
      where: {
        status: PaymentStatus.COMPLETED,
        createdAt: {
          gte: startDate,
          lte: endDate
        }
      },
      _sum: {
        amount: true
      }
    }),
    prisma.review.aggregate({
      _avg: {
        rating: true
      }
    })
  ]);

  return {
    totalBookings: bookings,
    totalRevenue: totalRevenue._sum.amount?.toNumber() || 0,
    averageRating: averageRating._avg.rating || 0
  };
}
