import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import { format } from 'date-fns';

interface EmailProps {
  customerName: string;
  vehicleName: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
  bookingId: string;
}

export const BookingConfirmationEmail = ({
  customerName,
  vehicleName,
  startDate,
  endDate,
  totalAmount,
  bookingId,
}: EmailProps) => {
  const previewText = `Booking Confirmation - ${vehicleName}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Booking Confirmation</Heading>
          
          <Text style={text}>Dear {customerName},</Text>
          
          <Text style={text}>
            Thank you for choosing ExecHire. Your booking has been confirmed!
          </Text>

          <Section style={section}>
            <Heading style={h2}>Booking Details</Heading>
            <Text style={detailText}>
              <strong>Vehicle:</strong> {vehicleName}
            </Text>
            <Text style={detailText}>
              <strong>Start Date:</strong> {format(new Date(startDate), 'PPP')}
            </Text>
            <Text style={detailText}>
              <strong>End Date:</strong> {format(new Date(endDate), 'PPP')}
            </Text>
            <Text style={detailText}>
              <strong>Total Amount:</strong> ${totalAmount}
            </Text>
            <Text style={detailText}>
              <strong>Booking Reference:</strong> {bookingId}
            </Text>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Heading style={h2}>Important Information</Heading>
            <Text style={text}>
              • Please arrive 15 minutes before your scheduled pickup time
            </Text>
            <Text style={text}>
              • Don't forget to bring your valid driver's license and credit card
            </Text>
            <Text style={text}>
              • Free cancellation up to 48 hours before pickup
            </Text>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            If you have any questions or need to modify your booking, please contact our customer service team at support@exechire.com or call us at +1 (555) 123-4567.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '580px',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: '800',
  textAlign: 'center' as const,
  margin: '30px 0',
};

const h2 = {
  color: '#333',
  fontSize: '20px',
  fontWeight: '600',
  margin: '20px 0',
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
};

const detailText = {
  ...text,
  margin: '8px 0',
};

const section = {
  padding: '24px',
  border: 'solid 1px #dedede',
  borderRadius: '5px',
  margin: '24px 0',
};

const hr = {
  borderColor: '#dedede',
  margin: '20px 0',
};

const footer = {
  color: '#666',
  fontSize: '14px',
  lineHeight: '24px',
  textAlign: 'center' as const,
  margin: '48px 0 0',
};
