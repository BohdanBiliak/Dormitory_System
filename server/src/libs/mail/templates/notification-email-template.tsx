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

interface NotificationTemplateProps {
  domain: string;
  title: string;
  message: string;
  type: string;
  priority: string;
  actionUrl?: string;
  metadata?: any;
}

export const NotificationTemplate = ({
  domain,
  title,
  message,
  type,
  priority,
  actionUrl,
  metadata,
}: NotificationTemplateProps) => {
  const priorityColors = {
    LOW: '#10B981',
    NORMAL: '#3B82F6', 
    HIGH: '#F59E0B',
    URGENT: '#EF4444',
  };

  const priorityColor = priorityColors[priority as keyof typeof priorityColors] || '#3B82F6';

  return (
    <Html>
      <Head />
      <Preview>{title}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={headerText}>🏠 Dormitory Notification</Text>
          </Section>
          
          <Section style={content}>
            <div style={{...priorityBadge, backgroundColor: priorityColor}}>
              {priority} PRIORITY
            </div>
            
            <Text style={titleStyle}>{title}</Text>
            <Text style={messageStyle}>{message}</Text>
            
            {actionUrl && (
              <Button style={{...button, backgroundColor: priorityColor}} href={actionUrl}>
                View Details
              </Button>
            )}
          </Section>

          <Hr style={hr} />
          
          <Section style={footer}>
            <Text style={footerText}>
              This is an automated notification from your dormitory management system.
            </Text>
            <Text style={footerText}>
              <a href={`${domain}/notifications/settings`}>Manage notification preferences</a>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
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

const priorityBadge = {
  display: 'inline-block',
  padding: '4px 12px',
  borderRadius: '6px',
  color: '#ffffff',
  fontSize: '12px',
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

const messageStyle = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '16px 0',
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