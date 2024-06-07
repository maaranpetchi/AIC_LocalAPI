import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TPg } from './entities/TPg';
import { Repository } from 'typeorm';
import { TRow } from './entities/TRow';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(TPg)
    private readonly TPgRepository: Repository<TPg>,
    @InjectRepository(TRow)
    private readonly TRowRepository: Repository<TRow>,
  ) {}

  async findAll(): Promise<TPg[]> {
    try {
      return await this.TPgRepository.find();
    } catch (error) {
      console.error('Error fetching data:', error);
      throw new Error('Error fetching data');
    }
  }

  async findRowsByPgId(pgid: string): Promise<TRow[]> {
    try {
      return await this.TRowRepository.createQueryBuilder('trow')
        .where('trow.PG = :pgid', { pgid })
        .getMany();
    } catch (error) {
      console.error('Error fetching data:', error);
      throw new Error('Error fetching data');
    }
  }

  // async findRowsByPgId(pgid: string): Promise<TRow[]> {
  //   try {
  //     return await this.TRowRepository.createQueryBuilder('trow')
  //     .select(['trow.*']) // Explicitly select all columns
  //     .where('trow."PG" = :pgid', { pgid })
  //       .getMany();
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //     throw new Error('Error fetching data');
  //   }
  // }
  
}