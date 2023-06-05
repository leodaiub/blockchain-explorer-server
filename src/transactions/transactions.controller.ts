import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import queue, { TRANSACTIONS_QUEUE_NAME } from './queue/transactions.contants';
import { Queue } from 'bull';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/classes/authGuard.class';

@Controller(TRANSACTIONS_QUEUE_NAME)
@ApiTags(TRANSACTIONS_QUEUE_NAME)
@UseGuards(AuthGuard)
export class TransactionsController {
  constructor(
    @InjectQueue(TRANSACTIONS_QUEUE_NAME)
    private readonly searchHistoryQueue: Queue,
  ) {}

  @Get('/:hash')
  async get(@Param('hash') hash: string) {
    return (await this.searchHistoryQueue.add(queue.GET, hash)).finished();
  }
}
