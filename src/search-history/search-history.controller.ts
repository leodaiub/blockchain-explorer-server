import { Controller, Get } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import queue from './queue/search-history.contants';
import { OnEvent } from '@nestjs/event-emitter';
import events from 'src/common/events';

@Controller('search-history')
export class SearchHistoryController {
  constructor(
    @InjectQueue('search-histories') private readonly searchHistoryQueue: Queue,
  ) {}

  @Get()
  async get() {
    return await this.searchHistoryQueue.add(queue.GET);
  }

  @OnEvent(events.HASH_SEARCHED)
  async insertSearchHistory(payload) {
    return await this.searchHistoryQueue.add(queue.INSERT, payload);
  }
}
