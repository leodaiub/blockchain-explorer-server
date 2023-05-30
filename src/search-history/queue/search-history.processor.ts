import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import queue from './search-history.contants';
import { SearchHistoryService } from '../search-history.service';
import { Job } from 'bull';

@Processor('search-histories')
export class SearchHistoryProcessor {
  private readonly logger = new Logger(SearchHistoryProcessor.name);
  constructor(private readonly searchHistoryService: SearchHistoryService) {}

  @Process(queue.GET)
  async handleGet() {
    this.logger.debug('Start...');
    await this.searchHistoryService.get();
    this.logger.debug('completed');
  }

  @Process(queue.INSERT)
  async handleInsert(job: Job) {
    this.logger.debug('Start...');
    await this.searchHistoryService.insert(job.data);
    this.logger.debug('completed');
  }
}
