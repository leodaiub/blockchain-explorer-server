import { Module } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsGateway } from './subscriptions.gateway';
import { SocketClient } from './subscriptions.client';

@Module({
  providers: [SubscriptionsGateway, SubscriptionsService, SocketClient],
})
export class SubscriptionsModule {}
