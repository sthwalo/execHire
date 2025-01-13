import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCachedVehicle, setCachedVehicle, invalidateVehicleCache } from '@/src/lib/redis';
import { apiResponse } from '@/lib/api-response';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Try to get from cache first
    const cachedVehicle = await getCachedVehicle(id);
    if (cachedVehicle) {
      return apiResponse({ data: cachedVehicle });
    }

    // If not in cache, get from database
    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
      include: {
        bookings: {
          select: {
            id: true,
            startDate: true,
            endDate: true,
            status: true,
          },
        },
      },
    });

    if (!vehicle) {
      return apiResponse({ error: 'Vehicle not found' }, 404);
    }

    // Cache the vehicle data
    await setCachedVehicle(vehicle);

    return apiResponse({ data: vehicle });
  } catch (error) {
    console.error('Error fetching vehicle:', error);
    return apiResponse({ error: 'Internal server error' }, 500);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    const updatedVehicle = await prisma.vehicle.update({
      where: { id },
      data: {
        name: body.name,
        image: body.image,
        images: body.images || [],
        price: body.price,
        pricePerDay: body.pricePerDay,
        specs: body.specs,
        description: body.description || '',
        category: body.category,
        available: body.available ?? true,
      },
    });

    // Invalidate cache after update
    await invalidateVehicleCache(id);

    return apiResponse({ data: updatedVehicle });
  } catch (error) {
    console.error('Error updating vehicle:', error);
    return apiResponse({ error: 'Internal server error' }, 500);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    await prisma.vehicle.delete({
      where: { id },
    });

    // Invalidate cache after deletion
    await invalidateVehicleCache(id);

    return apiResponse({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    return apiResponse({ error: 'Internal server error' }, 500);
  }
}
