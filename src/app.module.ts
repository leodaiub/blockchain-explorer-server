import { Module } from '@nestjs/common';
import { AddressesModule } from './addresses/addresses.module';
import { TransactionsModule } from './transactions/transactions.module';
import { SearchHistoryModule } from './search-history/search-history.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { DatabaseModule } from './database.module';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { BullModule } from '@nestjs/bull';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
        SALT_ROUNDS: Joi.number().required(),
        AUTH_TOKEN_SECRET: Joi.string().required(),
      }),
    }),
    BullModule.forRoot({
      redis: {
        host: '0.0.0.0',
        port: 6379,
      },
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    DatabaseModule,
    ,
    AddressesModule,
    TransactionsModule,
    SearchHistoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
