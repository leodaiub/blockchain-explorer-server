import { Module } from '@nestjs/common';
import { SearchHistoryService } from './search-history.service';
import { SearchHistoryController } from './search-history.controller';
import { BullModule } from '@nestjs/bull';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Search } from './search-history.entity';
import { SearchHistoryProcessor } from './queue/search-history.processor';
import { SEARCH_HISTORY_QUEUE_NAME } from './queue/search-history.contants';

@Module({
  imports: [
    BullModule.registerQueue({
      name: SEARCH_HISTORY_QUEUE_NAME,
    }),
    TypeOrmModule.forFeature([Search]),
  ],
  controllers: [SearchHistoryController],
  providers: [SearchHistoryService, SearchHistoryProcessor],
})
export class SearchHistoryModule {}
