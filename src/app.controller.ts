import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('Tpg')
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly appService: AppService) {}


  @Get()
  async findAll() {
    try {
      return await this.appService.findAll();
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'There was a problem fetching the data.',
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':pgid')
  async findRowsByPgId(@Param('pgid') pgid: string) {
    try {
      return await this.appService.findRowsByPgId(pgid);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'There was a problem fetching the data.',
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  
}