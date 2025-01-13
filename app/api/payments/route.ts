import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { withAuth } from '@/lib/auth';
import { paymentSchema } from '@/lib/validation';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16'
});

export async function POST(request: NextRequest) {
  return withAuth(async (request: NextRequest, user: any) => {
    try {
      const body = await request.json();
      await paymentSchema.validate(body);

      const booking = await prisma.booking.findUnique({
        where: {
          id: body.bookingId,
          userId: user.id
        },
        include: {
          vehicle: true
        }
      });

      if (!booking) {
        return NextResponse.json(
          { error: 'Booking not found' },
          { status: 404 }
        );
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(booking.totalAmount.toNumber() * 100),
        currency: 'zar',
        metadata: {
          bookingId: booking.id,
          userId: user.id
        }
      });

      return NextResponse.json({
        clientSecret: paymentIntent.client_secret
      });
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
  })(request);
}

export async function PUT(request: NextRequest) {
  return withAuth(async (request: NextRequest, user: any) => {
    try {
      const body = await request.json();
      const { bookingId, paymentIntentId } = body;

      const booking = await prisma.booking.findUnique({
        where: {
          id: bookingId,
          userId: user.id
        }
      });

      if (!booking) {
        return NextResponse.json(
          { error: 'Booking not found' },
          { status: 404 }
        );
      }

      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

      if (paymentIntent.status !== 'succeeded') {
        return NextResponse.json(
          { error: 'Payment not successful' },
          { status: 400 }
        );
      }

      const [payment, updatedBooking] = await prisma.$transaction([
        prisma.payment.create({
          data: {
            bookingId: booking.id,
            userId: user.id,
            amount: booking.totalAmount,
            status: 'COMPLETED',
            stripeId: paymentIntentId
          }
        }),
        prisma.booking.update({
          where: { id: booking.id },
          data: { status: 'CONFIRMED' }
        })
      ]);

      // Create notification for payment
      await prisma.notification.create({
        data: {
          userId: user.id,
          message: `Payment received for booking #${booking.id}`
        }
      });

      return NextResponse.json({ payment, booking: updatedBooking });
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
  })(request);
}

export async function GET(request: NextRequest) {
  return withAuth(async (request: NextRequest, user: any) => {
    try {
      const payments = await prisma.payment.findMany({
        where: {
          userId: user.id
        },
        include: {
          booking: {
            include: {
              vehicle: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      return NextResponse.json(payments);
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
  })(request);
}
