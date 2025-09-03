'use client';

import { useEffect, useState } from 'react';
import { Announcement } from '@/types/announcements.types';
import { api } from '@/app/lib/api.api';

export interface AdminAnnouncementProps {
  id: string;
}

export default function AdminAnnouncement({ id }: AdminAnnouncementProps) {
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await api.get<Announcement>(`/announcements/${id}`);
        setAnnouncement(response.data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch announcement');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnnouncement();
  }, [id]);

  if (isLoading) {
    return <div>Loading announcement...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!announcement) {
    return <div>No announcement found.</div>;
  }

  return (
    <div className="p-4 bg-white border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">{announcement.title}</h1>
      <p className="text-gray-700 mb-4">{announcement.content}</p>
      <p className="text-sm text-gray-500">
        Posted on: {new Date(announcement.postedAt).toLocaleDateString()}
      </p>
      {announcement.expiresAt && (
        <p className="text-sm text-gray-500">
          Expires on: {new Date(announcement.expiresAt).toLocaleDateString()}
        </p>
      )}
    </div>
  );
}