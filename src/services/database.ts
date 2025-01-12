import prisma from '@/lib/prisma';
import type { Vehicle, Booking, User } from '@prisma/client';

export class DatabaseService {
  // Vehicle Operations
  static async getVehicles() {
    return prisma.vehicle.findMany({
      include: {
        bookings: true,
      },
    });
  }

  static async getVehicleById(id: string) {
    return prisma.vehicle.findUnique({
      where: { id },
      include: {
        bookings: true,
      },
    });
  }

  // Booking Operations
  static async createBooking(data: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>) {
    return prisma.booking.create({
      data,
      include: {
        vehicle: true,
        user: true,
      },
    });
  }

  static async getUserBookings(userId: string) {
    return prisma.booking.findMany({
      where: { userId },
      include: {
        vehicle: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // User Operations
  static async getUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        bookings: {
          include: {
            vehicle: true,
          },
        },
      },
    });
  }

  static async updateUser(id: string, data: Partial<User>) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  // Vehicle Availability Check
  static async checkVehicleAvailability(
    vehicleId: string,
    startDate: Date,
    endDate: Date
  ) {
    const conflictingBookings = await prisma.booking.findMany({
      where: {
        vehicleId,
        AND: [
          {
            startDate: {
              lte: endDate,
            },
          },
          {
            endDate: {
              gte: startDate,
            },
          },
        ],
        status: {
          in: ['PENDING', 'CONFIRMED'],
        },
      },
    });

    return conflictingBookings.length === 0;
  }
}
