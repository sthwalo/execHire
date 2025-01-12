import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest, res: any) {
  try {
    const vehicles = await prisma.vehicle.findMany({
      orderBy: {
        createdAt: 'desc',
      },
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

export async function POST(request: NextRequest, res: any) {
  try {
    const body = await request.json();
    const vehicle = await prisma.vehicle.create({
      data: {
        name: body.name,
        image: body.image,
        price: body.price,
        pricePerDay: body.pricePerDay,
        specs: body.specs,
        description: body.description,
        category: body.category,
        available: body.available ?? true,
      },
    });

    return NextResponse.json(vehicle);
  } catch (error) {
    console.error('Failed to create vehicle:', error);
    return NextResponse.json(
      { error: 'Failed to create vehicle' },
      { status: 500 }
    );
  }
}
