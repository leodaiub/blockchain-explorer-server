import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Ticker } from '../common/types';

@Injectable()
export class ExchangeService {
  constructor(
    private readonly httpService: HttpService,
    private eventEmitter: EventEmitter2,
  ) {}

  async get(): Promise<Ticker> {
    const { data } = await firstValueFrom(
      this.httpService.get<Ticker>('https://blockchain.info/ticker').pipe(
        catchError((error: AxiosError) => {
          throw error;
        }),
      ),
    );

    const { USD, EUR } = data;

    return {
      USD,
      EUR,
    };
  }

  async toBTC({ currency, value }): Promise<number> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<number>(
          `https://blockchain.info/tobtc?currency=${currency}&value=${value}`,
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
