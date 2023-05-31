import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import queue, { SEARCH_HISTORY_QUEUE_NAME } from './search-history.contants';
import { SearchHistoryService } from '../search-history.service';
import { Job } from 'bull';

@Processor(SEARCH_HISTORY_QUEUE_NAME)
export class SearchHistoryProcessor {
  private readonly logger = new Logger(SearchHistoryProcessor.name);
  constructor(private readonly searchHistoryService: SearchHistoryService) {}

  @Process(queue.GET_TOP5)
  async handleGet() {
    try {
      await this.searchHistoryService.getTop5();
    } catch (error) {
      return error;
    }
  }

  @Process(queue.INSERT)
  async handleInsert(job: Job) {
    try {
      await this.searchHistoryService.insert(job.data);
    } catch (error) {
      return error;
    }
  }
}
