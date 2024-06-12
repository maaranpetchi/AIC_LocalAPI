import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TCell } from './entities/TCell';
import { TCol } from './entities/TCol';
import { TFormat } from './entities/TFormat';
import { TItem } from './entities/TItem';
import { TPg } from './entities/TPg';
import { TRow } from './entities/TRow';
import { TTx } from './entities/TTx';
import { TUser } from './entities/TUser';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: "aicdesignmgm.postgres.database.azure.com",
      port: 5432,
      username: 'postgres',
      password: 'Krypto$@123',
      database: 'postgres',
      entities: [TPg,TFormat,TRow,TCell,TCol,TItem,TTx,TUser],
      synchronize: false,
      ssl: true
    }),
    TypeOrmModule.forFeature([TPg, TFormat, TRow,TCell,TCol,TItem,TTx,TUser]), // Add other entities as necessary

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
