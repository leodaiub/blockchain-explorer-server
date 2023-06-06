import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import events from '../common/events';
import { SearchType } from '../search-history/search-history.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AddressesService {
  constructor(
    private readonly httpService: HttpService,
    private eventEmitter: EventEmitter2,
    private configService: ConfigService,
  ) {}

  async get(hash: string) {
    this.eventEmitter.emit(events.HASH_SEARCHED, {
      hash,
      type: SearchType.Address,
    });
    try {
      const { data } = await firstValueFrom(
        this.httpService
          .get<any[]>(
            `${this.configService.get('BLOCKCHAIN_INFO_URL')}/${hash}`,
          )
          .pipe(
            catchError((error: AxiosError) => {
              throw error;
            }),
          ),
      );

      return data;
    } catch (error) {
      throw error;
    }
  }
}
