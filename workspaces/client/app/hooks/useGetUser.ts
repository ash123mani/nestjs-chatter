import { useEffect, useState } from 'react';
import { getUser } from '@/app/_lib/user';
import { ApiFetchStatus } from '@chatter-pwa/shared/interfaces';

export function useGetUser(): UserChatInterface {
  const [user, setUser] = useState<UserChatInterface>({
    user: null,
    roomName: null,
  });
  const [apiStatus, setApiStatus] = useState(ApiFetchStatus.Idle);

  useEffect(() => {
    try {
      setApiStatus(ApiFetchStatus.Pending);
      const currentUser = getUser();
      setUser({
        user: currentUser,
        roomName: sessionStorage.getItem('room'),
      });
      setApiStatus(ApiFetchStatus.Sucessfull);
    } catch (e) {
      setApiStatus(ApiFetchStatus.Failed);
    }

  }, []);

  return user;
}

interface UserChatInterface {
  user: ChatUser | null,
  roomName: string | null
}

interface ChatUser {
  userId: string | null;
  userName: string | null;
}