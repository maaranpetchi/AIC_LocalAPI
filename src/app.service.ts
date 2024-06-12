import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TPg } from './entities/TPg';
import { TRow } from './entities/TRow';
import { TFormat } from './entities/TFormat';
import { TCell } from './entities/TCell';
import { TItem } from './entities/TItem';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(TPg) private readonly tPgRepository: Repository<TPg>,
    @InjectRepository(TFormat) private readonly tFormatRepository: Repository<TFormat>,
    @InjectRepository(TRow) private readonly tRowRepository: Repository<TRow>,
    @InjectRepository(TCell) private readonly tCellRepository: Repository<TCell>,
    @InjectRepository(TItem) private readonly tItemRepository: Repository<TItem>,
  ) {}

  async getRowsByPgId(@Param('PgId') PgId: string): Promise<any> {
    try {
      // Check if PgId exists in TPg table
      const pg = await this.tPgRepository.findOne({
        where: { pg: PgId },
        relations: ['tRows'],
      });

      if (!pg) {
        throw new Error('PG not found');
      }

      // Fetch format details for Pg
      pg.pageFormatDetails = await this.fetchFormatDetails(PgId);

      // Fetch format details for each Row and cell details
      for (const row of pg.tRows) {
        row.rowFormatDetails = await this.fetchFormatDetails(row.row.toString());

        const cells = await this.tCellRepository.find({ where: { row: row.row } });
        row.cells = await Promise.all(cells.map(async (cell) => {
          if (typeof cell.items === 'string') {
            const itemIds = this.parsePostgresArray(cell.items);
            const itemDetails = await Promise.all(itemIds.map(async (itemId) => {
              return this.fetchItemDetails(itemId.toString()); // Fetch item details with format details
            }));
            cell.itemDetails = itemDetails.filter(Boolean);
          }
          cell.colFormatDetails = await this.fetchFormatDetails(cell.col, pg.pg);
          return cell;
        }));
      }

      return pg;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw new Error('Error fetching data');
    }
  }

  async fetchFormatDetails(objectId: string, container?: string): Promise<TFormat[]> {
    if (container) {
      return this.tFormatRepository.find({ 
        where: { 
          object: objectId, 
          container: container,
          deleted: false || null 
        } 
      });
    } else {
      return this.tFormatRepository.find({ 
        where: { 
          object: objectId,
          deleted: false || null 
        } 
      });
    }
  }  

  async fetchItemDetails(itemId: string): Promise<TItem | null> {
    const item = await this.tItemRepository.findOne({ where: { item: itemId } });
    if (item) {
      item.itemFormatDetails = await this.fetchFormatDetails(itemId);
    }
    return item;
  }

  parsePostgresArray(arrayString: string): bigint[] {
    return arrayString
      .replace(/[{}]/g, '') // Remove curly braces
      .split(',')           // Split by comma
      .map(id => BigInt(id.trim())); // Convert to BigInt
  }
}
