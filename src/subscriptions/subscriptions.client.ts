import { Injectable, OnModuleInit } from '@nestjs/common';
import * as WebSocket from 'ws';

@Injectable()
export class SocketClient implements OnModuleInit {
  public socketClient: WebSocket;

  async onModuleInit() {
    this.socketClient = await new WebSocket('wss://ws.blockchain.info/inv');
    this.registerConsumerEvents();
  }

  async registerConsumerEvents() {
    this.socketClient.on('error', console.error);
  }
}
