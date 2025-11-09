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
  Row,
  Column,
} from '@react-email/components';

interface AccommodationApprovalTemplateProps {
  domain: string;
  userName: string;
  roomNumber: string;
  dormitoryName: string;
  floorNumber: number;
  checkInDate: string;
  checkOutDate: string;
  suggestedTime: string;
  originalSuggestedTime?: string;
  wasAlternativeRoom?: boolean;
  originalRoomNumber?: string;
  adminReason?: string;
}

export const AccommodationApprovalTemplate = ({
  domain,
  userName,
  roomNumber,
  dormitoryName,
  floorNumber,
  checkInDate,
  checkOutDate,
  suggestedTime,
  originalSuggestedTime,
  wasAlternativeRoom = false,
  originalRoomNumber,
  adminReason,
}: AccommodationApprovalTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your accommodation request has been approved! 🎉</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={headerEmoji}>🏠</Text>
            <Text style={headerTitle}>Accommodation Approved!</Text>
          </Section>

          {/* Success Message */}
          <Section style={contentSection}>
            <Text style={greeting}>Dear {userName},</Text>
            <Text style={paragraph}>
              Great news! Your accommodation request has been approved by the administration team.
            </Text>

            {wasAlternativeRoom && originalRoomNumber && (
              <Section style={alertBox}>
                <Text style={alertText}>
                  ℹ️ <strong>Note:</strong> You have been assigned to an alternative room 
                  (Room {roomNumber}) instead of your originally requested room (Room {originalRoomNumber}).
                </Text>
              </Section>
            )}

            {originalSuggestedTime && originalSuggestedTime !== suggestedTime && (
              <Section style={alertBox}>
                <Text style={alertText}>
                  ⏰ <strong>Time Changed:</strong> The accommodation time has been updated 
                  from {originalSuggestedTime} to {suggestedTime}.
                </Text>
              </Section>
            )}

            {adminReason && (
              <Section style={infoBoxInline}>
                <Text style={infoTitleInline}>📝 Admin Note:</Text>
                <Text style={infoTextInline}>{adminReason}</Text>
              </Section>
            )}
          </Section>

          {/* Room Details */}
          <Section style={detailsSection}>
            <Text style={sectionTitle}>📋 Accommodation Details</Text>
            
            <Row style={detailRow}>
              <Column style={detailLabel}>Room Number:</Column>
              <Column style={detailValue}>{roomNumber}</Column>
            </Row>
            
            <Row style={detailRow}>
              <Column style={detailLabel}>Dormitory:</Column>
              <Column style={detailValue}>{dormitoryName}</Column>
            </Row>
            
            <Row style={detailRow}>
              <Column style={detailLabel}>Floor:</Column>
              <Column style={detailValue}>{floorNumber}</Column>
            </Row>

            <Hr style={divider} />

            <Row style={detailRow}>
              <Column style={detailLabel}>Check-in Date:</Column>
              <Column style={detailValue}>{checkInDate}</Column>
            </Row>
            
            <Row style={detailRow}>
              <Column style={detailLabel}>Check-out Date:</Column>
              <Column style={detailValue}>{checkOutDate}</Column>
            </Row>
            
            <Row style={detailRow}>
              <Column style={detailLabel}>Suggested Time:</Column>
              <Column style={detailValue}>{suggestedTime}</Column>
            </Row>
          </Section>

          {/* Next Steps */}
          <Section style={nextStepsSection}>
            <Text style={sectionTitle}>📝 Next Steps</Text>
            <Text style={listItem}>1. Review your room assignment details above</Text>
            <Text style={listItem}>2. Prepare necessary documents for check-in</Text>
            <Text style={listItem}>3. Arrive at the specified time on your check-in date</Text>
            <Text style={listItem}>4. Contact the dormitory office if you have any questions</Text>
          </Section>

          {/* Important Information */}
          <Section style={infoBox}>
            <Text style={infoTitle}>⚠️ Important Information</Text>
            <Text style={infoText}>
              • Please arrive at the suggested time for a smooth check-in process<br />
              • Bring your student ID and any required documents<br />
              • Contact the dormitory office at least 24 hours in advance if you need to reschedule<br />
              • Familiarize yourself with dormitory rules and regulations
            </Text>
          </Section>

          {/* Footer */}
          <Hr style={divider} />
          <Section style={footer}>
            <Text style={footerText}>
              If you have any questions or concerns, please don't hesitate to contact us.
            </Text>
            <Text style={footerText}>
              Welcome to {dormitoryName}! We look forward to seeing you.
            </Text>
            <Text style={footerSignature}>
              Best regards,<br />
              Dormitory Management Team
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default AccommodationApprovalTemplate;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
};

const header = {
  padding: '32px 24px',
  textAlign: 'center' as const,
  backgroundColor: '#10b981',
};

const headerEmoji = {
  fontSize: '48px',
  lineHeight: '48px',
  margin: '0 0 16px 0',
};

const headerTitle = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '0',
};

const contentSection = {
  padding: '24px 24px 0',
};

const greeting = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#1f2937',
  margin: '0 0 16px 0',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '24px',
  color: '#4b5563',
  margin: '0 0 16px 0',
};

const alertBox = {
  backgroundColor: '#fef3c7',
  borderLeft: '4px solid #f59e0b',
  padding: '16px',
  margin: '16px 0',
  borderRadius: '4px',
};

const alertText = {
  fontSize: '14px',
  lineHeight: '20px',
  color: '#78350f',
  margin: '0',
};

const detailsSection = {
  padding: '24px',
  backgroundColor: '#f9fafb',
  margin: '24px',
  borderRadius: '8px',
};

const sectionTitle = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#1f2937',
  margin: '0 0 16px 0',
};

const detailRow = {
  marginBottom: '12px',
};

const detailLabel = {
  fontSize: '14px',
  color: '#6b7280',
  width: '40%',
};

const detailValue = {
  fontSize: '14px',
  fontWeight: '600',
  color: '#1f2937',
  width: '60%',
};

const divider = {
  borderColor: '#e5e7eb',
  margin: '16px 0',
};

const nextStepsSection = {
  padding: '0 24px',
  margin: '24px 0',
};

const listItem = {
  fontSize: '14px',
  lineHeight: '24px',
  color: '#4b5563',
  margin: '8px 0',
};

const infoBox = {
  backgroundColor: '#eff6ff',
  borderLeft: '4px solid #3b82f6',
  padding: '16px 24px',
  margin: '24px',
  borderRadius: '4px',
};

const infoBoxInline = {
  backgroundColor: '#f0fdf4',
  borderLeft: '4px solid #10b981',
  padding: '16px 24px',
  margin: '16px 0',
  borderRadius: '4px',
};

const infoTitle = {
  fontSize: '14px',
  fontWeight: '600',
  color: '#1e40af',
  margin: '0 0 8px 0',
};

const infoTitleInline = {
  fontSize: '14px',
  fontWeight: '600',
  color: '#065f46',
  margin: '0 0 8px 0',
};

const infoText = {
  fontSize: '13px',
  lineHeight: '20px',
  color: '#1e3a8a',
  margin: '0',
};

const infoTextInline = {
  fontSize: '13px',
  lineHeight: '20px',
  color: '#064e3b',
  margin: '0',
};

const footer = {
  padding: '24px',
  textAlign: 'center' as const,
};

const footerText = {
  fontSize: '14px',
  lineHeight: '20px',
  color: '#6b7280',
  margin: '8px 0',
};

const footerSignature = {
  fontSize: '14px',
  lineHeight: '20px',
  color: '#1f2937',
  fontWeight: '500',
  margin: '16px 0 0 0',
};
