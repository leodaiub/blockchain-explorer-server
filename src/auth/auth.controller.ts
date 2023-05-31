import { Controller, Post, Body } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { InjectQueue } from '@nestjs/bull';
import queue, { AUTH_QUEUE_NAME } from './queue/auth.contants';
import { Queue } from 'bull';
import { ApiTags } from '@nestjs/swagger';

@Controller(AUTH_QUEUE_NAME)
@ApiTags(AUTH_QUEUE_NAME)
export class AuthController {
  constructor(@InjectQueue(AUTH_QUEUE_NAME) private readonly queue: Queue) {}

  @Post('/signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    return (await this.queue.add(queue.SIGN_UP, signUpDto)).finished();
  }

  @Post('/signin')
  async signIn(@Body() signInDto: SignInDto) {
    return (await this.queue.add(queue.SIGN_IN, signInDto)).finished();
  }
}
