import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { BullModule } from '@nestjs/bull';
import { HttpModule } from '@nestjs/axios';
import { TransactionsProcessor } from './queue/transactions.processor';
import { TRANSACTIONS_QUEUE_NAME } from './queue/transactions.contants';

@Module({
  imports: [
    HttpModule,
    BullModule.registerQueue({
      name: TRANSACTIONS_QUEUE_NAME,
    }),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService, TransactionsProcessor],
})
export class TransactionsModule {}
