import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'http';
import { SocketClient } from './subscriptions.client';
import { Injectable } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@Injectable()
export class SubscriptionsGateway {
  constructor(private wsConsumer: SocketClient) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  findAll(@MessageBody() payload: string) {
    this.wsConsumer.socketClient.send(payload);
    this.wsConsumer.socketClient.on('message', (payload) => {
      this.server.emit('message', payload.toString());
    });
  }
}
