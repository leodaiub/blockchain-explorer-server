import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Search } from './search-history.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SearchHistoryService {
  constructor(
    @InjectRepository(Search)
    private searchesRepository: Repository<Search>,
  ) {}

  async get() {
    return await this.searchesRepository.find();
  }

  async insert(payload) {
    return await this.searchesRepository.save(payload);
  }
}
