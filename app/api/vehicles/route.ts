import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getToken } from 'next-auth/jwt';
import { Role } from '@prisma/client';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');

    let whereClause: any = {
      available: true // Only return available vehicles
    };

    if (category) {
      whereClause.category = category;
    }

    if (minPrice || maxPrice) {
      whereClause.price = {
        ...(minPrice && { gte: minPrice }),
        ...(maxPrice && { lte: maxPrice }),
      };
    }

    const vehicles = await prisma.vehicle.findMany({
      where: whereClause,
      orderBy: {
        pricePerDay: 'asc', // Order by price
      },
      select: {
        id: true,
        name: true,
        image: true,
        images: true,
        price: true,
        pricePerDay: true,
        pricePerHour: true,
        specs: true,
        description: true,
        category: true,
        available: true,
        featured: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return NextResponse.json(vehicles);
  } catch (error) {
    console.error('Failed to fetch vehicles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch vehicles' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = await getToken({ req: request });
    if (!token || token.role !== Role.ADMIN) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const vehicle = await prisma.vehicle.create({
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

    return NextResponse.json(vehicle, { status: 201 });
  } catch (error) {
    console.error('Failed to create vehicle:', error);
    return NextResponse.json(
      { error: 'Failed to create vehicle' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const token = await getToken({ req: request });
    if (!token || token.role !== Role.ADMIN) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    const id = request.nextUrl.searchParams.get('id');
    if (!id) {
      return NextResponse.json(
        { error: 'Vehicle ID is required' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const vehicle = await prisma.vehicle.update({
      where: { id },
      data: {
        ...(body.name && { name: body.name }),
        ...(body.image && { image: body.image }),
        ...(body.images && { images: body.images }),
        ...(body.price && { price: body.price }),
        ...(body.pricePerDay && { pricePerDay: body.pricePerDay }),
        ...(body.specs && { specs: body.specs }),
        ...(body.description && { description: body.description }),
        ...(body.category && { category: body.category }),
        ...(typeof body.available !== 'undefined' && { available: body.available }),
      },
    });

    return NextResponse.json(vehicle);
  } catch (error) {
    console.error('Failed to update vehicle:', error);
    return NextResponse.json(
      { error: 'Failed to update vehicle' },
      { status: 500 }
    );
  }
}
