import { Controller, Post, Body } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { InjectQueue } from '@nestjs/bull';
import queue from './queue/auth.contants';
import { Queue } from 'bull';

@Controller('auth')
export class AuthController {
  constructor(
    @InjectQueue('search-histories') private readonly searchHistoryQueue: Queue,
  ) {}

  @Post('/signup')
  async create(@Body() signUpDto: SignUpDto) {
    return await this.searchHistoryQueue.add(queue.SIGN_UP, signUpDto);
  }

  @Post('/signin')
  async signin(@Body() signInDto: SignInDto) {
    return await this.searchHistoryQueue.add(queue.SIGN_IN, signInDto);
  }
}
