import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Auth } from './entities/auth.entity';
import { BullModule } from '@nestjs/bull';
import { AuthProcessor } from './queue/auth.processor';
import { AUTH_QUEUE_NAME } from './queue/auth.contants';

@Module({
  imports: [
    BullModule.registerQueue({
      name: AUTH_QUEUE_NAME,
    }),
    TypeOrmModule.forFeature([Auth]),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('AUTH_TOKEN_SECRET'),
        global: true,
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
  ],
  controllers: [AuthController],

  providers: [AuthService, AuthProcessor],
})
export class AuthModule {}
