'use client';

import React from 'react';
import { useParams } from 'next/navigation';

interface RoomPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function RoomPage({ params }: RoomPageProps) {
  const { id } = useParams();
  const [roomId, setRoomId] = React.useState<string>('');

  React.useEffect(() => {
    params.then((resolvedParams) => {
      setRoomId(resolvedParams.id);
    });
  }, [params]);

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Room Details</h1>
        <div className="space-y-2">
          <p>Room ID: {id || roomId}</p>
          <p>This page will show detailed room information.</p>
        </div>
      </div>
    </div>
  );
}
