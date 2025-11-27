'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import {UserRoomPage} from "@/components/guest/UserRoomPage";

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
    <UserRoomPage roomId={roomId}/>
  );
}
