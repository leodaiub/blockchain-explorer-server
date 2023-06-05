import { Module } from '@nestjs/common';
import { SubscriptionsGateway } from './subscriptions.gateway';
import { SocketClient } from './subscriptions.client';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  providers: [SubscriptionsGateway, SocketClient],
})
export class SubscriptionsModule {}
