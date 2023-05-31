import { Injectable, OnModuleInit } from '@nestjs/common';
import { Socket, io } from 'socket.io-client';

@Injectable()
export class SocketClient implements OnModuleInit {
  public socketClient: Socket;
  constructor() {
    this.socketClient = io('wss://ws.blockchain.info/inv');
  }
  onModuleInit() {
    this.registerConsumerEvents();
  }

  registerConsumerEvents() {
    this.socketClient.on('connect', () => {
      console.log('connected to gateway');
    });

    this.socketClient.on('onMessage', (payload) => {
      console.log('message');
      console.log(payload);
    });
  }
}
