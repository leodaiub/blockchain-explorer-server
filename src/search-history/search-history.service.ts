import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Search, SearchType } from './search-history.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SearchHistoryService {
  constructor(
    @InjectRepository(Search)
    private searchesRepository: Repository<Search>,
  ) {}

  async getTop5() {
    const addresses = await this.searchesRepository.findAndCount({
      where: { type: SearchType.Address },
      take: 5,
    });

    const transactions = await this.searchesRepository.findAndCount({
      where: { type: SearchType.Transaction },
      take: 5,
    });

    return { transactions, addresses };
  }

  async insert(payload) {
    return await this.searchesRepository.save(payload);
  }
}
