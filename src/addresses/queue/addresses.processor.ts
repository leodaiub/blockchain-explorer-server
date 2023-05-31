import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import queue, { ADDRESSES_QUEUE_NAME } from './addresses.contants';
import { Job } from 'bull';
import { AddressesService } from '../addresses.service';

@Processor(ADDRESSES_QUEUE_NAME)
export class AddressesProcessor {
  private readonly logger = new Logger(AddressesProcessor.name);
  constructor(private readonly addressesService: AddressesService) {}

  @Process(queue.GET)
  async handleGet(job: Job) {
    try {
      return await this.addressesService.get(job.data);
    } catch (error) {
      return error;
    }
  }
}
