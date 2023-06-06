import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import queue, { EXCHANGE_QUEUE_NAME } from './exchange.contants';
import { Job } from 'bull';
import { ExchangeService } from '../exchange.service';

@Processor(EXCHANGE_QUEUE_NAME)
export class ExchangeProcessor {
  private readonly logger = new Logger(ExchangeProcessor.name);
  constructor(private readonly exchangeService: ExchangeService) {}

  @Process(queue.GET)
  async handleGet() {
    try {
      return await this.exchangeService.get();
    } catch (error) {
      return error;
    }
  }

  @Process(queue.TO_BTC)
  async handleConvert(job: Job) {
    try {
      return await this.exchangeService.toBTC(job.data);
    } catch (error) {
      return error;
    }
  }
}
