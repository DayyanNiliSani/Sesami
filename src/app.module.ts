import * as config from 'config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entities } from './Domain/Models';
import { Repos } from './Infra/Repository';
import { Services } from './Service';
import { Controllers } from './App/Controllers';
import { RedLockInstance } from './Infra/Lock/redLock';

const dbConfig = config.get('db');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...(dbConfig as any),
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature(Entities),
  ],
  controllers: Controllers,
  providers: [...Repos, ...Services, RedLockInstance],
})
export class AppModule {}
