import { Module } from '@nestjs/common';
import { SearchHistoryService } from './search-history.service';
import { SearchHistoryController } from './search-history.controller';
import { BullModule } from '@nestjs/bull';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Search } from './search-history.entity';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'search-histories',
    }),
    TypeOrmModule.forFeature([Search]),
  ],
  controllers: [SearchHistoryController],
  providers: [SearchHistoryService],
})
export class SearchHistoryModule {}
