import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReservedIdsService } from './service';
import { ReservedIdsEntity } from 'src/entities/reservedIds.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ReservedIdsEntity])],
    providers: [ReservedIdsService],
    exports: [ReservedIdsService],
})
export class ReservedIdsModule { }

