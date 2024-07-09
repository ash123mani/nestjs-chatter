import { useRef } from 'react';
import { getUser } from '@/app/_lib/user';
import { getRoomName } from '@/app/_lib/room';

export function useGetUser(): UserChatInterface {
  const userRef = useRef<UserChatInterface>();

  if (!userRef.current) {
    const user = getUser();
    const room = getRoomName();
    userRef.current = {
      user: {
        userId: user?.userId,
        userName: user?.userName,
      },
      roomName: room
    };
  }


  return userRef.current;
}

interface UserChatInterface {
  user: ChatUser | null,
  roomName: string | null
}

interface ChatUser {
  userId: string | null;
  userName: string | null;
}