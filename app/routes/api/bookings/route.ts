import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Send email to bookings@execuhire.co.za
    await resend.emails.send({
      from: 'ExecuHire <no-reply@execuhire.co.za>',
      to: process.env.BOOKING_EMAIL || 'bookings@execuhire.co.za',
      subject: 'New Booking Request',
      text: `
        Name: ${data.name}
        Email: ${data.email}
        Phone: ${data.phone}
        Vehicle: ${data.vehicle}
        Start Date: ${data.startDate}
        End Date: ${data.endDate}
        Message: ${data.message}
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send booking request' }, { status: 500 });
  }
}
