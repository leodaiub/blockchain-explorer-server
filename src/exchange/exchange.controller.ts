import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import queue, { EXCHANGE_QUEUE_NAME } from './queue/exchange.contants';
import { Queue } from 'bull';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/classes/authGuard.class';

@Controller(EXCHANGE_QUEUE_NAME)
@ApiTags(EXCHANGE_QUEUE_NAME)
@UseGuards(AuthGuard)
export class ExchangeController {
  constructor(
    @InjectQueue(EXCHANGE_QUEUE_NAME)
    private readonly exchangeQueue: Queue,
  ) {}

  @Get('/')
  async get() {
    return (await this.exchangeQueue.add(queue.GET)).finished();
  }

  @Get('/tobtc/:currency')
  async toBTC(@Param('currency') currency: string) {
    return (await this.exchangeQueue.add(queue.TO_BTC, currency)).finished();
  }
}
