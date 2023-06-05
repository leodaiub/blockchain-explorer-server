import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import queue, { AUTH_QUEUE_NAME } from './auth.contants';
import { Job } from 'bull';
import { AuthService } from '../auth.service';

@Processor(AUTH_QUEUE_NAME)
export class AuthProcessor {
  private readonly logger = new Logger(AuthProcessor.name);
  constructor(private readonly authService: AuthService) {}

  @Process(queue.SIGN_UP)
  async handleSignUp(job: Job) {
    try {
      return await this.authService.signUp(job.data);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Process(queue.SIGN_IN)
  async handleSignIn(job: Job) {
    try {
      return await this.authService.signIn(job.data);
    } catch (error) {
      return error;
    }
  }
}
