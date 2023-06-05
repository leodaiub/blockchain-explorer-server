import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import queue, { ADDRESSES_QUEUE_NAME } from './queue/addresses.contants';
import { Queue } from 'bull';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/classes/authGuard.class';

@Controller(ADDRESSES_QUEUE_NAME)
@ApiTags(ADDRESSES_QUEUE_NAME)
@UseGuards(AuthGuard)
export class AddressesController {
  constructor(
    @InjectQueue(ADDRESSES_QUEUE_NAME)
    private readonly searchHistoryQueue: Queue,
  ) {}

  @Get('/:hash')
  async get(@Param('hash') hash: string) {
    return (await this.searchHistoryQueue.add(queue.GET, hash)).finished();
  }
}
