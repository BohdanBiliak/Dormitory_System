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

interface PaymentReminderTemplateProps {
  domain: string;
  amount: number;
  dueDate: string;
  description: string;
  daysUntilDue: number;
  isOverdue?: boolean;
  roomNumber?: string;
  dormitoryName?: string;
}

export const PaymentReminderTemplate = ({
  domain,
  amount,
  dueDate,
  description,
  daysUntilDue,
  isOverdue = false,
  roomNumber,
  dormitoryName,
}: PaymentReminderTemplateProps) => {
  const urgencyColor = isOverdue ? '#EF4444' : daysUntilDue <= 3 ? '#F59E0B' : '#3B82F6';
  const urgencyText = isOverdue ? 'OVERDUE' : daysUntilDue <= 3 ? 'URGENT' : 'REMINDER';

  return (
    <Html>
      <Head />
      <Preview>
        Payment {isOverdue ? 'overdue' : 'reminder'}: ${amount.toFixed(2)}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={headerText}>
              💰 Payment {isOverdue ? 'Overdue' : 'Reminder'}
            </Text>
          </Section>
          <Section style={contentSection}>
            <div style={{...urgencyBadge, backgroundColor: urgencyColor}}>
              {urgencyText}
            </div>
            <Text style={amountStyle}>
              ${amount.toFixed(2)}
            </Text>
            <Text style={descriptionStyle}>
              {description}
            </Text>
            {roomNumber && dormitoryName && (
              <Text style={locationStyle}>
                📍 Room {roomNumber}, {dormitoryName}
              </Text>
            )}
            <div style={paymentDetails}>
              <Text style={detailItem}>
                <strong>Due Date:</strong> {new Date(dueDate).toLocaleDateString()}
              </Text>
              <Text style={detailItem}>
                <strong>Days {isOverdue ? 'Overdue' : 'Until Due'}:</strong> {Math.abs(daysUntilDue)}
              </Text>
            </div>
            {isOverdue && (
              <div style={overdueWarning}>
                <Text style={warningText}>
                  ⚠️ This payment is overdue. Please make payment immediately to avoid additional fees or penalties.
                </Text>
              </div>
            )}
            <Button style={{...payButton, backgroundColor: urgencyColor}} href={`${domain}/payments`}>
              {isOverdue ? 'Pay Now' : 'Make Payment'}
            </Button>
            <Text style={instructionText}>
              You can also make payments in person at the dormitory office during business hours.
            </Text>
          </Section>
          <Hr style={hr} />
          <Section style={footer}>
            <Text style={footerText}>
              Questions about your payment? Contact the dormitory office.
            </Text>
            <Text style={footerText}>
              <a href={`${domain}/payments/history`} style={linkStyle}>View Payment History</a>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main: React.CSSProperties = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};
const container: React.CSSProperties = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
};
const header: React.CSSProperties = {
  padding: '20px 30px',
  backgroundColor: '#1f2937',
};
const headerText: React.CSSProperties = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center',
  margin: '0',
};
const contentSection: React.CSSProperties = {
  padding: '30px',
  textAlign: 'center',
};
const urgencyBadge: React.CSSProperties = {
  display: 'inline-block',
  padding: '8px 16px',
  borderRadius: '20px',
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: 'bold',
  marginBottom: '20px',
};
const amountStyle: React.CSSProperties = {
  color: '#1f2937',
  fontSize: '48px',
  fontWeight: 'bold',
  margin: '20px 0',
};
const descriptionStyle: React.CSSProperties = {
  color: '#374151',
  fontSize: '18px',
  margin: '16px 0',
  fontWeight: 600,
};
const locationStyle: React.CSSProperties = {
  color: '#6b7280',
  fontSize: '16px',
  margin: '12px 0',
};
const paymentDetails: React.CSSProperties = {
  backgroundColor: '#f9fafb',
  border: '2px solid #e5e7eb',
  borderRadius: '12px',
  padding: '20px',
  margin: '24px 0',
  textAlign: 'left',
};
const detailItem: React.CSSProperties = {
  color: '#374151',
  fontSize: '16px',
  margin: '8px 0',
};
const overdueWarning: React.CSSProperties = {
  backgroundColor: '#fef2f2',
  border: '2px solid #ef4444',
  borderRadius: '8px',
  padding: '16px',
  margin: '20px 0',
};
const warningText: React.CSSProperties = {
  color: '#991b1b',
  fontSize: '14px',
  margin: '0',
  fontWeight: 600,
};
const payButton: React.CSSProperties = {
  borderRadius: '8px',
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '18px',
  textDecoration: 'none',
  textAlign: 'center',
  display: 'block',
  padding: '16px 32px',
  margin: '30px auto',
  maxWidth: '200px',
};
const instructionText: React.CSSProperties = {
  color: '#6b7280',
  fontSize: '14px',
  margin: '20px 0',
  fontStyle: 'italic',
};
const hr: React.CSSProperties = {
  borderColor: '#e5e7eb',
  margin: '30px 0',
};
const footer: React.CSSProperties = {
  padding: '0 30px',
  textAlign: 'center',
};
const footerText: React.CSSProperties = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '1.5',
  margin: '8px 0',
};
const linkStyle: React.CSSProperties = {
  color: '#3b82f6',
  textDecoration: 'none',
};