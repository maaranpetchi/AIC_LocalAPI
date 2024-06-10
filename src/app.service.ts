  import { Injectable, Param } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import { TPg } from './entities/TPg';
  import { TFormat } from './entities/TFormat';
  import { TRow } from './entities/TRow';
  import { TCell } from './entities/TCell';
  import { TCol } from './entities/TCol';
  import { TItem } from './entities/TItem';
  import { TTx } from './entities/TTx';
  import { TUser } from './entities/TUser';

  @Injectable()
  export class AppService {
    constructor(
      @InjectRepository(TPg) private readonly tPgRepository: Repository<TPg>,
      @InjectRepository(TFormat) private readonly tFormatRepository: Repository<TFormat>,
      @InjectRepository(TRow) private readonly tRowRepository: Repository<TRow>,
      @InjectRepository(TCell) private readonly tCellRepository: Repository<TCell>,
      @InjectRepository(TCol) private readonly tColRepository: Repository<TCol>,
      @InjectRepository(TItem) private readonly tItemRepository: Repository<TItem>,
      @InjectRepository(TTx) private readonly tTxRepository: Repository<TTx>,
      @InjectRepository(TUser) private readonly tUserRepository: Repository<TUser>,
    ) {}

    async getRowsByPgId(@Param('PgId') PgId: bigint): Promise<any[]> {
      try {
        const rows = await this.tRowRepository
          .createQueryBuilder('trow')
          .innerJoinAndSelect('trow.pg', 'pg', 'pg.pg = :PgId', { PgId })
          .innerJoinAndSelect('trow.tCells2', 'tcell')
          .getMany();
    
        for (const row of rows) {
          for (const cell of row.tCells2) {
            cell.itemDetails = [];
            if (typeof cell.items1 === 'string') {
              const itemIds = this.parsePostgresArray(cell.items1);
              
              for (const itemId of itemIds) {
                const item = await this.tItemRepository.findOne({ where: { item: itemId.toString() } });
                if (item) {
                  cell.itemDetails.push(item);
                } else {
                  console.warn(`Item with ID ${itemId} not found`);
                }
              }
            } else {
              console.warn(`cell.items1 is not a string for cell: ${JSON.stringify(cell)}`);
            }
          }
        }
    
        return rows;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error('Error fetching data');
      }
    }
    
     parsePostgresArray(arrayString: string): bigint[] {
      return arrayString
        .replace(/[{}]/g, '') // Remove the curly braces
        .split(',')           // Split the string by commas
        .map(id => BigInt(id.trim())); // Convert each element to BigInt
    }
    
    }
