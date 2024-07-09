import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Room } from '@chatter-pwa/shared/interfaces/chat.interface';
import { BE_BASE_URL } from '@/app/config';

export const useRoomQuery = (roomName: string, isConnected: boolean) => {
  return useQuery({
      queryKey: ['rooms', roomName],
      queryFn: (): Promise<Room> =>
        axios.get(`${BE_BASE_URL}/api/rooms/${roomName}`).then((response) => response.data),
      refetchInterval: 60000,
      enabled: isConnected,
    });
};

export const useRoomsQuery = () => {
  return useQuery({
    queryKey: ['select_rooms'],
    queryFn: (): Promise<Room[]> =>
      axios.get(`${BE_BASE_URL}/api/rooms`).then((response) => response.data),
  });
};

export const unsetRoom = () => {
  sessionStorage.removeItem('room');
};

export const getRoomName = () => {
  return sessionStorage.getItem('room');
}