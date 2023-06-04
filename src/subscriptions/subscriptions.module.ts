import { Module } from '@nestjs/common';
import { SubscriptionsGateway } from './subscriptions.gateway';
import { SocketClient } from './subscriptions.client';

@Module({
  providers: [SubscriptionsGateway, SocketClient],
})
export class SubscriptionsModule {}
