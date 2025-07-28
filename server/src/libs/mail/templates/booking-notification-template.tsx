import React from 'react';
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
} from '@react-email/components';

interface BookingNotificationTemplateProps {
  domain: string;
  status: string;
  roomNumber: string;
  dormitoryName: string;
  checkInDate: string;
  checkOutDate?: string;
  totalAmount: number;
  actionRequired?: boolean;
}

export const BookingNotificationTemplate = ({
  domain,
  status,
  roomNumber,
  dormitoryName,
  checkInDate,
  checkOutDate,
  totalAmount,
  actionRequired = false,
}: BookingNotificationTemplateProps) => {
  const statusColors = {
    PENDING: '#F59E0B',
    APPROVED: '#10B981',
    REJECTED: '#EF4444',
    CANCELLED: '#6B7280',
    COMPLETED: '#3B82F6',
  };

  const statusColor = statusColors[status as keyof typeof statusColors] || '#3B82F6';

  return (
    <Html>
      <Head />
      <Preview>Booking {status.toLowerCase()} for Room {roomNumber}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={headerText}>🏠 Booking Update</Text>
          </Section>
          
          <Section style={content}>
            <div style={{...statusBadge, backgroundColor: statusColor}}>
              {status}
            </div>
            
            <Text style={titleStyle}>
              Room {roomNumber} - {dormitoryName}
            </Text>
            
            <div style={detailsBox}>
              <Text style={detailItem}>
                <strong>Check-in:</strong> {new Date(checkInDate).toLocaleDateString()}
              </Text>
              {checkOutDate && (
                <Text style={detailItem}>
                  <strong>Check-out:</strong> {new Date(checkOutDate).toLocaleDateString()}
                </Text>
              )}
              <Text style={detailItem}>
                <strong>Total Amount:</strong> ${totalAmount}
              </Text>
            </div>

            {actionRequired && (
              <Button style={{...button, backgroundColor: statusColor}} href={`${domain}/bookings`}>
                {status === 'PENDING' ? 'View Booking' : 'Manage Bookings'}
              </Button>
            )}
          </Section>

          <Hr style={hr} />
          
          <Section style={footer}>
            <Text style={footerText}>
              Questions? Contact your dormitory administration.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Add the same base styles as notification template...
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const header = {
  padding: '20px 30px',
  backgroundColor: '#1f2937',
};

const headerText = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '0',
};

const content = {
  padding: '30px',
};

const statusBadge = {
  display: 'inline-block',
  padding: '6px 16px',
  borderRadius: '6px',
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: 'bold',
  marginBottom: '20px',
};

const titleStyle = {
  color: '#1f2937',
  fontSize: '24px',
  fontWeight: 'bold',
  lineHeight: '1.4',
  margin: '16px 0',
};

const detailsBox = {
  backgroundColor: '#f9fafb',
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  padding: '20px',
  margin: '20px 0',
};

const detailItem = {
  color: '#374151',
  fontSize: '16px',
  margin: '8px 0',
};

const button = {
  borderRadius: '6px',
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px 20px',
  margin: '20px 0',
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '20px 0',
};

const footer = {
  padding: '0 30px',
};

const footerText = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '1.5',
  margin: '8px 0',
  textAlign: 'center' as const,
};