import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class AddressesService {
  constructor(private readonly httpService: HttpService) {}

  async get(hash: string) {
    const { data } = await firstValueFrom(
      this.httpService
        .get<any[]>('https://blockchain.info/rawaddr/' + hash)
        .pipe(
          catchError((error: AxiosError) => {
            // this.logger.error(error.response.data);
            throw error;
          }),
        ),
    );
    return data;
  }
}
