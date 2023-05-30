import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import queue from './auth.contants';
import { Job } from 'bull';
import { AuthService } from '../auth.service';

@Processor('search-histories')
export class SearchHistoryProcessor {
  private readonly logger = new Logger(SearchHistoryProcessor.name);
  constructor(private readonly authService: AuthService) {}

  @Process(queue.SIGN_UP)
  async handleSignUp(job: Job) {
    this.logger.debug('Start...');
    await this.authService.signUp(job.data);
    this.logger.debug('completed');
  }

  @Process(queue.SIGN_IN)
  async handleSignIn(job: Job) {
    this.logger.debug('Start...');
    await this.authService.signIn(job.data);
    this.logger.debug('completed');
  }
}
