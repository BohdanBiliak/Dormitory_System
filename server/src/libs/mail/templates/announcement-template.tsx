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

interface AnnouncementTemplateProps {
  domain: string;
  title: string;
  content: string;
  authorName: string;
  expiresAt?: string;
  attachments?: Array<{ filename: string; url: string; }>;
  dormitoryName?: string;
}

export const AnnouncementTemplate = ({
  domain,
  title,
  content,
  authorName,
  expiresAt,
  attachments = [],
  dormitoryName,
}: AnnouncementTemplateProps) => (
  <Html>
    <Head />
    <Preview>📢 {title}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Text style={headerText}>📢 Announcement</Text>
          {dormitoryName && (
            <Text style={dormitoryText}>{dormitoryName}</Text>
          )}
        </Section>
        <Section style={contentSection}>
          <Text style={titleStyle}>{title}</Text>
          <Text style={authorStyle}>From: {authorName}</Text>
          {expiresAt && (
            <div style={expiryBadge}>
              <Text style={expiryText}>⏰ Valid until: {new Date(expiresAt).toLocaleDateString()}</Text>
            </div>
          )}
          <div style={contentBox}>
            <Text style={contentStyle}>{content}</Text>
          </div>
          {attachments.length > 0 && (
            <div style={attachmentsSection}>
              <Text style={attachmentsTitle}>📎 Attachments:</Text>
              {attachments.map((attachment, idx) => (
                <div key={idx} style={attachmentItem}>
                  <a href={attachment.url} style={attachmentLink}>
                    📄 {attachment.filename}
                  </a>
                </div>
              ))}
            </div>
          )}
          <Button style={viewButton} href={`${domain}/announcements`}>
            View All Announcements
          </Button>
        </Section>
        <Hr style={hr} />
        <Section style={footer}>
          <Text style={footerText}>
            This announcement was sent by {authorName} from your dormitory management.
          </Text>
          <Text style={footerText}>
            <a href={`${domain}/announcements`} style={linkStyle}>View Online</a> |{' '}
            <a href={`${domain}/notifications/settings`} style={linkStyle}>Manage Preferences</a>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

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
  backgroundColor: '#3b82f6',
  textAlign: 'center',
};
const headerText: React.CSSProperties = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0',
};
const dormitoryText: React.CSSProperties = {
  color: '#dbeafe',
  fontSize: '16px',
  margin: '8px 0 0 0',
};
const contentSection: React.CSSProperties = {
  padding: '30px',
};
const titleStyle: React.CSSProperties = {
  color: '#1f2937',
  fontSize: '28px',
  fontWeight: 'bold',
  lineHeight: '1.3',
  margin: '0 0 16px 0',
  textAlign: 'center',
};
const authorStyle: React.CSSProperties = {
  color: '#6b7280',
  fontSize: '14px',
  margin: '0 0 20px 0',
  textAlign: 'center',
  fontStyle: 'italic',
};
const expiryBadge: React.CSSProperties = {
  backgroundColor: '#fef3c7',
  border: '1px solid #f59e0b',
  borderRadius: '6px',
  padding: '8px 12px',
  margin: '16px 0',
  textAlign: 'center',
};
const expiryText: React.CSSProperties = {
  color: '#92400e',
  fontSize: '13px',
  margin: '0',
  fontWeight: '600',
};
const contentBox: React.CSSProperties = {
  backgroundColor: '#f9fafb',
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  padding: '24px',
  margin: '24px 0',
};
const contentStyle: React.CSSProperties = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0',
  whiteSpace: 'pre-wrap',
};
const attachmentsSection: React.CSSProperties = {
  backgroundColor: '#f0f9ff',
  border: '1px solid #0ea5e9',
  borderRadius: '8px',
  padding: '16px',
  margin: '20px 0',
};
const attachmentsTitle: React.CSSProperties = {
  color: '#0c4a6e',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '0 0 12px 0',
};
const attachmentItem: React.CSSProperties = {
  margin: '8px 0',
};
const attachmentLink: React.CSSProperties = {
  color: '#0ea5e9',
  textDecoration: 'none',
  fontSize: '14px',
};
const viewButton: React.CSSProperties = {
  backgroundColor: '#3b82f6',
  borderRadius: '8px',
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center',
  display: 'block',
  padding: '14px 24px',
  margin: '24px auto',
  maxWidth: '250px',
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