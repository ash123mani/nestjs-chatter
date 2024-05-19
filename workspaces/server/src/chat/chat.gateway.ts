import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import {
  ServerToClientEvents,
  ClientToServerEvents,
  Message,
} from '@chatter-pwa/shared';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer() server: Server = new Server<
    ServerToClientEvents,
    ClientToServerEvents
  >();

  private logger = new Logger('chat-gateway');

  @SubscribeMessage('chat')
  async handleEvent(@MessageBody() payload: Message): Promise<Message> {
    this.logger.log(payload);
    this.server.emit('chat', payload); // broadcast messages
    return payload;
  }
}


