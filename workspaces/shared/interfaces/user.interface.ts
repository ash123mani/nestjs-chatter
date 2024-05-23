import { User } from './chat.interface';

export interface GetRoomParams {
  room: string
}

export interface JoinRoomEventPayload {
  roomName: string
  user: User
}