import { Resend } from 'resend';
import { BookingConfirmationEmail } from '@/components/emails/booking-confirmation';

const resend = new Resend(process.env.RESEND_API_KEY);

type BookingEmailProps = {
  customerName: string;
  customerEmail: string;
  vehicleName: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
  bookingId: string;
};

export async function sendBookingConfirmation({
  customerName,
  customerEmail,
  vehicleName,
  startDate,
  endDate,
  totalAmount,
  bookingId,
}: BookingEmailProps) {
  try {
    const data = await resend.emails.send({
      from: 'ExecHire <bookings@exechire.com>',
      to: customerEmail,
      subject: 'Booking Confirmation - ExecHire',
      react: BookingConfirmationEmail({
        customerName,
        vehicleName,
        startDate,
        endDate,
        totalAmount,
        bookingId,
      }),
    });

    return { success: true, data };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
}
