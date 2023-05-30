import { Module } from '@nestjs/common';
import { AddressesModule } from './addresses/addresses.module';
import { TransactionsModule } from './transactions/transactions.module';
import { SearchHistoryModule } from './search-history/search-history.module';

@Module({
  imports: [AddressesModule, TransactionsModule, SearchHistoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
