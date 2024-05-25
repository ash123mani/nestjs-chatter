import { Injectable } from '@nestjs/common';
import { Room, User } from '@chatter-pwa/shared';

@Injectable()
export class UserService {
  private rooms: Room[] = [];

  async addRoom(roomName: string, host: User): Promise<void> {
    const room = await this.getRoomByName(roomName);
    if (room === -1) {
      this.rooms.push({ name: roomName, host, users: [host] });
    }
  }

  async removeRoom(roomName: string): Promise<void> {
    const findRoom = await this.getRoomByName(roomName);
    if (findRoom !== -1) {
      this.rooms = this.rooms.filter((room) => room.name !== roomName);
    }
  }

  async getRoomHost(roomName: string): Promise<User> {
    const roomIndex = await this.getRoomByName(roomName);
    return this.rooms[roomIndex].host;
  }

  async addUserToRoom(roomName: string, user: User): Promise<void> {
    const roomIndex = await this.getRoomByName(roomName);
    if (roomIndex !== -1) {
      this.rooms[roomIndex].users.push(user);
      const host = await this.getRoomHost(roomName);
      if (host.userId === user.userId) {
        this.rooms[roomIndex].host.socketId = user.socketId;
      }
    } else {
      await this.addRoom(roomName, user);
    }
  }

  async findRoomsByUserSocketId(socketId: string): Promise<Room[]> {
    return this.rooms.filter((room) => room.users.find((user) => user.socketId === socketId));
  }

  async removeUserFromAllRooms(socketId: string): Promise<void> {
    const rooms = await this.findRoomsByUserSocketId(socketId);
    for (const room of rooms) {
      await this.removeUserFromRoom(socketId, room.name);
    }
  }

  async removeUserFromRoom(socketId: string, roomName: string): Promise<void> {
    const room = await this.getRoomByName(roomName);
    this.rooms[room].users = this.rooms[room].users.filter((user) => user.socketId !== socketId);
    if (this.rooms[room].users.length === 0) {
      await this.removeRoom(roomName);
    }
  }

  async getRoomByName(roomName: string): Promise<number> {
    return this.rooms.findIndex((room) => room?.name === roomName);
  }

  async getRooms(): Promise<Room[]> {
    return this.rooms;
  }
}
