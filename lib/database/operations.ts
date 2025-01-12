import { Decimal } from '@prisma/client/runtime/library';
import { prisma } from '../db';
import {
  Prisma,
  BookingStatus,
  PaymentStatus,
  Category,
  User,
  Vehicle,
  Booking,
  Payment,
  Review,
  Notification
} from '@prisma/client';

// Type definitions for operation inputs
type VehicleFilters = {
  available?: boolean;
  category?: Category;
  priceRange?: { min: number; max: number };
};

type BookingInput = {
  userId: string;
  vehicleId: string;
  startDate: Date;
  endDate: Date;
  totalAmount: number | string | Decimal;
};

type PaymentInput = {
  bookingId: string;
  userId: string;
  amount: number | string | Decimal;
  stripeId: string;
};

type ReviewInput = {
  vehicleId: string;
  rating: number;
  comment?: string;
};

// Vehicle Operations
export async function getVehicles(filters?: VehicleFilters): Promise<(Vehicle & { reviews: Review[]; bookings: Booking[] })[]> {
  const where: Prisma.VehicleWhereInput = {};
  
  if (filters?.available !== undefined) {
    where.available = filters.available;
  }
  
  if (filters?.category) {
    where.category = filters.category;
  }
  
  if (filters?.priceRange) {
    where.pricePerDay = {
      gte: new Decimal(filters.priceRange.min.toString()),
      lte: new Decimal(filters.priceRange.max.toString()),
    };
  }
  
  return prisma.vehicle.findMany({
    where,
    include: {
      reviews: true,
      bookings: {
        where: {
          OR: [
            { status: BookingStatus.PENDING },
            { status: BookingStatus.CONFIRMED }
          ]
        }
      }
    }
  });
}

// Booking Operations
export async function createBooking(data: BookingInput): Promise<Booking & { vehicle: Vehicle; user: User }> {
  return prisma.booking.create({
    data: {
      userId: data.userId,
      vehicleId: data.vehicleId,
      startDate: data.startDate,
      endDate: data.endDate,
      totalAmount: new Decimal(data.totalAmount.toString()),
      status: BookingStatus.PENDING
    },
    include: {
      vehicle: true,
      user: true
    }
  });
}

// Payment Operations
export async function processPayment(data: PaymentInput): Promise<Payment> {
  const payment = await prisma.payment.create({
    data: {
      bookingId: data.bookingId,
      userId: data.userId,
      amount: new Decimal(data.amount.toString()),
      status: PaymentStatus.COMPLETED,
      stripeId: data.stripeId
    }
  });

  await prisma.booking.update({
    where: { id: data.bookingId },
    data: { status: BookingStatus.CONFIRMED }
  });

  return payment;
}

// Review Operations
export async function createReview(data: ReviewInput): Promise<Review> {
  return prisma.review.create({
    data: {
      vehicleId: data.vehicleId,
      rating: data.rating,
      comment: data.comment || ''
    }
  });
}

// Notification Operations
export async function getUserNotifications(userId: string): Promise<Notification[]> {
  return prisma.notification.findMany({
    where: {
      userId,
      read: false
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
}

export async function markNotificationAsRead(id: string): Promise<Notification> {
  return prisma.notification.update({
    where: { id },
    data: { read: true }
  });
}

// Analytics Operations
export async function getBookingAnalytics(startDate: Date, endDate: Date): Promise<{
  totalBookings: number;
  totalRevenue: Decimal;
  bookingsByCategory: Record<Category, number>;
}> {
  const bookings = await prisma.booking.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate
      }
    },
    include: {
      vehicle: true,
      payment: true
    }
  });

  const totalBookings = bookings.length;
  const totalRevenue = bookings.reduce((acc: { add: (arg0: any) => any; }, booking: { payment: { status: string; }; totalAmount: any; }) => {
    if (booking.payment?.status === PaymentStatus.COMPLETED) {
      return acc.add(booking.totalAmount);
    }
    return acc;
  }, new Decimal(0));

  const bookingsByCategory = bookings.reduce((acc: { [x: string]: any; }, booking: { vehicle: { category: any; }; }) => {
    const category = booking.vehicle.category;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<Category, number>);

  return {
    totalBookings,
    totalRevenue,
    bookingsByCategory
  };
}
