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
    const addresses = await this.searchesRepository
      .createQueryBuilder('address')
      .select('hash')
      .addSelect('count(*)', 'searches')
      .groupBy('hash')
      .orderBy('searches', 'DESC')
      .where('type = :type', { type: SearchType.Address })
      .take(5)
      .getRawMany();

    const transactions = await this.searchesRepository
      .createQueryBuilder('transactions')
      .select('hash')
      .addSelect('count(*)', 'searches')
      .groupBy('hash')
      .orderBy('searches', 'DESC')
      .where('type = :type', { type: SearchType.Transaction })
      .take(5)
      .getRawMany();

    return { transactions, addresses };
  }

  async insert(payload) {
    return await this.searchesRepository.save(payload);
  }
}
