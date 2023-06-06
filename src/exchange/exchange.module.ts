import { Module } from '@nestjs/common';
import { ExchangeService } from './exchange.service';
import { ExchangeController } from './exchange.controller';
import { BullModule } from '@nestjs/bull';
import { HttpModule } from '@nestjs/axios';
import { ExchangeProcessor } from './queue/exchange.processor';
import { EXCHANGE_QUEUE_NAME } from './queue/exchange.contants';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule,
    HttpModule,
    BullModule.registerQueue({
      name: EXCHANGE_QUEUE_NAME,
    }),
  ],
  controllers: [ExchangeController],
  providers: [ExchangeService, ExchangeProcessor],
})
export class ExchangeModule {}
