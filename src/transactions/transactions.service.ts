import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AxiosError } from 'axios';
import events from '../common/events';
import { catchError, firstValueFrom } from 'rxjs';
import { SearchType } from '../search-history/search-history.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly httpService: HttpService,
    private eventEmitter: EventEmitter2,
    private configService: ConfigService,
  ) {}

  async get(hash: string) {
    this.eventEmitter.emit(events.HASH_SEARCHED, {
      hash,
      type: SearchType.Transaction,
    });

    const { data } = await firstValueFrom(
      this.httpService
        .get<any[]>(
          `${this.configService.get('BLOCKCHAIN_INFO_URL')}/rawtx/${hash}`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw error;
          }),
        ),
    );

    return data;
  }
}
