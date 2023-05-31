import { Controller, Get } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import queue, {
  SEARCH_HISTORY_QUEUE_NAME,
} from './queue/search-history.contants';
import { OnEvent } from '@nestjs/event-emitter';
import events from 'src/common/events';
import { SearchType } from './search-history.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller(SEARCH_HISTORY_QUEUE_NAME)
@ApiTags(SEARCH_HISTORY_QUEUE_NAME)
export class SearchHistoryController {
  constructor(
    @InjectQueue(SEARCH_HISTORY_QUEUE_NAME)
    private readonly searchHistoryQueue: Queue,
  ) {}

  @Get('/top5')
  async get() {
    return await this.searchHistoryQueue.add(queue.GET_TOP5);
  }

  @OnEvent(events.HASH_SEARCHED)
  async insertSearchHistory(payload: { hash: string; type: SearchType }) {
    return await this.searchHistoryQueue.add(queue.INSERT, payload);
  }
}
