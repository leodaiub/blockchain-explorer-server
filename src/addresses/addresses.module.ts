import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { BullModule } from '@nestjs/bull';
import { HttpModule } from '@nestjs/axios';
import { AddressesProcessor } from './queue/addresses.processor';
import { ADDRESSES_QUEUE_NAME } from './queue/addresses.contants';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule,
    HttpModule,
    BullModule.registerQueue({
      name: ADDRESSES_QUEUE_NAME,
    }),
  ],
  controllers: [AddressesController],
  providers: [AddressesService, AddressesProcessor],
})
export class AddressesModule {}
