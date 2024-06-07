import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TPg } from './entities/TPg';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(TPg)
    private readonly TPgRepository: Repository<TPg>,
  ) {}

  async findAll(): Promise<TPg[]> {
    try {
      return await this.TPgRepository.find();
    } catch (error) {
      console.error('Error fetching data:', error);
      throw new Error('Error fetching data');
    }
  }
}