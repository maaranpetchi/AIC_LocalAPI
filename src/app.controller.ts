import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('allpages')
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly appService: AppService) {}
  @Get(':PgId')
  async getRowsByPgId(@Param('PgId')PgId:string) {
    try {
      return await this.appService.getRowsByPgId(PgId);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'There was a problem fetching the data.',
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  } 
}