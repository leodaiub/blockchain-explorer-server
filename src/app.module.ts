import { Module } from '@nestjs/common';
import { AddressesModule } from './addresses/addresses.module';
import { TransactionsModule } from './transactions/transactions.module';
import { SearchHistoryModule } from './search-history/search-history.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { DatabaseModule } from './database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { BullModule } from '@nestjs/bull';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AuthModule } from './auth/auth.module';
import { HttpModule } from '@nestjs/axios';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    HttpModule,
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
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    DatabaseModule,
    AddressesModule,
    TransactionsModule,
    SearchHistoryModule,
    AuthModule,
    SubscriptionsModule,
    JwtModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
