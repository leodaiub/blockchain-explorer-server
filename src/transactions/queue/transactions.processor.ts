import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import queue, { TRANSACTIONS_QUEUE_NAME } from './transactions.contants';
import { Job } from 'bull';
import { TransactionsService } from '../transactions.service';

@Processor(TRANSACTIONS_QUEUE_NAME)
export class TransactionsProcessor {
  private readonly logger = new Logger(TransactionsProcessor.name);
  constructor(private readonly addressesService: TransactionsService) {}

  @Process(queue.GET)
  async handleGet(job: Job) {
    try {
      return await this.addressesService.get(job.data);
    } catch (error) {
      return error;
    }
  }
}
