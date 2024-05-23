import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { Room, GetRoomParams } from '@chatter-pwa/shared';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('api/rooms')
  async getAll(): Promise<Room[]> {
    return this.userService.getRooms();
  }

  @Get('api/rooms/:room')
  async getRoom(@Param() params: GetRoomParams): Promise<Room> {
    const rooms = await this.userService.getRooms();
    const room = await this.userService.getRoomByName(params.room);
    return rooms[room];
  }
}
