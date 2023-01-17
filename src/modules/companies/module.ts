import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompaniesController } from './controller';
import { CompaniesService } from './service';
import { CompaniesEntity } from '../../entities/companies.entity';

@Module({
    imports: [TypeOrmModule.forFeature([CompaniesEntity])],
    controllers: [CompaniesController],
    providers: [CompaniesService],
})
export class CompaniesModule {}